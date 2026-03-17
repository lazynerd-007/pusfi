"use client";
import { useState } from "react";
import { MenuProps, Dropdown } from "antd";
import { CustomTable as Table } from "@/lib/AntdComponents";
import TableIcon from "@/assets/icon/TableIcon";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import DeletePayrollModal from "../DeletePayrollModal";
import { useGetPayrollQuery } from "@/services/payrollService";
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
  const { data: payroll, isLoading } = useGetPayrollQuery({});
  // const [tableParams, setTableParams] = useState<TableParams>({
  //   pagination: {
  //     current: 1,
  //     pageSize: 10,
  //   },
  // });
  const [id, setId] = useState("");
  const [open, setOpen] = useState(false);
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <Link href={`/payroll?id=${id}`}>update</Link>,
    },
    {
      key: "2",
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
      dataIndex: "title",
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
      dataIndex: "email",
      render: (email) => `${20}`,
      width: "30%",
    },
    {
      title: (
        <span className="flex items-center uppercase space-x-2">
          <p>Type</p>
          <TableIcon />
        </span>
      ),
      dataIndex: "automatic",
      render: (automatic) => `${automatic === 1 ? "automatic" : "manual"}`,

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
      width: "10%",
      render: (id: any, record: DataType) => {
        return (
          <Dropdown menu={{ items }} trigger={["click"]}>
            <span onClick={() => setId(id)} className="cursor-pointer">
              ...
            </span>
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
            dataSource={payroll || []}
            loading={isLoading}
            // onChange={handleTableChange}
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
