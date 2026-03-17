"use client";
import { CustomTabs as Tabs } from "@/lib/AntdComponents";
import { TabsProps } from "antd";
import Member from "./adminstration-tab/Member";
import Sent from "./adminstration-tab/Sent";

const AdministrationTab = () => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: <h2>Member</h2>,
      children: <Member />,
    },
    // {
    //   key: "2",
    //   label: <h2>Send Invites (300)</h2>,
    //   children: <Sent />,
    // },
  ];

  return <Tabs items={items} defaultActiveKey="1" />;
};

export default AdministrationTab;
