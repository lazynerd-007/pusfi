import HelpIcon from "@/assets/icon/HelpIcon";
import ArrowRight from "@/assets/icon/ArrowRight";

const OverviewNew = () => {
  return (
    <div className="overviewbg grid grid-cols-[40%_60%] bg-white">
      <span className="flex flex-col justify-between items-start">
        <h3 className="text-[#181336] text-[35px] font-[700]">
          Let’s set up your Payroll System
        </h3>
        <span className="flex items-center gap-1">
          <HelpIcon />
          <p className="text-black underline text-[16px] font-[700]">
            Need help with the Setup?
          </p>
        </span>
      </span>
      <span className="flex flex-col gap-4">
        <span className="bg-[#FAFAFA] rounded-[5px] px-[14px] py-[25px] flex flex-col gap-[2rem]">
          <span className="flex justify-between items-center">
            <h6 className="text-[#181336] text-[20px] font-[700]">
              Basic Detail
            </h6>
            <p className="text-[#181336] text-[16px] font-[500]">
              2 steps | 5mins
            </p>
          </span>
          <span className="w-full flex justify-between items-center cursor-pointer hover:shadow-lg">
            <span className="flex items-center gap-2">
              <span className="text-[#181336] text-[14px] font-[500] rounded-full border-[#181336] border p-[2%]">
                1
              </span>
              <p className="text-[#181336] text-[16px] font-[500]">
                Set up payroll date
              </p>
            </span>
            <ArrowRight />
          </span>
          <span className="w-full flex justify-between items-center cursor-pointer hover:shadow-lg">
            <span className="flex items-center gap-2">
              <span className="text-[#181336] text-[14px] font-[500] rounded-full border-[#181336] border p-[2%]">
                2
              </span>
              <p className="text-[#181336] text-[16px] font-[500]">
                Set up Employee Salary Structure
              </p>
            </span>
            <ArrowRight />
          </span>
        </span>
        <span className="bg-[#FAFAFA] rounded-[5px] px-[14px] py-[25px]">
          <span className="flex justify-between items-center">
            <h6 className="text-[#181336] text-[20px] font-[700]">Member</h6>
            <p className="text-[#181336] text-[16px] font-[500]">
              1 step | 5mins
            </p>
          </span>
        </span>
      </span>
    </div>
  );
};

export default OverviewNew;
