"use client";

import React, { useState } from "react";
import {
  CustomTable as Table,
  CustomSelect as Select,
} from "@/lib/AntdComponents";
import FilterIcon from "@/assets/icon/FilterIcon";

interface DataType {
  key: string;
  date: string;
  number: string;
  product: string;
  transID: string;
  amount: string;
  status: string;
}

const data: DataType[] = [
  {
    key: "1",
    date: "12:00 PM 13 July, 2021",
    number: "070445483345",
    product: "Airtime",
    transID: "3384558666-2EDED",
    amount: "N44,345.00",
    status: "Failed",
  },
  {
    key: "2",
    date: "12:00 PM 13 July, 2021",
    number: "070445483345",
    product: "Airtime",
    transID: "3384558666-2EDED",
    amount: "N44,345.00",
    status: "Success",
  },
  {
    key: "3",
    date: "12:00 PM 13 July, 2021",
    number: "070445483345",
    product: "Airtime",
    transID: "3384558666-2EDED",
    amount: "N44,345.00",
    status: "Failed",
  },
];

const BuyTable = () => {
  const [open, setOpen] = useState(false);
  const columns = [
    {
      title: "Date /time",
      dataIndex: "date",
      sorter: true,
    },
    {
      title: "Number",
      dataIndex: "number",
      sorter: true,
      render: (number: string, record: DataType) => {
        return (
          <span className=" flex md:flex-col flex-row md:gap-0 gap-2">
            {number}
            <span className="text-[#515B6F]">{record.product}</span>
          </span>
        );
      },
    },
    {
      title: "transaction ID",
      dataIndex: "transID",
      sorter: true,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      sorter: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      sorter: true,
      render: (status: string) => {
        let colorClass = "";
        if (status === "Success") {
          colorClass = "text-[#1AD48D] bg-[#1AD48D1A]"; // Green color for Successful status
        } else if (status === "Failed") {
          colorClass = "text-red-600 bg-red-600/10"; // Red color for failed status
        }
        return (
          <span className={`font-semibold px-2 py-1 rounded-md ${colorClass}`}>
            {status}
          </span>
        );
      },
    },

    {
      title: "Action",
      render: () => {
        return (
          <span
            onClick={() => {
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
  return (
    <div className="p-4 border border-[#E9EBEB] mt-6">
      <div className="flex justify-between">
        <Select
          // style={{ width: 120 }}
          options={[
            { value: "Status1", label: "Status1" },
            { value: "Status2", label: "Status2" },
          ]}
          className="w-fit"
          placeholder="Status"
        />
        <button className="flex gap-2 items-center rounded-[5px] border border-[#B8C9C9] p-2 py-0">
          <FilterIcon />
          <p className="text-[#202430] text-[16px] font-[500]">filter</p>
        </button>
      </div>

      <div className="relative mt-4 overflow-x-auto sm:rounded-lg w-full">
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default BuyTable;
