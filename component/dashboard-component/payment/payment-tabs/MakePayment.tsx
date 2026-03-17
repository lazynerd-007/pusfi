"use client";
import {
  useState,
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
} from "react";
import {
  CustomSelect as Select,
  CustomInput as Input,
  CustomInputNumber as InputNumber,
  CustomText as Text,
  CustomRadioGroup as RadioGroup,
  CustomButton as Button,
  CustomDatePicker as DatePicker,
  CustomTimePicker as TimePicker,
  CustomSpinner as Spinner,
  CustomUpload as Upload,
} from "@/lib/AntdComponents";
import {
  useGetBanksQuery,
  useVerifyAccountMutation,
  useSingleTransferMutation,
  useRecurringExpenditureMutation,
  useScheduledExpenditureMutation,
} from "@/services/disbursementService";
import { valueType } from "antd/es/statistic/utils";
import { useAppSelector } from "@/store/hooks";
import SuccessfulPaymentModal from "../modals/successfulPaymentModal";
import { message } from "antd";
import LinkIcon from "@/assets/icon/LinkIcon";
import dayjs from "dayjs";
import { UploadChangeParam, UploadFile } from "antd/es/upload";
import PinModal from "../../Modals/pinModal";
const options = [
  { label: "instant payment", value: "instant_payment" },
  { label: "Schedule Payment", value: "schedule_payment" },
  { label: "Recurring payment", value: "recurring_payment" },
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const amount: any = "";
const hour: any = "";
const min: any = "";
const day: any = "";
const month: any = "";
const initialState = {
  amount: amount,
  bankName: "",
  narration: "",
  businessId: "",
  transactionCategory: "",
  day,
  hour,
  month,
  fee: "0",
  accountName: "",
  min,
};
const initAcctDetails = {
  bankCode: "",
  accountNumber: "",
  currency: "NGN",
};
const MakePayment = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const profile = useAppSelector((store) => store?.user?.user);
  const [formdata, setFormdata] = useState(initialState);
  const { data } = useGetBanksQuery({});
  const [verify, { isLoading: isVerifying }] = useVerifyAccountMutation();
  const [transfer, { isLoading: isProcessing }] = useSingleTransferMutation();
  const [modal, setModal] = useState(false);
  const [isPinValid, setIsPinValid] = useState(false);
  const [recurring_transfer, { isLoading: isProcessing_recurring }] =
    useRecurringExpenditureMutation();
  const [scheduled_transfer, { isLoading: isProcessing_scheduled }] =
    useScheduledExpenditureMutation();
  const wallet = useAppSelector((store) => store?.user?.wallet);
  const [acctdetails, setAcctDetails] = useState(initAcctDetails);
  useEffect(() => {
    if (acctdetails.accountNumber.length === 10 && acctdetails.bankCode)
      verify(acctdetails)
        .unwrap()
        .then((res) => {
          setFormdata((prev) => ({
            ...prev,
            accountName: res?.data?.data,
          }));
        })
        .catch((err) => {});
  }, [acctdetails.accountNumber, acctdetails.bankCode]);
  const openModal: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setModal(true);
  };
  const handleSubmit = () => {
    if (
      formdata.accountName &&
      formdata.transactionCategory === options[0].value
    )
      transfer({
        ...formdata,
        ...acctdetails,
        amount: formdata?.amount.toString(),
        businessId: profile?.businessId,
      })
        .unwrap()
        .then((res) => {
          setIsModalOpen(true);
          setAcctDetails(initAcctDetails);
          setFormdata(initialState);
          setIsPinValid(false);
          // message.success("payment successful");
        })
        .catch((err) => {
          message.error(
            err?.data?.responseDescription || "something went wrong"
          );
          setIsPinValid(false);
        });
    else if (
      formdata.accountName &&
      formdata.transactionCategory === options[1].value
    ) {
      if (!formdata?.day || !formdata?.hour) {
        message.error("please provide day and time");
        return;
      }
      scheduled_transfer({
        ...formdata,
        ...acctdetails,
        amount: formdata?.amount.toString(),
        businessId: profile?.businessId,
        min: formdata?.hour?.split(":")[1],
        hour: formdata?.hour?.split(":")[0],
        day: formdata?.day?.split("-")[2],
        month: months[Number(formdata?.month?.split("-")[1]) - 1],
      })
        .unwrap()
        .then((res) => {
          setIsModalOpen(true);
          setAcctDetails(initAcctDetails);
          setFormdata(initialState);
          setIsPinValid(false);
          message.success("payment queued successful");
        })
        .catch((err) => {
          message.error(
            err?.data?.responseDescription || "something went wrong"
          );
          setIsPinValid(false);
        });
    } else if (
      formdata.accountName &&
      formdata.transactionCategory === options[2].value
    ) {
      if (!formdata?.day || !formdata?.hour) {
        message.error("please provide day and time");
        return;
      }
      recurring_transfer({
        ...formdata,
        ...acctdetails,
        amount: formdata?.amount.toString(),
        businessId: profile?.businessId,
        active: true,
        automatic: true,
        min: formdata?.hour?.split(":")[1],
        hour: formdata?.hour?.split(":")[0],
        day: formdata?.day?.split("-")[2],
        month: months[Number(formdata?.month?.split("-")[1]) - 1],
      })
        .unwrap()
        .then((res) => {
          setIsModalOpen(true);
          setAcctDetails(initAcctDetails);
          setFormdata(initialState);
          setIsPinValid(false);
          message.success("payment successful");
        })
        .catch((err) => {
          message.error(
            err?.data?.responseDescription || "something went wrong"
          );
          setIsPinValid(false);
        });
    }
  };
  const onSearchChange = (value: string, option: any) => {
    console.log(option);
    setAcctDetails((prev) => ({
      ...prev,
      bankCode: value,
      bankName: option?.label,
    }));
  };
  const onFormChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    setFormdata((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const onAccountNumChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setAcctDetails((prev) => ({ ...prev, accountNumber: e.target?.value }));
  };
  const maxSize = 3 * 1024 * 1024;
  const [fileError, setFileError] = useState<string | null>(null);

  const handleFileChange = (info: UploadChangeParam<UploadFile<any>>) => {
    console.log();
    if (info.file.size! > maxSize) {
      setFileError("File size exceeds the limit. Maximum allowed size is 3MB.");
    } else {
      setFileError(null);
      return info.file;
    }
  };

  useEffect(() => {
    if (isPinValid) {
      handleSubmit();
    }
  }, [isPinValid]);
  return (
    <>
      <form
        onSubmit={openModal}
        className="grid grid-cols-1 w-[80%] gap-[1.5rem] px-[3%] relative"
      >
        {isVerifying && (
          <div className="flex items-center justify-center h-[80vh] w-full absolute opacity-[0.7] bg-gray-100 z-[100]">
            <Spinner className="!m-auto !block" />
          </div>
        )}
        <span className="flex items-center justify-between gap-[2rem]">
          <span className="flex flex-col w-full">
            <label htmlFor="bank">Bank Name</label>
            <Select
              showSearch
              placeholder="select bank"
              optionFilterProp="label"
              onSelect={onSearchChange}
              id="bank"
              options={data}
            />
          </span>
          <span className="flex flex-col w-full">
            <label htmlFor="bank">Account Number</label>
            <Input
              onChange={onAccountNumChange}
              maxLength={10}
              minLength={10}
              value={acctdetails.accountNumber}
              required
              type="number"
              className="!w-full"
              placeholder=""
            />
          </span>
        </span>
        <span className="flex flex-col">
          <label htmlFor="acct_name">Account Name</label>
          <Input value={formdata.accountName} disabled={true} id="acct_name" />
        </span>
        <span className="flex items-center justify-between gap-[2rem]">
          <span className="flex flex-col w-full">
            <label htmlFor="bank">Select bank account to pay from</label>
            <Select
              id="bank"
              options={[{ label: wallet?.accountDetails?.accountName }]}
              value={wallet?.accountDetails?.accountName}
            />
          </span>
          <span className="flex flex-col w-full">
            <label htmlFor="bank">Amount</label>
            <InputNumber
              name="amount"
              value={formdata.amount}
              onChange={(value: valueType | null) =>
                setFormdata((prev) => ({ ...prev, amount: value }))
              }
              className="!w-full"
              prefix="&#8358;"
              placeholder=""
              required
            />
          </span>
        </span>
        <span className="flex flex-col">
          <label htmlFor="memo">Payment Memo</label>
          <Text
            name="narration"
            value={formdata.narration}
            onChange={onFormChange}
            required
            id="memo"
          />
        </span>
        <span className="flex flex-col">
          <label htmlFor="tag">Payment Tag</label>
          <RadioGroup
            id="tag"
            name="transactionCategory"
            onChange={(e) =>
              setFormdata((prev) => ({
                ...prev,
                transactionCategory: e.target.value,
              }))
            }
            options={options}
            value={formdata.transactionCategory}
            className="!flex !justify-start !gap-[4rem]"
          />
        </span>
        {(formdata.transactionCategory === options[2].value ||
          formdata.transactionCategory === options[1].value) && (
          <span className="flex flex-col gap-1">
            <label>Select Day</label>
            <span className="flex items-center justify-between gap-[2rem]">
              <DatePicker
                onChange={(value, date) => {
                  setFormdata((prev) => ({
                    ...prev,
                    day: date as string,
                    month: date as string,
                  }));
                }}
                value={formdata?.day ? dayjs(formdata?.day) : undefined}
                picker="date"
                className="!w-full"
              />
              <TimePicker
                format={"HH:mm"}
                value={
                  formdata?.hour ? dayjs(formdata?.hour, "HH:mm") : undefined
                }
                onChange={(value, date) => {
                  setFormdata((prev) => ({
                    ...prev,
                    hour: date as string,
                  }));
                }}
                className="!w-full "
              />
            </span>
          </span>
        )}
        {/* {formdata.transactionCategory === options[1].value && (
          <span className="flex flex-col gap-1">
            <label>Select Month</label>
            <span className="flex items-center justify-between gap-[2rem]">
              <DatePicker
                onChange={(value, date) => {
                  setFormdata((prev) => ({
                    ...prev,
                    month: date.split("-")[1],
                  }));
                }}
                picker="month"
                className="!w-full"
              />
            </span>
          </span>
        )} */}
        <span className="flex flex-col">
          <label htmlFor="info">Addition Information(optional)</label>
          <Text id="info" />
          <span className="flex justify-between">
            <p>Maximum 500 characters</p>
            <p>0 / 500</p>
          </span>
        </span>
        <div className="grid grid-cols-1 gap-[0.1rem] items-stretch">
          <label>Attachment (optional)</label>
          {fileError && <div style={{ color: "red" }}>{fileError}</div>}
          <Upload
            className="border border-dashed h-[75px] p-4"
            beforeUpload={(file) => {
              const isMax = file.size > maxSize;
              if (isMax) {
                setFileError(
                  "File size exceeds the limit. Maximum allowed size is 3MB."
                );
              }
            }}
            onChange={handleFileChange}
          >
            <span className="flex items-center gap-[0.2rem] justify-center stroke-[#515B6F] hover:stroke-[#000000]">
              <LinkIcon className="stroke-inherit" />
              <p className="text-sm font-semibold">Attach Doc</p>
            </span>
          </Upload>
        </div>
        <Button
          loading={
            isProcessing || isProcessing_recurring || isProcessing_scheduled
          }
          htmlType="submit"
          className="!bg-black !h-[45px]"
          type="primary"
        >
          Send Payment
        </Button>
      </form>
      <SuccessfulPaymentModal open={isModalOpen} setOpen={setIsModalOpen} />
      <PinModal modal={modal} setModal={setModal} setPinValid={setIsPinValid} />
    </>
  );
};

export default MakePayment;
