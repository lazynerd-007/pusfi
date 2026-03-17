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
const Bank = () => {
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
    <main className=" flex flex-col items-center justify-center bg-white w-full m-auto mt[2rem] py6 px-[1%]">
      <div className="flex flex-col w-full">
        <div className="mt5 space-y-4">
          <div className="w-full space-y-8 mt4">
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
  );
};

export default Bank;
