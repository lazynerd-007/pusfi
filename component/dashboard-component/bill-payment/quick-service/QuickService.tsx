"use client";
import { GrFormPreviousLink } from "react-icons/gr";
import { useRouter } from "next/navigation";
import { TabsProps } from "antd";
import { CustomTabs as Tabs } from "@/lib/AntdComponents";
import MakePayment from "./quick-tab/MakePayment";
import PaymentAproval from "./quick-tab/PaymentAproval";

const QuickService = () => {
  const { back } = useRouter();
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: (
        <span className="flex items-center gap-[0.2rem]">
          <span className="text-[12px] font-[400] text-white py[1%] px-[5%] rounded-full bg-black">
            1
          </span>
          <p className="text-inherit text[#181336] text-[14px] font-[400]">
            Make Payment
          </p>
        </span>
      ),
      children: <MakePayment />,
    },
    {
      key: "2",
      label: (
        <span className="flex items-center gap-[0.2rem]">
          <span className="text-[12px] font-[400] text-white py[1%] px-[5%] rounded-full bg-black">
            2
          </span>
          <p className="text-inherit text[#181336] text-[14px] font-[400]">
            Payment Approval
          </p>
        </span>
      ),
      children: <PaymentAproval />,
    },
  ];
  return (
    <div className="mx-auto flex flex-col py-2 px-6 h-screen overflow-y-scroll">
      <header className="flex flex-col md:flex-row justify-between items-center my-3">
        <span>
          <span className="text-2xl font-medium flex gap-1 items-center">
            <GrFormPreviousLink className="cursor-pointer" onClick={back} />
            <h2>Quick Service</h2>
          </span>
          <p className="text-sm text-gray-600">
            you can create one time payment, recurring or Schedule payment
          </p>
        </span>
        <div className="flex justify-end items-center space-x-5">
          <button className="btn btn-sm border flex items-center bg-gray-400 text-sm normal-case text-white hover:bg-gray-400">
            Make Payment
          </button>
          <button className="btn btn-sm border flex items-center text-sm normal-case bg-transparent">
            Cancel
          </button>
        </div>
      </header>
      <main className="grid grid-cols-1 gap-[2.5%] mt-4">
        <Tabs
          defaultActiveKey="1"
          tabPosition="left"
          items={items}
        />
      </main>
    </div>
  );
};

export default QuickService;
