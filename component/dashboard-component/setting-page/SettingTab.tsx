"use client";
import { CustomTabs as Tabs } from "@/lib/AntdComponents";
import { TabsProps } from "antd";
import Persoanal from "./setting-tab/Persoanal";
import CompanySetinf from "./setting-tab/CompanySeting";
import Security from "./setting-tab/Security";
// import Compulsory from "./setting-tab/Compulsory";
// import AprovalRule from "./setting-tab/AprovalRule";

const SettingTab = () => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Personal Settings",
      children: <Persoanal />,
    },
    {
      key: "2",
      label: "Company Settings",
      children: <CompanySetinf />,
    },
    {
      key: "3",
      label: "Security",
      children: <Security />,
    },
    // {
    //   key: "4",
    //   label: "Compulsory",
    //   children: <Compulsory />,
    // },
    // {
    //   key: "5",
    //   label: "Approval Rule",
    //   children: <AprovalRule />,
    // },
  ];

  return <Tabs items={items} defaultActiveKey="1" />;
};

export default SettingTab;
