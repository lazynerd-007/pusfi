import React, { useState } from "react";
import { Button } from "antd";
import BuyTable from "../tables/BuyTable";
import SellTable from "../tables/SellTable";

const Pending = () => {
  const [activeTab, setActiveTab] = useState("buy");

  const handleTabClick = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };

  return (
    <div className="mx-auto mt-2">
      <div className="flex space-x-4 items-start ">
        <Button
          type={activeTab === "buy" ? "primary" : "default"}
          onClick={() => handleTabClick("buy")}
          className={`!w-full ${
            activeTab === "buy" ? "!bg-black !text-white" : "!bg-transparent"
          }  `}
        >
          Buy History
        </Button>
        <Button
          type={activeTab === "sell" ? "primary" : "default"}
          onClick={() => handleTabClick("sell")}
          className={`!w-full ${
            activeTab === "sell" ? "!bg-black !text-white" : "!bg-transparent"
          }  `}
        >
          Sell History
        </Button>
      </div>
      <div className=" mt-4">
        {activeTab === "buy" ? <BuyTable /> : <SellTable />}
      </div>
    </div>
  );
};

export default Pending;
