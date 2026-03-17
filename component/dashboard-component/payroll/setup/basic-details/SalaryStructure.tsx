import React, { useState } from "react";
import {
  CustomRadioGroup as RadioGroup,
  CustomButton as Button,
  CustomInput as Input,
  CustomSelect as Select,
} from "@/lib/AntdComponents";
import { InputNumber } from "antd";
import { RadioChangeEvent } from "antd/lib/radio";

import { FaCheckCircle } from "react-icons/fa";

const RadioOptions = [
  { label: "Use the Pursbusiness salary structure by default", value: true },
  { label: "Customize your salary structure", value: false },
];

const defaultOptions = [
  {
    label: "Base Salary",
    value: "Base Salary",
    percentage: 50,
    taxable: "yes",
  },
  { label: "HRA", value: "HRA", percentage: 25, taxable: "yes" },
  { label: "LTA", value: "LTA", percentage: 15, taxable: "yes" },
  {
    label: "Special Allowance",
    value: "Special Allowance",
    percentage: 10,
    taxable: "yes",
  },
];

const additionalOptions = [
  "Customize Allowance",
  "Customize Allowance",
  "Customize Allowance",
  "Customize Allowance",
  "Customize Allowance",
  "Customize Allowance",
  "Customize Allowance",
  "Customize Allowance",
  "Customize Allowance",
  "Customize Allowance",
];

const SalaryStructure = () => {
  const [useDefault, setUseDefault] = useState(true);
  const [values, setValues] = useState(Array(defaultOptions.length).fill(0));

  const handleRadioChange = (e: RadioChangeEvent) => {
    setUseDefault(e.target.value === "true");
  };

  const handleInputChange = (index: number, value: any) => {
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);
  };

  return (
    <section className="space-y-6">
      <span>
        <p className="font-semibold text-base">Salary Structure</p>
        <p className="font-normal text-base">
          This is Company information that you can update anytime.
        </p>
      </span>
      <form className="bg-white p-4 space-y-4">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <div className="space-y-2 w-full md:max-w-sm">
            <p className="font-semibold text-base">Default Salary Structure</p>
            <p className="font-normal text-base text-[#F6513B]">
              Note: take note of the following information
            </p>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <span className="flex gap-4">
              <FaCheckCircle className="inline w-4 h-4 mt-1" />
              <p className="font-normal text-base text-[#181336]">
                You can change the salary structure that Pursbusiness employs by
                default for your employees.
              </p>
            </span>
            <span className="flex gap-4">
              <FaCheckCircle className="inline w-4 h-4 mt-1" />
              <p className="font-normal text-base text-[#181336]">
                Lorem ipsum dolor sit amet consectetur. Enim ut vel diam sociis
                et cras amet. A turpis
              </p>
            </span>
          </div>
        </div>
        <hr />
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <div className="space-y-2 w-full md:max-w-sm">
            <p className="font-semibold text-base">Select your Option </p>
            <p className="font-normal text-base text-[#515B6F]">
              Lorem ipsum dolor sit amet consectetur. Ultrices et venenatis.
            </p>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <RadioGroup
              className="!flex !flex-col !gap-[1rem] !text-[16px]"
              options={RadioOptions}
              onChange={handleRadioChange}
              value={useDefault}
            />
            <div className="grid grid-cols-3 gap-4 pt-4">
              <span className="flex flex-col gap-3">
                <p className="font-medium text-base">Salary Component </p>
                {useDefault
                  ? defaultOptions.map((option, index) => (
                      <Input
                        key={index}
                        placeholder={option.label}
                        defaultValue={option.value}
                        variant="filled"
                      />
                    ))
                  : additionalOptions.map((option, index) => (
                      <Input
                        key={index}
                        placeholder={option}
                        // variant="filled"
                      />
                    ))}
              </span>
              <span className="flex flex-col gap-3">
                <p className="font-medium text-base">Percentage of Salary </p>
                {useDefault
                  ? defaultOptions.map((option, index) => (
                      <InputNumber
                        key={index}
                        addonAfter={"%"}
                        min={0}
                        max={100}
                        defaultValue={option.percentage} // Use defaultValue here
                        value={values[index]}
                        onChange={(value) => handleInputChange(index, value)}
                      />
                    ))
                  : additionalOptions.map((option, index) => (
                      <InputNumber
                        key={index}
                        addonAfter={"%"}
                        min={0}
                        max={100}
                        value={values[index]}
                        defaultValue={0} // Use defaultValue here
                        onChange={(value) => handleInputChange(index, value)}
                      />
                    ))}
              </span>
              <span className="flex flex-col gap-3">
                <p className="font-medium text-base">Taxable </p>
                {useDefault
                  ? defaultOptions.map((option, index) => (
                      <Select
                        key={index}
                        id={`date_${index}`}
                        defaultValue={option.taxable}
                        className="w-full"
                        options={[
                          { value: "yes", label: "Yes" },
                          { value: "no", label: "No" },
                        ]}
                      />
                    ))
                  : additionalOptions.map((option, index) => (
                      <Select
                        key={index}
                        id={`date_${index}`}
                        defaultValue="yes"
                        className="w-full"
                        options={[
                          { value: "yes", label: "Yes" },
                          { value: "no", label: "No" },
                        ]}
                      />
                    ))}
              </span>
            </div>
          </div>
        </div>
        <hr />
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <div className="space-y-2 w-full md:max-w-sm" />
          <div>
            <Button
              htmlType="submit"
              className="bg-black text-white hover:!text-white !h-[45px] font-semibold w-full text-base"
            >
              Save and Continue
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default SalaryStructure;
