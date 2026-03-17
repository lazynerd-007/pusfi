import React, { useState } from "react";
import {
  CustomRadioGroup as RadioGroup,
  CustomSelect as Select,
  CustomButton as Button,
} from "@/lib/AntdComponents";

const RadioOptions = [
  { label: "Automatically run Payroll on selected date", value: true },
  { label: "Manually run Payroll on selected date", value: false },
];

const PayrollDate = () => {
  return (
    <section className="space-y-6">
      <span>
        <p className="font-semibold text-base">Set up payroll date</p>
        <p className="font-normal text-base">
          This is Company information that you can update anytime.
        </p>
      </span>
      <form className="bg-white p-4 space-y-4">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <div className="space-y-2 w-full md:max-w-sm">
            <p className="font-semibold text-base">Select your payroll date</p>
            <p className="font-normal text-base text-[#515B6F]">
              You can decide when to pay your employees. For example, if you
              choose January 31, your employees will be paid on January 31st. If
              you choose option 1, your employees will be paid for January on
              February 1st.
            </p>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="date" className="font-semibold text-base">
              Payroll date
            </label>
            <Select
              id="date"
              defaultValue="1"
              className="w-full"
              options={[
                { value: "1", label: "1" },
                { value: "2", label: "2" },
                { value: "3", label: "3" },
              ]}
            />
          </div>
        </div>
        <hr />
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <div className="space-y-2 w-full md:max-w-sm">
            <p className="font-semibold text-base">Select your Option </p>
            <p className="font-normal text-base text-[#515B6F]">
              You can either manually request execution each month before the
              paycheck is executed, or Pursbusiness can execute your payroll
              automatically on the date you choose.
            </p>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <RadioGroup
              className="!flex !flex-col !gap-[1rem] !text-[16px]"
              options={RadioOptions}
              // value={}
            />
          </div>
        </div>
        <hr />
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <div className="space-y-2 w-full md:max-w-sm" />
          <div>
            <Button
              htmlType="submit"
              className="bg-black text-white hover:!text-white !h-[45px] font-semibold w-full text-base"
            >
              Save and Continue
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default PayrollDate;
