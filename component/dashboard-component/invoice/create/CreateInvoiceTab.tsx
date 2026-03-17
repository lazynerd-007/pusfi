"use client";
import { CustomTabs as Tabs } from "@/lib/AntdComponents";
import type { TabsProps } from "antd";
import CreateInvoice from "./CreateInvoice";
import { GrFormPreviousLink } from "react-icons/gr";
import { useRouter } from "next/navigation";
const items: TabsProps["items"] = [
  {
    key: "1",
    label: (
      <span className="flex items-center gap-[0.2rem]">
        <span className="text-[12px] font-[400] text-white py[1%] px-[5%] rounded-full bg-black">
          1
        </span>
        <p className="text-inherit text[#181336] text-[16px] font-[400]">
          Invoice Details
        </p>
      </span>
    ),
    children: <CreateInvoice />,
  },
];
const CreateInvioiceTab = () => {
  const { back } = useRouter();
  return (
    <div className="mx-auto flex flex-col py-2 px-6 h-screen overflow-y-scroll">
      <header className="flex flex-col md:flex-row justify-between items-center my-6">
        <span>
          <span className="text-2xl font-medium flex gap-1 items-center">
            <GrFormPreviousLink className="cursor-pointer" onClick={back} />
            <h2 className="text-2xl font-medium">New Invoice</h2>
          </span>
          <p className="text-sm text-gray-600">
            you can create one time payment, recurring or Schedule payment
          </p>
        </span>
      </header>
      <main className="grid grid-cols-1 gap-[2%]">
        <Tabs defaultActiveKey="1" tabPosition="left" items={items} />;
      </main>
    </div>
  );
};

export default CreateInvioiceTab;
