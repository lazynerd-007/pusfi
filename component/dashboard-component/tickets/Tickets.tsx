"use client";
import React, { useState } from "react";
import CreateIcon from "@/assets/icon/CreateIcon";
import { CiSearch } from "react-icons/ci";
import { CustomSelect as Select } from "@/lib/AntdComponents";
import TicketTabs from "./TicketTabs";

const pirorityOptions = [
  {
    label: (
      <span className="flex items-center gap-[0.2rem]">
        <span className="w-[14px] h-[14px] bg-[#3B8AFF] rounded-full" />
        <p className="text-[14px] font-[400] text-[#000]">New Tickets</p>
      </span>
    ),
    value: "new_tickets",
  },
  {
    label: (
      <span className="flex items-center gap-[0.2rem]">
        <span className="w-[14px] h-[14px] bg-[#FAC885] rounded-full" />
        <p className="text-[14px] font-[400] text-[#000]">On-Going Tickets</p>
      </span>
    ),
    value: "ongoing_tickets",
  },
  {
    label: (
      <span className="flex items-center gap-[0.2rem]">
        <span className="w-[14px] h-[14px] bg-[#54C104] rounded-full" />
        <p className="text-[14px] font-[400] text-[#000]">Resolved Tickets</p>
      </span>
    ),
    value: "resolved_tickets",
  },
];
const OtherOptions = [
  { label: "week", value: "week" },
  { label: "month", value: "month" },
  { label: "year", value: "year" },
];

const Tickets = () => {
  const date = new Date();
  const [open, setOpen] = useState(false);

  return (
    <div className="max-w-[1640px] flex flex-col p-4  h-screen overflow-y-scroll space-y-8">
      <header className="flex flex-col space-y-3 ">
        <div className="flex items-center justify-between ">
          <span>
            <h2 className="text-3xl font-bold ">Ticket and Support</h2>
            <p className="text-sm text-gray-600">
              Showing your Account metrics for{" "}
              {date.toLocaleString("en-US", {
                month: "long",
                day: "2-digit",
                year: "numeric",
              })}
            </p>
          </span>
          <button
            onClick={() => setOpen(true)}
            className="btn btn-md  bg-black hover:bg-black text-white text-sm normal-case flex items-center gap-[0.5rem]"
          >
            <CreateIcon />
            <span>New Ticket</span>
          </button>
        </div>
      </header>
      <div className="bg-white p-2 rounded-md">
        <div className="flex justify-between items-center w-full">
          <div className="relative">
            <span className="absolute inset-y-0 start-0 grid w-10 place-content-center">
              <CiSearch />
            </span>
            <input
              type="text"
              placeholder="Search for ticket"
              className="w-full md:w-[320px] rounded-md border-gray-300 border py-2 ps-10 shadow-sm sm:text-sm px-3 ring-0   bg-inherit"
            />
          </div>
          <div className="flex items-center justify-end gap-[1rem]">
            <Select
              className="!w-[10rem]"
              placeholder="Select Priority"
              options={pirorityOptions}
            />
            <Select
              className="!w-[10rem]"
              placeholder="This Week"
              options={OtherOptions}
            />
          </div>
        </div>
        <TicketTabs />
      </div>
      {/* <AdmistrationModal open={open} setOpen={setOpen} /> */}
    </div>
  );
};

export default Tickets;
