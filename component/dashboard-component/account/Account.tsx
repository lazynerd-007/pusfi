"use client";
import {
  CustomButton as Button,
  CustomSelect as Select,
} from "@/lib/AntdComponents";
import React, { useState } from "react";
import { BiLinkAlt } from "react-icons/bi";
import AccountTable from "./AccountTable";
import { IoIosSettings } from "react-icons/io";
import FundModal from "./modal/FundModal";
import MoveFundModal from "./modal/MoveFundModal";
import StatementModal from "./modal/StatementModal";
import SettingModal from "./modal/SettingModal";
import SubAccount from "./modal/SubAccount";
import { useAppSelector } from "@/store/hooks";
import {
  useGetWalletHistoryQuery,
  useGetWalletQuery,
} from "@/services/walletService";
import PaymentLink from "./modal/PaymentLink";
import DashboardChart from "../dashboard/DashboardChart";
import { CustomTooltip as Tooltip } from "@/lib/AntdComponents";
import { useGetExpensesQuery } from "@/services/transactionService";
import Arrowleft from "@/assets/icon/Arrowleft";
import ArrowRight from "@/assets/icon/ArrowRight";
import { createClient } from "@/lib/supabase/client";
import { useEffect } from "react";

const Account = () => {
  const { data: analysis } = useGetExpensesQuery({});
  const [toogleTooltip, setToogleTooltip] = useState(false);
  const [isFundModalOpen, setIsFundModalOpen] = useState(false);
  const [isMoveFundModalOpen, setIsMoveFundModalOpen] = useState(false);
  const [isStatementModalOpen, setIsStatementModalOpen] = useState(false);
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const [isSubModalOpen, setIsSubModalOpen] = useState(false);
  const [ispaymentOpen, setIspaymentOpen] = useState(false);
  
  // Supabase State
  const [supabaseWallet, setSupabaseWallet] = useState<any>(null);
  const [supabaseChartData, setSupabaseChartData] = useState<any[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchSupabaseData = async () => {
      // Fetch Wallet Balance
      const { data: walletData } = await supabase
        .from('wallet_balances')
        .select('*')
        .limit(1)
        .single();

      if (walletData) setSupabaseWallet(walletData);

      // Fetch Wallet History for Chart
      const { data: historyData } = await supabase
        .from('wallet_history')
        .select('*')
        .order('date', { ascending: true });

      if (historyData) {
        // Format for the chart: needs 'date' (e.g., "Jan 01") and 'balance'
        const formattedChartData = historyData.map((item: any) => ({
          balance: item.balance,
          date: new Date(item.date).toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
          }),
        }));
        setSupabaseChartData(formattedChartData);
      }
    };

    fetchSupabaseData();
  }, []);

  const wallet = useAppSelector((store) => store?.user?.wallet);
  const date = new Date();
  useGetWalletQuery({});
  const { data: stats } = useGetWalletHistoryQuery({});
  return (
    <div className="max-w-[1640px] flex flex-col p-4  h-screen overflow-y-scroll">
      <header className="flex flex-col space-y-6">
        <div className="flex items-center justify-end">
          <div className="flex justify-end items-center space-x-5">
            {/* <button
              onClick={() => setIsSubModalOpen(true)}
              className="btn btn-md  bg-black hover:bg-black text-white text-sm normal-case"
            >
              {" "}
              + Add sub account
            </button> */}
            <button
              onClick={() => setIspaymentOpen(true)}
              className="btn btn-md border flex items-center bg-transparent border-black text-sm normal-case"
            >
              Share payment link
              <BiLinkAlt />
            </button>
            {/* <Select
              className="!w-full !h-[3rem]"
              options={[
                { value: "1 month", label: "1 month" },
                { value: "2 month", label: "2 month" },
              ]}
              placeholder="Show stats Yearly"
            /> */}
          </div>
        </div>
        {/* <div className="flex items-center justify-between">
          <p className="text-md text-gray-800">
            Pursliq limited current account
          </p>
          
        </div> */}
      </header>{" "}
      <main className="grid grid-cols-1 gap-4">
        <section className="grid grid-cols-1 lg:grid-cols-[58%_40%] gap-[2%] mt-8">
          <article className="bg-white p-[2%]">
            <div className="flex items-start space-x-6 ">
              <div className="flex flex-col gap-2 w-full">
                <div className="p-[20px] bg-black text-white w-full">
                  <div className="flex items-center justify-between">
                    <p>Account Balance</p>
                    <Arrowleft />
                  </div>
                  <p className="text-2xl font-semibold">
                  &#8358;
                  {Number(supabaseWallet?.account_balance || wallet?.walletBalance || 0).toLocaleString("en-US")}
                </p>
              </div>
              <div className="px-[20px] py-[10px] bg-black text-white w-full flex justify-between items-center text-[14px]">
                <p>Ledger Balance</p>
                <p className="text-[18px] font-semibold">
                  &#8358;
                  {Number(supabaseWallet?.ledger_balance || wallet?.ledgerBalance || 0).toLocaleString("en-US")}
                </p>
              </div>
              </div>
              <div className="bg-white p-[20px] text-black w-full border border-gray-300">
                <div className="flex items-center justify-between">
                  <p>
                    Today, {date.toLocaleString("en-US", { month: "long" })}{" "}
                    {date.getFullYear()}
                  </p>
                  <ArrowRight />
                </div>
                <p className="text-2xl font-semibold">
                  &#8358;
                  {Number(analysis?.data?.todayBalance || 0).toLocaleString(
                    "en-US"
                  )}
                </p>
              </div>
            </div>
            <div className="my-6">
              <DashboardChart data={supabaseChartData.length > 0 ? supabaseChartData : (stats || [])} />
            </div>
          </article>
          <div className="p-3 flex flex-col justify-between">
            <div className="flex justify-between items-center gap-[2rem]">
              <span className="w-full bg-white p-[3%]">
                <p>Spend so far</p>{" "}
                <p className="text-2xl font-semibold">
                  &#8358;
                  {Number(analysis?.data?.currentExpenses || 0).toLocaleString(
                    "en-US"
                  )}
                </p>
              </span>
              <div className="w-full p-[3%] bg-white">
                <div className="flex items-center justify-between">
                  <p>Burn </p> <ArrowRight />
                </div>

                <p className="text-2xl font-semibold">
                  %{analysis?.data?.burn}
                </p>
                {/* <p>5.0%</p> */}
              </div>
            </div>
            <div className="flex flex-col space-y-3 bg-white p-[2%]">
              <div className="flex justify-end items-end mb-3">
                <Tooltip title="copied!" trigger={"click"} open={toogleTooltip}>
                  <Button
                    onClick={() => {
                      setToogleTooltip(true);
                      navigator.clipboard
                        .writeText(
                          `Bank Name:${supabaseWallet?.bank_name || wallet?.accountDetails?.bankName} \n Account Name:${supabaseWallet?.account_name || wallet?.accountDetails?.accountName} \n Account Number:${supabaseWallet?.account_number || wallet?.accountDetails?.accountNumber}`
                        )
                        .finally(() => {
                          setTimeout(() => {
                            setToogleTooltip(false);
                          }, 2000);
                        });
                    }}
                    className="text-lg font-semibold !border-none"
                  >
                    + copy
                  </Button>
                </Tooltip>
              </div>{" "}
              <span className="flex justify-between items-center">
                <p className="text-gray-500 ">Bank Name</p>
                <p>{supabaseWallet?.bank_name || wallet?.accountDetails?.bankName}</p>
              </span>
              <span className="flex gap-[0.2rem] justify-between items-center">
                <p className="text-gray-500 ">Account Name</p>
                <p className="text-left">
                  {supabaseWallet?.account_name || wallet?.accountDetails?.accountName}
                </p>
              </span>
              <span className="flex justify-between items-center">
                <p className="text-gray-500 ">Account Number</p>
                <p>{supabaseWallet?.account_number || wallet?.accountDetails?.accountNumber}</p>
              </span>
              <span className="flex justify-between items-center">
                <p className="text-gray-500 ">Account allas</p>
                <p>PursFinance main account</p>
              </span>
            </div>
            <div className="flex justify-end items-center">
              {/* <button
                onClick={() => setIsFundModalOpen(true)}
                className=" font-semibold"
              >
                + Fund
              </button>
              <button
                onClick={() => setIsMoveFundModalOpen(true)}
                className=" font-semibold"
              >
                + Move Fund
              </button> */}
              <button
                onClick={() => setIsStatementModalOpen(true)}
                className=" font-semibold"
              >
                + Statement
              </button>
              {/* <button
                onClick={() => setIsSettingModalOpen(true)}
                className="flex items-center font-semibold"
              >
                <IoIosSettings /> Setting
              </button> */}
            </div>
          </div>{" "}
        </section>
        <AccountTable />
      </main>
      <PaymentLink open={ispaymentOpen} setOpen={setIspaymentOpen} />
      <FundModal open={isFundModalOpen} setOpen={setIsFundModalOpen} />
      <MoveFundModal
        open={isMoveFundModalOpen}
        setOpen={setIsMoveFundModalOpen}
      />
      <StatementModal
        open={isStatementModalOpen}
        setOpen={setIsStatementModalOpen}
        walletData={supabaseWallet}
      />
      <SettingModal open={isSettingModalOpen} setOpen={setIsSettingModalOpen} />
      <SubAccount open={isSubModalOpen} setOpen={setIsSubModalOpen} />
    </div>
  );
};

export default Account;
