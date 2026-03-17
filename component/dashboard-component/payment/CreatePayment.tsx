"use client";
import CreatePaymentTabs from "./CreatePaymentTabs";
import { GrFormPreviousLink } from "react-icons/gr";
import { useRouter } from "next/navigation";

const CreatePayment = () => {
  const { back } = useRouter();
  return (
    <div className="mx-auto flex flex-col py-2 px-6 h-screen overflow-y-scroll">
      <header className="flex flex-col md:flex-row justify-between items-center my-6">
        <span>
          <span className="text-2xl font-medium flex gap-1 items-center">
            <GrFormPreviousLink className="cursor-pointer" onClick={back} />
            <h2>Make Payment</h2>
          </span>
          <p className="text-sm text-gray-600">
            you can create one time payment, recurring or Schedule payment
          </p>
        </span>
      </header>
      <main className="grid grid-cols-1 gap-[2%]">
        <CreatePaymentTabs />
      </main>
    </div>
  );
};

export default CreatePayment;
