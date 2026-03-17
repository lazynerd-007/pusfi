// InvoiceTab.js
"use client";
import React, { useState, useEffect } from "react";
import { CustomTabs as Tabs } from "@/lib/AntdComponents";
import { TabsProps } from "antd";
import InvoiceTable from "./InvoiceTable";

export interface DataType {
  id: string;
  issuieddate: string;
  duedate: string;
  amount: number;
  client: string;
  invoiveno: string;
  status: string;
}

const InvoiceTab = () => {
  const items: TabsProps["items"] = [
    // {
    //   key: "recent",
    //   label: "Recent Invoice",
    //   children: <InvoiceTable status="paid" />,
    // },
    {
      key: "incoming",
      label: "Incoming",
      children: <InvoiceTable status="all" />,
    },
    {
      key: "paid",
      label: "Paid",
      children: <InvoiceTable status="paid" />,
    },
    {
      key: "overdue",
      label: "Overdue",
      children: <InvoiceTable status="overdue" />,
    },
    {
      key: "unpaid",
      label: "Unpaid",
      children: <InvoiceTable status="unpaid" />,
    },
    // {
    //   key: "draft",
    //   label: "Draft",
    //   children: <InvoiceTable status="draft" />,
    // },
  ];

  return (
    <>
      <Tabs items={items} defaultActiveKey="recent" />
    </>
  );
};

export default InvoiceTab;
