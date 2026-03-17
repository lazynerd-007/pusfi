"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import logo from "@/assets/logo.svg";
import {
  CustomInput as Input,
  CustomButton as Button,
} from "@/lib/AntdComponents";
import { FaRegCopy } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import { useLazyGetWalletDetailsQuery } from "@/services/walletService";
import { message } from "antd";
const PaymentGateway = () => {
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
          <main className=" flex flex-col items-center justify-center bg-white w-[95%] md:w-[35%] m-auto mt-[2rem] py-6 px-[1%]">
            <div className="flex flex-col w-full">
              <h2 className="text-2xl font-bold mb-1 text-center">
                Pay Business
              </h2>
              <p className="text-sm text-gray-500 text-center">
                Make Payment to business account
              </p>
              <div className="mt-5 space-y-4">
                <Button type="primary" className="!h-[3rem] !bg-black w-full">
                  Bank Transfer
                </Button>
                <div className="w-full space-y-8 mt-4">
                  <div className="mb-4">
                    <label className="block text-black text-sm font-semibold mb-2">
                      PursBusiness main Account
                    </label>
                    <Input
                      required
                      id="text"
                      type="text"
                      placeholder="pursfi main account"
                      disabled
                    />
                  </div>

                  <div className="flex justify-between items-end  border border-gray-300 p-2 rounded-md">
                    <span className="space-y-3">
                      <p className="font-medium ">Bank Transfer</p>
                      <p>Bank Name - {data?.data?.bankName}</p>{" "}
                      <p>Account Number - {data?.data?.accountNumber}</p>
                      <p>Account Name - {data?.data?.accountName}</p>
                    </span>{" "}
                    <Button
                      onClick={() =>
                        navigator.clipboard.writeText(
                          `Bank Name:${data?.data?.bankName} \n Account Name:${data?.data?.accountName} \n Account Number:${data?.data?.accountNumber}`
                        )
                      }
                      className="border !items-center !flex space-x-3 p-2 rounded-md"
                      icon={<FaRegCopy className="text-blue-400" />}
                    >
                      copy
                    </Button>{" "}
                  </div>
                </div>{" "}
              </div>{" "}
            </div>
          </main>
        </div>
      )}
    </>
  );
};

export default PaymentGateway;
