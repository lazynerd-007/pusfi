"use client";
import { useState, useEffect } from "react";
import { TablePaginationConfig } from "antd";
import { ColumnsType } from "antd/es/table";
import FilterIcon from "@/assets/icon/FilterIcon";
import {
  CustomDatePicker as DatePicker,
  CustomInput as Input,
  CustomTable as Table,
} from "@/lib/AntdComponents";
import TableIcon from "@/assets/icon/TableIcon";
import { useInvoiceHistoryMutation } from "@/services/invoiceService";
import { useAppSelector } from "@/store/hooks";
import Link from "next/link";

export interface DataType {
  name: string;
  date: string;
  purpose: string;
  type: string;
  amount: string;
  reference: string;
}
export interface TableParams {
  pagination?: TablePaginationConfig;
}
const startDate: any = "";
const endDate: any = "";
const initialState = {
  userId: "",
  businessId: "",
  startDate,
  filterBy: "",
  endDate,
  amount: "",
  status: "",
  page: 1,
  perPage: 10,
};

const InvoiceTable = ({ status }: { status: string }) => {
  // Filter the data based on the selected status, or show all data if status is "all"
  // const filteredData =
  //   status === "all"
  //     ? data
  //     : data.filter(
  //         (item) => item.status.toLowerCase() === status.toLowerCase()
  //       );
  const [getInvoice, { isLoading, data }] = useInvoiceHistoryMutation();
  const profile = useAppSelector((store) => store?.user?.user);
  const [filter, setFilter] = useState(false);
  const [tableFilter, setTableFilter] = useState(initialState);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  useEffect(() => {
    getInvoice({
      ...tableFilter,
      page: tableParams?.pagination?.current,
      userId: profile?.id,
      businessId: profile?.businessId,
      status,
    })
      .unwrap()
      .then((res) => {
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams?.pagination,
            total: res?.data?.total,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [JSON.stringify(tableParams), status]);
  useEffect(() => {
    getInvoice({
      ...tableFilter,
      page: 1,
      userId: profile?.id,
      businessId: profile?.businessId,
      status,
    })
      .unwrap()
      .then((res) => {
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams?.pagination,
            total: res?.data.total,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [JSON.stringify(filter)]);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setTableParams((prev) => ({
      ...prev,
      pagination,
    }));
    // if (pagination.pageSize !== tableParams.pagination?.pageSize) {
    //   setData([]);
    // }
  };
  const columns: ColumnsType<DataType> = [
    {
      title: (
        <span className="flex items-center uppercase space-x-2">
          <p>Client Name</p>
          <TableIcon />
        </span>
      ),
      dataIndex: "clientName",
      key: "client",
      render: (text: string, record: DataType) => (
        <>
          <h1 className="font-semibold">{text}</h1>
          <p>Invoice no:{record?.reference}</p>
        </>
      ),
    },
    {
      title: (
        <span className="flex items-center uppercase space-x-2">
          <p>Issued Date</p>
          <TableIcon />
        </span>
      ),
      dataIndex: "createdAt",
      key: "issuieddate",
      render: (text: string) => new Date(text).toDateString(),
    },
    {
      title: (
        <span className="flex items-center uppercase space-x-2">
          <p>Due date</p>
          <TableIcon />
        </span>
      ),
      dataIndex: "dueDate",
      key: "duedate",
      render: (text: string) => new Date(text).toDateString(),
    },
    {
      title: (
        <span className="flex items-center uppercase space-x-2">
          <p>Amount</p>
          <TableIcon />
        </span>
      ),
      dataIndex: "amount",
      key: "amount",
      render: (amount) => `₦${amount}`,
    },
    {
      title: (
        <span className="flex items-center uppercase space-x-2">
          <p>Status</p>
          <TableIcon />
        </span>
      ),
      dataIndex: "status",
      key: "status",
      render: (text: string) => {
        let statusClasses = "";

        switch (text.toLowerCase()) {
          case "unpaid":
            statusClasses = "text-blue-400 bg-blue-200";
            break;
          case "paid":
            statusClasses = "text-green-400 bg-green-200";
            break;
          case "overdue":
            statusClasses = "text-red-400 bg-red-200";
            break;
          default:
            break;
        }

        return (
          <span
            className={`  text-center text-[14px] font-[600] px-3 py-1 rounded-[80px] ${statusClasses}`}
          >
            {text}
          </span>
        );
      },
    },
    {
      dataIndex: "reference",
      key: "reference",
      render: (reference) => (
        <a
          className="text-black"
          target="_blank"
          href={`https://app.pursfinance.com/invoice-gateway?reference=${reference}`}
        >
          ...
        </a>
      ),
      width: "10%",
    },
  ];

  return (
    <div className="bg-white flex flex-col gap-[0.5rem] space-y-3">
      <div className="flex items-center justify-start w-full gap-[1rem]">
        <DatePicker
          onChange={(_, date) =>
            setTableFilter((prev) => ({
              ...prev,
              startDate: date as string,
            }))
          }
          className="h-fit !w-[15rem]"
          placeholder="Start Date"
        />
        <DatePicker
          onChange={(_, date) =>
            setTableFilter((prev) => ({
              ...prev,
              endDate: date as string,
            }))
          }
          className="h-fit !w-[15rem]"
          placeholder="End Date"
        />
        <div className="w-fit">
          <Input
            value={tableFilter?.amount}
            onChange={(e) =>
              setTableFilter((prev) => ({
                ...prev,
                amount: e.target.value,
              }))
            }
            className="h-fit w-fit"
            placeholder="Amount"
          />
        </div>
        <div
          onClick={() => {
            setFilter((prev) => !prev);
          }}
          className="flex justify-end w-full cursor-pointer"
        >
          <span className="flex items-center rounded-[5px] border border-[#B8C9C9] p-[1%] justify-self-end self-end">
            <FilterIcon />
            <p className="text-[#202430] text-[16px] font-[500]">filter</p>
          </span>
        </div>
      </div>
      <div className="relative overflow-x-auto  sm:rounded-lg w-[22rem] md:w-full">
        <Table
          columns={columns}
          //   rowKey={(record) => record.login.uuid}
          dataSource={data?.data?.data || []}
          pagination={tableParams.pagination}
          loading={isLoading}
          onChange={handleTableChange}
        />
      </div>
    </div>
  );
};

export default InvoiceTable;
