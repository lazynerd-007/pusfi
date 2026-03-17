import { Modal } from "antd";
import React from "react";
import { CustomButton as Button } from "@/lib/AntdComponents";
import { CustomSelect as Select } from "@/lib/AntdComponents";
import { FaRegCopy } from "react-icons/fa";
const FundModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
}) => {
  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      centered={true}
    >
      <div className=" flex flex-col">
        <h2 className="text-2xl font-bold mb-1 text-center">
          Transfer money to your Account
        </h2>
        <p className="text-sm text-gray-500 text-center">
          move fund from this account to another company account
        </p>
        <div className="mt-5 space-y-4">
          <Button type="primary" className="!h-[3rem] !bg-Primary">
            Bank Transfer
          </Button>
          <form className="w-full space-y-8 mt-4">
            <div className="mb-4">
              <label className="block text-black text-sm font-semibold mb-2">
                PursFinance Main Account
              </label>
              <Select
                className="!w-full"
                placeholder="Account"
                options={[
                  { value: "individual", label: "Individual" },
                  { value: "business", label: "Business" },
                  { value: "enterprise", label: "Enterprise" },
                  { value: "limited liability", label: "Limited Liability" },
                ]}
              />
            </div>

            <div className="flex justify-between items-end  border border-gray-300 p-2 rounded-md">
              <span className="space-y-3">
                <p className="font-medium ">Bank Transfer</p>
                <p>Bank Transfer - firstBank</p>{" "}
                <p>Account Number - 045677880</p>
                <p>Account Name - Bruce Wayne</p>
              </span>{" "}
              <button className="border items-center  flex space-x-2 p-2 rounded-md">
                <FaRegCopy className="text-blue-400" />
                <p>copy</p>{" "}
              </button>{" "}
            </div>
          </form>{" "}
        </div>{" "}
      </div>
    </Modal>
  );
};

export default FundModal;
