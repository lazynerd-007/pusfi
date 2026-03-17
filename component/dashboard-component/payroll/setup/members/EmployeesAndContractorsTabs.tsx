import React from "react";
import { CustomTabs as Tabs } from "@/lib/AntdComponents";
import { TabsProps } from "antd";
import ContractorTab from "./tabs/ContractorTab";
import EmployeeTab from "./tabs/EmployeeTab";

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Employee",
    children: <EmployeeTab />,
  },
  {
    key: "2",
    label: "Contractor",
    children: <ContractorTab />,
  },
];

const EmployeesAndContractorsTabs = () => {
  return <Tabs defaultActiveKey="1" items={items} tabBarGutter={15} />;
};

export default EmployeesAndContractorsTabs;
