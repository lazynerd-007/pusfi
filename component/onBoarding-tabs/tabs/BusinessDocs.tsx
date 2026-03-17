"use client";
import {
  CustomInput as Input,
  CustomUpload as Upload,
  CustomButton as Button,
} from "@/lib/AntdComponents";
import LinkIcon from "@/assets/icon/LinkIcon";
import type { UploadProps } from "antd";
import { message } from "antd";
import { RcFile } from "antd/es/upload";
import { docsData } from "../OnBoardingTabs";
import { SetStateAction, FormEventHandler, ChangeEventHandler } from "react";
import { useBusinessProfileQuery } from "@/services/authService";
const BusinessDocs = ({
  formData,
  setFormData,
  setActive,
  businessProfile: business,
}: {
  formData: Record<string, any>;
  setFormData: React.Dispatch<SetStateAction<docsData>>;
  setActive: React.Dispatch<SetStateAction<string>>;
  businessProfile: any;
}) => {
  const checkFileSize = (file: RcFile) => {
    const isLt2M = file.size / 1024 / 1024 < 5;
    if (!isLt2M) {
      message.error("Image must must be less than 5MB!");
    }
    return isLt2M;
  };
  const props: UploadProps = {
    name: "file",
    multiple: false,
    accept: ".jpg,.jpeg,.png,application/pdf,application/doc",
    onDrop(e) {
      // console.log("Dropped files", e.dataTransfer.files);
    },
    // accept: "image/png,image/jpeg,video/mp4",
  };
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!formData?.bills) {
      message.error("utitlity bill is required");
    }
    if (
      (formData?.certIncorporation ||
        business?.merchantType === "individual") &&
      formData?.bills
    ) {
      setActive("4");
    } else {
      message.error("cac and utitlity bills are required");
    }
  };
  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target?.name]: e.target?.value,
    }));
  };
  return (
    <main>
      <span>
        <h2 className="text-black font-semibold mb-1">
          Please submit your business documentation
        </h2>
        <p className="text-sm">
          Ensure the business documentation you are submitting is valid
        </p>
      </span>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-white w-full mt-4 p-3 rounded-md"
      >
        <article className="flex flex-col md:flex-row space-x-14 p-2 border-b ">
          <div className="w-[28%]">
            <h2 className="text-black font-semibold mb-1">
              Tax Identification Number{" "}
            </h2>
            <p className="text-sm">
              A Taxpayer Identification Number (TIN) is an identification number
              used by the Federal Internal Revenue Service (FIRS) in the
              administration of tax laws.
            </p>
          </div>{" "}
          <div className=" w-2/4">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="text"
            >
              Tax Identification Number (TIN)
            </label>
            <Input
              name="TIN"
              required
              onChange={handleChange}
              id="text"
              type="text"
              placeholder="TIN"
            />
          </div>
        </article>
        <article className="flex flex-col md:flex-row space-x-14 p-2 border-b ">
          <div className="w-[28%]">
            <h2 className="text-black font-semibold mb-1">
              Certification Of Incorporation
            </h2>
            <p className="text-sm">
              A certificate of incorporation is a document given by the
              companies regulation agency of a country. Note: Limited 2mb
            </p>
          </div>
          <div className="w-2/4">
            <div className="grid grid-cols-1 gap-[0.1rem] items-stretch">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Upload ID
              </label>
              <Upload
                {...props}
                onRemove={(file) => {
                  setFormData((prev) => ({ ...prev, certIncorporation: null }));
                }}
                beforeUpload={(file) => {
                  if (checkFileSize(file)) {
                    setFormData((prev) => ({
                      ...prev,
                      certIncorporation: file,
                    }));
                  }
                  return false;
                }}
                className="border border-dashed h-[80px] p-4"
              >
                <span className="flex items-center gap-[0.2rem] justify-center stroke-[#515B6F] hover:stroke-[#000000]">
                  <LinkIcon className="stroke-inherit" />
                  <p className="text-[#515B6F] text-[16px] font-[500]">
                    Attach Document
                  </p>
                </span>
              </Upload>
            </div>
          </div>
        </article>
        <article className="flex flex-col md:flex-row space-x-14 p-2 border-b ">
          <div className="w-[28%]">
            <h2 className="text-black font-semibold mb-1">
              Memorandum And Articles Of Association{" "}
            </h2>
            <p className="text-sm">
              A memorandum of association - a legal statement signed by all
              initial shareholders or guarantors agreeing to form the company.
              articles of association - written rules about running the company
              agreed by the shareholders Note: Limited 2mb
            </p>
          </div>
          <div className=" w-2/4">
            <div className="grid grid-cols-1 gap-[0.1rem] items-stretch">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Attach your memorandum and articles of association{" "}
              </label>
              <Upload
                {...props}
                onRemove={(file) => {
                  setFormData((prev) => ({
                    ...prev,
                    memorandumAssociation: null,
                  }));
                }}
                beforeUpload={(file) => {
                  if (checkFileSize(file)) {
                    setFormData((prev) => ({
                      ...prev,
                      memorandumAssociation: file,
                    }));
                  }
                  return false;
                }}
                className="border border-dashed h-[80px] p-4"
              >
                <span className="flex items-center gap-[0.2rem] justify-center stroke-[#515B6F] hover:stroke-[#000000]">
                  <LinkIcon className="stroke-inherit" />
                  <p className="text-sm font-semibold">Attach Document</p>
                </span>
              </Upload>
            </div>
          </div>
        </article>
        <article className="flex flex-col md:flex-row space-x-14 p-2 border-b ">
          <div className="w-[28%]">
            <h2 className="text-black font-semibold mb-1">Form CAC7 </h2>
            <p className="text-sm">
              The Corporate Affairs Commission (CAC) is the statutory body
              charged with the administration of the Companies and Allied
              Matters Act (the Act) which includes the regulation and
              supervision of the formation Note: Limited 2mb
            </p>
          </div>
          <div className=" w-2/4">
            <div className="grid grid-cols-1 gap-[0.1rem] items-stretch">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Attach your corperate affairs commission{" "}
              </label>
              <Upload
                {...props}
                onRemove={(file) => {
                  setFormData((prev) => ({ ...prev, cac: null }));
                }}
                beforeUpload={(file) => {
                  if (checkFileSize(file))
                    setFormData((prev) => ({
                      ...prev,
                      cac: file,
                    }));
                  return false;
                }}
                className="border border-dashed h-[80px] p-4"
              >
                <span className="flex items-center gap-[0.2rem] justify-center stroke-[#515B6F] hover:stroke-[#000000]">
                  <LinkIcon className="stroke-inherit" />
                  <p className="text-sm font-semibold">Attach Document</p>
                </span>
              </Upload>
            </div>
          </div>
        </article>
        <article className="flex flex-col md:flex-row space-x-14 p-2 border-b ">
          <div className="w-[28%]">
            <h2 className="text-black font-semibold mb-1">Utility Bills </h2>
            <p className="text-sm">
              A utility bill is a monthly statement of the amount a household or
              business owes for essential services or utilities Note: Limited
              2mb
            </p>
          </div>{" "}
          <div className=" w-2/4">
            <div className="grid grid-cols-1 gap-[0.1rem] items-stretch">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Attach your utility bills{" "}
              </label>
              <Upload
                {...props}
                onRemove={(file) => {
                  setFormData((prev) => ({ ...prev, bills: null }));
                }}
                beforeUpload={(file) => {
                  if (checkFileSize(file))
                    setFormData((prev) => ({
                      ...prev,
                      bills: file,
                    }));
                  return false;
                }}
                className="border border-dashed h-[80px] p-4"
              >
                <span className="flex items-center gap-[0.2rem] justify-center stroke-[#515B6F] hover:stroke-[#000000]">
                  <LinkIcon className="stroke-inherit" />
                  <p className="text-sm font-semibold">Attach Document</p>
                </span>
              </Upload>
            </div>
          </div>
        </article>
        <div className="mt-3 flex space-x-10">
          <div className="w-[30%]"></div>
          <div className="w-2/4">
            <Button
              htmlType="submit"
              type="primary"
              className="!h-[3rem] bg-black w-full"
            >
              Save and Continue
            </Button>
          </div>
        </div>
      </form>
    </main>
  );
};

export default BusinessDocs;
