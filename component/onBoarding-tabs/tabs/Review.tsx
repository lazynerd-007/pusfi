"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CustomCheckBox as CheckBox,
  CustomButton as Button,
} from "@/lib/AntdComponents";
import FileIcon from "@/assets/icon/FileIcon";
import { message } from "antd";
import { docsData } from "../OnBoardingTabs";
import { SetStateAction, FormEventHandler } from "react";
import { useCompleteBusinessOnboardingMutation } from "@/services/authService";
import { updateBusiness } from "@/store/userSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const Review = ({
  formData,
  setFormData,
  setActive,
}: {
  formData: Record<string, any>;
  setFormData: React.Dispatch<SetStateAction<docsData>>;
  setActive: React.Dispatch<SetStateAction<string>>;
}) => {
  const dispatch = useAppDispatch();
  const { business } = useAppSelector((state) => state?.user);
  
  const [checked, setChecked] = useState(false);
  const [create, { isLoading }] = useCompleteBusinessOnboardingMutation();
  const dataBody = new FormData();
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (checked) {
      for (const [key, value] of Object.entries(formData)) {
        dataBody.append(key, value);
      }
      create(dataBody)
        .unwrap()
        .then((res) => {
          dispatch(
            updateBusiness({ ...business, isOnboardingCompleted: true })
          );
          setActive("5");
         
        })
        .catch((err) => {
          message.error(
            err?.data?.responseDescription || "something went wrong"
          );
        });
    }
  };
  return (
    <main>
      <span className="flex flex-col">
        <h2 className="text-black font-semibold mb-1">
          Review your Application
        </h2>
        <p className="text-sm">
          This is the final view of your application. Make sure you meet all the
          registration requirements
        </p>
      </span>
      <div className="flex flex-col bg-white w-full mt-4 p-3 rounded-md">
        <div className="rounded-[5px] border border-[#E9EBEB] bg-[#FFF] items-center justify-between grid grid-cols-[10%_90%] px-[20px] py-[25px]">
          <FileIcon />
          <span className="flex flex-col gap-[0.2rem]">
            <h2 className="text-black font-semibold mb-1">
              Company Information
            </h2>
            <p className="text-sm">Personal information of the business </p>
          </span>
        </div>
        <div className="rounded-[5px] border border-[#E9EBEB] bg-[#FFF] items-center justify-between grid grid-cols-[10%_90%] px-[20px] py-[25px]">
          <FileIcon />
          <span className="flex flex-col gap-[0.2rem]">
            <h2 className="text-black font-semibold mb-1">Owner Information</h2>
            <p className="text-sm">business documentation</p>
          </span>
        </div>
        <div className="rounded-[5px] border border-[#E9EBEB] bg-[#FFF] items-center justify-between grid grid-cols-[10%_90%] px-[20px] py-[25px]">
          <FileIcon />
          <span className="flex flex-col gap-[0.2rem]">
            <h2 className="text-black font-semibold mb-1">Owner Information</h2>
            <p className="text-sm"> Document uploading</p>
          </span>
        </div>
        <form className="w-full" onSubmit={handleSubmit}>
          <span className="flex items-center gap-[0.5rem]">
            <CheckBox
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              id="check"
            />
            <label htmlFor="check">
              I confirm this information provided is accurate and legit.{" "}
            </label>
          </span>
          <Button
            htmlType="submit"
            loading={isLoading}
            className="!bg-[#000] !h-[3rem] !mx-auto w-[50%] !mt-4 !block"
            type="primary"
          >
            Submit Application
          </Button>
        </form>
      </div>
    </main>
  );
};

export default Review;
