import {
  CustomSelect as Select,
  CustomInputNumber as InputNumber,
  CustomRadioGroup as RadioGroup,
  CustomButton as Button,
  CustomUpload as Upload,
} from "@/lib/AntdComponents";
import "react-phone-input-2/lib/style.css";
import { RadioChangeEvent } from "antd";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import LinkIcon from "@/assets/icon/LinkIcon";
const QuickSell = () => {
  const options = [
    { label: "specific account ", value: "specific account " },
    { label: "phone book", value: "phone book" },
    { label: "upload number", value: "upload number" },
  ];
  const options1 = [
    { label: "instant payment", value: "instant_payment" },
    { label: "Schedule Payment", value: "schedule_payment" },
    { label: "Recurring payment", value: "recurring_payment" },
  ];
  const [selectedOption, setSelectedOption] = useState("");

  const handleRadioChange = (e: RadioChangeEvent) => {
    setSelectedOption(e.target.value);
  };
  const [activeTab, setActiveTab] = useState("employee");

  const handleTabClick = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };
  return (
    <form className="grid grid-cols-1 gap-[1.5rem] px-[3%] relative">
      <span className="flex flex-col w-full">
        <label htmlFor="service">Select Service</label>
        <Select
          showSearch
          placeholder="select service"
          optionFilterProp="label"
        />
      </span>
      <span className="flex flex-col w-full">
        <label htmlFor="product">Select product</label>
        <Select id="product" placeholder="select product" />
      </span>

      <span className="flex flex-col w-full">
        <label htmlFor="bank">Amount</label>
        <InputNumber
          name="amount"
          className="!w-full"
          prefix="&#8358;"
          placeholder=""
          required
        />
      </span>
      <RadioGroup
        id="tag"
        name="transactionCategory"
        options={options}
        className="!flex !justify-start !gap-[4rem]"
        onChange={handleRadioChange}
      />

      {selectedOption === options[0].value && (
        <>
          <span className="flex flex-col w-full">
            <label htmlFor="bank">phone number</label>
            <PhoneInput
              country={"ng"}
              containerClass="!w-full"
              inputClass="phone-input-input !w-full !py-[6px] !border !border-gray-400 !rounded-md"
              disabled
            />
          </span>
          <div className=" flex justify-end items-end">
            <span className="border w-fit p-1">+ Add Number</span>
          </div>
          <RadioGroup
            id="tag"
            name="transactionCategory"
            options={options1}
            className="!flex !justify-start !gap-[2rem]"
          />
        </>
      )}
      {selectedOption === options[2].value && (
        <>
          <p>
            Note:{" "}
            <small>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio,
              aut.
            </small>
          </p>
          <div className="grid grid-cols-1 gap-[0.1rem] items-stretch">
            <label className="block text-gray-700 text-sm mb-2">
              upload number
            </label>
            <Upload className="border border-dashed h-[45px] p-4">
              <span className="flex items-center gap-[0.2rem] justify-center stroke-[#515B6F] hover:stroke-[#000000]">
                <LinkIcon className="stroke-inherit" />
                <p className="text-[#515B6F] text-[16px] font-[500]">
                  upload number
                </p>
              </span>
            </Upload>
          </div>
          <RadioGroup
            id="tag"
            name="transactionCategory"
            options={options1}
            className="!flex !justify-start !gap-[2rem]"
          />
        </>
      )}
      {selectedOption === options[1].value && (
        <>
          <p>Choose Contact</p>
          <div>
            <div className="flex space-x-4 items-start ">
              <Button
                onClick={() => handleTabClick("employee")}
                className={`!w-full ${
                  activeTab === "employee" ? "!bg-gray-200" : "!bg-transparent"
                }  `}
              >
                Employee
              </Button>
              <Button
                onClick={() => handleTabClick("contact")}
                className={`!w-full ${
                  activeTab === "contact" ? "!bg-gray-200" : "!bg-transparent"
                }  `}
              >
                Contact{" "}
              </Button>
              <Button
                onClick={() => handleTabClick("both")}
                className={`!w-full ${
                  activeTab === "both" ? "!bg-gray-200" : "!bg-transparent"
                }  `}
              >
                Both
              </Button>
            </div>
            <div className=" mt-2">
              {activeTab === "employee" && (
                <>
                  <>
                    <p>
                      Note:{" "}
                      <small>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        A nulla dolore consequuntur id commodi molestiae
                        repudiandae enim impedit, iste aliquam!
                      </small>
                    </p>
                    <span className="flex flex-col w-full mt-3">
                      <label htmlFor="service">Employee List</label>
                      <Select
                        showSearch
                        placeholder=""
                        optionFilterProp="label"
                      />
                    </span>
                  </>
                </>
              )}
              {activeTab === "contact" && "Contact"}
              {activeTab === "both" && (
                <>
                  <p>
                    Note:{" "}
                    <small>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. A
                      nulla dolore consequuntur id commodi molestiae repudiandae
                      enim impedit, iste aliquam!
                    </small>
                  </p>
                  <div className="flex items-center space-x-5 mt-4">
                    <span className="flex flex-col w-full">
                      <label htmlFor="service">Select Service</label>
                      <Select
                        showSearch
                        placeholder="select service"
                        optionFilterProp="label"
                      />
                    </span>
                    <span className="flex flex-col w-full">
                      <label htmlFor="product">Select product</label>
                      <Select id="product" placeholder="select product" />
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
          <RadioGroup
            id="tag"
            name="transactionCategory"
            options={options1}
            className="!flex !justify-start !gap-[2rem]"
          />
        </>
      )}
      <Button
        htmlType="submit"
        className="!bg-gray-300 !text-white !h-[45px] !border-none"
      >
        Make Payment
      </Button>
      <Button htmlType="submit" className="!bg-transparent !h-[45px]">
        Cancel
      </Button>
    </form>
  );
};

export default QuickSell;
