"use client";

import { useRouter } from "next/navigation";
import { CustomTable as Table } from "@/lib/AntdComponents";
import type { TableColumnsType, TableProps } from "antd";

interface DataType {
  key: React.Key;
  date: string;
  people: number;
  amount: string;
  status: string;
}

const data: DataType[] = [
  {
    key: "1",
    date: "25 Nov,2022 - 25 Dec,2022",
    people: 62,
    status: "Auto-running on Dec 25",
    amount: "N4,444,345.00",
  },
  {
    key: "2",
    date: "25 Nov,2022 - 25 Dec,2022",
    people: 62,
    status: "Auto-running on Dec 25",
    amount: "N4,444,345.00",
  },
  {
    key: "3",
    date: "25 Nov,2022 - 25 Dec,2022",
    people: 62,
    status: "Auto-running on Dec 25",
    amount: "N4,444,345.00",
  },
  {
    key: "4",
    date: "25 Nov,2022 - 25 Dec,2022",
    people: 62,
    status: "Auto-running on Dec 25",
    amount: "N4,444,345.00",
  },
  {
    key: "5",
    date: "25 Nov,2022 - 25 Dec,2022",
    people: 62,
    status: "Auto-running on Dec 25",
    amount: "N4,444,345.00",
  },
];

const OverviewTable = () => {
  const { push } = useRouter();

  const columns = [
    {
      title: "Payroll Date",
      dataIndex: "date",
      sorter: true,
      render: (date: string) => {
        return (
          <p className="text-[#181336] text-base font-medium py-3">{date}</p>
        );
      },
    },
    {
      title: "People",
      dataIndex: "people",
      sorter: true,
      render: (people: string) => {
        return (
          <p className="text-[#181336] text-base font-medium py-3">{people}</p>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      sorter: true,
      render: (status: string) => {
        return (
          <p className="text-[#181336] text-base font-medium py-3">{status}</p>
        );
      },
    },
    {
      title: "Amount",
      dataIndex: "amount",
      sorter: true,
      render: (amount: string) => {
        return (
          <p className="text-[#181336] text-base font-medium py-3">{amount}</p>
        );
      },
    },
    {
      title: "Action",
      //  sorter: true,
      render: () => {
        return (
          <>
            <button
              type="button"
              title="Details"
              onClick={() => push("/payroll-details")}
              className="text-lg"
            >
              ...
            </button>
          </>
        );
      },
    },
  ];

  return (
    <section className="flex flex-col gap-6 bg-white p-4 mt-6">
      <p className="text-[18px] font-semibold text-black">
        Recent history of all monthly payroll
      </p>

      {/* table */}
      <div className="relative overflow-x-auto  sm:rounded-lg w-full">
        <Table columns={columns} dataSource={data} />
      </div>
    </section>
  );
};

export default OverviewTable;
