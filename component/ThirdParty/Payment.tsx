"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "@/assets/logo.svg";
import {
  CustomInput as Input,
  CustomButton as Button,
  CustomCollapse as Collapse,
  CustomCollapsePanel as Panel,
} from "@/lib/AntdComponents";
import { FaRegCopy } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import { useLazyGetWalletDetailsQuery } from "@/services/walletService";
import { message } from "antd";
import Cliq from "@/assets/icon/Cliq";
import { GrLock } from "react-icons/gr";
import Card from "./payment/Card";
import Bank from "./payment/Bank";


const PaymentGateway = () => {
  const [activePanel, setActivePanel] = useState("1");
  const searchParams = useSearchParams();
  const [fetchWallet, { isLoading, data, isUninitialized }] =
    useLazyGetWalletDetailsQuery();
  useEffect(() => {
    if (searchParams.get("businessId"))
      fetchWallet(searchParams.get("businessId"))
        .unwrap()
        .catch((err) => {
          message.error("something went wrong");
        });
  }, [searchParams]);

  return (
    <>
      {isLoading || isUninitialized ? (
        <div className="relative h-screen flex items-center justify-center bg-[#FAFAFA]">
          <div className="fixed top-0 left-0 px-6 py-4">
            <Image src={logo} alt="logo" className="w-28 h-28" />
          </div>
          <div className="fixed inset-0 bg-black opacity-50 z-50" />
          <div className="w-16 h-16 border-t-4 border-black border-solid rounded-full animate-spin z-50" />
        </div>
      ) : (
        <div className="min-h-screen flex flex-col bg-BgImage mx-auto max-w-[1640px] bg-[#FAFAFA]">
          <nav className="py-4 px-8 bg-white flex justify-between items-center">
            <Image src={logo} alt="logo" />
            <a
              className="px-[10px] py-[5px] border border-[#000000] border-solid rounded-[8px]"
              href="https://pursfinance.com"
              target="_blank"
            >
              learn about us
            </a>
          </nav>
          <div className="bg-white rounded-[4px] font-archivo shadow-[0px 4px 8px rgba(0, 0, 0, 0.1)] py-[30px] px-[15px] md:p-[20px] w-[90%] md:w-[45%] midmax:w-[40%] max-w-[500px] m-auto">
            <h6 className="text-[#000000] text-[28px] font-[700]">
              {data?.data?.accountName}
            </h6>
            <div className="text-[#515B6F] flex justify-between items-end">
              <span className="font-[700] text-[12px]">
              {data?.data?.email}
              </span>
            </div>
            <Collapse
              accordion
              bordered={false}
              style={{ backgroundColor: "white" }}
              defaultActiveKey={"1"}
              activeKey={activePanel}
            >
              <Panel
                header={
                  <div
                    className="w-full flex items-center gap-[0.5rem]"
                    onClick={() => setActivePanel("1")}
                  >
                    <Cliq />
                    <span className="text-[#515B6F]">Pay with Card</span>
                  </div>
                }
                collapsible={activePanel === "1" ? "disabled" : "header"}
                className="w-full"
                showArrow={false}
                key="1"
              >
                <Card businessId={data?.data?.businessId}  email={data?.data?.email}/>
              </Panel>
              <Panel
                header={
                  <div
                    className="w-full flex items-center gap-[0.5rem]"
                    onClick={() => setActivePanel("2")}
                  >
                    <Cliq />
                    <span className="text-[#515B6F]">
                      Pay with Bank Transfer
                    </span>
                  </div>
                }
                collapsible={activePanel === "2" ? "disabled" : "header"}
                showArrow={false}
                key="2"
              >
                <Bank />
              </Panel>

              {/** 
              <Panel
                header={
                  <div
                    className="w-full flex items-center gap-[0.5rem]"
                    onClick={() => setActivePanel("3")}
                  >
                    <Cliq />
                    <span className="text-[#515B6F]">Pay with USSD</span>
                  </div>
                }
                collapsible={activePanel === "3" ? "disabled" : "header"}
                showArrow={false}
                key="3"
              >
                <p>{text}</p>
              </Panel>
              */}
            </Collapse>
            <div className="flex items-center gap-1 justify-center my-1 text-[#515B6F] text-[12px]">
              <GrLock />
              <span className="font-[500]">Secured by Purscliq</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentGateway;
