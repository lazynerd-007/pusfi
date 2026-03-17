"use client";
import { CustomButton as Button } from "@/lib/AntdComponents";
import { useRouter } from "next/navigation";
import { useState, FormEventHandler } from "react";
import OTPInput from "react-otp-input";
import Image from "next/image";
import logo from "@/assets/logo.svg";
import Link from "next/link";
import {
  useValidateOtpMutation,
  useGenerateOtpMutation,
} from "@/services/authService";
import { message, Alert } from "antd";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { updateUser } from "@/store/userSlice";

const SignupOtp = () => {
  const dispatch = useAppDispatch();
  const { replace } = useRouter();
  const [code, setCode] = useState("");
  const [alert, setAlert] = useState("");
  const [generateOtp, {}] = useGenerateOtpMutation();
  const [validateOtp, { isLoading: isValidating }] = useValidateOtpMutation();
  const data = useAppSelector((state) => state?.user?.user);

  const requestOtp = () =>
    generateOtp({ username: data?.phoneNumber })
      .unwrap()
      .then(() => message.success("otp sent"));
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    validateOtp({ otp: code, username: data?.phoneNumber })
      .unwrap()
      .then((res) => {
        message.success(
          res.data?.responseDescription || "validation successful"
        );
        dispatch(updateUser({ ...data, isPhoneValidated: true }));
        setCode("");
        replace("/signup-business");
      })
      .catch((err) => {
        setAlert(
          err?.data?.responseDescription ||
            err?.data?.title ||
            "something went wrong"
        );
      });
  };
  const phoneNumber = data?.phoneNumber;

  const formattedPhoneNumber =
    phoneNumber && phoneNumber.length >= 4
      ? `+${phoneNumber.substring(0, 4)}xxxx${phoneNumber.substring(
          phoneNumber.length - 3
        )}`
      : "";
  return (
    <div className="min-h-screen flex flex-col bg-BgImage mx-auto max-w-[1640px] bg-[#FAFAFA]">
      <nav className="py-4 px-8">
        <Image src={logo} alt="logo" />
      </nav>
      <main className=" flex flex-col items-center justify-center bg-white w-full md:w-[500px] mx-auto mt-4 p-6">
        {alert && <Alert type="error" closable message={alert} />}
        <h1 className="font-semibold text-2xl mb-2 text-black">
          Verify Your Phone Number!{" "}
        </h1>
        <p className=" text-gray-700 text-lg">
          We sent an OTP to {formattedPhoneNumber} by SMS and WhatsApp.
        </p>
        <form onSubmit={handleSubmit} className="w-full space-y-5 mt-8">
          <h1 className="text-sm">Enter OTP Code</h1>
          <OTPInput
            numInputs={6}
            value={code}
            onChange={(otp) => setCode(otp)}
            renderSeparator={<span style={{ width: "20px" }}></span>}
            renderInput={(props, index) => (
              <input
                {...props}
                style={{
                  backgroundColor: "white",
                  border: "1px solid #CFD3DB",
                  borderRadius: "8px",
                  width: "50px",
                  height: "50px",
                  fontSize: "16px", // Increased font size for better visibility
                  color: "#000",
                  fontWeight: "800",
                  caretColor: "blue",
                  margin: "4px",
                  textAlign: "center",
                }}
              />
            )}
            shouldAutoFocus={true}
          />
          <Button
            htmlType="submit"
            loading={isValidating}
            type="primary"
            className="!h-[3rem] !bg-black w-full"
          >
            verify
          </Button>
          <p className=" text-sm text-grayText ">
            Didn’t get the code?{" "}
            <button
              onClick={requestOtp}
              className="text-Primary text-sm font-bold"
            >
              Click Resend
            </button>
          </p>
          <p className="bg-blue-100 text-sm p-2 text-Primary">
            Still not recevie your OTP!{" "}
            <Link href="edit-number" className="font-semibold underline">
              Click here{" "}
            </Link>
            to cross check your phone number{" "}
          </p>
        </form>
      </main>
    </div>
  );
};

export default SignupOtp;
