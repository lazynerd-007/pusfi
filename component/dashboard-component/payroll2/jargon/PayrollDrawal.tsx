import { Drawer } from "antd";
import {
  CustomButton as Button,
  CustomSpinner as Spinner,
} from "@/lib/AntdComponents";
import DeleteMemberModal from "./DeleteMemberModal";
import Link from "next/link";
import { useLazyGetSingleBeneficiaryQuery } from "@/services/payrollService";
import { useEffect, useState } from "react";
import { HiOutlineUserCircle } from "react-icons/hi2";
interface PayrollDetailsProps {
  Open: boolean;
  onClose: () => void;
  id: string;
  invalidateAction: () => void;
}

const PayrollDrawal: React.FC<PayrollDetailsProps> = ({
  Open,
  onClose,
  id,
  invalidateAction,
}) => {
  const [getBeneficiary, { isLoading, data, isFetching }] =
    useLazyGetSingleBeneficiaryQuery();
  useEffect(() => {
    if (id)
      getBeneficiary(id)
        .unwrap()
        .then((res) => {})
        .catch((err) => {});
  }, [id]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  return (
    <>
      <Drawer
        placement="right"
        className="!relative"
        onClose={onClose}
        open={Open}
      >
        <>
          {isLoading || isFetching ? (
            <div className="flex items-center justify-center h-[80vh] w-full absolute opacity-[0.7] bg-gray-100 z-[100]">
              <Spinner className="!m-auto !block" />
            </div>
          ) : (
            <>
              <div className="flex flex-col justify-center items-center  h-[120px]">
                {/* <h1
                className={`leading-tight font-semibold text-3xl ${getAmountColorClass(
                  data?.data?.transactionType
                )}`}
              >
                {data?.data?.transactionType === "debit" ? "-" : "+"}
                {data?.data?.amount}
              </h1> */}
                <div className="mx-auto flex items-center justify-center">
                  <HiOutlineUserCircle className="text-[40px]" />
                </div>

                <p className="text-[#181336] text-[20px] font-[600] capitalize">
                  {data?.data?.firstName} {data?.data?.lastName}
                </p>
                <p className="text-[#515B6F] text-[12px] font-[400] mt3 uppercase">
                  {data?.data?.employmentType}
                </p>
              </div>
              <h1 className="font-bold p-2">Payroll Details</h1>
              <div className="p-4 border border-gray-100 space-y-4 mt-5">
                <div className="grid grid-cols-[40%_60%] gap-y-4 gap-x-[1%] px-[1%]">
                  <div className="text-slate-500 pr-2">Email:</div>
                  <div className="leading-tight font-semibold">
                    {data?.data?.email}
                  </div>
                  <div className="text-slate-500 pr-2">Salary :</div>
                  <div className="leading-tight font-semibold">
                    &#8358;
                    {Number(data?.data?.salary || 0).toLocaleString("en-US")}
                  </div>
                  <div className="text-slate-500 pr-2">HireDate:</div>
                  <div className="leading-tight font-semibold">
                    {new Date(data?.data?.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        month: "long",
                        day: "2-digit",
                        year: "numeric",
                      }
                    )}
                  </div>
                  <div className="text-slate-500 pr-2">Bank Name:</div>
                  <div className="leading-tight font-semibold">
                    {data?.data?.bankName}
                  </div>
                  <div className="text-slate-500 pr-2">Account Number:</div>
                  <div className="leading-tight font-semibold">
                    {data?.data?.accountNumber}
                  </div>
                  <div className="text-slate-500 pr-2">Reference:</div>
                  <div className="leading-tight font-semibold break-words">
                    {data?.data?.reference}
                  </div>
                </div>
                <div className="border border-gray-200"></div>
              </div>
              {/* <span className="mt-6">
              <p className="font-semibold">Transaction Memo</p>
              <p className="text-slate-500 text-md">{`${
                data?.data?.memo || data?.data?.notification || ""
              }`}</p>
            </span> */}
              <div className="my-6 space-y-4">
                <Button
                  type="primary"
                  onClick={() => setOpenDeleteModal(true)}
                  className="!h-[3rem] !bg-[#000] w-full text-white hover:!text-white"
                >
                  Delete Member
                </Button>
                <Link
                  href={`/update-payroll-beneficiary?id=${id}`}
                  className="h-[3rem] bg-transparent w-full rounded-[5px] border border-solid border-[#000000] py-[12px] px-[24px] block text-center text-[16px] font-[500] text-[#000000] hover:text-[#000000]"
                >
                  Edit Details
                </Link>
              </div>
            </>
          )}
        </>
      </Drawer>
      <DeleteMemberModal
        id={id}
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        closeDrawal={onClose}
        invalidateAction={invalidateAction}
      />
    </>
  );
};

export default PayrollDrawal;
