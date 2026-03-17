import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Drawer, TabsProps } from "antd";
import { CustomTabs as Tabs } from "@/lib/AntdComponents";
import TransactionHistory from "./tabs/TransactionHistory";
import Pending from "./tabs/Pending";
import RecurringPayment from "./tabs/RecurringPayment";

interface Props {
  provider: {
    icon: JSX.Element;
  };
  product: string;
}

const data = [
  {
    title: "Total Profit",
    value: "N 50,000.00",
  },
  {
    title: "Total Airtime Bundle Remaining",
    value: "450,000 G",
  },
  {
    title: "Total Data Bundle Remaining",
    value: "450,000.00",
  },
];

const MoreDetailsDrawer: React.FC<Props> = ({ provider, product }) => {
  const { push } = useRouter();
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: (
        <p className="text-inherit text[#181336] text-[14px] font-[400]">
          Transaction history
        </p>
      ),
      children: <TransactionHistory />,
    },
    {
      key: "2",
      label: (
        <p className="text-inherit text[#181336] text-[14px] font-[400]">
          Pending
        </p>
      ),
      children: <Pending />,
    },
    {
      key: "3",
      label: (
        <p className="text-inherit text[#181336] text-[14px] font-[400]">
          Recurring Payment
        </p>
      ),
      children: <RecurringPayment />,
    },
  ];

  return (
    <>
      <button
        onClick={showDrawer}
        title="View More Details"
        className="underline text-[#515B6F] text-[14px] hover:text-black"
      >
        View More Details
      </button>
      <Drawer onClose={onClose} open={open} width={840}>
        <div className="md:flex justify-between gap-4 space-y-4 md:space-y-0">
          <span className="flex gap-4">
            {/* {provider.icon} */}
            <p className="text-[18px] pt-4 md:pt-2">{product}</p>
          </span>
          <button
            onClick={() => push("/sell-service")}
            className="btn btn-md border-[#E9EBEB] flex items-center bg-white text-[14px] font-medium normal-case text-black hover:bg-[#f2f2f2]"
          >
            + Sell Service
          </button>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.map((item, index) => (
            <span
              key={index}
              className="bg-[#FAFAFA] rounded-[4px] py-4 px-6 flex flex-col justify-between gap-3"
            >
              <p className="text-[#515B6F] text-[14px]">{item.title}</p>
              <span className="flex  justify-between gap-4">
                <p className="text-black font-semibold text-[16px]">
                  {item.value}
                </p>
                {/* Render the button only if the item is not "Total Profit" */}
                {item.title !== "Total Profit" && (
                  <button
                    title="Top up"
                    className="text-[#0D24F1] font-medium text-[12px]"
                  >
                    + Top up
                  </button>
                )}
              </span>
            </span>
          ))}
        </div>

        {/* tabs */}
        <main className="grid grid-cols-1 gap-[2.5%] mt-4">
          <Tabs defaultActiveKey="1" items={items} />
        </main>
      </Drawer>
    </>
  );
};

export default MoreDetailsDrawer;
