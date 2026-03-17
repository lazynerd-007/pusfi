"use client";
import { Select } from "antd";
import React, { useEffect } from "react";
import DetailsTab from "./DetailsTab";
import { useRouter } from "next/navigation";
import {
  CustomButton as Button,
  CustomSwitch as Switch,
} from "@/lib/AntdComponents";
import AddIcon from "@/assets/icon/AddIcon";
import {
  useGetSinglePayrollQuery,
  useTogglePayrollMutation,
  useLazyGetPayrollDashboardAnalyticsQuery,
  useLazyGetPayrollOverviewQuery,
} from "@/services/payrollService";
import { useAppSelector } from "@/store/hooks";
import { useSearchParams } from "next/navigation";

const Details = () => {
  const params = useSearchParams();
  const { push } = useRouter();
  const { data, isLoading } = useGetSinglePayrollQuery(params.get("id"));
  const [getAnalytics, { isLoading: isLoadingAnalytics, data: analytics }] =
    useLazyGetPayrollOverviewQuery();
  const [togglePayroll, { isLoading: isTogglingPayroll }] =
    useTogglePayrollMutation();
  const profile = useAppSelector((store) => store?.user?.user);
  useEffect(() => {
    if (params.get("id")) {
      getAnalytics({ id: params.get("id") });
    }
  }, [params.get("id")]);
  return (
    <section className="max-w-[1640px] flex flex-col p-4 h-screen overflow-y-scroll space-y-4 bg-[#FAFAFA]">
      <header className="flex justify-between items-center">
        <span>
          <p className="text-[32px] text-[#061A14] font-bold">
            Payroll Details
          </p>
          <p className="font-normal text-[14px] text-[#84818A]">
            Showing your Account metrics for July 19, 2021 - July 25, 2021
          </p>
        </span>
        {/* <Select
          className="!w-fit !h-[3rem]"
          options={[
            { value: "1 month", label: "1 month" },
            { value: "2 month", label: "2 month" },
          ]}
          placeholder="Show stats Yearly"
        /> */}
        <span>
          <Switch
            loading={isTogglingPayroll}
            onChange={() => {
              togglePayroll({
                payrollId: params.get("id"),
                businessId: profile?.businessId,
              });
            }}
            value={data?.data?.status === "active"}
          />
        </span>
      </header>
      <div className="space-y-4">
        <div className="flex justify-between items-start ">
          {/* <div className="flex flex-col items-start space-y-4 ">
            <h2 className="text-[18px] text-[#061A14] font-medium">
              Add employees and contractors
            </h2>
            <span className="bg-white rounded-[5px] px-[20px] py-[18px] flex flex-col gap-2">
              <h6 className="text-[#181336] text-[16px] font-[700]">Add One</h6>
              <span className="flex items-center gap-2">
                <p className="text-[] text-[14px] font-[400]">
                  Add Single Employee or a Contractor in Second
                </p>
                <Button
                  className="!flex !m-auto !items-center !border-0"
                  icon={<AddIcon />}
                  onClick={() => push(`/add-member?id=${params.get("id")}`)}
                />
              </span>
            </span>
          </div> */}
          {/* <button
          // onClick={() => setIsModalOpen(true)}
          className="btn btn-md  bg-black hover:bg-black text-white text-sm normal-case"
        >
          + Run Payroll
        </button> */}
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-[#181336]">
          <span className="bg-white rounded-[4px] py-4 px-6 flex flex-col justify-between gap-6">
            <p className="text-base">Total Member</p>
            {isLoadingAnalytics ? (
              <span className="loading loading-dots loading-xs"></span>
            ) : (
              <p className="text-[30px] font-semibold">
                {Number(analytics?.data?.members || 0).toLocaleString()}
              </p>
            )}
          </span>
          <span className="bg-white rounded-[4px] py-4 px-6 flex flex-col justify-between gap-6">
            <p className="text-base">Gross Amount</p>
            {isLoadingAnalytics ? (
              <span className="loading loading-dots loading-xs"></span>
            ) : (
              <p className="text-[30px] font-semibold">
                &#8358;
                {Number(analytics?.data?.gross_pay || 0).toLocaleString()}
              </p>
            )}
          </span>
          <span className="bg-white rounded-[4px] py-4 px-6 flex flex-col justify-between gap-6">
            <p className="text-base">Total Deduction Amount</p>
            {isLoadingAnalytics ? (
              <span className="loading loading-dots loading-xs"></span>
            ) : (
              <p className="text-[30px] font-semibold">
                &#8358;
                {Number(analytics?.data?.deductions || 0).toLocaleString()}
              </p>
            )}
          </span>
          <span className="bg-white rounded-[4px] py-4 px-6 flex flex-col justify-between gap-6">
            <p className="text-base">Total net paid</p>
            {isLoadingAnalytics ? (
              <span className="loading loading-dots loading-xs"></span>
            ) : (
              <p className="text-[30px] font-semibold">
                &#8358;
                {Number(analytics?.data?.net_pay || 0).toLocaleString()}
              </p>
            )}
          </span>
        </div>
        <div>
          <DetailsTab id={params.get("id")!} />
        </div>
      </div>
    </section>
  );
};

export default Details;
