"use client";
import { useState } from "react";
import SettingsTabs from "./settings-tabs/SettingsTabs";

const PayrollSettings = () => {
  return (
    <div className="max-w-[1640px] flex flex-col p-4  h-screen overflow-y-scroll space-y-8">
      <header className="flex flex-col space-y-3 my-1">
        <div className="flex items-center justify-between ">
          <span>
            <h2 className="text-2xl font-medium">
              Payroll - <span className="text-gray-400">Setting</span>{" "}
            </h2>
            <p className="text-sm text-[#84818A]">
              Showing your Account metrics for July 19, 2021 - July 25, 2021
            </p>
          </span>
        </div>
      </header>
      <div className="bg-white p-2 rounded-md">
        {" "}
        <SettingsTabs />
      </div>
    </div>
  );
};

export default PayrollSettings;
