"use client";
import { useState, useEffect, useMemo } from "react";
import { CustomTabs as Tabs } from "@/lib/AntdComponents";
import type { TabsProps } from "antd";
import CompanyInfo from "./tabs/CompanyInfo";
import OwnerInfo from "./tabs/OwnerInfo";
import BusinessDocs from "./tabs/BusinessDocs";
import Review from "./tabs/Review";
import { useAppSelector } from "@/store/hooks";
import Pin from "./tabs/pinCreation";

export type docsData = {
  Address: string;
  Description: string;
  BusinessIndustry: string;
  TIN: any;
  lga: string;
  state: string;
  phone: string;
};
const OnBoardingTabs = () => {
  const businessProfile = useAppSelector((state) => state?.user?.business);
  const [formData, setFormData] = useState<docsData>({
    Address: businessProfile?.business?.businessAddress,
    Description: businessProfile?.business?.businessDescription || "",
    BusinessIndustry: businessProfile?.business?.businessIndustry,
    TIN: null,
    lga: "",
    state: "",
    phone: "",
  });
  // useEffect(() => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     Address: businessProfile?.business?.businessAddress,
  //     Description: businessProfile?.business?.businessDescription || "",
  //     BusinessIndustry: businessProfile?.business?.businessIndustry,
  //   }));
  // }, [businessProfile]);
  const [active, setActive] = useState("1");
  const items: TabsProps["items"] = useMemo(
    () => [
      {
        key: "1",
        label: <span className="text-inherit">Company Information</span>,
        children: (
          <CompanyInfo
            setActive={setActive}
            setFormData={setFormData}
            formData={formData}
            businessProfile={businessProfile}
          />
        ),
      },
      {
        key: "2",
        label: <span className="text-inherit">Owner Information</span>,
        children: <OwnerInfo setActive={setActive} />,
      },
      {
        key: "3",
        label: <span className="text-inherit">Business Documentation</span>,
        children: (
          <BusinessDocs
            setActive={setActive}
            setFormData={setFormData}
            formData={formData}
            businessProfile={businessProfile}
          />
        ),
      },
      {
        key: "4",
        label: <span className="text-inherit">Review</span>,
        children: (
          <Review
            setActive={setActive}
            setFormData={setFormData}
            formData={formData}
          />
        ),
      },
      {
        key: "5",
        label: <span className="text-inherit">Pin</span>,
        children: (
         <Pin />
        ),
      },
    ],
    [businessProfile, active, formData]
  );

  return <Tabs items={items} defaultActiveKey="1" activeKey={active} />;
};

export default OnBoardingTabs;
