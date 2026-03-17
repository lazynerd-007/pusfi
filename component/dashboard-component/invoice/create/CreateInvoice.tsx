"use client";
import { DatePicker, message } from "antd";
import {
  CustomText as Text,
  CustomButton as Button,
  CustomInputNumber as InputNumber,
  CustomInput as Input,
} from "@/lib/AntdComponents";
import Image from "next/image";
import logo from "@/assets/logo.svg";
import { useAppSelector } from "@/store/hooks";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import ItemsTable from "./ItemsTable";
import CreateInvoiceModal from "./CreateInvoiceModal";
import dayjs from "dayjs";
interface DataType {
  key: React.Key;
  itemName: string;
  itemQty: number;
  itemPrice: number;
}
const date: any = "";
const shipping: any = 0;
const taxPercent: any = 0;
const discountPercent: any = 0;
const tax: any = 0;
export const initialState = {
  title: "",
  amount: 0,
  narration: "",
  discount: 0,
  dueDate: date,
  tax,
  SenderMail: "",
  clientMail: "",
  clientName: "",
  message: "",
  subject: "",
  taxPercent,
  discountPercent,
  info: [
    {
      itemName: "",
      itemQty: "",
      itemPrice: "",
      itemAmount: "",
    },
  ],
  businessId: "",
  shipping,
  Currency: "NGN",
  ClientPhone: "",
};
export type dataType = typeof initialState;
const CreateInvoice = () => {
  const business = useAppSelector((store) => store?.user?.business);
  const profile = useAppSelector((store) => store?.user?.user);
  const wallet = useAppSelector((store) => store?.user?.wallet);
  const [formData, setFormData] = useState({
    ...initialState,
    SenderMail: profile?.email,
    businessId: profile?.businessId,
  });
  const [dataSource, setDataSource] = useState<DataType[]>([
    {
      key: 0,
      itemName: "enter item name...",
      itemPrice: 0,
      itemQty: 0,
    },
  ]);
  const [open, setOpen] = useState(false);
  const onInputChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const onFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (
      formData?.amount > 0 &&
      !dataSource.find(
        (e) =>
          e?.itemName === "enter item name..." ||
          e?.itemQty === 0 ||
          e?.itemPrice === 0
      )
    ) {
      const info = dataSource.map((e) => ({
        itemName: e.itemName,
        itemQty: e.itemQty.toString(),
        itemPrice: e.itemPrice.toString(),
        itemAmount: (e.itemQty * e.itemPrice).toString(),
      }));
      setFormData((prev) => ({ ...prev, info }));
      setOpen(true);
    } else if (!formData?.dueDate) {
      message.error("Please provide due date");
    } else {
      message.error("Please provide invoice items details");
    }
  };

  return (
    <>
      <form
        onSubmit={onFormSubmit}
        className="grid grid-cols-1 w-[85%] gap-[1rem] px-[3%]"
      >
        <div className="flex items-center justify-between">
          <span>
            <h2 className="font-semibold text-[18px] mb-3">
              {business?.businessName}
            </h2>
            <p className="text-gray-500">{business?.businessAddress}</p>
            <p className="text-gray-500">Nigeria</p>
            <p className="text-gray-500">{profile?.phoneNumber}</p>
            {/* <p className="font-semibold  mt-4">Click here to edit address</p> */}
          </span>
          <Image src={business?.logo || logo} alt="logo" className="" />
        </div>
        <hr />{" "}
        <div className="flex items-center justify-between">
          <div className="flex flex-col space-y-3 self-start">
            {/* <div className="flex flex-col space-y-1">
            <label htmlFor="email" className="font-medium text-sm">
              Invoice Code
            </label>
            <input
              type="email"
              id="email"
              placeholder="code"
              className=" w-full px-3 py-2 border border-gray-300 text-gray-800 placeholder-text-gray-900 text-sm rounded-md focus:outline-none"
            />
          </div> */}
            <div className="flex flex-col space-y-1">
              <label htmlFor="title" className="font-medium text-sm">
                Invoice Title
              </label>
              <Input
                id="title"
                placeholder="title"
                className="w-full px-3 py-2 border border-gray-300 text-gray-800 placeholder-text-gray-900 text-sm rounded-md focus:outline-none"
                value={formData.title}
                name="title"
                onChange={onInputChange}
                required
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="name" className="font-medium text-sm">
                Client Name
              </label>
              <div className="flex items-center space-x-3">
                <Input
                  id="clientName"
                  placeholder="client name"
                  className=" w-full px-3 py-2 border border-gray-300 text-gray-800 placeholder-text-gray-900 text-sm rounded-md focus:outline-none"
                  value={formData.clientName}
                  name="clientName"
                  required
                  onChange={onInputChange}
                />
                {/* <span className="border px-4 font-semibold text-lg">+ </span> */}
              </div>
            </div>{" "}
          </div>
          <div className="flex flex-col space-y-3 self-start">
            <div className="flex flex-col space-y-1">
              <label htmlFor="desc" className="font-medium text-sm">
                Invoice Description
              </label>
              <Input
                id="desc"
                placeholder="description"
                className=" w-full px-3 py-2 border border-gray-300 text-gray-800 placeholder-text-gray-900 text-sm rounded-md focus:outline-none"
                value={formData.narration}
                name="narration"
                onChange={onInputChange}
                required
              />
            </div>
          </div>
        </div>
        <hr />
        <ItemsTable
          dataSource={dataSource}
          setDataSource={setDataSource}
          setFormData={setFormData}
        />
        <hr />
        <div className="grid grid-cols-2 gap-[3rem] items-start justify-between">
          <div className="flex flex-col space-y-3">
            <div className="flex flex-col space-y-1 w-full">
              <label htmlFor="account" className="font-medium text-sm">
                PursFi Account
              </label>
              <input
                value={wallet?.accountDetails?.accountName}
                disabled
                className=" w-full px-3 py-2 border border-gray-300 text-gray-800 placeholder-text-gray-900 text-sm rounded-md focus:outline-none"
              />
            </div>
            <div className="flex items-center justify-start w-full gap-[1rem]">
              <div className="flex flex-col space-y-1 w-full">
                <label htmlFor="email" className="font-medium text-sm">
                  Start Date
                </label>
                <DatePicker
                  name=""
                  value={dayjs(new Date())}
                  disabled
                  className="h-fit w-fit"
                  placeholder="Start Date"
                />
              </div>
              <div className="flex flex-col space-y-1 w-full">
                <label htmlFor="email" className="font-medium text-sm">
                  End Date
                </label>
                <DatePicker
                  name="dueDate"
                  value={
                    formData?.dueDate ? dayjs(formData?.dueDate) : undefined
                  }
                  onChange={(value, day) => {
                    setFormData((prev) => ({ ...prev, dueDate: day }));
                  }}
                  className="h-fit w-fit"
                  placeholder="Due Date"
                />
              </div>
            </div>
            <span className="flex flex-col">
              <label htmlFor="info">Note/term</label>
              <Text
                value={formData?.message}
                name="message"
                onChange={onInputChange}
                id="info"
                required
              />
              <span className="flex justify-between">
                <p>Maximum 500 characters</p>
                <p>{formData?.message?.length} / 500</p>
              </span>
            </span>
          </div>
          <div className="space-y-4">
            <div className="flex space-x-6 items-center justify-between">
              <span>
                <p className="text-sm normal-case">Discount (%)</p>
                <InputNumber
                  controls={false}
                  name="discount"
                  onChange={(value) => {
                    setFormData((prev) => {
                      const newValue = value ? value : 0;
                      const currentAmount = prev.amount + Number(prev.discount);
                      const amount = currentAmount * (Number(newValue) / 100);
                      return {
                        ...prev,
                        discountPercent: value,
                        amount: currentAmount - amount,
                        discount: amount,
                      };
                    });
                  }}
                  value={formData?.discountPercent}
                  placeholder="discount"
                  className="!w-full"
                />
              </span>
              <span>
                <p className="text-sm normal-case">Tax (%)</p>
                <InputNumber
                  controls={false}
                  name="taxPercent"
                  onChange={(value) => {
                    setFormData((prev) => {
                      const newValue = value ? value : 0;
                      const currentAmount = prev.amount - Number(prev.tax);
                      const amount = currentAmount * (Number(newValue) / 100);
                      return {
                        ...prev,
                        taxPercent: value,
                        amount: currentAmount + amount,
                        tax: amount.toString(),
                      };
                    });
                  }}
                  value={formData?.taxPercent}
                  placeholder="Tax"
                  className="!w-full"
                />
              </span>
              <span>
                <p className="text-sm normal-case">Shipping (NGN)</p>
                <InputNumber
                  name="shipping"
                  onChange={(value) => {
                    setFormData((prev) => {
                      const currentAmount = prev.amount - Number(prev.shipping);
                      return {
                        ...prev,
                        shipping: value,
                        amount: currentAmount + Number(value),
                      };
                    });
                  }}
                  controls={false}
                  value={formData?.shipping}
                  placeholder="Shipping"
                  className="!w-full"
                />
              </span>
            </div>
            <div className="flex items-center justify-between px-2 py-4 bg-black rounded-md text-white">
              <p>Subtotal:</p>
              <p>{formData?.amount}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-3 justify-end ">
          {/* <Button className="!h-[3rem] !bg-transparent ">Preview</Button> */}
          <Button
            type="primary"
            htmlType="submit"
            className="!h-[3rem] !bg-black  text-white hover:!text-white"
          >
            Continue
          </Button>
        </div>
      </form>
      <CreateInvoiceModal
        formData={formData}
        setFormData={setFormData}
        open={open}
        setOpen={setOpen}
        setDataSource={setDataSource}
      />
    </>
  );
};

export default CreateInvoice;
