"use client";
import CheckIcon from "@/assets/icon/CheckIcon";
import {
  CustomRadioGroup as RadioGroup,
  CustomButton as Button,
} from "@/lib/AntdComponents";
import { FormEventHandler, useState } from "react";
import StructureTable from "./StructureTable";
import { dataType } from "./SettingsTabs";
import {
  useCreatePayrollMutation,
  useUpdatePayrollMutation,
} from "@/services/payrollService";
import { useAppSelector } from "@/store/hooks";
import { message } from "antd";
import { useRouter } from "next/navigation";
import SpecialStructureTable from "./SpecialComponentStructure";
interface DataType {
  key: React.Key;
  title: string;
  percentage: number;
  taxable: string;
  name: string;
}
interface SpeicalDataType {
  key: React.Key;
  title: string;
  amount: number;
  type: string;
  name: string;
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
  const [updatePayroll, { isLoading: isUpdating }] = useUpdatePayrollMutation();
  const { push } = useRouter();
  const businessId = useAppSelector((store) => store?.user?.user?.businessId);
  const [dataSource, setDataSource] = useState<DataType[]>(
    formData?.salaryStructures?.structure?.length > 0
      ? formData?.salaryStructures?.structure?.map((e: any, i: any) => ({
          key: i,
          ...e,
        }))
      : [
          {
            key: 0,
            name: "Base Salary",
            percentage: 50,
            taxable: "yes",
            title: "Salary Component",
          },
        ]
  );
  const [specialDataSource, setSpecialDataSource] = useState<SpeicalDataType[]>(
    formData?.salaryStructures?.structure?.length > 0
      ? formData?.salaryStructures?.structure?.map((e: any, i: any) => ({
          key: i,
          ...e,
        }))
      : []
  );
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    if (dataSource.length > 0) {
      const structure = dataSource.map((e) => ({
        title: e.title,
        name: e?.name,
        percentage: e?.percentage,
        taxable: e?.taxable,
      }));
      const specialStructure = specialDataSource.map((e) => ({
        title: e.title,
        name: e?.name,
        amount: e?.amount,
        type: e?.type,
      }));
      if (formData?.payrollId) {
        updatePayroll({
          ...formData,
          salaryStructure: [...structure, ...specialStructure],
          businessId,
        })
          .unwrap()
          .then((res) => {
            push(`/payroll/preview?id=${res?.data?.id}`);
            message.success("Payroll updated successfully");
          })
          .catch((err) => {
            console.log(err);
            message.error(err?.data?.responseDescription || "an error occured");
          });
      } else
        createPayroll({
          ...formData,
          salaryStructure: [...structure, ...specialStructure],
          businessId,
        })
          .unwrap()
          .then((res) => {
            push(`/payroll-preview?id=${res?.data?.id}`);
            message.success("Payroll created successfully");
            setFormData(initialState);
          })
          .catch((err) => {
            message.error(err?.data?.responseDescription || "an error occured");
          });
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="p-[2%] bg-white flex flex-col gap-[1rem]"
    >
      <span className="w-full grid grid-cols-[40%_55%] items-center justify-between gap-[5%]">
        <span>
          <h6 className="text-[#181336] text-[16px] font-[700] mb-2">
            Default Salary Structure
          </h6>
          <p className="text-[16px] font-[400] text-[#515B6F]">
            You can decide when to pay your employees.for example, if you choose
            January 31, your employees will be paid on January 31st. If you
            choose option 1, your employees will be paid for January on February
            1st.
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
          {/* <RadioGroup className="!flex !flex-col" options={payrollOptions} /> */}
          <StructureTable
            dataSource={dataSource}
            setDataSource={setDataSource}
          />
          <SpecialStructureTable
            dataSource={specialDataSource}
            setDataSource={setSpecialDataSource}
          />
        </span>
      </span>
      <Button
        htmlType="submit"
        type="primary"
        loading={isLoading || isUpdating}
        className="!bg-black !ml-auto !w-[55%] self-end"
      >
        save
      </Button>
    </form>
  );
};

export default PayrollStructure;
