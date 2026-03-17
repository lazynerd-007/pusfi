import { Modal } from "antd";
import React from "react";

import {
  CustomInput as Input,
  CustomButton as Button,
  CustomSelect as Select,
} from "@/lib/AntdComponents";
const SubAccount = ({
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
          Create Sub Account
        </h2>
        <p className="text-sm text-gray-500 text-center">
          This will create a new account using your own account number{" "}
        </p>
        <form className="w-full space-y-4 mt-4">
          <div>
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="account"
            >
              Account allas{" "}
            </label>
            <Input
              name="account"
              required
              id="text"
              type="text"
              placeholder="Account details"
            />
            <p className="text-xs text-gray-400">this is a helper text</p>
          </div>
          <div className="mb-4">
            <label className="block text-black text-sm font-semibold mb-2">
              Manager{" "}
            </label>
            <Select
              className="!w-full"
              placeholder="Manager"
              options={[
                { value: "individual", label: "Individual" },
                { value: "business", label: "Business" },
                { value: "enterprise", label: "Enterprise" },
                { value: "limited liability", label: "Limited Liability" },
              ]}
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="buject"
            >
              Monthly budject{" "}
            </label>
            <Input
              name="budject"
              required
              id="text"
              type="text"
              placeholder="Budject"
            />
          </div>
          <div className="mb-4">
            <label className="block text-black text-sm font-semibold mb-2">
              Hold off Time{" "}
            </label>
            <Select
              className="!w-full"
              placeholder="Time"
              options={[
                { value: "individual", label: "Individual" },
                { value: "business", label: "Business" },
                { value: "enterprise", label: "Enterprise" },
                { value: "limited liability", label: "Limited Liability" },
              ]}
            />
            <p className="text-xs text-gray-400">
              If a Payment is not Approval after 1 hour it will automatic
              cancelt
            </p>
          </div>
          <div className="space-y-2">
            <h2 className="font-bold text-lg">
              Note the following information
            </h2>
            <div className="flex space-x-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="13"
                viewBox="0 0 13 13"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.5 0C2.9159 0 0 2.9159 0 6.5C0 10.0841 2.9159 13 6.5 13C10.0841 13 13 10.0841 13 6.5C13 2.9159 10.0841 0 6.5 0ZM5.20065 9.36845L2.7872 6.9602L3.705 6.0398L5.19935 7.53155L8.64045 4.09045L9.55955 5.00955L5.20065 9.36845Z"
                  fill="#2EB57E"
                />
              </svg>{" "}
              <p className="text-xs">
                Account Manager can only make payment from the account assign to
                them
              </p>
            </div>
            <div className="flex space-x-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="13"
                viewBox="0 0 13 13"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.5 0C2.9159 0 0 2.9159 0 6.5C0 10.0841 2.9159 13 6.5 13C10.0841 13 13 10.0841 13 6.5C13 2.9159 10.0841 0 6.5 0ZM5.20065 9.36845L2.7872 6.9602L3.705 6.0398L5.19935 7.53155L8.64045 4.09045L9.55955 5.00955L5.20065 9.36845Z"
                  fill="#2EB57E"
                />
              </svg>{" "}
              <p className="text-xs">
                {" "}
                Account Manager can only make payment from the account assign to
                them
              </p>
            </div>
          </div>
          <Button className="!h-[3rem] !bg-Primary w-full text-white hover:!text-white">
            Submit
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

export default SubAccount;
