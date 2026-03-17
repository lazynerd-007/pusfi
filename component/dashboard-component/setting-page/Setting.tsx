"use client";
import React from "react";
import SettingTab from "./SettingTab";

const Setting = () => {
  return (
    <div className="max-w-[1640px] flex flex-col p-4  h-screen overflow-y-scroll">
      <header className="flex flex-col space-y-5">
        <span>
          <h2 className="text-3xl font-bold"> Settings </h2>
        </span>
        <div className="bg-white px-2 rounded-md">
          <SettingTab />
        </div>
      </header>
    </div>
  );
};

export default Setting;
