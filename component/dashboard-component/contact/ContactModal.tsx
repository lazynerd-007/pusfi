import { Modal } from "antd";
import React from "react";

import {
  CustomInput as Input,
  CustomButton as Button,
  CustomSelect as Select,
} from "@/lib/AntdComponents";
const ContactModal = ({
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
          Send Contact Request{" "}
        </h2>
        <p className="text-sm text-gray-500 text-center">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates
          quidem voluptatem!{" "}
        </p>
        <form className="w-full space-y-4 mt-4">
          <div>
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="email"
            >
              Email Adress{" "}
            </label>
            <Input
              name="time"
              required
              id="text"
              type="text"
              placeholder="placeholder"
            />
          </div>
          <div className="mb-4">
            <label className="block text-black text-sm font-semibold mb-2">
              Contact Tag{" "}
            </label>
            <Select
              className="!w-full"
              placeholder="This is a placeholder"
              options={[
                { value: "individual", label: "Individual" },
                { value: "business", label: "Business" },
                { value: "enterprise", label: "Enterprise" },
                { value: "limited liability", label: "Limited Liability" },
              ]}
            />
          </div>
          <div className="flex items-center space-x-3">
            <div className=" w-2/4">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="text"
              >
                Bank Name{" "}
              </label>
              <Input
                name="time"
                required
                id="text"
                type="text"
                placeholder="placeholder"
              />{" "}
            </div>
            <div className=" w-2/4">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="text"
              >
                Account Number{" "}
              </label>
              <Input
                name="time"
                required
                id="text"
                type="text"
                placeholder="placeholder"
              />{" "}
            </div>
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="email"
            >
              Email Address{" "}
            </label>
            <Input
              name="email"
              required
              id="text"
              type="text"
              placeholder="placeholder"
            />
          </div>{" "}
          <Button className="!h-[3rem] !bg-Primary w-full text-white hover:!text-white">
            Send request
          </Button>
        </form>{" "}
      </div>{" "}
    </Modal>
  );
};

export default ContactModal;
