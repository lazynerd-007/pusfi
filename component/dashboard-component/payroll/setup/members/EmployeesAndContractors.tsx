"use client";

import AddIcon from "@/assets/icon/AddIcon";
import { CustomButton as Button } from "@/lib/AntdComponents";
import { useRouter } from "next/navigation";
import Link from "next/link";
import EmployeesAndContractorsTabs from "./EmployeesAndContractorsTabs";

const EmployeesAndContractors = () => {
  const { push } = useRouter();
  return (
    <section className="max-w-[1640px] flex flex-col p-4 h-screen overflow-y-scroll space-y-8 bg-[#FAFAFA]">
      <header className="flex justify-between items-start ">
        <div className="flex flex-col items-start space-y-4 ">
          <span>
            <h2 className="text-[18px] text-[#061A14] font-semibold">
              Add employees and contractors
            </h2>
            <p className="font-normal text-base text-[#5A5C5C]">
              This is Company information that you can update anytime.
            </p>
          </span>
          <div className="md:flex gap-6">
            <span className="bg-white md:max-w-[300px] rounded-[5px] px-[20px] py-[18px] flex flex-col gap-2">
              <p className="text-[#181336] text-[16px] font-[700]">Add One</p>
              <span className="flex items-center gap-2">
                <p className="text-[#515B6F] text-[14px]">
                  Add Single Employee or a Contractor in Second
                </p>
                <Button
                  className="!flex !m-auto !items-center !border-0"
                  icon={<AddIcon />}
                  onClick={() => push("/add-payroll")}
                />
              </span>
            </span>
            <span className="bg-white md:max-w-[300px] rounded-[5px] px-[20px] py-[18px] flex flex-col gap-2">
              <p className="text-[#181336] text-[16px] font-[700]">
                Invite many
              </p>
              <span className="flex items-center gap-2">
                <p className="text-[#515B6F] text-[14px]">
                  Invite Employees or Contractors using their Email Addresses
                </p>
                <Button
                  className="!flex !m-auto !items-center !border-0"
                  icon={<AddIcon />}
                  onClick={() => push("/add-payroll/many")}
                />
              </span>
            </span>
          </div>
        </div>
      </header>
      {/* tabs */}
      <div>
        <EmployeesAndContractorsTabs />
      </div>
    </section>
  );
};

export default EmployeesAndContractors;
