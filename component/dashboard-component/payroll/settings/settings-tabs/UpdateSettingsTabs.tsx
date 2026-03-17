"use client";
import { CustomTabs as Tabs } from "@/lib/AntdComponents";
import { TabsProps } from "antd";
import { useEffect, useState } from "react";
import PayrollSetup from "./PayrollSetup";
import PayrollStructure from "./PayrollStructure";
import { useLazyGetSinglePayrollQuery } from "@/services/payrollService";
const payoutDate: any = "";
const payoutTime: any = "";
// const initialState = {
//   automatic: true,
//   day: day,
//   title: "",
//   single: true,
//   businessId: "",
//   structure: [],
//   currency: "NGN",
//   hour: "06",
// };
const initialState = {
  name: "",
  isBusiness: true,
  automatic: true,
  payoutDate,
  payoutTime,
  salaryStructure: [],
  businessId: "",
};
export type dataType = typeof initialState;
const UpdateSettingsTabs = ({ id }: { id: string }) => {
  const [activeKey, setActiveKey] = useState(1);
  const [formData, setFormData] = useState(initialState);
  const [getPayroll, { isLoading }] = useLazyGetSinglePayrollQuery();
  useEffect(() => {
    getPayroll(id)
      .unwrap()
      .then((res) => {
        setFormData({ ...initialState, ...res?.data, payrollId: id });
      });
  }, []);
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Payroll Setup",
      children: (
        <PayrollSetup
          formData={formData}
          setFormData={setFormData}
          setActiveKey={setActiveKey}
        />
      ),
    },
    {
      key: "2",
      label: "Salary Structure",
      children: (
        <PayrollStructure
          formData={formData}
          setFormData={setFormData}
          setActiveKey={setActiveKey}
          initialState={initialState}
        />
      ),
    },
  ];
  return <Tabs activeKey={activeKey.toString()} items={items} />;
};

export default UpdateSettingsTabs;
