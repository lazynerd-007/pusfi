"use client";
import { useState, useEffect } from "react";
import { MenuProps, Dropdown } from "antd";
import { CustomTable as Table } from "@/lib/AntdComponents";
import TableIcon from "@/assets/icon/TableIcon";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import DeletePayrollModal from "../DeletePayrollModal";
import {
  useGetPayrollQuery,
  useLazyGetPayrollAnalyticsQuery,
} from "@/services/payrollService";
import Link from "next/link";

export interface DataType {
  firstName: string;
  lastName: string;
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
type listType = {
  value: string;
  label: string;
};

const PayrollTable = () => {
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const [getPayrolls, { isLoading, data: payroll }] =
    useLazyGetPayrollAnalyticsQuery();
  const [id, setId] = useState("");
  useEffect(() => {
    getPayrolls({
      page: tableParams?.pagination?.current,
    })
      .unwrap()
      .then((res) => {
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams?.pagination,
            total: res?.data?.meta?.total,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [tableParams.pagination?.current]);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setTableParams((prev) => ({
      ...prev,
      pagination,
    }));
  };
  const [open, setOpen] = useState(false);
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <Link href={`/payroll/preview?id=${id}`}>preview</Link>,
    },
    {
      key: "2",
      label: <Link href={`/payroll/update?id=${id}`}>update</Link>,
    },
    {
      key: "3",
      label: <span>delete</span>,
      danger: true,
      onClick: () => setOpen(true),
    },
  ];
  const columns: ColumnsType<DataType> = [
    {
      title: (
        <span className="flex items-center uppercase space-x-2">
          <p>Name</p>
          <TableIcon />
        </span>
      ),
      dataIndex: "name",
      render: (title) => `${title}`,
      width: "20%",
    },
    {
      title: (
        <span className="flex items-center uppercase space-x-2">
          <p>Total Members</p>
          <TableIcon />
        </span>
      ),
      dataIndex: "members",
      render: (members) => `${members}`,
      width: "20%",
    },
    {
      title: (
        <span className="flex items-center uppercase space-x-2">
          <p>Type</p>
          <TableIcon />
        </span>
      ),
      dataIndex: "type",
      render: (type) => `${type}`,

      width: "10%",
    },
    {
      title: (
        <span className="flex items-center uppercase space-x-2">
          <p>Status</p>
          <TableIcon />
        </span>
      ),
      dataIndex: "payoutDate",
      render: (date) =>
        `Auto-running on ${new Date(date).toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        })}`,

      width: "25%",
    },
    {
      title: (
        <span className="flex items-center uppercase space-x-2">
          <p>Action</p>
          <TableIcon className="ml-4" />
        </span>
      ),
      dataIndex: "id",
      width: "10%",
      render: (id: any, record: DataType) => {
        return (
          <Dropdown
            menu={{
              items: [
                {
                  key: "1",
                  label: (
                    <Link href={`/payroll-preview?id=${id}`}>preview</Link>
                  ),
                },
                {
                  key: "2",
                  label: <Link href={`/payroll-update?id=${id}`}>update</Link>,
                },
                {
                  key: "3",
                  label: <span>delete</span>,
                  danger: true,
                  onClick: () => setOpen(true),
                },
              ],
            }}
            trigger={["click"]}
          >
            <span className="cursor-pointer">...</span>
          </Dropdown>
        );
      },
    },
  ];

  return (
    <>
      <section className="">
        <div className="flex flex-col gap-[2rem] bg-white p-[1%]">
          <Table
            columns={columns}
            //   rowKey={(record) => record.login.uuid}
            dataSource={payroll?.data || []}
            loading={isLoading}
            onChange={handleTableChange}
            pagination={tableParams.pagination}
          />
        </div>
      </section>
      <DeletePayrollModal
        open={open}
        setOpen={setOpen}
        id={id}
        closeDrawal={() => setOpen(false)}
      />
    </>
  );
};

export default PayrollTable;
