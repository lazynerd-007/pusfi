import {
  CustomRadioGroup as RadioGroup,
  CustomDatePicker as DatePicker,
  CustomButton as Button,
  CustomInput as Input,
} from "@/lib/AntdComponents";
import { dataType } from "./SettingsTabs";
import { FormEventHandler } from "react";
import dayjs from "dayjs";

const payrollOptions = [
  { label: "Automatically run Payroll on selected date", value: true },
  { label: "Manually run Payroll on selected date", value: false },
];
const PayrollSetup = ({
  formData,
  setFormData,
  setActiveKey,
}: {
  setFormData: React.Dispatch<React.SetStateAction<dataType>>;
  setActiveKey: React.Dispatch<React.SetStateAction<number>>;
  formData: Record<string, any>;
}) => {
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    if (formData.day) {
      setActiveKey(2);
    }
  };
  return (
    <div className="px-[2%] flex flex-col space-y-4 bg-white">
      <span>
        <p className="text-[#181336] text-[16px] font-[700]">
          Payroll Setup{" "}
        </p>{" "}
        <p className="text-sm text-[#84818A]">
          This is Company information that you can update anytime.
        </p>
      </span>
      <form
        onSubmit={handleSubmit}
        className=" flex flex-col gap-[2rem] max-w-4xl mx-auto  mt-3"
      >
        <span className="w-full grid grid-cols-[45%_45%] gap-[10%] items-start justify-between">
          <label>
            <h6 className="text-[#181336] text-[16px] font-[700] mb-2">
              Select your payroll date{" "}
            </h6>
            <p className="text-[16px] font-[400] text-[#515B6F]">
              You can decide when to pay your employees.for example, if you
              choose January 31, your employees will be paid on January 31st. If
              you choose option 1, your employees will be paid for January on
              February 1st.
            </p>
          </label>
          <DatePicker
            value={formData?.day ? dayjs(formData?.day) : undefined}
            onChange={(value, date) => {
              setFormData((prev) => ({ ...prev, day: date }));
            }}
            className="w-full"
            picker="date"
          />
        </span>
        <span className="w-full grid grid-cols-[45%_45%] gap-[10%] items-start justify-between">
          <label>
            <h6 className="text-[#181336] text-[16px] font-[700] mb-2">
              Select your Option
            </h6>
            <p className="text-[16px] font-[400] text-[#515B6F]">
              You can either manually request execution each month before the
              paycheck is executed, or Pursbusiness can execute your payroll
              automatically on the date you choose.
            </p>
          </label>
          <RadioGroup
            className="!flex !flex-col !gap-[1rem]"
            options={payrollOptions}
            value={formData.automatic}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, automatic: e.target.value }));
            }}
          />
        </span>
        <Button
          htmlType="submit"
          type="primary"
          className="!bg-black !ml-auto !w-[55%] self-end h-[3rem]"
        >
          Save
        </Button>
      </form>
    </div>
  );
};

export default PayrollSetup;
