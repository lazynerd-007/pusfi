import CheckIcon from "@/assets/icon/CheckIcon";
import {
  CustomButton as Button,
  CustomCheckBox as Checkbox,
} from "@/lib/AntdComponents";

const PayrollNotification = () => {
  return (
    <div className="px-[2%] flex flex-col space-y-4 bg-white">
      <span>
        <p className="text-[#181336] text-[16px] font-[700]">
          personal information{" "}
        </p>{" "}
        <p className="text-sm text-[#84818A]">
          This is Company information that you can update anytime.
        </p>
      </span>
      <form className=" flex flex-col gap-[2rem] max-w-4xl mx-auto mt-3">
        <span className="w-full grid grid-cols-[40%_55%] items-center justify-between gap-[5%]">
          <span>
            <h6 className="text-[#181336] text-[16px] font-[700] mb-2">
              First Notification{" "}
            </h6>
            <p className="text-[16px] font-[400] text-[#515B6F]">
              How would you like to inform your employees before their payroll
              executes?{" "}
            </p>
          </span>
          <span className="flex flex-col gap-[0.5rem]">
            <Checkbox checked>
              Send email if employees have missing information
            </Checkbox>
          </span>
        </span>
        <hr />
        <span className="w-full grid grid-cols-[40%_55%] items-start justify-between gap-[5%]">
          <span>
            <h6 className="text-[#181336] text-[16px] font-[700] mb-2">
              Second Notification{" "}
            </h6>
            <p className="text-[16px] font-[400] text-[#515B6F]">
              How would you like to inform your employees after their payroll
              has been executed?
            </p>
          </span>
          <span className="flex flex-col gap-[0.5rem]">
            <Checkbox checked>
              Send SMS informing them of payroll execution
            </Checkbox>
            <Checkbox>Email (will include their payslip)</Checkbox>
          </span>
        </span>
        <Button
          htmlType="submit"
          type="primary"
          className="!bg-black !ml-auto !w-[55%] !h-[3rem] self-end"
        >
          save
        </Button>
      </form>
    </div>
  );
};

export default PayrollNotification;
