"use client";
import logo from "@/assets/logo.svg";
import {
  CustomInput as Input,
  CustomButton as Button,
} from "@/lib/AntdComponents";
import Image from "next/image";
import Link from "next/link";
import { message, Alert } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForgotPasswordMutation } from "@/services/authService";

const ForgetPass = () => {
  const { replace } = useRouter();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    forgotPassword({ email })
      .unwrap()
      .then((res) => {
        message.success(res?.data?.responseDescription || "reset link sent");
        replace(`/forget-password-2?email=${email}`);
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
      <main className=" flex flex-col items-center justify-center bg-white w-full md:w-[500px] mx-auto mt-4 p-6 ">
        {alert && <Alert type="error" closable message={alert} />}
        <h1 className="font-bold text-2xl mb-2 text-balck">Reset Password</h1>
        <p className=" text-gray-700 text-lg text-center">
          Enter the email associated with your account and we’ll send an email
          with instruction to reset your Password
        </p>
        <form onSubmit={handleSubmit} className="w-full space-y-5 mt-8">
          <div className="w-full flex flex-col items-start justify-start gap-[0.4rem]">
            <label
              htmlFor="email"
              className="text-[#181336] text-sm font-[500]"
            >
              Email Address
            </label>
            <Input
              className="w-full authInput"
              placeholder="Email Address"
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button
            loading={isLoading}
            htmlType="submit"
            type="primary"
            className="!h-[3rem] !bg-[#000] w-full"
          >
            Send reset link
          </Button>
          <span className="flex justify-center items-center mt-6">
            <p className="text-lg leading-6 text-gray-600">
              Remembered your password ? kindly{" "}
              <Link
                href="/"
                className="underline duration-300 cursor-pointer text-black font-semibold"
              >
                click here
              </Link>{" "}
              to Login
            </p>
          </span>
        </form>
      </main>
    </div>
  );
};

export default ForgetPass;
