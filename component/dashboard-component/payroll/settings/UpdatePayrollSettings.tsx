"use client";
import UpdateSettingsTabs from "./settings-tabs/UpdateSettingsTabs";
import { useSearchParams } from "next/navigation";

const UpdatePayrollSettings = () => {
  const params = useSearchParams();
  return (
    <div className="max-w-[1640px] flex flex-col p-4  h-screen overflow-y-scroll space-y-8">
      <header className="flex flex-col space-y-3 my-1">
        <div className="flex items-center justify-between ">
          <span>
            <h2 className="text-2xl font-medium">
              Update Payroll - <span className="text-gray-400">Setting</span>{" "}
            </h2>
          </span>
        </div>
      </header>
      <div className="bg-white p-2 rounded-md">
        {" "}
        <UpdateSettingsTabs id={params.get("id")!} />
      </div>
    </div>
  );
};

export default UpdatePayrollSettings;
