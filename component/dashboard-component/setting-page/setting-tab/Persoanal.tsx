"use client";
import { useAppSelector } from "@/store/hooks";
import { Avatar, message } from "antd";
import { IoIosCamera } from "react-icons/io";
import PhoneInput from "react-phone-input-2";
import { useUpdateProfilePictureMutation } from "@/services/authService";
import Image from "next/image";
import "react-phone-input-2/lib/style.css";
import { createClient } from "@/lib/supabase/client";
import React, { useEffect, useState } from "react";

const Persoanal = () => {
  const profile = useAppSelector((store) => store?.user?.user);
  const [updatePicture, { isLoading }] = useUpdateProfilePictureMutation();
  
  // Supabase State
  const [supabaseProfile, setSupabaseProfile] = useState<any>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await supabase.from('profiles').select('*').limit(1).single();
      if (data) setSupabaseProfile(data);
    };
    fetchProfile();
  }, []);

  return (
    <div className="flex flex-col py-4 w-full space-y-3">
      <span>
        <h1 className="font-semibold">Personal Information </h1>
        <p className="text-gray-600 text-sm">
          This is Company information that you can update anytime.
        </p>
      </span>
      <div className=" w-full rounded-md">
        {/* profil Section */}
        <div className="mb-4 p-2 grid grid-cols-[400px,1fr] gap-6 items-center">
          <h1 className="font-semibold text-sm">Profile Photo</h1>
          <div className="flex items-center space-x-3 w-full md:w-[400px]">
            <div>
              <label htmlFor="avatar" className="relative cursor-pointer block">
                {supabaseProfile?.profile_picture || profile?.profilePicture ? (
                  <div className="avatar">
                    <div className="w-20 rounded-full">
                      <Image
                        src={supabaseProfile?.profile_picture || profile.profilePicture}
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
                    {`${(supabaseProfile?.first_name || profile?.firstName || '').charAt(0)}${(supabaseProfile?.last_name || profile?.lastName || '').charAt(
                      0
                    )}`}{" "}
                  </Avatar>
                )}
                <IoIosCamera className="absolute bottom-[0%] right-[2%]" />
                {isLoading && (
                  <span className="loading loading-spinner loading-xs absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"></span>
                )}
              </label>
              <p className="text-sm mt-1 font-medium"> Add photo</p>
            </div>

            <input
              type="file"
              id="avatar"
              accept="image/*"
              className="hidden w-full h-full cursor-pointer"
              onChange={(e) => {
                if (e.target.files) {
                  const body = new FormData();
                  body.append("file", e.target.files[0]);
                  updatePicture(body)
                    .unwrap()
                    .then((res) => {
                      message.success("profile picture updated");
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
        <div className="mb-4 p-2 grid grid-cols-[400px,1fr] gap-6 items-center">
          <div className="text-sm flex-col flex">
            <h1 className="font-semibold">Full Name</h1>{" "}
            <span className="text-sm mt-2">
              You won&rsquo;t be able to change your name.{" "}
            </span>
          </div>
          <div className="space-x-2 flex flex-col md:flex-row w-full md:w-[400px]">
            <div className="w-full space-y-1">
              <label htmlFor="firstName" className="font-semibold text-sm">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                placeholder="First Name"
                value={supabaseProfile?.first_name || profile.firstName}
                disabled
                className="  w-full px-3 py-2 border border-gray-300 text-gray-800 placeholder-text-gray-900 text-sm rounded-md focus:outline-none"
              />
            </div>
            <div className="w-full  space-y-1">
              <label htmlFor="firstName" className="font-semibold text-sm">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                placeholder="Last Name"
                value={supabaseProfile?.last_name || profile.lastName}
                disabled
                className="w-full px-3 py-2 border border-gray-300 text-gray-800 placeholder-text-gray-900 text-sm rounded-md focus:outline-none"
              />
            </div>
          </div>
        </div>
        <hr />
        {/* Email Section */}
        <div className="mb-4 p-2 grid grid-cols-[400px,1fr] gap-6 items-center">
          <div className="text-sm flex-col flex">
            <h1 className="font-semibold ">Email Address</h1>
            <span className="text-sm mt-2">
              Your email address will receive all <br />
              communications and activity notifications from your account.{" "}
            </span>
          </div>
          <div className="flex flex-col space-y-1 w-full md:w-[400px]">
            <label htmlFor="email" className="font-semibold text-sm">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={supabaseProfile?.email || profile.email}
              disabled
              className=" w-full px-3 py-2 border border-gray-300 text-gray-800 placeholder-text-gray-900 text-sm rounded-md focus:outline-none"
            />
          </div>
        </div>
        <hr />
        {/* Phone Number Section */}
        <div className="mb-4 p-2 grid grid-cols-[400px,1fr] gap-6 items-center">
          <div className="text-sm flex-col flex">
            <h1 className="font-semibold">Phone Number</h1>
            <span className="text-sm mt-2">
              OTP is sent to your phone number for verification purposes.{" "}
            </span>
          </div>
          <div className="flex flex-col space-y-1 w-full md:w-[400px]">
            <label htmlFor="phone" className="font-semibold text-sm">
              Phone Number
            </label>
            <PhoneInput
              country={"ng"}
              containerClass="!w-full"
              inputClass="phone-input-input !w-full !py-[6px] !border !border-gray-400 !rounded-md"
              value={supabaseProfile?.phone || profile.phoneNumber}
              disabled
            />
          </div>
        </div>
        <hr />
      </div>
      <div className="flex justify-center mx-auto items-end my-3">
        {/* <button
          disabled
          className="btn w-[400px]   disabled:bg-gray-200 disabled:text-white"
        >
          Save Changes
        </button> */}
      </div>
    </div>
  );
};
export default Persoanal;
