"use client";

import React, { Suspense, useState } from "react";

import { BiChevronRight } from "react-icons/bi";
import Pattern from "@/assets/circles-bg.png";
import Image from "next/image";
import Link from "next/link";
import DateAndStructureTabs from "./basic-details/DateAndStructureTabs";
import EmployeesAndContractors from "./members/EmployeesAndContractors";
import PayrollSettings from "../settings/PayrollSettings";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const Welcome = () => {
  const { push } = useRouter();
  return (
    <section className="max-w-[1640px] flex flex-col p-4  h-screen overflow-y-scroll space-y-8 bg-[#FAFAFA] text-black">
      <div className="px-4 py-6 bg-payroll-pattern bg-white grid grid-cols-8 gap-4">
        <div className="col-span-3 space-y-8">
          <p className="text-[35px] font-bold max-w-sm">
            Let’s set up your Payroll System
          </p>
          <div className="p-4 pt-16 bg-white shadow-md rounded-md w-max mt-6">
            <p className="max-w-sm">
              Payroll Precision: Balancing Compliance and Compassion for Your
              Team, Charting the Course for Employee Financial Success and Find
              How Payroll Fuels Organizational Success.
            </p>
          </div>
          <span className="flex gap-4">
            <p className="text-[18px] p-1.5 flex justify-center items-center w-[30px] h-[30px] rounded-full font-semibold text-white bg-black">
              ?
            </p>
            <Link
              href="/payroll-settings"
              className="text-[16px] font-bold underline py-1 text-[#181336]"
            >
              Need help with the Setup?
            </Link>
          </span>
        </div>
        <div className="col-span-5 space-y-4">
          <div className="bg-[#FAFAFA] p-4 rounded-lg flex flex-col gap-4">
            <span className="flex justify-between gap-4">
              <p className="text-[20px] font-bold text-[#181336]">
                Basic Detail
              </p>
              <p className="text-[16px] font-medium py-1 text-[#181336]">
                2 steps | 5mins
              </p>
            </span>
            <Link
              href="/payroll-settings"
              className="flex justify-between gap-4"
            >
              <span className="flex gap-4">
                <p className="text-[16px] p-1.5 flex justify-center items-center w-[24px] h-[24px] rounded-full border border-[#181336] font-medium text-[#181336]">
                  1
                </p>
                <p className="text-[16px] font-medium text-[#181336]">
                  Set up payroll date
                </p>
              </span>
              <BiChevronRight className="text-[#181336] w-6 h-6" />
            </Link>
            <Link
              href="/payroll-settings"
              className="flex justify-between gap-4"
            >
              <span className="flex gap-4">
                <p className="text-[16px] p-1.5 flex justify-center items-center w-[24px] h-[24px] rounded-full border border-[#181336] font-medium text-[#181336]">
                  2
                </p>
                <p className="text-[16px] font-medium text-[#181336]">
                  Set up Employee Salary Structure
                </p>
              </span>
              <BiChevronRight className="text-[#181336] w-6 h-6" />
            </Link>
          </div>
          <div className="bg-[#FAFAFA] p-4 rounded-lg flex flex-col gap-4">
            <span className="flex justify-between gap-4">
              <p className="text-[20px] font-bold text-[#181336]">Member</p>
              <p className="text-[16px] font-medium py-1 text-[#181336]">
                1 step | 5mins
              </p>
            </span>
            <Link
              href="/payroll-settings"
              className="flex justify-between gap-4"
            >
              <span className="flex gap-4">
                <p className="text-[16px] p-1.5 flex justify-center items-center w-[24px] h-[24px] rounded-full border border-[#181336] font-medium text-[#181336]">
                  1
                </p>
                <p className="text-[16px] font-medium text-[#181336]">
                  Add employees and contractors
                </p>
              </span>
              <BiChevronRight className="text-[#181336] w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

const Setup = () => {
  const params = useSearchParams();
  return (
    <section className="max-w-[1640px] flex flex-col p-4  h-screen overflow-y-scroll space-y-8 bg-[#FAFAFA] text-black">
      <Welcome />
    </section>
  );
};

const PayrollSetup = () => {
  return (
    <Suspense fallback={<></>}>
      <Setup />
    </Suspense>
  );
};

export default PayrollSetup;
