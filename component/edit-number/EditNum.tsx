"use client";
import "react-phone-input-2/lib/style.css";
import Image from "next/image";
import logo from "@/assets/logo.svg";
import PhoneInput from "react-phone-input-2";
import { useRouter } from "next/navigation";
import { useState, FormEventHandler } from "react";
import { CustomButton as Button } from "@/lib/AntdComponents";
import { useGenerateOtpMutation } from "@/services/authService";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { message, Alert } from "antd";
import { updateUser } from "@/store/userSlice";
const EditNum = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector((store) => store?.user?.user);
  const { replace } = useRouter();
  const [requestOtp, { isLoading }] = useGenerateOtpMutation();
  const [username, setUserName] = useState("");
  const [alert, setAlert] = useState("");
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    requestOtp({ username })
      .unwrap()
      .then((res) => {
        message.success(res.data?.responseDescription || "OTP sent");
        setUserName("");
        dispatch(updateUser({ ...profile, phoneNumber: username }));
        replace("/signup-otp");
      })
      .catch((err) => {
        setAlert(
          err?.data?.responseDescription ||
            err?.data?.title ||
            "something went wrong"
        );
      });
  };
  return (
    <div className="min-h-screen flex flex-col bg-BgImage mx-auto max-w-[1640px]">
      <nav className="py-4 px-8">
        <Image src={logo} alt="logo" />
      </nav>
      <main className=" flex flex-col items-center justify-center bg-white w-full md:w-[500px] mx-auto mt-4 p-6">
        {alert && <Alert type="error" closable message={alert} />}
        <h1 className="font-semibold text-2xl mb-2 text-black">
          Edit Your Phone Number!{" "}
        </h1>
        <p className=" text-gray-700  text-center text-lg">
          Cross check your number or enter another phone number to receive your
          OTP{" "}
        </p>
        <form onSubmit={handleSubmit} className="w-full space-y-5 mt-8">
          <PhoneInput
            country={"ng"}
            containerClass="!w-full"
            inputClass="phone-input-input !w-full"
            value={username}
            onChange={(value) => setUserName(value)}
          />
          <Button
            htmlType="submit"
            loading={isLoading}
            type="primary"
            className="!h-[3rem] !bg-black w-full"
          >
            Resend OTP
          </Button>
        </form>
      </main>
    </div>
  );
};

export default EditNum;
