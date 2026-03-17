"use client";
import DashboardLayout from "@/component/layout/dashboard-layout/DashboardLayout";
import {
  useGetTransactionStatusQuery,
  useGetExpensesQuery,
} from "@/services/transactionService";
import {
  useGetWalletQuery,
  useGetWalletHistoryQuery,
} from "@/services/walletService";
import logo from "@/assets/logo.svg";
import Image from "next/image";
import { useEffect, useState } from "react";

const Template = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, error: walletError } = useGetWalletHistoryQuery({});
  const { isLoading: isFetchingWallet, error: fetchWalletError } = useGetWalletQuery({});
  const { isLoading: isFetchingTransactionStatus, error: txStatusError } =
    useGetTransactionStatusQuery("");
  const { isLoading: isFetchingExpenses, error: expensesError } = useGetExpensesQuery({});
  
  const [showLoader, setShowLoader] = useState(true);

  // Log any errors but don't crash or block
  useEffect(() => {
    if (walletError || fetchWalletError || txStatusError || expensesError) {
      console.warn("Dashboard Template Fetch Error (Ignored for resilience):", {
        walletError, fetchWalletError, txStatusError, expensesError
      });
      // If any error occurs, stop loading immediately so user isn't stuck
      setShowLoader(false);
    }
  }, [walletError, fetchWalletError, txStatusError, expensesError]);

  // Force stop loader after 2 seconds max, regardless of API status
  // This ensures the user always gets to the dashboard even if APIs are hanging
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Also stop loader if everything finished successfully
  useEffect(() => {
    if (!isLoading && !isFetchingExpenses && !isFetchingTransactionStatus && !isFetchingWallet) {
       setShowLoader(false);
    }
  }, [isLoading, isFetchingExpenses, isFetchingTransactionStatus, isFetchingWallet]);

  return (
    <>
      {showLoader ? (
        <div className="relative h-screen flex items-center justify-center bg-[#FAFAFA]">
          <div className="fixed top-0 left-0 px-6 py-4">
            <Image src={logo} alt="logo" className="w-28 h-28" />
          </div>
          <div className="fixed inset-0 bg-black opacity-50 z-50" />
          <div className="w-16 h-16 border-t-4 border-black border-solid rounded-full animate-spin z-50" />
        </div>
      ) : (
        <DashboardLayout>{children}</DashboardLayout>
      )}
    </>
  );
};

export default Template;
