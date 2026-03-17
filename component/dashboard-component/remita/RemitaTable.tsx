"use client";
import React, { useState, useEffect } from "react";
import {
  CustomTable as Table,
  CustomSelect as Select,
} from "@/lib/AntdComponents";
import MoreIcon from "@/assets/icon/MoreIcon";
import FilterIcon from "@/assets/icon/FilterIcon";
import TransactionModal from "./TransactionModal";
import { useLazyGetTransactionHistoryQuery } from "@/services/remitaService";
import { TablePaginationConfig } from "antd";

interface DataType {
  key: string;
  date: string;
  serviceType: string;
  product: string;
  status: string;
  amount: string;
}
export interface TableParams {
  pagination?: TablePaginationConfig;
}

const RemitaTable = () => {
  const [fetchTransactions, { isLoading, data }] =
    useLazyGetTransactionHistoryQuery();
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 5,
    },
  });
  const handleTableChange = (pagination: TablePaginationConfig) => {
    setTableParams((prev) => ({
      ...prev,
      pagination,
    }));
  };
  useEffect(() => {
    fetchTransactions({
      page: tableParams?.pagination?.current,
    })
      .unwrap()
      .then((res) => {
        console.log(res?.data.total);
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
  }, [tableParams.pagination?.current]);

  const columns = [
    {
      title: "Date",
      dataIndex: "timestamp",
      sorter: true,
      render: (text: string) => new Date(text).toDateString(),
    },
    {
      title: "category",
      dataIndex: "categoryName",
      sorter: true,
      render: (category: string) => <p>{category}</p>,
    },
    {
      title: "Product",
      dataIndex: "productName",
      sorter: true,
      render: (product: string) => <p>{product}</p>,
    },
    {
      title: "RRR",
      dataIndex: "rrr",
      sorter: true,
      render: (product: string) => <p>{product || ""}</p>,
    },
    {
      title: "Status",
      dataIndex: "status",
      sorter: true,
      render: (status: string) => {
        let colorClass = "";
        if (status === "paid") {
          colorClass = "text-[#1AD48D] bg-[#1AD48D1A]"; // Green color for successful status
        } else if (status === "unpaid") {
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
      title: "Amount",
      dataIndex: "amount",
      sorter: true,
      render: (amount: string) => (
        <p>&#8358;{Number(amount || 0).toLocaleString()}</p>
      ),
    },
    {
      title: "Action",
      dataIndex: "reference",
      render: (id: string) => {
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
  return (
    <div className="bg-white flex flex-col gap-[1rem] py-6 px-4">
      <p className="font-semibold text-[18px]">Transaction History</p>

      <div className="flex justify-between">
        <span className="flex gap-4 py-2">
          {/* <Select
            // style={{ width: 120 }}
            options={[
              { value: "Service1", label: "Service1" },
              { value: "Service2", label: "Service2" },
            ]}
            className="w-fit"
            placeholder="Service"
          />
          <Select
            // style={{ width: 120 }}
            options={[
              { value: "Status1", label: "Status1" },
              { value: "Status2", label: "Status2" },
            ]}
            className="w-fit"
            placeholder="Status"
          /> */}
        </span>
        <button className="flex gap-2 items-center rounded-[5px] border border-[#B8C9C9] p-2 py-0">
          <FilterIcon />
          <p className="text-[#202430] text-[16px] font-[500]">filter</p>
        </button>
      </div>

      <div className="relative overflow-x-auto  sm:rounded-lg w-full">
        <Table
          loading={isLoading}
          columns={columns}
          dataSource={data?.data || []}
          pagination={tableParams.pagination}
          onChange={handleTableChange}
        />
      </div>
      {id && <TransactionModal id={id} open={open} setOpen={setOpen} />}
    </div>
  );
};

export default RemitaTable;
