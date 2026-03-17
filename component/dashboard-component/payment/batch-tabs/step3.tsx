import React, { useEffect, useState, useCallback } from "react";
import TableIcon from "@/assets/icon/TableIcon";
import {
  CustomButton as Button,
  CustomTable as Table,
} from "@/lib/AntdComponents";
import {
  useBulkTransferMutation,
  useVerifyAccountMutation,
} from "@/services/disbursementService";
import { ColumnsType } from "antd/es/table";
import { LoadingOutlined } from "@ant-design/icons";
import { message } from "antd";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import PinModal from "../../Modals/pinModal";
import SuccessfulPaymentModal from "../modals/successfulPaymentModal";

interface Bank {
  value: string;
  label: string;
}

interface Props {
  data: DataType[];
  prev: () => void;
  banks: Bank[];
}

interface DataType {
  key: string;
  accountname: string;
  accountnumber: string;
  bankname: string;
  status: string;
  amount: string;
  description: string;
  failedField?: string;
}

const Step3: React.FC<Props> = ({ data, prev, banks }) => {
  const [verifyAccount] = useVerifyAccountMutation({});
  const [bulkTransfer, { isLoading: bulkLoading }] = useBulkTransferMutation({});
  const { push } = useRouter();
  const [currentVerifyingAccount, setCurrentVerifyingAccount] = useState<string | null>(null);
  const [accountStatuses, setAccountStatuses] = useState<{ [key: string]: string }>({});
  const [tableData, setTableData] = useState<DataType[]>(data);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [modal, setModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPinValid, setIsPinValid] = useState(false);
  const businessId = useAppSelector((state) => state.user.user.businessId);

  const openModal = () => {
    setModal(true);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: (
        <span className="flex items-center space-x-2 text-[#7C8493] text-base">
          <p>Account Name</p>
          <TableIcon />
        </span>
      ),
      dataIndex: "accountname",
      render: (accountname, record) => (
        <span
          style={{
            color: accountStatuses[record.key] === "Failed" && record.failedField === "accountname" ? "red" : "",
          }}
        >
          {accountname}
        </span>
      ),
    },
    {
      title: (
        <span className="flex items-center space-x-2 text-[#7C8493] text-base">
          <p>Bank Name</p>
          <TableIcon />
        </span>
      ),
      dataIndex: "bankname",
      render: (bankname, record) => (
        <span
          style={{
            color: accountStatuses[record.key] === "Failed" && record.failedField === "bankname" ? "red" : "",
          }}
        >
          {bankname}
        </span>
      ),
    },
    {
      title: (
        <span className="flex items-center text-[#7C8493] text-base">
          <p>Account Number</p>
          <TableIcon />
        </span>
      ),
      dataIndex: "accountnumber",
      render: (accountnumber, record) => (
        <span
          style={{
            color: accountStatuses[record.key] === "Failed" && record.failedField === "accountnumber" ? "red" : "",
          }}
        >
          {accountnumber}
        </span>
      ),
    },
    {
      title: (
        <span className="flex items-center space-x-2 text-[#7C8493] text-base">
          <p>Amount</p>
          <TableIcon />
        </span>
      ),
      dataIndex: "amount",
      render: (amount) => `${amount}`,
    },
    {
      title: (
        <span className="flex items-center space-x-2 text-[#7C8493] text-base">
          <p>Narration</p>
          <TableIcon />
        </span>
      ),
      dataIndex: "description",
      render: (description) => `${description}`,
    },
    {
      title: (
        <span className="flex items-center space-x-2 text-[#7C8493] text-base">
          <p>Status</p>
          <TableIcon />
        </span>
      ),
      dataIndex: "status",
      render: (status, record) =>
        currentVerifyingAccount === record.key ? (
          <span className="p-[7%] text-[#FFD03A] text-center text-[14px] font-[600]">
            <LoadingOutlined style={{ fontSize: 24 }} spin />
          </span>
        ) : (
          <span
            className={`p-[7%] rounded-[80px] text-center text-[14px] font-[600] ${
              accountStatuses[record.key] === "Verified"
                ? "bg-green-100 text-green-600 !text-[14px]"
                : accountStatuses[record.key] === "Failed"
                ? "bg-red-100 text-red-600"
                : "bg-[#FFD03A]/[10%] text-[#FFD03A]"
            }`}
          >
            {accountStatuses[record.key] || status}
          </span>
        ),
    },
  ];

  const verifyAccounts = useCallback(async () => {
    if (data.length > 0 && banks?.length > 0) {
      setIsVerifying(true);
      for (const item of data) {
        const matchingBank = banks.find(
          (bank: any) =>
            bank.label.trim().toLowerCase() === item.bankname.trim().toLowerCase()
        );
        if (matchingBank) {
          setCurrentVerifyingAccount(item.key); // Set the current verifying account number
          const payload = {
            bankCode: matchingBank.value,
            accountNumber: item.accountnumber,
            currency: "NGN",
          };
          try {
            const response = await verifyAccount(payload).unwrap();
            const responseAccountName =
              response.data?.data?.trim().toLowerCase() || "";
            const isAccountNameMatched =
              responseAccountName === item.accountname.trim().toLowerCase();
            if (isAccountNameMatched) {
              if (matchingBank.label.trim().toLowerCase() === item.bankname.trim().toLowerCase()) {
                setAccountStatuses((prev) => ({ ...prev, [item.key]: "Verified" }));
              } else {
                setAccountStatuses((prev) => ({ ...prev, [item.key]: "Failed" }));
                setTableData((prevData) =>
                  prevData.map((dataItem) =>
                    dataItem.key === item.key
                      ? { ...dataItem, failedField: "bankname" }
                      : dataItem
                  )
                );
              }
            } else {
              setAccountStatuses((prev) => ({ ...prev, [item.key]: "Failed" }));
              setTableData((prevData) =>
                prevData.map((dataItem) =>
                  dataItem.key === item.key
                    ? { ...dataItem, failedField: "accountname" }
                    : dataItem
                )
              );
            }
          } catch (error) {
            setAccountStatuses((prev) => ({ ...prev, [item.key]: "Failed" }));
            setTableData((prevData) =>
              prevData.map((dataItem) =>
                dataItem.key === item.key
                  ? { ...dataItem, failedField: "accountnumber" }
                  : dataItem
              )
            );
          }
          setCurrentVerifyingAccount(null); // Reset the current verifying account number
        } else {
          setAccountStatuses((prev) => ({ ...prev, [item.key]: "Failed" }));
          setTableData((prevData) =>
            prevData.map((dataItem) =>
              dataItem.key === item.key
                ? { ...dataItem, failedField: "bankname" }
                : dataItem
            )
          );
        }
      }
      setIsVerifying(false);
    }
  }, [data, banks, verifyAccount]);

  const handleBulkTransfer = async () => {
    const verifiedTransfers = data
      .filter((item) => accountStatuses[item.key] === "Verified")
      .map((item) => {
        const matchingBank = banks.find(
          (bank: any) =>
            bank.label.trim().toLowerCase() ===
            item.bankname.trim().toLowerCase()
        );
        return {
          bankCode: matchingBank?.value || "",
          accountNumber: item.accountnumber,
          amount: String(item.amount),
          bankName: item.bankname,
          narration: item.description || `Payment from PursFi ${item.accountname}`,
        };
      });

    if (verifiedTransfers.length > 0) {
      const payload = {
        businessId, // use the business ID from the selector
        currency: "NGN",
        transactionCategory: "debit",
        transfers: verifiedTransfers,
      };

       bulkTransfer(payload).unwrap()
       .then(()=>{
        setIsModalOpen(true);
        setIsPinValid(false)
        push("/dashboard");
       }).catch((error)=>{
        message.error(error?.data?.responseDescription || "Batch payment failed", 5);
        console.error("Bulk transfer error:", error); // Add error logging
        setIsPinValid(false)
       });

    } else {
      message.error("No verified transfers available", 5);
    }
  };

  useEffect(() => {
    if (isPinValid) {
      handleBulkTransfer();
    }
  }, [isPinValid]);

  useEffect(() => {
    verifyAccounts();
  }, [verifyAccounts]);

  return (
    <section className="mt-5">
      <div className="flex justify-end gap-5">
        <Button
          className="!font-normal !border !border-black !text-base !h-11 !hover:bg-transparent"
          onClick={() => prev()}
        >
          Previous
        </Button>
        <Button
          loading={bulkLoading}
          className="!bg-black !font-normal !border-0 !text-white !text-base !hover:text-black !h-11"
          onClick={openModal}
          disabled={isVerifying}
        >
          {isVerifying ? "Verifying..." : "Batch Payment"}
        </Button>
      </div>
      <div className="bg-white px-2 py-5 mt-5">
        <Table
          columns={columns}
          dataSource={tableData}
          rowKey="key"
          pagination={{ pageSize: 10 }}
        />
      </div>

      <PinModal
        modal={modal}
        setModal={setModal}
        setPinValid={setIsPinValid}
      />
      <SuccessfulPaymentModal  open={isModalOpen} setOpen={setIsModalOpen} />
    </section>
  );
};

export default Step3;
