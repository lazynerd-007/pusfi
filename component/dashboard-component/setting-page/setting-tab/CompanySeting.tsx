"use client";
import { Avatar, Select, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { IoIosCamera } from "react-icons/io";
import { useUpdateBusinessLogoMutation } from "@/services/authService";
import { useAppSelector } from "@/store/hooks";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import React, { useEffect, useState } from "react";

const CompanySeting = () => {
  const [updateBusinessLogo, { isLoading }] = useUpdateBusinessLogoMutation();
  const business = useAppSelector((store) => store?.user?.business);
  
  // Supabase State
  const [supabaseBusiness, setSupabaseBusiness] = useState<any>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchBusiness = async () => {
      const { data } = await supabase.from('business_profiles').select('*').limit(1).single();
      if (data) setSupabaseBusiness(data);
    };
    fetchBusiness();
  }, []);

  return (
    <div className="flex flex-col py-4 w-full space-y-3">
      <span>
        <h1 className="font-semibold">Business Information </h1>
        <p className="text-gray-600 text-sm">
          This is Business information that you can update anytime.
        </p>
      </span>
      <div className=" w-full rounded-md">
        {/* profil Section */}
        <div className="mb-4 p-2 grid grid-cols-[400px,1fr] gap-6 items-center">
          <h1 className="font-semibold text-sm">Business Logo</h1>
          <div className="flex items-center space-x-3 w-full md:w-[400px]">
            <div>
              <label
                htmlFor="avatarbusiness"
                className="relative cursor-pointer block"
              >
                {supabaseBusiness?.business_logo || business?.logo ? (
                  <div className="avatar">
                    <div className="w-20 rounded-full">
                      <Image
                        src={supabaseBusiness?.business_logo || business?.logo}
                        alt="User-pic"
                        width={100}
                        height={100}
                        objectFit="center"
                      />{" "}
                    </div>
                  </div>
                ) : (
                  <Avatar
                    style={{ backgroundColor: "#CDA4FF" }}
                    size={60}
                    className="!text-sm text-black relative"
                  >
                    {(supabaseBusiness?.business_name || business?.businessName || '').charAt(0)}
                  </Avatar>
                )}
                <IoIosCamera className="absolute bottom-[0%] right-[2%]" />
                {isLoading && (
                  <span className="loading loading-spinner loading-xs absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50"></span>
                )}
              </label>
            </div>

            <input
              type="file"
              id="avatarbusiness"
              accept="image/*"
              className="hidden w-full h-full cursor-pointer"
              onChange={(e) => {
                if (e.target.files) {
                  const body = new FormData();
                  body.append("file", e.target.files[0]);
                  updateBusinessLogo(body)
                    .unwrap()
                    .then((res) => {
                      message.success("profile picture updated");
                      console.log("business photo updated");
                    })
                    .catch((err) => {
                      message.error(
                        err?.data?.responseDescription || "something went wrong"
                      );
                    });
                }
              }}
            />
            <p className="text-sm">
              We only accept this type of format (PNG, JPG) only. <br /> kindly
              upload photo not more that 5mb
            </p>
          </div>
        </div>
        <hr />
        {/* First Name Section */}
        <div className="mb-4 p-2 grid grid-cols-[400px,1fr] gap-6 items-start">
          <div className="text-sm flex-col flex">
            <h1 className="font-semibold">Business Name</h1>{" "}
            <span className="text-sm mt-2">
              You won&rsquo;t be able to change the business name{" "}
            </span>
          </div>
          <div className="flex flex-col space-y-1 w-full md:w-[400px]">
            <label htmlFor="businessName" className="font-semibold text-sm">
              Business Name
            </label>
            <input
              type="text"
              id="businessName"
              value={supabaseBusiness?.business_name || business?.businessName}
              disabled
              placeholder="Business Name"
              className=" w-full px-3 py-2 border border-gray-300 text-gray-800 placeholder-text-gray-900 text-sm rounded-md focus:outline-none"
            />
          </div>
        </div>
        <hr />
        {/* Email Section */}
        <div className="mb-4 p-2 grid grid-cols-[400px,1fr] gap-6 items-start">
          <div className="text-sm flex-col flex">
            <h1 className="font-semibold ">Business Bio</h1>
            <span className="text-sm mt-2">
              Tell us more about your company
            </span>
          </div>
          <div className="flex flex-col space-y-1 w-full md:w-[400px]">
            <label htmlFor="bio" className="font-semibold text-sm">
              Bio
            </label>
            <TextArea
              id="bio"
              name="Description"
              required
              placeholder="Type your text here..."
              rows={5}
              cols={40}
              value={supabaseBusiness?.business_description || business?.businessDescription}
              disabled
              className="w-full bg-transparent border border-gray-200 p-2 outline-none focus:border-blue-300"
            />
            {/* <p>{Description.length}/500 characters</p> */}
          </div>
        </div>
        <hr />
        <div className="mb-4 p-2 grid grid-cols-[400px,1fr] gap-6 items-start">
          <div className="text-sm flex-col flex">
            <h1 className="font-semibold ">Business Industry</h1>
            <span className="text-sm mt-2">
              Specific sector, in which your organization primarily operates.
            </span>
          </div>
          <div className="flex flex-col space-y-1 w-full md:w-[400px]">
            <label htmlFor="industry" className="font-semibold text-sm">
              Industry
            </label>
            <input
              id="industry"
              value={supabaseBusiness?.business_industry || business?.businessIndustry}
              disabled
              placeholder="your address here"
              className=" w-full px-3 py-2 border border-gray-300 text-gray-800 placeholder-text-gray-900 text-sm rounded-md focus:outline-none"
            />
          </div>
        </div>
        {/* Phone Number Section */}
        <div className="mb-4 p-2 grid grid-cols-[400px,1fr] gap-6 items-start">
          <div className="text-sm flex-col flex">
            <h1 className="font-semibold ">Business Address</h1>
            <span className="text-sm mt-2">
              This is the location of your business
            </span>
          </div>
          <div className="flex flex-col space-y-3">
            <div className="flex flex-col space-y-1 w-full md:w-[400px]">
              <label htmlFor="email" className="font-semibold text-sm">
                Address
              </label>
              <input
                type="email"
                id="email"
                value={business?.businessAddress}
                disabled
                placeholder="your address here"
                className=" w-full px-3 py-2 border border-gray-300 text-gray-800 placeholder-text-gray-900 text-sm rounded-md focus:outline-none"
              />
            </div>
            <div className="space-x-2 flex flex-col md:flex-row w-full md:w-[400px]">
              <div className="w-full space-y-1">
                <label htmlFor="firstName" className="font-semibold text-sm">
                  LGA
                </label>
                <input
                  id="email"
                  value={business?.lga}
                  disabled
                  placeholder="your address here"
                  className=" w-full px-3 py-2 border border-gray-300 text-gray-800 placeholder-text-gray-900 text-sm rounded-md focus:outline-none"
                />
              </div>
              <div className="w-full  space-y-1">
                <label htmlFor="firstName" className="font-semibold text-sm">
                  State
                </label>
                <input
                  id="email"
                  value={business?.state}
                  disabled
                  placeholder="your address here"
                  className=" w-full px-3 py-2 border border-gray-300 text-gray-800 placeholder-text-gray-900 text-sm rounded-md focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
        <hr />{" "}
      </div>
      <div className="flex justify-center mx-auto items-end my-3">
        {/* <button
          disabled
          className="btn w-[400px]    disabled:bg-gray-200 disabled:text-white"
        >
          Save Changes
        </button> */}
      </div>
    </div>
  );
};
export default CompanySeting;
