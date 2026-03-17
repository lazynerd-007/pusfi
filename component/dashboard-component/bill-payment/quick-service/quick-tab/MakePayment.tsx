import React, { useState } from "react";
import { Button } from "antd";
import QuickBuy from "./QuickBuy";
import QuickSell from "./QuickSell";

const MakePayment = () => {
  const [activeTab, setActiveTab] = useState("buy");

  const handleTabClick = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };

  return (
    <div className="mx-auto w-[70%]">
      <div className="flex space-x-4 items-start ">
        <Button
          type={activeTab === "buy" ? "primary" : "default"}
          onClick={() => handleTabClick("buy")}
          className={`!w-full ${
            activeTab === "buy" ? "!bg-black !text-white" : "!bg-transparent"
          }  `}
        >
          Buy
        </Button>
        <Button
          type={activeTab === "sell" ? "primary" : "default"}
          onClick={() => handleTabClick("sell")}
          className={`!w-full ${
            activeTab === "sell" ? "!bg-black !text-white" : "!bg-transparent"
          }  `}
        >
          Sell
        </Button>
      </div>
      <div className=" mt-4">
        {activeTab === "buy" ? <QuickBuy /> : <QuickSell />}
      </div>
    </div>
  );
};

export default MakePayment;
