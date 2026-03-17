"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import logo from "@/assets/logo.svg";
import Done from "@/assets/icon/Done";
import { message, Skeleton } from "antd";
import { CustomButton as Button } from "@/lib/AntdComponents";
import { useSearchParams } from "next/navigation";
import { useVerifyPaymentMutation } from "@/services/collection";

const CardTransactionReceipt = () => {
  const params = useSearchParams();
  const [status, setStatus] = useState(false);

  const [verifyPayment, { isLoading, isUninitialized, isSuccess }] =
    useVerifyPaymentMutation();

  const [receipt, setReceipt] = useState({
    amount: "",
    reference: "",
    paid_at: "",
    account_name: "",
  });

  useEffect(() => {
    if (params.get("reference") && params.get("status")) {
      verifyPayment({ reference: params.get("reference") })
        .unwrap()
        .then((response) => {
          setReceipt(response?.data);
          if (response?.status === "pending") {
            setStatus(true);
          } else {
            setStatus(false);
          }
        })
        .catch(() => {
          message.error("Failed to verify payment");
          setStatus(true);
        });
    } else {
      setStatus(true);
    }
  }, [params, verifyPayment]);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-BgImage mx-auto max-w-[1640px] bg-[#FAFAFA] relative">
      <nav className="py-4 px-8 bg-white flex justify-between items-center sticky top-0">
        <Image src={logo} alt="logo" />
        <a
          className="px-[10px] py-[5px] border border-[#000000] border-solid rounded-[8px]"
          href="https://pursfinance.com"
          target="_blank"
        >
          learn about us
        </a>
      </nav>

      <main className="flex flex-col items-center justify-center bg-white max-w-[600px] w-[90%] md:w-[40%] m-auto my-[2rem] py-4 px-[2%] rounded-[20px]">
        {isLoading || isUninitialized ? (
          <Skeleton active className="mt-5 max-w-[500px] bg-white" />
        ) : (
          <>
            {status ? <></> : <Done className="translate-y-[-50%]" />}

            <span className="border-b border-[#E9EBEB] pt-[1.5rem]">
              <h1
                className={`text-[25px] font-[700] ${
                  status ? "text-red-700" : "text-[#0AB71B]"
                }  text-center`}
              >
                {status ? "Payment failed!" : "Payment successful !"}
              </h1>
              <p className="text-[14px] md:text-[19px] font-[500] text-[#515B6F]">
                {status
                  ? "Your payment was cancelled"
                  : "Your payment has been successfully done"}
              </p>
            </span>

            <div
              className={`flex flex-col items-center justify-center gap-[1rem] ${
                status ? "hidden" : "block"
              }`}
            >
              <span>
                <h3 className="text-[#515B6F] text-[16px] font-[400] text-center">
                  Total Payment
                </h3>
                <h2 className="text-[25px] font-[700] text-[#000000] text-center">
                  NGN {receipt?.amount}
                </h2>
              </span>
              <span className="grid grid-cols-2 gap-[0.5rem] justify-between items-stretch">
                <span className="rounded-[8px] border border-[#E9EBEB] p-[0.5rem] flex flex-col">
                  <h6 className="text-[#515B6F] text-[16px] font-[400]">
                    Ref Number
                  </h6>
                  <p className="text-[#000000] text-[16px] font-[400] break-words">
                    {receipt?.reference}
                  </p>
                </span>
                <span className="rounded-[8px] border border-[#E9EBEB] p-[0.5rem] flex flex-col">
                  <h6 className="text-[#515B6F] text-[16px] font-[400]">
                    Payment Time
                  </h6>
                  <p className="text-[#000000] text-[16px] font-[400]">
                    {receipt?.paid_at ? (
                      <>
                        {new Date(receipt.paid_at).getDate()}{" "}
                        {new Intl.DateTimeFormat("en", {
                          month: "short",
                        }).format(new Date(receipt.paid_at))}{" "}
                        {new Date(receipt.paid_at).getFullYear()},{" "}
                        {new Date(receipt.paid_at).getHours()}:
                        {new Date(receipt.paid_at)
                          .getMinutes()
                          .toString()
                          .padStart(2, "0")}
                      </>
                    ) : (
                      "Invalid date"
                    )}
                  </p>
                </span>
                <span className="rounded-[8px] border border-[#E9EBEB] p-[0.5rem] flex flex-col">
                  <h6 className="text-[#515B6F] text-[16px] font-[400]">
                    Payment Method
                  </h6>
                  <p className="text-[#000000] text-[16px] font-[400]">Card</p>
                </span>
                <span className="rounded-[8px] border border-[#E9EBEB] p-[0.5rem] flex flex-col">
                  <h6 className="text-[#515B6F] text-[16px] font-[400]">
                    Business Name
                  </h6>
                  <p className="text-[#000000] text-[16px] font-[400] break-words">
                    {receipt?.account_name}
                  </p>
                </span>
              </span>
            </div>
          </>
        )}
      </main>

      <footer className="py-4 px-8 bg-white flex justify-end items-center gap-1 sticky bottom-0">
        <Button className="no-print" onClick={() => window.print()}>
          Download Receipt
        </Button>
      </footer>
    </div>
  );
};

export default CardTransactionReceipt;
