"use client";
import Airtel from "@/assets/Airtel Nigeria Logo.png";
import Glo from "@/assets/Globacom Limited Logo.png";
import Mtn from "@/assets/mtn.512x512.png"
import NineMobile from "@/assets/9mobile Logo.png";
import Image from "next/image";
import { CustomSelect as Select } from "@/lib/AntdComponents";
import { useRouter } from "next/navigation";
import TransactionHistoryTable from "./TransactionHistoryTable";
import AirtimeTopupModal from "./modals/AirtimeTopupModal";
import DataTopupModal from "./modals/DataTopupModal";
import MoreDetailsDrawer from "./MoreDetailsDrawer";
import {
  useGetBillPaymentAnalyticsQuery,
  useGetBillPaymentWalletQuery,
  useGetBillPaymentNetworksQuery,
} from "@/services/bill-payment";

const bundle = [
  <Image
    width={80}
    height={80}
    alt="airtel"
    src={Airtel
    }
  />,
  <Image
    width={80}
    height={80}
    alt="mtn"
    src={Mtn
    }
  />,
  <Image
    width={80}
    height={80}
    alt="9mobile"
    src={
      NineMobile
    }
  />,
  <Image
    width={80}
    height={80}
    alt="glo"
    src={
     Glo
    }
  />,
];
const AirtimeBundle = () => {
  const { push } = useRouter();
  const date = new Date();
  const { data: analytics, isLoading } = useGetBillPaymentAnalyticsQuery({});
  const { data: wallet, isLoading: isLoadingWallet } =
    useGetBillPaymentWalletQuery({});

  return (
    <div className="max-w-[1640px] flex flex-col p-4  h-screen overflow-y-scroll">
      <header className="flex flex-col space-y-6">
        <div className="flex items-center justify-between ">
          <span>
            <h2 className="text-3xl font-bold">
              Payment - {""}
              <span className="text-2xl text-[#515B6F] font-medium">
                Bill payment - {""}
              </span>
              <span className="text-xl text-[#515B6F] font-medium">
                Airtime Bundle
              </span>
            </h2>
            <p className="text-sm text-gray-600">
              Showing your Account metrics for{" "}
              {date.toLocaleString("en-US", {
                month: "long",
                day: "2-digit",
                year: "numeric",
              })}
            </p>
          </span>
          <div className="flex justify-end items-center space-x-5">
            {/* <button
              onClick={() => push("/quick-service")}
              className="btn btn-md border flex items-center bg-[#000] text-sm normal-case text-white hover:bg-[#000]"
            >
              + Quick Service
            </button> */}

            <Select
              className="!w-full !h-[3rem]"
              options={[
                { value: "1 month", label: "1 month" },
                { value: "2 month", label: "2 month" },
              ]}
              placeholder="Show stats Yearly"
            />
          </div>
        </div>
      </header>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-[#181336]">
        <span className="bg-white rounded-[4px] py-4 px-6 flex flex-col justify-between gap-6">
          <p className="text-base">Total airtime sent</p>
          {isLoading ? (
            <span className="loading loading-dots loading-xs"></span>
          ) : (
            <p className="text-[30px] font-semibold">
              &#8358;
              {Number(
                analytics?.data?.analytics?.sold?.airtime || 0
              ).toLocaleString()}
            </p>
          )}
        </span>
        <span className="bg-white rounded-[4px] py-4 px-6 flex flex-col justify-between gap-6">
          <p className="text-base">Total data sent</p>
          {isLoading ? (
            <span className="loading loading-dots loading-xs"></span>
          ) : (
            <p className="text-[30px] font-semibold">
              &#8358;
              {Number(
                analytics?.data?.analytics?.sold?.data || 0
              ).toLocaleString()}
            </p>
          )}
        </span>
        <span className="bg-white rounded-[4px] py-4 px-6 flex flex-col justify-between gap-6">
          <p className="text-base">Total amount</p>
          {isLoading ? (
            <span className="loading loading-dots loading-xs"></span>
          ) : (
            <p className="text-[30px] font-semibold">
              &#8358;
              {Number(
                analytics?.data?.analytics?.sold?.total || 0
              ).toLocaleString()}
            </p>
          )}
        </span>
        <span className="bg-white rounded-[4px] py-4 px-6 flex flex-col justify-between gap-6">
          <p className="text-base">Total Profit</p>
          {isLoading ? (
            <span className="loading loading-dots loading-xs"></span>
          ) : (
            <p className="text-[30px] font-semibold">
              &#8358;
              {Number(analytics?.data?.analytics?.profit || 0).toLocaleString()}
            </p>
          )}
        </span>
      </div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {analytics?.data?.networks?.map(
          (item: Record<string, any>, index: number) => (
            <div
              key={index}
              className="text-black bg-white rounded-[4px] py-4 px-6 space-y-2"
            >
              <div className="md:flex justify-between gap-4 space-y-4 md:space-y-0">
                <span className="flex gap-4">
                  {bundle[index]}
                  <p className="text-[18px] pt-4 md:pt-2">{item.description}</p>
                </span>
                <button
                  onClick={() => push(`/sell-service?id=${index + 1}`)}
                  className="btn btn-md border-[#E9EBEB] flex items-center bg-white text-[14px] font-medium normal-case text-black hover:bg-[#f2f2f2]"
                >
                  + Sell Service
                </button>
              </div>
              <hr />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* <div className="flex gap-4"> */}
                <span className="bg-[#FAFAFA] rounded-[4px] py-4 px-6 flex flex-col justify-between gap-3">
                  <p className="text-[#515B6F] text-[14px]">
                    Total Airtime Remaining
                  </p>
                  <span className="flex  justify-between gap-4">
                    <p className="text-black font-semibold text-[16px]">
                      &#8358;
                      {Number(
                        item?.airtime?.totalAirtime || 0
                      ).toLocaleString()}
                    </p>
                    {/* <AirtimeTopupModal /> */}
                    <AirtimeTopupModal
                      provider={{ title: item?.title, network: index }}
                    />
                  </span>
                </span>
                <span className="bg-[#FAFAFA] rounded-[4px] py-4 px-6 flex flex-col justify-between gap-3">
                  <p className="text-[#515B6F] text-[14px]">
                    Total Data Bundle Remaining
                  </p>
                  <span className="flex justify-between gap-4">
                    <p className="text-black font-semibold text-[16px]">
                      &#8358;
                      {Number(item?.data?.totalData || 0).toLocaleString()}
                    </p>
                    {/* <DataTopupModal /> */}
                    <DataTopupModal
                      provider={{ title: item?.title, network: index }}
                    />
                  </span>
                </span>
              </div>
              {/* <span className="flex justify-center">
                <MoreDetailsDrawer
                  provider={item.provider}
                  product={item.product}
                />
              </span> */}
            </div>
          )
        )}
      </div>
      <div className="mt-8">
        <TransactionHistoryTable />
      </div>
    </div>
  );
};

export default AirtimeBundle;
