"use client";
import { CustomTabs as Tabs } from "@/lib/AntdComponents";
import type { TabsProps } from "antd";
import MakePayment from "./payment-tabs/MakePayment";

const items: TabsProps["items"] = [
  {
    key: "1",
    label: (
      <span className="flex items-center gap-[0.2rem]">
        <span className="text-[12px] font-[400] text-white py[1%] px-[5%] rounded-full bg-black">
          1
        </span>
        <p className="text-inherit text[#181336] text-[16px] font-[400]">
          Make Payment
        </p>
      </span>
    ),
    children: <MakePayment />,
  },
];
const CreatePaymentTabs = () => {
  return <Tabs defaultActiveKey="1" tabPosition="left" items={items} />;
};

export default CreatePaymentTabs;
