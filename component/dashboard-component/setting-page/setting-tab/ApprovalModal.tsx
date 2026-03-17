import { Avatar, Modal } from "antd";
import React from "react";

import {
  CustomInput as Input,
  CustomButton as Button,
  CustomSelect as Select,
} from "@/lib/AntdComponents";
const ApprovalModal = ({
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
          Create Approval Rule
        </h2>
        <p className="text-sm text-gray-500 text-center">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro
          accusamus ex natus dicta laborum nobis impedit expedita officia sequi
          voluptates.{" "}
        </p>
        <form className="w-full space-y-4 mt-4">
          <div className="space-y-2">
            <label
              className="block text-gray-700 text-sm font-medium mb-2"
              htmlFor="account"
            >
              When
            </label>
            <div className="flex justify-between items-center space-x-3">
              <Select
                className=""
                placeholder="Select Resource"
                options={[
                  { value: "individual", label: "Individual" },
                  { value: "business", label: "Business" },
                  { value: "enterprise", label: "Enterprise" },
                  { value: "limited liability", label: "Limited Liability" },
                ]}
              />
              <Select
                className=""
                placeholder="Select conditions"
                options={[
                  { value: "individual", label: "Individual" },
                  { value: "business", label: "Business" },
                  { value: "enterprise", label: "Enterprise" },
                  { value: "limited liability", label: "Limited Liability" },
                ]}
              />
              <Input
                name="account"
                required
                id="text"
                type="text"
                placeholder="placeholder"
              />
            </div>
            <button
              onClick={() => setOpen(true)}
              className="btn btn-sm text-black text-xs normal-case bg-transparent"
            >
              + Add
            </button>
          </div>
          <p className="font-semibold">What happen next?</p>
          <div className="mb-4">
            <label className="block text-black text-sm font-medium mb-2">
              Who can approve
            </label>
            <Select
              className="!w-full"
              placeholder="Ayotope"
              options={[
                { value: "individual", label: "Individual" },
                { value: "business", label: "Business" },
                { value: "enterprise", label: "Enterprise" },
                { value: "limited liability", label: "Limited Liability" },
              ]}
            />
          </div>
          <div className="flex items-center space-x-4">
            <Avatar
              style={{ backgroundColor: "#CDA4FF" }}
              size={40}
              className="!text-sm text-black"
            >
              JD
            </Avatar>
            <p className="text-sm font-light">John Smith</p>
          </div>
          <div className="flex items-center space-x-4">
            <div>
              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="account"
              >
                Process Payment after{" "}
              </label>
              <Select
                className="!w-full"
                placeholder="Select Resource"
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
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="account"
              >
                No(Approvals){" "}
              </label>
              <Input
                name="account"
                required
                id="text"
                type="text"
                placeholder="placeholder"
                className="!w-full"
              />
            </div>
          </div>
          <Button className="!h-[2.5rem] !bg-Primary w-full text-white hover:!text-white">
            Create Rule
          </Button>
        </form>{" "}
      </div>{" "}
    </Modal>
  );
};

export default ApprovalModal;
