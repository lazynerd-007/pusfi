"use client";
import React, {
  ChangeEventHandler,
  FormEventHandler,
  SetStateAction,
} from "react";
import {
  CustomInput as Input,
  CustomSelect as Select,
  CustomText as TextArea,
  CustomButton as Button,
  ThemeRadioButton as RadioButton,
  ThemeRadioGroup as RadioGroup,
} from "@/lib/AntdComponents";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { docsData } from "../OnBoardingTabs";
const filterArray = [
  { label: "Individual", value: "individual" },
  { label: "Business", value: "business" },
  // { label: "Enterprise", value: "enterprise" },
  { label: "Limited Liability", value: "limited liability" },
];
const industry = [
  { value: "finance", label: "Finance" },
  { value: "tech", label: "Technology" },
  { value: "healthcare", label: "Healthcare" },
  { value: "education", label: "Education" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "entertainment", label: "Entertainment" },
  { value: "retail", label: "Retail" },
  { value: "real-estate", label: "Real Estate" },
  { value: "hospitality", label: "Hospitality" },
  { value: "automotive", label: "Automotive" },
  { value: "agriculture", label: "Agriculture" },
  { value: "telecommunications", label: "Telecommunications" },
  { value: "energy", label: "Energy" },
  { value: "consulting", label: "Consulting" },
  { value: "environment", label: "Environmental Services" },
];

const CompanyInfo = ({
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
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (formData.phone) setActive("2");
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
          Tell us about your Company
        </h2>
        <p className="text-sm">
          This is company information that can be updated anytime{" "}
        </p>
      </span>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-white w-full mt-4 p-3 rounded-md"
      >
        <article className="flex flex-col md:flex-row space-x-14 p-2 border-b ">
          <div className="w-[28%]">
            <h2 className="text-black font-semibold mb-1">
              Choose Merchant Type{" "}
            </h2>
          </div>{" "}
          <div className="w-[60%]">
            <h2 className="py-2">Merchant type</h2>
            <RadioGroup
              optionType="button"
              defaultValue={business?.merchantType}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  merchantType: e.target.value,
                }))
              }
            >
              <div className="flex w-full md:grid grid-cols-2 justify-start items-center gap-[0.5rem]">
                {filterArray
                  .filter((e) => e.value === business?.merchantType)
                  .map((e, i) => (
                    <div key={i}>
                      <RadioButton
                        style={{
                          borderWidth: "1px",
                          border:
                            business?.merchantType === "individual"
                              ? "#000"
                              : "#FFF",
                        }}
                        disabled
                        value={e.value}
                        key={i}
                        className="!border-[#000]/[10%]"
                      >
                        {e.label}
                      </RadioButton>
                    </div>
                  ))}
              </div>
            </RadioGroup>
            <p className="text-sm py-2 underline">
              View all the requirement document needed
            </p>
          </div>
        </article>
        <article className="flex flex-col md:flex-row space-x-14 p-2 border-b ">
          <div className="w-[28%]">
            <h2 className="text-black font-semibold mb-1">
              Tell us your business Name{" "}
            </h2>
            <p className="text-sm">
              This must be the name on your registration document. <br />
              <span className="text-red-400">
                Note: This name cannot be changed again
              </span>
            </p>
          </div>
          <div className=" w-2/4">
            <div className="">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="text"
              >
                Enter your Business name (without industry)
              </label>
              <Input
                name="businessName"
                value={business?.businessName}
                onChange={handleChange}
                disabled
                required
                id="text"
                type="text"
                placeholder="placeholder"
              />
            </div>
          </div>
        </article>
        <article className="flex flex-col md:flex-row space-x-14 p-2 border-b">
          <div className="w-[28%]">
            <h2 className="text-black font-semibold mb-1">
              Select your industry
            </h2>
            <p className="text-sm">
              Choose the industry closest to where your business operates.
            </p>
          </div>
          <div className="w-2/4">
            <div className="">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="text"
              >
                Select Industry
              </label>
              <Select
                showSearch
                optionFilterProp="label"
                className="!w-full"
                options={industry}
                placeholder="select industry"
                value={formData.BusinessIndustry}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, BusinessIndustry: value }))
                }
              />
            </div>
          </div>
        </article>
        <article className="flex flex-col md:flex-row space-x-14 p-2 border-b ">
          <div className="w-[28%]">
            <h2 className="text-black font-semibold mb-1">
              Tell us about your business
            </h2>
            <p className="text-sm">
              In a few sentences describe your company, product, and services
              you render.
            </p>
          </div>{" "}
          <div className=" w-2/4">
            <div className="">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="text"
              >
                About your Business
              </label>
              <TextArea
                value={formData.Description}
                onChange={handleChange}
                name="Description"
                required
                placeholder="Type your text here..."
                rows={5}
                cols={40}
                className="w-full bg-transparent border border-gray-200 p-2 outline-none focus:border-blue-300"
              />
              <p>{formData.Description.length}/500 characters</p>
            </div>
          </div>
        </article>
        <article className="flex flex-col md:flex-row space-x-14 p-2 border-b ">
          <div className="w-[28%]">
            <h2 className="text-black font-semibold mb-1">
              Verify your Company Location
            </h2>
            <p className="text-sm">
              We will require you to submit a copy of your utility bill
              associated with the address in the documentation part of the
              onboarding
            </p>
          </div>{" "}
          <div className=" w-2/4 space-y-3">
            <div className="">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="text"
              >
                Company address
              </label>
              <Input
                name="Address"
                value={formData.Address}
                onChange={handleChange}
                required
                id="text"
                type="text"
                placeholder="placeholder"
              />
            </div>
            <div className="">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="text"
              >
                Local government area{" "}
              </label>
              <Input
                name="lga"
                value={formData.lga}
                onChange={handleChange}
                required
                id="text"
                type="text"
                placeholder="lga"
              />
            </div>
            <div className="">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="state"
              >
                State
              </label>
              <Input
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                id="text"
                type="text"
                placeholder="state"
              />
            </div>
            <div className="">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="state"
              >
                Business Phone
              </label>
              <PhoneInput
                country={"ng"}
                containerClass="!w-full"
                inputClass="phone-input-input !w-full"
                value={formData.phone}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, phone: value }))
                }
              />
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

export default CompanyInfo;
