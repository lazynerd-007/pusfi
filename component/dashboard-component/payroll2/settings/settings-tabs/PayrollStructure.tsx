import CheckIcon from "@/assets/icon/CheckIcon";
import {
  CustomRadioGroup as RadioGroup,
  CustomButton as Button,
} from "@/lib/AntdComponents";
import { FormEventHandler, useState } from "react";
import StructureTable from "./StructureTable";
import { dataType } from "./SettingsTabs";
import { useCreatePayrollMutation } from "@/services/payrollService";
import { useAppSelector } from "@/store/hooks";
import { message } from "antd";
interface DataType {
  key: React.Key;
  name: string;
  percentage: number;
  tax: string;
}
const PayrollStructure = ({
  formData,
  setFormData,
  setActiveKey,
  initialState,
}: {
  setFormData: React.Dispatch<React.SetStateAction<dataType>>;
  setActiveKey: React.Dispatch<React.SetStateAction<number>>;
  formData: Record<string, any>;
  initialState: dataType;
}) => {
  const [createPayroll, { isLoading }] = useCreatePayrollMutation();
  const businessId = useAppSelector((store) => store?.user?.user?.businessId);
  const [dataSource, setDataSource] = useState<DataType[]>([
    {
      key: 0,
      name: "Base Salary",
      percentage: 50,
      tax: "Yes",
    },
    {
      key: 1,
      name: "HRA",
      percentage: 25,
      tax: "Yes",
    },
    {
      key: 2,
      name: "LTA",
      percentage: 15,
      tax: "Yes",
    },
    {
      key: 3,
      name: "Special Allowance",
      percentage: 10,
      tax: "Yes",
    },
  ]);

  const payrollOptions = [
    { label: "Use the Pursbusiness salary structure by default", value: true },
    { label: "Customize tour salary structure", value: false },
  ];
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    if (dataSource.length > 0) {
      const structure = dataSource.map((e) => ({
        name: e.name,
        percentage: e.percentage.toString(),
        tax: e.tax === "Yes" ? true : false,
      }));
      setActiveKey(3);
      createPayroll({
        ...formData,
        day: formData?.day?.split("-")[2],
        structure,
        businessId,
      })
        .unwrap()
        .then((res) => {
          console.log(res);
          message.success("Payroll created successfully");
          setFormData(initialState);
          // setActiveKey(3);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className="px-[2%] flex flex-col space-y-4 bg-white">
      <span>
        <p className="text-[#181336] text-[16px] font-[700]">
          Salary Structure{" "}
        </p>{" "}
        <p className="text-sm text-[#84818A]">
          This is Company information that you can update anytime.
        </p>
      </span>
      <form
        onSubmit={handleSubmit}
        className=" flex flex-col gap-[2rem] max-w-4xl mx-auto  mt-3"
      >
        <span className="w-full grid grid-cols-[40%_55%] items-center justify-between gap-[5%]">
          <span>
            <h6 className="text-[#181336] text-[16px] font-[700] mb-2">
              Default Salary Structure
            </h6>
            <p className="text-[16px] font-[400] text-red-500">
              Note: take note of this following information
            </p>
          </span>
          <span className="flex flex-col gap-[0.5rem]">
            <span className="text-[#181336] text-[16px] font-[700] flex items-center justify-between gap-1">
              <CheckIcon className="w-[20px]" />
              <p>
                You can change the salary structure that Pursbusiness employs by
                default for your employees.
              </p>
            </span>
          </span>
        </span>
        <hr />
        <span className="w-full grid grid-cols-[40%_55%] items-start justify-between gap-[5%]">
          <span>
            <h6 className="text-[#181336] text-[16px] font-[700] mb-2">
              Select your Option
            </h6>
            <p className="text-[16px] font-[400] text-[#515B6F]">
              You can either manually request execution each month before the
              paycheck is executed, or Pursbusiness can execute your payroll
              automatically on the date you choose.
            </p>
          </span>
          <span className="flex flex-col gap-[0.5rem]">
            <RadioGroup
              className="!flex !flex-col !space-y-2"
              options={payrollOptions}
            />
            <StructureTable
              dataSource={dataSource}
              setDataSource={setDataSource}
            />
          </span>
        </span>
        <Button
          htmlType="submit"
          type="primary"
          loading={isLoading}
          className="!bg-black !ml-auto !w-[55%] !h-[3rem] self-end"
        >
          save
        </Button>
      </form>
    </div>
  );
};

export default PayrollStructure;
