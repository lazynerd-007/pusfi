import { Modal } from "antd";
import React from "react";
import {
  CustomInput as Input,
  CustomButton as Button,
  CustomSpinner as Spinner,
} from "@/lib/AntdComponents";
import { useGetSingleTransactionQuery } from "@/services/remitaService";
const TransactionModal = ({
  open,
  setOpen,
  id,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  id: string;
}) => {
  const { data, isLoading, isFetching } = useGetSingleTransactionQuery({
    reference: id,
  });
  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      centered={true}
      title="Transaction Details"
    >
      {isFetching || isLoading ? (
        <div className="flex items-center justify-center h-[40vh] w-full opacity-[0.7] bg-gray-100 z-[100]">
          <Spinner className="!m-auto !block" />
        </div>
      ) : (
        <div className="w-full space-y-4 mt-4 flex flex-col">
          <span className="flex justify-between items-center">
            <p className="text-slate-500 ">Amount :</p>
            <p className="leading-tight font-semibold">
              {data?.data[0]?.type === "buy" ? "+" : "-"}
              &#8358;{Number(data?.data[0]?.amount || 0).toLocaleString()}
            </p>
          </span>
          <span className="flex justify-between items-center">
            <p className="text-slate-500">Date:</p>
            <p className="leading-tight font-semibold">
              {new Date(data?.data[0]?.timestamp).toDateString()}
            </p>{" "}
          </span>
          <span className="flex justify-between items-center">
            <p className="text-slate-500">Category:</p>
            <p className="leading-tight font-semibold">
              {data?.data[0]?.categoryName}{" "}
            </p>{" "}
          </span>
          <span className="flex justify-between items-center">
            <p className="text-slate-500">Product:</p>
            <p className="leading-tight font-semibold">
              {data?.data[0]?.productName}
            </p>
          </span>
          <span className="flex justify-between items-center">
            <p className="text-slate-500">RRR:</p>
            <p className="leading-tight font-semibold">
              {data?.data[0]?.rrr || ""}
            </p>
          </span>
          {/* <span className="flex justify-between items-center">
            <p className="text-slate-500">Transaction Type:</p>
            <p className="leading-tight font-semibold capitalize">
              {data?.data[0]?.model?.paymentMethod}
            </p>
          </span> */}
          <span className="flex justify-between items-center">
            <p className="text-slate-500">Status:</p>
            <p className="leading-tight font-semibold">
              {data?.data[0]?.status}
            </p>
          </span>
          <div className="border border-gray-200"></div>
          {/* <Button
            onClick={() => {
              window.open(`/receipt?bill=${id}`, "_blank");
            }}
            className="!h-[3rem] !bg-black w-full !text-white hover:!text-white"
          >
            Download Reciept
          </Button> */}
          {/* <Button className="!h-[3rem] !bg-transparent w-full">
            Report Transaction
          </Button> */}
        </div>
      )}
    </Modal>
  );
};

export default TransactionModal;
