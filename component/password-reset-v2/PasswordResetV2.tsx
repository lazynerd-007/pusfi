"use client";
import logo from "@/assets/logo.svg";
import SuccessIcon from "@/assets/icon/SuccessIcon";
import Image from "next/image";
import { useState, useEffect } from "react";
import { message, Alert } from "antd";
import { CustomButton as Button } from "@/lib/AntdComponents";
import { useForgotPasswordMutation } from "@/services/authService";
const PasswordResetV2 = ({ email }: { email: string }) => {
  const [minutes, setMinutes] = useState(59);
  useEffect(() => {
    const interval = setInterval(() => {
      if (minutes < 1) {
        clearInterval(interval);
      }
      setMinutes((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const [forgetPassword, { isLoading }] = useForgotPasswordMutation();
  const [alert, setAlert] = useState("");
  const resendLink = () => {
    forgetPassword({ email })
      .unwrap()
      .then(() => {
        message.success("password reset mail sent successfully");
        setMinutes(59);
      })
      .catch((err) => {
        setAlert(err?.data?.title || "something went wrong");
      });
  };
  return (
    <div className="min-h-screen flex flex-col bg-BgImage mx-auto max-w-[1640px] bg-[#FAFAFA]">
      <nav className="py-4 px-8">
        <Image src={logo} alt="logo" />
      </nav>
      <main className=" flex flex-col space-y-5 items-center justify-center bg-white w-full md:w-[500px] mx-auto mt-4 p-6">
        {alert && <Alert type="error" closable message={alert} />}
        {/* <Image src={verifyImage} alt="verify-image" /> */}
        <SuccessIcon />
        <h1 className="font-semibold text-3xl text-Primary">
          Check your Email{" "}
        </h1>
        <p className="text-md text-gray-600 text-center">
          We have sent password reset instructions to the address you provided.
          This link is only good for 24 hours.{" "}
        </p>
        <Button
          onClick={resendLink}
          loading={isLoading}
          disabled={minutes > 0 || isLoading}
          type="primary"
          className="!h-[3rem] w-full !bg-black !text-white"
        >
          {`${minutes < 1 ? "Resend Email" : `${minutes}`}`}
        </Button>
      </main>
    </div>
  );
};

export default PasswordResetV2;
