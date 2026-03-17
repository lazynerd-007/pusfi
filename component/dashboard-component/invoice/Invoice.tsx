"use client";
import { CustomSelect as Select } from "@/lib/AntdComponents";
import { useState, useEffect } from "react";
import InvoiceTab from "./InvoiceTab";
import { useRouter } from "next/navigation";
import { useLazyInvoiceStatusQuery } from "@/services/invoiceService";
const options = [
  { value: "month", label: "Month" },
  { value: "year", label: "Yearly" },
];
const Invoice = () => {
  const [stats, setStats] = useState(options[0].value);
  const [getStats, { isLoading, data }] = useLazyInvoiceStatusQuery();
  const { push } = useRouter();
  const date = new Date();
  useEffect(() => {
    getStats({ time: stats });
  }, [stats]);
  return (
    <div className="max-w-[1640px] flex flex-col p-4  h-screen overflow-y-scroll">
      <header className="flex flex-col space-y-9 ">
        <div className="flex items-center justify-between ">
          <span>
            <h2 className="text-3xl font-bold mb-1"> Invoice </h2>
            <p className="text-sm text-gray-600">
              Showing your Account metrics for{" "}
              {date.toLocaleString("en-US", {
                month: "long",
                day: "2-digit",
                year: "numeric",
              })}
            </p>
          </span>
          <div className="flex justify-center items-center space-x-5">
            <button
              onClick={() => push("/create-invoice")}
              className="btn btn-md  bg-black hover:bg-black text-white text-sm normal-case"
            >
              + Create Invoice
            </button>
            <Select
              className="!w-full !h-[2.5rem]"
              options={options}
              placeholder="Show stats Yearly"
              value={stats}
              onSelect={(value: string) => setStats(value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-[5%] items-center">
          <span className="bg-white flex flex-col justify-center py-2 px-[5%] rounded-md">
            <p className="text-[1rem]">Total Incoming</p>
            <p className="text-2xl font-medium">
              &#8358;
              {isLoading
                ? "..."
                : `${
                    Number(data?.data?.allInvoice || 0).toLocaleString(
                      "en-US"
                    ) || ""
                  }`}
            </p>
          </span>
          <span className="bg-white flex flex-col justify-center py-2 px-[5%] rounded-md">
            <p className="text-[1rem]">Total Paid</p>
            <p className="text-2xl font-medium">
              &#8358;
              {isLoading
                ? "..."
                : `${
                    Number(data?.data?.paid || 0).toLocaleString("en-US") || ""
                  }`}
            </p>
          </span>
          <span className="bg-white flex flex-col justify-center py-2 px-[5%] rounded-md">
            <p className="text-[1rem]"> Overdue Invoice </p>
            <p className="text-2xl font-medium">
              &#8358;
              {isLoading
                ? "..."
                : `${
                    Number(data?.data?.overdue || 0).toLocaleString("en-US") ||
                    ""
                  }`}
            </p>
          </span>
          <span className="bg-white flex flex-col justify-center py-2 px-[5%] rounded-md">
            <p className="text-sm"> Unpaid</p>
            <p className="text-2xl font-medium">
              &#8358;
              {isLoading
                ? "..."
                : `${Number(data?.data?.unpaid || 0).toLocaleString("en-US")}`}
            </p>
          </span>
        </div>
        <div className="bg-white p-2 rounded-md">
          <InvoiceTab />
        </div>
      </header>
    </div>
  );
};

export default Invoice;
