"use client";
import React, { useState } from "react";
import ContactTab from "./ContactTab";
import ContactModal from "./ContactModal";

const Contact = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="max-w-[1640px] flex flex-col p-4  h-screen overflow-y-scroll">
      <header className="flex flex-col space-y-3 my-1">
        <div className="flex items-center justify-between ">
          <span>
            <h2 className="text-2xl font-medium"> Contact </h2>
            <p className="text-sm text-gray-600">
              Showing your Account metrics for July 19, 2021 - July 25, 2021
            </p>
          </span>
          <button onClick={()=>setOpen(true)} className="btn btn-md  bg-black hover:bg-black text-white text-sm normal-case">
            + Send contact Request
          </button>
        </div>
        <p className="flex items-end justify-end underline">View</p>
      </header>
      <ContactTab />
      <ContactModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default Contact;
