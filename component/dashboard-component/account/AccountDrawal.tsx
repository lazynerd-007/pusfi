import { Drawer } from "antd";
import {
  CustomButton as Button,
  CustomSpinner as Spinner,
} from "@/lib/AntdComponents";
import { useLazyGetSingleTransactionQuery } from "@/services/transactionService";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface AccountDetailsProps {
  Open: boolean;
  onClose: () => void;
  id: string;
}

const AccountDrawal: React.FC<AccountDetailsProps> = ({
  Open,
  onClose,
  id,
}) => {
  const [getTransaction, { isLoading, data, isFetching }] = useLazyGetSingleTransactionQuery();
  
  // Supabase State
  const supabase = createClient();
  const [supabaseTx, setSupabaseTx] = useState<any>(null);
  const [isSupabaseLoading, setIsSupabaseLoading] = useState(false);

  useEffect(() => {
    if (id) {
        // Try Supabase fetch first
        const fetchSupabaseTx = async () => {
            setIsSupabaseLoading(true);
            try {
                const { data: txData, error } = await supabase
                    .from('transactions')
                    .select('*')
                    .eq('id', id) // Assuming 'id' is the UUID primary key or reference
                    .single();
                
                // Fallback: check if 'id' matches 'reference' column
                if (!txData) {
                    const { data: txDataRef } = await supabase
                        .from('transactions')
                        .select('*')
                        .eq('reference', id)
                        .single();
                     if (txDataRef) {
                         setSupabaseTx(txDataRef);
                         setIsSupabaseLoading(false);
                         return;
                     }
                }

                if (txData) {
                    setSupabaseTx(txData);
                } else {
                    // If not found in Supabase 'transactions', try 'recent_transactions'
                     const { data: recentTxData } = await supabase
                        .from('recent_transactions')
                        .select('*')
                        .eq('id', id)
                        .single();
                     if (recentTxData) setSupabaseTx(recentTxData);
                }
            } catch (err) {
                console.error("Supabase Single Tx Fetch Error:", err);
            } finally {
                setIsSupabaseLoading(false);
            }
        };

        fetchSupabaseTx();

        // Also call legacy for redundancy (or if id is purely legacy)
        getTransaction(id)
            .unwrap()
            .then((res) => {})
            .catch((err) => {});
    }
  }, [id]);

  // Merge Data (Prioritize Supabase)
  const tx = supabaseTx || data?.data;
  const loading = isSupabaseLoading || (isLoading && !supabaseTx);

  const getAmountColorClass = (type: string) => {
    if (type === "debit") {
      return "text-red-500";
    } else {
      return "text-green-500";
    }
  };

  return (
    <Drawer
      placement="right"
      className="!relative"
      onClose={onClose}
      open={Open}
    >
      <>
        {loading ? (
          <div className="flex items-center justify-center h-[80vh] w-full absolute opacity-[0.7] bg-gray-100 z-[100]">
            <Spinner className="!m-auto !block" />
          </div>
        ) : (
          <>
            <div className="flex flex-col justify-center items-center  h-[120px]">
              <h1
                className={`leading-tight font-semibold text-3xl ${getAmountColorClass(
                  tx?.type || tx?.transactionType
                )}`}
              >
                &#8358;{(tx?.type === "debit" || tx?.transactionType === "debit") ? "-" : "+"}
                {Number(tx?.amount || 0).toLocaleString()}
              </h1>
              <p className="text-slate-700 mt-3 uppercase">
                {tx?.recipient_name || tx?.accountName || tx?.description || 'Transaction'}
              </p>
            </div>
            <h1 className="font-bold p-2">Transaction Information</h1>
            <div className="p-4 border border-gray-100 space-y-4 mt-5">
              <div className="grid grid-cols-[40%_60%] gap-y-4 gap-x-[1%] px-[1%]">
                <div className="text-slate-500 pr-2">Amount :</div>
                <div className="leading-tight font-semibold">
                  &#8358;{Number(tx?.amount || 0).toLocaleString()}
                </div>
                <div className="text-slate-500 pr-2">Date:</div>
                <div className="leading-tight font-semibold">
                  {new Date(tx?.created_at || tx?.createdAt || Date.now()).toLocaleDateString("en-US", {
                    month: "long",
                    day: "2-digit",
                    year: "numeric",
                  })}
                </div>
                <div className="text-slate-500 pr-2">Counter party:</div>
                <div className="leading-tight font-semibold">
                  {tx?.recipient_name || tx?.accountName || tx?.description || 'N/A'}
                </div>{" "}
                {(tx?.recipient_bank || tx?.bankName) && (
                  <>
                    <div className="text-slate-500 pr-2">Bank Name:</div>
                    <div className="leading-tight font-semibold">
                      {tx?.recipient_bank || tx?.bankName}
                    </div>
                  </>
                )}
                {(tx?.recipient_account || tx?.accountNumber) && (
                  <>
                    <div className="text-slate-500 pr-2">Account Number:</div>
                    <div className="leading-tight font-semibold">
                      {tx?.recipient_account || tx?.accountNumber}
                    </div>
                  </>
                )}
                <div className="text-slate-500 pr-2">Charges Fee:</div>
                <div className="leading-tight font-semibold">
                  &#8358;{tx?.fee || 0}
                </div>
                <div className="text-slate-500 pr-2">Reference:</div>
                <div className="leading-tight font-semibold break-words">
                  {tx?.reference || tx?.id || 'N/A'}
                </div>
                <div className="text-slate-500 pr-2">Status:</div>
                <div className={`leading-tight font-semibold capitalize ${tx?.status === 'success' ? 'text-green-600' : tx?.status === 'pending' ? 'text-yellow-600' : 'text-red-600'}`}>
                  {tx?.status || 'Unknown'}
                </div>
              </div>
              <div className="border border-gray-200"></div>
            </div>
            <span className="mt-6">
              <p className="font-semibold">Transaction Memo</p>
              <p className="text-slate-500 text-md">{`${
                tx?.description || tx?.narration || ""
              }`}</p>
            </span>
            <div className="my-6 space-y-4">
              <Button
                type="primary"
                className="!h-[3rem] !bg-[#000] w-full !text-white hover:!text-white"
                onClick={() => {
                  window.open(
                    `/receipt?reference=${tx?.reference || tx?.id}`,
                    "_blank"
                  );
                }}
                disabled={ tx?.status !== "success" }
              >
                Download Reciept
              </Button>
              {/* <Button className="!h-[3rem] !bg-transparent w-full">
                Report Transaction
              </Button> */}
            </div>
          </>
        )}
      </>
    </Drawer>
  );
};

export default AccountDrawal;
