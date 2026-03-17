import { Modal } from "antd";
import React from "react";
import {
  CustomInput as Input,
  CustomButton as Button,
} from "@/lib/AntdComponents";
const MoveFundModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
}) => {
  return (
    <Modal open={open} onCancel={() => setOpen(false)} footer={null} centered={true}>
      <div className=" flex flex-col">
        <h2 className="text-2xl font-bold mb-1 text-center">Move Fund to Account</h2>
        <p className="text-sm text-gray-500 text-center">
          move fund from this account to another company account
        </p>
        <form className="w-full space-y-4 mt-4">
          <div>
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="amount"
            >
              Amount{" "}
            </label>
            <Input
              name="amount"
              required
              id="text"
              type="text"
              placeholder="Enter Amount"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="memo"
            >
              Payment Memo{" "}
            </label>
            <Input
              name="memo"
              required
              id="text"
              type="text"
              placeholder="Payment"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="account"
            >
              Destintion Account{" "}
            </label>
            <Input
              name="account"
              required
              id="text"
              type="text"
              placeholder="Destintion Account"
            />
              <p className="text-xs text-gray-500">
            Does not require Approval. instant payment{" "}
          </p>
          </div>
        
          <Button className="!h-[3rem] !bg-Primary w-full text-white hover:!text-white">
            Move Fund
          </Button>
          <Button
            onClick={() => setOpen(false)}
            className="!h-[3rem] !bg-transparent w-full"
          >
            Cancel
          </Button>
        </form>{" "}
      </div>{" "}
    </Modal>
  );
};

export default MoveFundModal;
