import TableIcon from "@/assets/icon/TableIcon";
import { Table } from "antd";
import React, { useState } from "react";
import ApprovalModal from "./ApprovalModal";
const columns = [
  {
    title: (
      <span className="flex items-center uppercase space-x-2">
        <p>Date Created</p>
        <TableIcon />
      </span>
    ),
    dataIndex: "DateCreated",
    key: "DateCreated",
  },
  {
    title: (
      <span className="flex items-center uppercase space-x-2">
        <p>Created By</p>
        <TableIcon />
      </span>
    ),
    dataIndex: "CreatedBy",
    key: "CreatedBy",
  },
  {
    title: (
      <span className="flex items-center uppercase space-x-2">
        <p>Account</p>
        <TableIcon />
      </span>
    ),
    dataIndex: "account",
    key: "account",
  },
  {
    title: (
      <span className="flex items-center uppercase space-x-2">
        <p>Payment Type</p>
        <TableIcon />
      </span>
    ),
    dataIndex: "payment",
    key: "payment",
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
  },
];
const AprovalRule = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col py-4 w-full space-y-6">
      <span className="flex justify-between items-center">
        <h1 className="font-semibold">Approval Rule </h1>
        <button
          onClick={() => setOpen(true)}
          className="btn btn-md  bg-black hover:bg-black text-white text-sm normal-case"
        >
          + Create Approval
        </button>
      </span>
      <div className="relative overflow-x-auto  sm:rounded-lg w-[22rem] md:w-full">
        <Table dataSource={[]} columns={columns} />
      </div>
      <ApprovalModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default AprovalRule;
