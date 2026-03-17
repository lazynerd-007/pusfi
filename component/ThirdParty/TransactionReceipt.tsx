"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import logo from "@/assets/logo.svg";
import Done from "@/assets/icon/Done";
import { message } from "antd";
import { CustomButton as Button } from "@/lib/AntdComponents";
import { useSearchParams } from "next/navigation";
import { useLazyGetSingleTransactionQuery } from "@/services/transactionService";
import { useLazyGetBillPaymentTransactionDetailsQuery } from "@/services/bill-payment";
import { createClient } from "@/lib/supabase/client";

const TransactionReceipt = () => {
  const params = useSearchParams();
  const [fetchTransaction, { isLoading, data, isUninitialized }] =
    useLazyGetSingleTransactionQuery();
  const [
    fetchBillPaymentTransaction,
    {
      data: bill,
      isLoading: isLoadingBill,
      isUninitialized: billUninitialized,
    },
  ] = useLazyGetBillPaymentTransactionDetailsQuery();

  // Supabase State
  const supabase = createClient();
  const [supabaseTx, setSupabaseTx] = useState<any>(null);
  const [isSupabaseLoading, setIsSupabaseLoading] = useState(false);

  useEffect(() => {
    const reference = params.get("reference");
    const billId = params.get("bill");

    if (billId) {
      fetchBillPaymentTransaction({ id: billId })
        .unwrap()
        .catch((err) => {
          message.error(
            JSON.parse(err?.data?.responseDescription)?.message ||
              "something went wrong"
          );
        });
    } else if (reference) {
      // Try Supabase fetch first
      const fetchSupabaseTx = async () => {
          setIsSupabaseLoading(true);
          try {
              // Try 'transactions' table first (by reference)
              let { data: txData, error } = await supabase
                  .from('transactions')
                  .select('*')
                  .eq('reference', reference)
                  .single();
              
              // If not found, try by ID (in case reference param is actually an ID)
              if (!txData) {
                   const { data: txDataById } = await supabase
                      .from('transactions')
                      .select('*')
                      .eq('id', reference)
                      .single();
                   if (txDataById) txData = txDataById;
              }

              // If still not found, try 'recent_transactions' table
              if (!txData) {
                  const { data: recentTxData } = await supabase
                      .from('recent_transactions')
                      .select('*')
                      .eq('reference', reference)
                      .single();
                  if (recentTxData) txData = recentTxData;
              }

              if (txData) {
                  setSupabaseTx(txData);
                  setIsSupabaseLoading(false);
                  return; 
              }
          } catch (err) {
              console.error("Supabase Receipt Fetch Error:", err);
          } finally {
              setIsSupabaseLoading(false);
          }
      };

      fetchSupabaseTx();

      // Fallback to legacy
      fetchTransaction(reference)
        .unwrap()
        .catch((err) => {
          // Only show error if Supabase also failed (handled by UI state)
        });
    }
  }, [params.get("reference"), params.get("bill")]);

  // Helper to safely format date
  const formatDate = (dateString: string | undefined | null) => {
      if (!dateString) return "N/A";
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "N/A"; // Handle invalid dates

      return `${date.getDate()} ${new Intl.DateTimeFormat("en", {
        month: "short",
      }).format(date)} ${date.getFullYear()}, ${date.getHours()}:${date
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;
  };

  // Determine which data to use
  const tx = supabaseTx || data?.data;
  const loading = (isLoading || isUninitialized) && (isLoadingBill || billUninitialized) && !supabaseTx;

  return (
    <>
      {loading ? (
        <div className="relative h-screen flex items-center justify-center bg-[#FAFAFA]">
          <div className="fixed top-0 left-0 px-6 py-4">
            <Image src={logo} alt="logo" className="w-28 h-28" />
          </div>
          <div className="fixed inset-0 bg-black opacity-50 z-50" />
          <div className="w-16 h-16 border-t-4 border-black border-solid rounded-full animate-spin z-50" />
        </div>
      ) : (
        <>
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
              <Done className="translate-y-[-50%]" />
              <span className="border-b border-[#E9EBEB] pt-[1.5rem]">
                <h1 className="text-[25px] font-[700] text-[#0AB71B] text-center">
                  Payment successful !
                </h1>
                <p className="text-1xl font-[500] text-[#515B6F]">
                  Your payment has been successfully done
                </p>
              </span>
              <div className="flex flex-col items-center justify-center gap-[1rem]">
                <span>
                  <h3 className="text-[#515B6F] text-[16px] font-[400] text-center">
                    Total Payment
                  </h3>
                  <h2 className="text-[25px] font-[700] text-[#000000] text-center">
                    NGN{" "}
                    {params.get("bill")
                      ? Number(bill?.data[0]?.amount || 0).toLocaleString(
                          "en-US"
                        )
                      : Number(tx?.amount || 0).toLocaleString("en-US")}
                  </h2>
                </span>
                <span className="grid grid-cols-2 gap-[0.5rem] justify-between items-stretch">
                  <span className="rounded-[8px] border border-[#E9EBEB] p-[0.5rem] flex flex-col">
                    <h6 className="text-[#515B6F] text-[16px] font-[400]">
                      Ref Number
                    </h6>
                    <p className="text-[#000000] text-[16px] font-[400] break-words">
                      {params.get("bill")
                        ? bill?.data[0]?.reference
                        : (tx?.reference || tx?.id || 'N/A')}
                    </p>
                  </span>
                  <span className="rounded-[8px] border border-[#E9EBEB] p-[0.5rem] flex flex-col">
                    <h6 className="text-[#515B6F] text-[16px] font-[400]">
                      Payment Time
                    </h6>
                    <p className="text-[#000000] text-[16px] font-[400]">
                      {params.get("bill")
                        ? formatDate(bill?.data[0]?.createdAt)
                        : formatDate(tx?.created_at || tx?.createdAt)}
                    </p>
                  </span>
                  <span className="rounded-[8px] border border-[#E9EBEB] p-[0.5rem] flex flex-col">
                    <h6 className="text-[#515B6F] text-[16px] font-[400]">
                      Payment Method
                    </h6>
                    <p className="text-[#000000] text-[16px] font-[400]">
                      {params.get("bill")
                        ? bill?.data[0]?.type === "sell"
                          ? `${bill?.data[0]?.model?.product} Purchase`
                          : `${bill?.data[0]?.model?.product} Wallet Funding`
                        : (tx?.type || tx?.transactionType) === "banktransfer"
                        ? "Bank Transfer"
                        : "Bank Transfer"}
                    </p>
                  </span>
                  <span className="rounded-[8px] border border-[#E9EBEB] p-[0.5rem] flex flex-col">
                    <h6 className="text-[#515B6F] text-[16px] font-[400]">
                      {params.get("bill")
                        ? `${bill?.data[0]?.model?.product} Wallet`
                        : (tx?.type || tx?.transactionType) === "credit"
                        ? "Sender Name"
                        : "Recipient Name"}
                    </h6>
                    <p className="text-[#000000] text-[16px] font-[400] break-words">
                      {params.get("bill")
                        ? bill?.data[0]?.model?.phone ||
                          `${bill?.data[0]?.model?.product}Wallet`
                        : (tx?.recipient_name || tx?.accountName || tx?.description || 'N/A')}
                    </p>
                  </span>
                </span>
              </div>
            </main>
            <footer
              className={`py-4 px-8 bg-white flex justify-end items-center gap-1 sticky bottom-0`}
            >
              <Button
                className="no-print"
                onClick={() => {
                  window.print();
                }}
              >
                Download Receipt
              </Button>
            </footer>
          </div>
        </>
      )}
    </>
  );
};

export default TransactionReceipt;
