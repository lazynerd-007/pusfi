import { Modal } from "antd";
import React from "react";
import { CustomButton as Button } from "@/lib/AntdComponents";
import { CustomInput as Input } from "@/lib/AntdComponents";
import { FaRegCopy } from "react-icons/fa";
const InvoicePaymentModal = ({
  open,
  setOpen,
  data,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  data: Record<string, string>;
}) => {
  return (
    <Modal centered open={open} onCancel={() => setOpen(false)} footer={null}>
      <div className="w-full flex flex-col text-center">
        <h2 className="text-2xl font-bold mb-1">Pay Invoice</h2>
        <p className="text-sm text-gray-500">
          Pay invoice into business account
        </p>
        <div className="mt-5 space-y-4">
          <Button type="primary" className="!h-[3rem] !bg-black w-full">
            Bank Transfer
          </Button>
          <form className="w-full space-y-8 mt-4">
            <div className="mb-4">
              <label className="block text-black text-sm font-semibold mb-2 text-left">
                {data?.name} main Account
              </label>
              <Input
                required
                id="text"
                type="text"
                placeholder="pursfi main account"
                disabled
              />
            </div>

            <div className="flex justify-between items-end  border border-gray-300 p-2 rounded-md">
              <span className="space-y-3 flex flex-col items-start">
                <p className="font-medium ">Bank Transfer</p>
                <p>Bank Name - {data?.bankName}</p>{" "}
                <p>Account Number - {data?.accountNumber}</p>
                <p>Account Name - {data?.accountName}</p>
              </span>{" "}
              <Button
                onClick={() =>
                  navigator.clipboard.writeText(
                    `Bank Name:${data?.bankName} \n Account Name:${data?.accountName} \n Account Number:${data?.accountNumber}`
                  )
                }
                className="border !items-center  !flex space-x-3 p-2 rounded-md"
                icon={<FaRegCopy className="text-blue-400" />}
              >
                copy
              </Button>{" "}
            </div>
          </form>{" "}
        </div>{" "}
      </div>
    </Modal>
  );
};

export default InvoicePaymentModal;
