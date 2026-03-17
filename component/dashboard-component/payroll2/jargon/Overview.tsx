"use client";
import AddIcon from "@/assets/icon/AddIcon";
import { CustomButton as Button } from "@/lib/AntdComponents";
import OverviewTable from "./OverviewTable";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Overview = () => {
  const { push } = useRouter();
  return (
    <div className="max-w-[1640px] flex flex-col p-4  h-screen overflow-y-scroll space-y-8 bg-[#FAFAFA]">
      <header className="flex justify-between items-start ">
        <div className="flex flex-col items-start space-y-4 ">
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
                onClick={() => push("/add-payroll")}
              />
            </span>
          </span>
        </div>
        {/* <button
          // onClick={() => setIsModalOpen(true)}
          className="btn btn-md  bg-black hover:bg-black text-white text-sm normal-case"
        >
          + Run Payroll
        </button> */}
      </header>
      <OverviewTable />
    </div>
  );
};

export default Overview;
