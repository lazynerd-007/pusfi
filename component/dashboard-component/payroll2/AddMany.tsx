"use client";

import { useRouter } from "next/navigation";
import {
  CustomTable as Table,
  CustomButton as Button,
} from "@/lib/AntdComponents";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";
import TableIcon from "@/assets/icon/TableIcon";
import { ColumnsType } from "antd/es/table";

import { useState } from "react";
import { GrFormPreviousLink } from "react-icons/gr";
import { CgAttachment } from "react-icons/cg";
import Papa from "papaparse";
const { Dragger } = Upload;
interface EmployeeData {
  key: string;
  firstName: string;
  gross: string;
  deduction: string;
  amount: string;
  status: string;
}
const AddMany = () => {
  const { back } = useRouter();
  const [data, setData] = useState<Array<any>>([]);
  const props: UploadProps = {
    name: "file",
    onChange(info) {
      Papa.parse(info.file.originFileObj as any, {
        header: true,
        complete: function (results: any) {
          setData([
            ...results.data.map((e: any) => ({
              firstname: e?.FIRST_NAME,
              lastname: e?.LAST_NAME,
              email: e?.EMAIL,
              phone: e?.PHONE_NUMBER,
              hired_date: e?.HIRE_DATE,
              salary: e?.SALARY,
              bank_name: e?.BANK_NAME,
              account_name: e?.ACCOUNT_NAME,
              job_role: e?.JOB_ROLE,
            })),
          ]);
        },
      });
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  const columns: ColumnsType<EmployeeData> = [
    {
      title: (
        <span className="flex items-center  space-x-2">
          <p>First Name</p>
          <TableIcon className="ml-4" />
        </span>
      ),
      dataIndex: "firstname",
      key: "firstName",
    },
    {
      title: (
        <span className="flex items-center  space-x-2">
          <p>Last Name</p>
          <TableIcon className="ml-4" />
        </span>
      ),
      dataIndex: "lastname",
      key: "lastName",
    },
    {
      title: (
        <span className="flex items-center  space-x-2">
          <p>Email</p>
          <TableIcon className="ml-4" />
        </span>
      ),
      dataIndex: "email",
      key: "email",
    },
    {
      title: (
        <span className="flex items-center  space-x-2">
          <p>Bank</p>
          <TableIcon className="ml-4" />
        </span>
      ),
      dataIndex: "bank_name",
      key: "gross",
    },
    {
      title: (
        <span className="flex items-center  space-x-2">
          <p>Account Name</p>
          <TableIcon className="ml-4" />
        </span>
      ),
      dataIndex: "account_name",
      key: "account_name",
    },
    {
      title: (
        <span className="flex items-center  space-x-2">
          <p>Hire Date</p>
          <TableIcon className="ml-4" />
        </span>
      ),
      dataIndex: "hired_date",
      key: "deduction",
      render: (name) => (
        <p className="capitalize">{new Date(name).toLocaleDateString()}</p>
      ),
    },
    {
      title: (
        <span className="flex items-center  space-x-2">
          <p>Job Role</p>
          <TableIcon className="ml-4" />
        </span>
      ),
      dataIndex: "job_role",
      key: "deduction",
      render: (name) => <p className="capitalize">{name}</p>,
    },
    {
      title: (
        <span className="flex items-center  space-x-2">
          <p>Amount</p>
          <TableIcon className="ml-4" />
        </span>
      ),
      dataIndex: "salary",
      key: "amount",
      render: (amount: string) => (
        <p>&#8358;{Number(amount || 0).toLocaleString()}</p>
      ),
    },
  ];
  return (
    <div className="relative flex flex-col gap-4 px-[2%] w-[95%] mx-auto">
      <header className="flex flex-col space-y-3 my-1 border-b border-[#D6DDEB] py-[2%]">
        <div className="flex items-center justify-between ">
          <span className="text-2xl font-medium flex gap-1 items-center">
            <GrFormPreviousLink className="cursor-pointer" onClick={back} />
            <span>
              <h2 className="text-2xl font-medium">
                Add employees and contractors |{" "}
                <span className="text-gray-400">Invite many</span>
              </h2>
            </span>
          </span>
        </div>
      </header>
      <div className="flex justify-between items-start">
        <span>
          <h2 className="text-[18px] text-[#061A14] font-semibold">
            Bulk invite Employees and contractors
          </h2>
          <p className="font-normal text-base text-[#5A5C5C]">
            This is Company information that you can update anytime.
          </p>
        </span>
        <a
          download
          href="https://docs.google.com/spreadsheets/d/e/2PACX-1vQ3efD2qXsOEem07jzBf7lsR0R0i2e5ByCddsv1NNTx2vYUGNSLVrD50gWJR6FJNQUpXZF9is9GpEfy/pub?output=csv"
          className="bg-black hover:bg-black rounded-[8px] p-2 text-white btn btn-sm text-[12px]"
        >
          Download Template
        </a>
      </div>
      {/* form */}
      <form className="bg-white p-4 space-y-4">
        {/* <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <div className="space-y-2 w-full md:max-w-sm">
            <p className="font-semibold text-base">Full Name</p>
            <p className="font-normal text-base text-[#515B6F]">
              Enter the email addresses of your employees, separated by commas.
              They will be sent emails to join Pursbusiness and put in their
              information.
            </p>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold text-base">Invite Employees</label>
            <TextArea
              rows={4}
              className="w-full"
              placeholder="emp1@example.com, emp2@example.com, emp3@example.com"
            />
            <span className="flex gap-4 justify-between">
              <p className="text-[#515B6F]">Maximum 500 characters</p>
              <p className="text-[#515B6F]">0 / 500</p>
            </span>
          </div>
        </div>
        <hr /> */}
        {/* <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <div className="space-y-2 w-full md:max-w-sm">
            <p className="font-semibold text-base">Full Name</p>
            <p className="font-normal text-base text-[#515B6F]">
              Enter the email addresses of your employees, separated by commas.
              They will be sent emails to join Pursbusiness and put in their
              information.
            </p>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold text-base">
              Invite Contractors
            </label>
            <TextArea
              rows={4}
              className="w-full"
              placeholder="emp1@example.com, emp2@example.com, emp3@example.com"
            />
            <span className="flex gap-4 justify-between">
              <p className="text-[#515B6F]">Maximum 500 characters</p>
              <p className="text-[#515B6F]">0 / 500</p>
            </span>
          </div>
        </div>
        <hr /> */}
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <div className="space-y-2 w-full md:max-w-sm">
            <p className="font-semibold text-base">Upload Employee names</p>
            <p className="font-normal text-base text-[#515B6F]">
              Enter the email addresses of your employees, separated by commas.
              They will be sent emails to join Pursbusiness and put in their
              information.
            </p>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label className="font-semibold text-base">
              Attach your CSV file
            </label>
            <Dragger {...props}>
              <span className="flex gap-4">
                <CgAttachment className="w-6 h-6" />
                <p className="text-[#515B6F] text-base font-medium">
                  Attach File
                </p>
              </span>
            </Dragger>
          </div>
        </div>
        <hr />

        {/* submit */}
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <div className="space-y-2 w-full md:max-w-sm" />
          <div>
            <Button
              htmlType="submit"
              className="!bg-black text-white hover:!text-white !h-[45px] font-semibold w-full text-base"
              type="primary"
            >
              Add Everyone
            </Button>
          </div>
        </div>
      </form>
      {data?.length >= 1 && <Table columns={columns} dataSource={data} />}
    </div>
  );
};

export default AddMany;
