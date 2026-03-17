"use client";
import { CustomSteps as Steps } from "@/lib/AntdComponents";
import { useEffect, useMemo, useState } from "react";
import Done from "@/assets/icon/Done";
import StepIcon from "@/assets/icon/StepIcon";
import Step1 from "./batch-tabs/step1";
import Step2 from "./batch-tabs/step2";
import Step3 from "./batch-tabs/step3";
import StepSuccess from "@/assets/icon/StepSuccess";
import { CustomModal as Modal } from "@/lib/AntdComponents";
import Image from "next/image";
import csvImage from "@/assets/newCsv.png"; 
import Link from "next/link";

export interface Bank {
  value: string;
  label: string;
}

export interface DataType {
  key: string;
  accountname: string;
  accountnumber: string;
  bankname: string;
  status: string;
  amount: string;
  description: string
}

const BatchPayment = () => {
  const [current, setCurrent] = useState<number>(0);
  const [csvData, setCsvData] = useState("");
  const [data, setData] = useState<DataType[]>([]);
  const [modal, setModal] = useState(false);
  const [banks, setBanks] = useState<Bank[]>([]);
  const [csvParsed, setCsvParsed] = useState<boolean>(false);

  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  useEffect(()=>{
    setModal(true)
  },[])

  const steps = useMemo(
    () => [
      {
        title: (
          <div className="flex flex-col font-[400] text-[#2A2069] leading-[28.80px]">
            <p className="text-[16px]">Upload CSV</p>
            <p className="text-[14px]">Step 1/3</p>
          </div>
        ),
        content: <Step1 next={next} setCsvData={setCsvData} />,
        icon:
          current > 0 ? (
            <StepSuccess className="h-[56px]" />
          ) : (
            <StepIcon className="h-[56px]" />
          ),
      },
      {
        title: (
          <div className="flex flex-col font-[400] text-[#2A2069] leading-[28.80px]">
            <p className="text-[16px]">Review Transactions</p>
            <p className="text-[14px]">Step 2/3</p>
          </div>
        ),
        content: (
          <Step2 next={next} csvParsed={csvParsed} setCsvParsed={setCsvParsed} csvData={csvData} data={data} setData={setData} setBank={setBanks} />
        ),
        icon:
          current > 1 ? (
            <StepSuccess className="h-[56px]" />
          ) : (
            <StepIcon className="h-[56px]" />
          ),
      },
      {
        title: (
          <div className="flex flex-col font-[400] text-[#2A2069] leading-[28.80px]">
            <p className="text-[16px]">Batch Payment</p>
            <p className="text-[14px]">Step 3/3</p>
          </div>
        ),
        content: <Step3 data={data} prev={prev} banks={banks} />,
        icon:
          current == 2 ? (
            <StepSuccess className="h-[56px]" />
          ) : (
            <StepIcon className="h-[56px]" />
          ),
      },
    ],
    [current, data, setData]
  );
  const date = new Date();
  return (
    <div className="max-w-[1640px] flex flex-col p-4  h-screen overflow-y-scroll">
      <header className="flex flex-col md:flex-row justify-between items-center ">
        <span>
          <h2 className="text-3xl font-bold">
            {" "}
            Payment -{" "}
            <span className="text-2xl text-gray-400 font-medium">
              Batch Payment
            </span>
          </h2>
          <p className="text-sm text-gray-600">
            Showing your Account metrics for{" "}
            {date.toLocaleString("en-US", {
              month: "long",
              day: "2-digit",
              year: "numeric",
            })}
          </p>
        </span>
      </header>
      <div>
        <div className="flex flex-col justify-center items-center bg-white gap-[1rem] p-[1rem] mt-5">
          <div className="flex flex-col justify-between gap-[1.5rem] w-full">
            <Steps
              size="small"
              current={current}
              items={steps}
              className=" flex items-center"
            />
          </div>
        </div>
        <div className="w-full">{steps[current].content}</div>
      </div>

      <Modal open={modal} title="Attention" width={700} footer={false} onCancel={() => setModal(false)} maskClosable={false}>
        <div className=" p-2">
          <h2 className=" font-semibold text-base">
            Please make sure your CSV file headers match the one in the image
            below!!
          </h2>
          <p className=" text-xs">
            <span className=" font-semibold">NOTE: </span>It is important your table header contains only
            the following: key, Date, Account Name, Bank Name, Account Number,
            Amount, Description. If your CSV table does not match it you will see an empty
            table after upload
          </p>
          <div className="h-[300px] ">
            <Image
              src={csvImage}
              style={{ objectFit: "contain" }}
              alt="CSV"
              className=" w-full h-full"
            />
          </div>
          <div className="mt-4">
            <Link href="/Batch-Template.csv" download>
              <span className="bg-blue-500 text-white px-4 py-2 rounded">Download Sample CSV</span>
            </Link>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BatchPayment;
