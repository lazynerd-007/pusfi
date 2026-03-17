"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import logo from "@/assets/logo.svg";
import { message } from "antd";
import {
  CustomButton as Button,
  CustomTable as Table,
} from "@/lib/AntdComponents";
import { ColumnsType } from "antd/es/table";
import InvoicePaymentModal from "./InvoicePaymentModal";
import { useSearchParams } from "next/navigation";
import { useLazyVerifyInvoiceQuery } from "@/services/invoiceService";
interface DataType {
  key: string;
  title: string;
  quantity: number;
  price: number;
  amount: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Items",
    dataIndex: "itemName",
    key: "title",
    render: (text) => <p>{text}</p>,
    width: "25%",
  },
  {
    title: "Quantity",
    dataIndex: "itemQty",
    key: "quantity",
    render: (text) => <p>{text}</p>,
    width: "25%",
  },
  {
    title: "Price",
    dataIndex: "itemPrice",
    key: "price",
    render: (text) => <p>{text}</p>,
    width: "25%",
  },
  {
    title: "Amount",
    key: "tags",
    dataIndex: "itemAmount",
    render: (text) => <p>{text}</p>,
    width: "25%",
  },
];

const InvoiceGateway = () => {
  const params = useSearchParams();
  const [fetchVerifyInvoice, { isLoading, data, isUninitialized }] =
    useLazyVerifyInvoiceQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    if (params.get("reference")) {
      fetchVerifyInvoice(params.get("reference"))
        .unwrap()
        .catch((err) => {
          message.error(
            JSON.parse(err?.data?.responseDescription)?.message ||
              "something went wrong"
          );
        });
    }
  }, [params]);
  return (
    <>
      {isLoading || isUninitialized ? (
        <div className="relative h-screen flex items-center justify-center bg-[#FAFAFA]">
          <div className="fixed top-0 left-0 px-6 py-4">
            <Image src={logo} alt="logo" className="w-28 h-28" />
          </div>
          <div className="fixed inset-0 bg-black opacity-50 z-50" />
          <div className="w-16 h-16 border-t-4 border-black border-solid rounded-full animate-spin z-50" />
        </div>
      ) : (
        <>
          <div className="min-h-screen flex flex-col bg-BgImage mx-auto max-w-[1640px] bg-[#FAFAFA] relative">
            <nav className="py-4 px-8 bg-white flex justify-between items-center sticky top-0">
              <Image src={logo} alt="logo" />
              <a
                className="px-[10px] py-[5px] border border-[#000000] border-solid rounded-[8px]"
                href="https://pursfinance.com"
                target="_blank"
              >
                learn about us
              </a>
            </nav>
            <main className=" flex flex-col items-center justify-center bg-white w-[90%] md:w-[60%] m-auto my-[2rem] py-6 px-[1%] overflow-scroll">
              <div className="flex items-stretch justify-between w-full pb-[2%] border-b border-[#B8C9C9]">
                <span>
                  <h2 className="font-semibold text-[18px] mb-2">
                    {data?.data?.name}
                  </h2>
                  <p className="text-gray-500">{data?.data?.address},</p>
                  <p className="text-gray-500">{data?.data?.country}.</p>
                  <p className="text-gray-500">{data?.data?.senderMail}</p>
                  <p className="text-gray-500">+{data?.data?.phoneNumber}</p>
                </span>
                <span className="bg-[#FAFAFA] flex items-center py-[3%] px-[2%]">
                  <Image src={logo} alt="logo" className="" />
                </span>
              </div>
              <div className="border-b border-[#B8C9C9] py-[2%] w-full">
                <div className="grid grid-cols-2 items-center justify-between w-full pb-[2%]">
                  <span className="flex flex-col gap-[1rem] wfull">
                    <h2 className="font-[700] text-[#181336] text-[18px] mb-1">
                      Bill to
                    </h2>
                    <p className="text-[#181336] text-[14px] font-[600]">
                      {data?.data?.clientName}
                    </p>
                    <p className="text-[#515B6F] text-[14px] font-[500]">
                      {data?.data?.clientMail}
                    </p>
                  </span>
                  <span className="flex flex-col gap-[1rem] w-full selfend justify-self-end">
                    <span className="flex gap-[2%] w-full justify-end">
                      <p className="text-[#181336] font-[600] text-[14px]">
                        Invoice Number
                      </p>
                      <p className="text-[#181336] font-[400] text-[14px]">
                        {data?.data?.reference}
                      </p>
                    </span>
                    <span className="flex gap-[2%] w-full justify-end">
                      <p className="text-[#181336] font-[600] text-[14px]">
                        Invoice Date
                      </p>
                      <p className="text-[#181336] font-[400] text-[14px]">
                        {new Date(data?.data?.createdAt).toLocaleDateString()}
                      </p>
                    </span>
                    <span className="flex gap-[2%] w-full justify-end">
                      <p className="text-[#181336] font-[600] text-[14px]">
                        Due Date
                      </p>
                      <p className="text-[#181336] font-[400] text-[14px]">
                        {new Date(data?.data?.dueDate).toLocaleDateString()}
                      </p>
                    </span>
                  </span>
                </div>
                <Table
                  className="!w-full"
                  columns={columns}
                  dataSource={data?.data?.info}
                  pagination={false}
                  scroll={{ y: 200 }}
                />
                <div className="grid grid-cols-3 justify-between w-full mt-4 text-[#181336] text-[16px] font-[600]">
                  <span className="">Discount</span>
                  <span className="justify-self-center">
                    {data?.data?.discountPercent || 0}%
                  </span>
                  <span className="justify-self-end">
                    &#8358;
                    {Number(data?.data?.discount || 0).toLocaleString("en-US")}
                  </span>
                </div>
                <div className="grid grid-cols-3 justify-between w-full mt-4 text-[#181336] text-[16px] font-[600]">
                  <span className="">Tax</span>
                  <span className="justify-self-center">
                    {data?.data?.taxPercent || 0}%
                  </span>
                  <span className="justify-self-end">
                    &#8358;
                    {Number(data?.data?.tax || 0).toLocaleString("en-US")}
                  </span>
                </div>
                <div className="grid grid-cols-3 justify-between w-full mt-4 text-[#181336] text-[16px] font-[600]">
                  <span className="">Shipping Fee</span>
                  <span className="justify-self-center">-</span>
                  <span className="justify-self-end">
                    &#8358;
                    {Number(data?.data?.shipping || 0).toLocaleString("en-US")}
                  </span>
                </div>
                <div className="flex justify-between py-[2%] w-full border-t border-[#B8C9C9] mt-[1%]">
                  <span className="text-[#181336] text-[20px] font-[600]">
                    Subtotal
                  </span>
                  <span className="text-[#181336] text-[20px] font-[600]">
                    &#8358;
                    {Number(data?.data?.amount || 0).toLocaleString("en-US")}
                  </span>
                </div>
              </div>
              {/* <div className="flex flex-col gap-[1%] justify-selfstart self-start pt-[2%]">
            <span className="text-[#181336] text-[18px] font-[700]">
              Bank Details
            </span>
            <span className="text-[#181336] text-[14px] font-[600]">
              Pursbusiness
            </span>
            <span className="text-[#515B6F] text-[14px] font-[500]">
              0094565067
            </span>
          </div> */}
            </main>
            <footer className="py-4 px-8 bg-white flex justify-end items-center gap-1 sticky bottom-0">
              <Button className="no-print" onClick={() => window.print()}>
                Download Invoice
              </Button>
              <Button
                onClick={() => {
                  if (data?.data?.status === "overdue") {
                    message.error("invoice overdue!, please contact business");
                    return;
                  }
                  setIsModalOpen(true);
                }}
                type="primary"
                className="!bg-black no-print"
              >
                Pay now
              </Button>
            </footer>
          </div>
          <InvoicePaymentModal
            data={data?.data}
            open={isModalOpen}
            setOpen={setIsModalOpen}
          />
        </>
      )}
    </>
  );
};

export default InvoiceGateway;
