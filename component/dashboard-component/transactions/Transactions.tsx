"use client";
import TransactionTable from "./TransactionTable";

const Transactions = () => {
  const date = new Date();
  return (
    <div className="max-w-[1640px] flex flex-col p-4  h-screen overflow-y-scroll">
      <header className="flex flex-col space-y-6 my-6">
        <div className="flex items-center justify-between ">
          <span>
            <h2 className="text-3xl font-bold"> Transactions </h2>
            <p className="text-sm text-gray-600">
              Showing your Account metrics for{" "}
              {date.toLocaleString("en-US", {
                month: "long",
                day: "2-digit",
                year: "numeric",
              })}
            </p>
          </span>
          <div className="flex justify-center items-center ">
            {/* <Select
              className="!w-full"
              options={[
                { value: "1 month", label: "1 month" },
                { value: "2 month", label: "2 month" },
              ]}
              placeholder="Show stats Yearly"
            /> */}
          </div>
        </div>
      </header>
      <main className="grid grid-cols-1 mt-6">
        <TransactionTable />
      </main>
    </div>
  );
};

export default Transactions;
