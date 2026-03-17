import {
  CustomSelect as Select,
  CustomInputNumber as InputNumber,
  CustomRadioGroup as RadioGroup,
  CustomButton as Button,
  CustomUpload as Upload,
} from "@/lib/AntdComponents";
import "react-phone-input-2/lib/style.css";
import { RadioChangeEvent, message } from "antd";
import { FormEventHandler, useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import LinkIcon from "@/assets/icon/LinkIcon";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Airtel from "@/assets/Airtel Nigeria Logo.png";
import Glo from "@/assets/Globacom Limited Logo.png";
import Mtn from "@/assets/mtn.512x512.png";
import NineMobile from "@/assets/9mobile Logo.png";
import {
  useLazyGetBillPaymentDataPlansQuery,
  useSellAirtimeMutation,
  useSellDataPlanMutation,
} from "@/services/bill-payment";
import { useAppSelector } from "@/store/hooks";
import PinModal from "@/component/dashboard-component/Modals/pinModal";
const amount: any = 0;
const options1 = [
  { label: "instant payment", value: "instant" },
  { label: "Schedule Payment", value: "schedule" },
  { label: "Recurring payment", value: "recurring" },
];
const initialState = {
  product: "",
  provider: 0,
  amount,
  paymentType: options1[0].value,
  type: 0,
  recipient: "+234",
  businessId: "",
  plan: "",
};
const bundle = [
  {
    image: <Image width={80} height={80} alt="airtel" src={Airtel} />,
    provider: "Airtel",
  },
  {
    image: <Image width={80} height={80} alt="mtn" src={Mtn} />,
    provider: "MTN",
  },
  {
    image: <Image width={80} height={80} alt="9mobile" src={NineMobile} />,
    provider: "9mobile",
  },
  {
    image: <Image width={80} height={80} alt="glo" src={Glo} />,
    provider: "GLO",
  },
];
const MakePayment = ({ id }: { id: number }) => {
  const profile = useAppSelector((store) => store.user.business);

  const { back } = useRouter();
  const [formdata, setFormdata] = useState({
    ...initialState,
    provider: id,
    businessId: profile?.id,
  });
  const [getDataPlans, { data }] = useLazyGetBillPaymentDataPlansQuery({});
  const [sellData, { isLoading: isLoadingData }] = useSellDataPlanMutation();
  const [sellAirtime, { isLoading: isLoadingAirtime }] =
    useSellAirtimeMutation();
  const options = [
    { label: "specific account ", value: "specific account " },
    { label: "phone book", value: "phone book", disabled: true },
    { label: "upload number", value: "upload number", disabled: true },
  ];
  const [selectedOption, setSelectedOption] = useState(options[0].value);
  const [productType, setProductType] = useState("");
  const [modal, setModal] = useState(false);
  const [isPinValid, setIsPinValid] = useState(false);

  const openModal: FormEventHandler<HTMLFormElement> = (e) =>{
    e.preventDefault()
    setModal(true)
  }

  const handleRadioChange = (e: RadioChangeEvent) => {
    setSelectedOption(e.target.value);
  };
  const [activeTab, setActiveTab] = useState("employee");

  const handleTabClick = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };
  const handleSubmit  = () => {
  
    if (!productType) {
      message?.error("select product type");
    }
    if (!formdata?.recipient) {
      message?.error("please provide recipient information");
    }
    if (!formdata?.paymentType) {
      message.error("select payment type");
    }
    if (productType === "data") {
      if (!formdata?.plan) {
        message.error("please select plan");
      }
      sellData({
        ...formdata,
        product: productType,
        businessId: profile?.id,
        provider: id,
      })
        .unwrap()
        .then((res) => {
          message.success("Transaction successful");
          setFormdata({ ...initialState });
          setSelectedOption(options[0].value);
          setIsPinValid(false);
        })
        .catch((err) => {
          message.error(err?.data?.responseDescription || "Transaction failed");
          setIsPinValid(false)
        });
    }
    if (productType === "airtime") {
      if (!formdata?.amount) {
        message.error("please input amount");
      }
      sellAirtime({
        ...formdata,
        product: productType,
        businessId: profile?.id,
        provider: id,
      })
        .unwrap()
        .then((res) => {
          message.success("Transaction successful");
          setFormdata({ ...initialState });
          setSelectedOption(options[0].value);
          setIsPinValid(false);
        })
        .catch((err) => {
          message.error(err?.data?.responseDescription || "Transaction failed");
          setIsPinValid(false)
        });
    }
  };

  useEffect(() => {
    if (isPinValid) {
      handleSubmit();
    }
  }, [isPinValid]);
  return (
    <form
      onSubmit={openModal}
      className="grid grid-cols-1 gap-[1.5rem] px-[3%] relative mx-auto w-[70%]"
    >
      <div className="flex items-center space-x-4">
        {bundle[id - 1].image}
        <p className="font-semibold text-[22px]">
          {bundle[id - 1].provider} Service{" "}
        </p>
      </div>
      <span className="flex flex-col w-full">
        <label htmlFor="product">Select product</label>
        <Select
          options={[
            { label: "airtime", value: "airtime" },
            { label: "data plan", value: "data" },
          ]}
          onChange={(value) => {
            setProductType(value);
            if (value === "data") {
              getDataPlans({ id });
            }
          }}
          id="product"
          value={productType}
          placeholder="select product type"
        />
      </span>
      {productType === "data" && (
        <span className="flex flex-col w-full">
          <label htmlFor="product">Select data plan</label>
          <Select
            options={data || []}
            onChange={(value, obj: Record<string, any>) => {
              setFormdata((prev) => ({
                ...prev,
                amount: Number(obj?.amount),
                plan: value,
              }));
            }}
            id="product"
            value={formdata?.plan}
            placeholder="select product type"
          />
        </span>
      )}
      <span className="flex flex-col w-full">
        <label htmlFor="bank">Amount</label>
        <InputNumber
          name="amount"
          className="!w-full"
          prefix="&#8358;"
          placeholder=""
          required
          disabled={productType === "data"}
          value={formdata?.amount}
          onChange={(value) =>
            setFormdata((prev) => ({ ...prev, amount: value }))
          }
          min={50}
        />
      </span>
      {/* <RadioGroup
        id="tag"
        name="transactionCategory"
        options={options}
        className="!flex !justify-start !gap-[4rem]"
        onChange={handleRadioChange}
        defaultValue={options[0].value}
        value={selectedOption}
      /> */}

      {selectedOption === options[0].value && (
        <>
          <span className="flex flex-col w-full">
            <label htmlFor="bank">phone number</label>
            <PhoneInput
              country={"ng"}
              disableCountryGuess
              disableDropdown
              containerClass="!w-full"
              inputClass="phone-input-input !w-full !py-[6px] !border !border-gray-400 !rounded-md"
              onChange={(value) => {
                setFormdata((prev) => ({ ...prev, recipient: value }));
              }}
              value={formdata?.recipient}
            />
          </span>
          {/* <RadioGroup
            id="tag"
            name="transactionCategory"
            options={options1}
            className="!flex !justify-start !gap-[2rem]"
            onChange={(e) => {
              setFormdata((prev) => ({ ...prev, paymentType: e.target.value }));
            }}
            value={formdata?.paymentType}
          /> */}
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
              {activeTab === "contact" && ""}
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
                      <label htmlFor="service">Employee list</label>
                      <Select showSearch optionFilterProp="label" />
                    </span>
                    <span className="flex flex-col w-full">
                      <label htmlFor="product">Contact list</label>
                      <Select id="product" optionFilterProp="label" />
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
        className="!bg-[#000000] !text-white !h-[45px] !border-none"
        loading={isLoadingAirtime || isLoadingData}
      >
        Make Payment
      </Button>
      <Button
        onClick={back}
        htmlType="reset"
        className="!bg-transparent !h-[45px]"
      >
        Cancel
      </Button>

      <PinModal
      modal={modal}
      setModal={setModal}
      setPinValid={setIsPinValid}
       />
    </form>
  );
};

export default MakePayment;
