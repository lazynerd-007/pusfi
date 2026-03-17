"use client";
import { CustomTabs as Tabs } from "@/lib/AntdComponents";
import type { TabsProps } from "antd";
import Request from "./payment-tabs/Request";
import Recurring from "./payment-tabs/Recurring";
import ALL from "./payment-tabs/All";
import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const PaymentTabs = () => {
  const params = useSearchParams();
  const [activeKey, setActiveKey] = useState(params?.get("activeKey") || "1");
  useEffect(() => {
    setActiveKey(params?.get("activeKey") || "1");
  }, [params]);
  const items: TabsProps["items"] = useMemo(
    () => [
      {
        key: "1",
        label: <span onClick={() => setActiveKey("1")}>Payment</span>,
        children: <ALL />,
      },
      {
        key: "2",
        label: <span onClick={() => setActiveKey("2")}>Scheduled Payment</span>,
        children: <Request />,
      },
      {
        key: "3",
        label: <span onClick={() => setActiveKey("3")}>Recurring Payment</span>,
        children: <Recurring />,
      },
    ],
    [activeKey]
  );
  return <Tabs defaultActiveKey="1" activeKey={activeKey} items={items} />;
};

export default PaymentTabs;
