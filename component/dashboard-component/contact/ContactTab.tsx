"use client";
import { CustomTabs as Tabs } from "@/lib/AntdComponents";
import { TabsProps } from "antd";
import AddContact from "./contact-tab/AddContact";
import SentRequest from "./contact-tab/SentRequest";
import Beneficiary from "./contact-tab/Beneficiary";

const ContactTab = () => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Add Contact",
      children: <AddContact />,
    },
    {
      key: "2",
      label: "Sent Request",
      children: <SentRequest />,
    },
    {
      key: "3",
      label: "Beneficiary list",
      children: <Beneficiary />,
    },
  ];

  return <Tabs items={items} defaultActiveKey="1" />;
};

export default ContactTab;
