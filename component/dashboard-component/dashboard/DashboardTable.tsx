/* eslint-disable react/no-unescaped-entities */
"use client";
import { useEffect, useState } from "react";
import { useTransactionsMutation } from "@/services/transactionService";
import { useAppSelector } from "@/store/hooks";
import Link from "next/link";
import DashboardModal from "./DashboardModal";
import { createClient } from "@/lib/supabase/client";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { FaDownload } from "react-icons/fa";

const DashboardTable = () => {
  const [fetchTransactions, { isLoading, data }] = useTransactionsMutation();
  const profile = useAppSelector((store) => store?.user?.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Supabase State
  const [supabaseTransactions, setSupabaseTransactions] = useState<any[]>([]);
  const supabase = createClient();

  useEffect(() => {
    // Legacy Fetch (might fail)
    fetchTransactions({
      userId: profile?.id,
      businessId: profile?.businessId,
      page: 1,
      perPage: 5,
    });

    // Supabase Fetch (Reliable)
    const fetchSupabaseTx = async () => {
      const { data: txData } = await supabase
        .from('recent_transactions')
        .select('*')
        .limit(10);
        
      if (txData) setSupabaseTransactions(txData);
    };
    fetchSupabaseTx();
  }, [fetchTransactions, profile?.id, profile?.businessId, supabase]);

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Add Logo or Header
    doc.setFontSize(20);
    doc.text("PursFinance Transaction Statement", 14, 22);
    
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30);
    doc.text(`Account Name: ${profile?.firstName || 'User'} ${profile?.lastName || ''}`, 14, 35);

    // Prepare data for table
    // Prioritize Supabase data if available, else legacy data
    const txSource = supabaseTransactions.length > 0 ? supabaseTransactions : (data?.data?.data || []);
    
    const tableData = txSource.map((tx: any) => [
      new Date(tx.date || tx.created_at || tx.createdAt || Date.now()).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }),
      tx.description || tx.accountName || 'Transaction',
      tx.type || tx.transactionType || 'Debit',
      `NGN ${Number(tx.amount).toLocaleString()}`,
      tx.status || 'Success'
    ]);

    autoTable(doc, {
      head: [['Date', 'Description', 'Type', 'Amount', 'Status']],
      body: tableData,
      startY: 40,
      theme: 'grid',
      headStyles: { fillColor: [0, 0, 0] }, // Black header
      columnStyles: {
        0: { cellWidth: 35 }, // Date
        1: { cellWidth: 'auto' }, // Description
        2: { cellWidth: 15 }, // Type (reduced)
        3: { cellWidth: 30 }, // Amount (increased)
        4: { cellWidth: 20 }, // Status
      }
    });

    doc.save("pursfi_statement.pdf");
  };
  
  // Determine which data to show
  const displayData = supabaseTransactions.length > 0 ? supabaseTransactions : (data?.data?.data || []);

  return (
    <div className="flex flex-col space-y-3 bg-white shadow p-2">
      <span className="flex items-center justify-between py-3">
        <p className="font-medium">Recent Transaction</p>{" "}
        <Link
          href="/transactions"
          className="text-gray-600 text-sm underline cursor-pointer"
        >
          See all
        </Link>
      </span>
      <>
        {displayData.length > 0 ? (
          <>
            {displayData.map((e: Record<string, any>, i: React.Key) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <span className="flex space-x-3 items-center">
                  {(e?.transactionType === "debit" || e?.type === "debit") ? (
                    <p className=" rounded-full p-2 font-medium  bg-[#FF39561A]/[10%] text-[#FF3956] text-xs">
                      DR
                    </p>
                  ) : (
                    <p className=" rounded-full p-2 font-medium  bg-[#0AA07B]/[10%] text-[#0AA07B] text-xs">
                      CR
                    </p>
                  )}

                  <div className="flex flex-col">
                      <p className="font-medium text-sm">{e?.accountName || e?.description}</p>
                      <p className="text-xs text-gray-400">{new Date(e?.date || e?.created_at || e?.createdAt || Date.now()).toLocaleString("en-US", {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit"
                      })}</p>
                  </div>
                </span>
                <p className={`font-medium text-sm ${(e?.transactionType === "debit" || e?.type === "debit") ? 'text-red-500' : 'text-green-600'}`}>
                  {(e?.transactionType === "debit" || e?.type === "debit") ? '-' : '+'}
                  &#8358;{Number(e?.amount || 0).toLocaleString("en-US")}
                </p>
              </div>
            ))}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-2 p-3">
            <h2 className="text-xl font-semibold">
              Hi{" "}
              {profile?.firstName &&
                profile.firstName.charAt(0).toUpperCase() +
                  profile.firstName.slice(1)}
            </h2>{" "}
            <p className="text-sm text-gray-500 text-center max-w-xs">
              There isn't a transaction for pursbusiness yet. Click here to Add
              fund
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn btn-md btn-transparent hover:btn-transparent text-black text-sm normal-case"
            >
              + Add Fund
            </button>
          </div>
        )}
      </>
      <DashboardModal open={isModalOpen} setOpen={setIsModalOpen} />
    </div>
  );
};

export default DashboardTable;
