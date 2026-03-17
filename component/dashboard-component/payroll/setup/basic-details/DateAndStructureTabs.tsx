import React from "react";
import { CustomTabs as Tabs } from "@/lib/AntdComponents";
import { TabsProps } from "antd";
import SalaryStructure from "./SalaryStructure";
import PayrollDate from "./PayrollDate";

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Payroll Date",
    children: <PayrollDate />,
  },
  {
    key: "2",
    label: "Salary Structure",
    children: <SalaryStructure />,
  },
];

const DateAndStructureTabs = () => {
  return (
    <section className="max-w-[1640px] flex flex-col p-4 space-y-6  h-screen overflow-y-scroll">
      <div className="">
        <Tabs defaultActiveKey="1" items={items} tabBarGutter={15} />
      </div>
    </section>
  );
};

export default DateAndStructureTabs;
