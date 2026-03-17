import {
  CustomSelect as Select,
  CustomInputNumber as InputNumber,
  CustomRadioGroup as RadioGroup,
  CustomInput as Input,
  CustomButton as Button,
  CustomTimePicker as TimePicker,
  CustomDatePicker as DatePicker,
} from "@/lib/AntdComponents";
import { RadioChangeEvent } from "antd";
import { useState } from "react";
const QuickBuy = () => {
  const options = [
    { label: "instant payment", value: "instant_payment" },
    { label: "Schedule Payment", value: "schedule_payment" },
    { label: "Recurring payment", value: "recurring_payment" },
  ];
  const [selectedOption, setSelectedOption] = useState("");

  const handleRadioChange = (e: RadioChangeEvent) => {
    setSelectedOption(e.target.value);
  };
  return (
    <>
      <form className="grid grid-cols-1 gap-[1.5rem] px-[3%] mt-12 ">
        <span className="flex flex-col w-full">
          <label htmlFor="service">Select Service</label>
          <Select
            showSearch
            placeholder="select service"
            optionFilterProp="label"
          />
        </span>

        <span className="flex items-center justify-between gap-[2rem]">
          <span className="flex flex-col w-full">
            <label htmlFor="product">Select product</label>
            <Select id="product" placeholder="select product" />
          </span>
          <span className="flex flex-col w-full">
            <label htmlFor="bank">Amount</label>
            <InputNumber
              name="amount"
              className="!w-full"
              prefix="&#8358;"
              placeholder=""
              required
            />
          </span>
        </span>
        <span className="flex flex-col">
          <label htmlFor="tag">Payment Tag</label>
          <RadioGroup
            id="tag"
            name="transactionCategory"
            options={options}
            className="!flex !justify-start !gap-[2rem]"
            onChange={handleRadioChange}
          />
        </span>
        <span className="flex flex-col w-full">
          <label htmlFor="bank">Hold off time</label>
          <Input
            name="time"
            className="!w-full"
            placeholder="1 hour"
            required
          />

          <small>
            If a Payment is not Approval after 1 hour it will automatic cancel
          </small>
        </span>
        {(selectedOption === options[1].value ||
          selectedOption === options[2].value) && (
          <span className="flex flex-col gap-1">
            <label>Select Day</label>
            <span className="flex items-center justify-between gap-[2rem]">
              <DatePicker picker="date" className="!w-full" />
              <TimePicker format={"HH:mm"} className="!w-full " />
            </span>
          </span>
        )}
        <Button
          htmlType="submit"
          className="!bg-gray-300 !text-white !h-[45px] !border-none"
        >
          Make Payment
        </Button>
        <Button htmlType="submit" className="!bg-transparent !h-[45px]">
          Cancel
        </Button>
      </form>
    </>
  );
};

export default QuickBuy;
