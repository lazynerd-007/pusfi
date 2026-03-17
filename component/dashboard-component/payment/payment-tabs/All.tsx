"use client";
import { useEffect, useState } from "react";
import {
  CustomTable as Table,
  CustomDatePicker as DatePicker,
  CustomInput as Input,
} from "@/lib/AntdComponents";
import TableIcon from "@/assets/icon/TableIcon";
import FilterIcon from "@/assets/icon/FilterIcon";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import AccountDrawal from "../../account/AccountDrawal";
import { useDisbursementTransactionsMutation } from "@/services/transactionService";
import { useAppSelector } from "@/store/hooks";

export interface DataType {
  name: string;
  date: string;
  purpose: string;
  type: string;
  amount: string;
}

export interface TableParams {
  pagination?: TablePaginationConfig;
}
const initialState = {
  userId: "",
  businessId: "",
  startDate: "",
  filterBy: "",
  endDate: "",
  amount: "",
  page: 1,
  perPage: 10,
};

const All = () => {
  const [fetchTransactions, { isLoading, data }] =
    useDisbursementTransactionsMutation();
  const profile = useAppSelector((store) => store?.user?.user);
  // const [data, setData] = useState<DataType[]>();
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const [id, setId] = useState("");
  const [filter, setFilter] = useState(false);
  const [tableFilter, setTableFilter] = useState(initialState);
  const [open, setOpen] = useState(false);
  const columns: ColumnsType<DataType> = [
    {
      title: (
        <span className="flex items-center uppercase space-x-2">
          <p>Date</p>
          <TableIcon />
        </span>
      ),
      dataIndex: "createdAt",
      render: (date) =>
        `${new Date(date).toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        })}`,
      width: "20%",
    },
    {
      title: (
        <span className="flex items-center uppercase space-x-2">
          <p>Counterparty</p>
          <TableIcon />
        </span>
      ),
      dataIndex: "accountName",
      render: (name) => `${name}`,
      width: "30%",
    },
    // {
    //   title: (
    //     <span className="flex items-center uppercase space-x-2">
    //       <p>Purpose</p>
    //       <TableIcon />
    //     </span>
    //   ),
    //   dataIndex: "purpose",
    //   render: (purpose) => `${purpose}`,
    //   width: "20%",
    // },
    {
      title: (
        <span className="flex items-center uppercase space-x-2">
          <p>Status</p>
          <TableIcon />
        </span>
      ),
      dataIndex: "status",
      render: (type) =>
        type === "failed" ? (
          <span className="p-[4%] rounded-[80px] bg-[#FF39561A]/[10%] text-[#FF3956] text-center  text-[14px] font-[600]">
            {type}
          </span>
        ) : type === "pending" ? (
          <span className="p-[4%] rounded-[80px] bg-[#FFD03A]/[10%] text-[#FFD03A] text-center  text-[14px] font-[600]">
            {type}
          </span>
        ) : (
          <span className="p-[4%] rounded-[80px] bg-[#0AA07B]/[10%] text-[#0AA07B] text-center text-[14px] font-[600]">
            {type}
          </span>
        ),

      width: "20%",
    },
    {
      title: (
        <span className="flex items-center uppercase">
          <p>Amount</p>
          <TableIcon />
        </span>
      ),
      dataIndex: "amount",
      render: (amount) => `₦${amount}`,
      width: "20%",
    },
    {
      title: (
        <span className="flex items-center uppercase space-x-2">
          <p>Action</p>
          <TableIcon className="ml-4" />
        </span>
      ),
      dataIndex: "reference",
      render: (id: any, record: DataType) => {
        return (
          <span
            onClick={() => {
              setId(id);
              setOpen(true);
            }}
            className="cursor-pointer"
          >
            ...
          </span>
        );
      },
    },
  ];
  // const fetchData = () => {
  //   setLoading(true);
  //   fetch(`https://testapi.io/api/sikiru/purscliq-transaction`)
  //     .then((res) => res.json())
  //     .then((results) => {
  //       setData(results);
  //       setLoading(false);
  //       setTableParams({
  //         ...tableParams,
  //         pagination: {
  //           ...tableParams?.pagination,
  //           total: 200,
  //         },
  //       });
  //     });
  // };

  useEffect(() => {
    fetchTransactions({
      ...tableFilter,
      page: tableParams?.pagination?.current,
      userId: profile?.id,
      businessId: profile?.businessId,
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
  }, [JSON.stringify(tableParams)]);
  useEffect(() => {
    fetchTransactions({
      ...tableFilter,
      page: 1,
      userId: profile?.id,
      businessId: profile?.businessId,
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

  return (
    <>
      <section className="">
        <div className="flex flex-col gap-[1rem] bg-white py-[1%]">
          <span className="px-[1%] text-[#000000] text-[18px] font-[600]">
            Payment
          </span>
          <Table
            columns={columns}
            //   rowKey={(record) => record.login.uuid}
            dataSource={data?.data?.data || []}
            pagination={tableParams.pagination}
            loading={isLoading}
            onChange={handleTableChange}
          />
        </div>
      </section>
      <AccountDrawal Open={open} onClose={() => setOpen(false)} id={id} />
    </>
  );
};

export default All;
