"use client";
import SellService from "@/component/dashboard-component/bill-payment/sell-service/SellService";
import React from "react";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const params = useSearchParams();
  return <SellService id={Number(params.get("id")!)} />;
};

export default Page;
