"use client";
import logo from "@/assets/logo.svg";
import SuccessIcon from "@/assets/icon/SuccessIcon";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Modal, message, Alert } from "antd";
import { CustomButton as Button } from "@/lib/AntdComponents";
import { useGenerateEmailOtpMutation } from "@/services/authService";
import { useAppSelector } from "@/store/hooks";
const VerifyEmail = () => {
  const data = useAppSelector((state) => state?.user?.user);
  const { replace } = useRouter();
  useEffect(() => {
    if (localStorage.getItem(`verify-${data?.email}`) === "true") {
      replace("/");
      localStorage.removeItem(`verify-${data?.email}`);
    }
  }, [data, localStorage.getItem(`verify-${data?.email}`)]);
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
  const [generateMail, { isLoading }] = useGenerateEmailOtpMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alert, setAlert] = useState("");
  const resendLink = () =>
    generateMail({ username: data?.email })
      .unwrap()
      .then((res) =>
        message.success(res.data?.responseDescription || "Email sent")
      )
      .catch((err) =>
        setAlert(
          err?.data?.responseDescription ||
            err?.data?.title ||
            "something went wrong"
        )
      );
  return (
    <div className="min-h-screen flex flex-col bg-BgImage mx-auto max-w-[1640px] bg-[#FAFAFA]">
      <nav className="py-4 px-8">
        <Image src={logo} alt="logo" />
      </nav>
      <main className=" flex flex-col space-y-5 items-center justify-center bg-white w-full md:w-[500px] mx-auto mt-4 p-6">
        {alert && <Alert type="error" closable message={alert} />}
        <SuccessIcon />
        <h1 className="font-semibold text-3xl text-Primary">
          Verify your Email{" "}
        </h1>
        <p className="text-md text-gray-600 text-center">
          We have sent a confirmation email to the address you provided. This
          verification link is only good for 24 hours.{" "}
        </p>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn bg-Primary hover:bg-Primary border-none text-white capitalize w-full mb-3!"
        >
          View Requirement
        </button>
        <Button
          onClick={resendLink}
          loading={isLoading}
          disabled={minutes > 0 || isLoading}
          className="!h-[3rem] w-full"
        >
          {`${minutes < 1 ? "Resend Link" : `${minutes}`}`}
        </Button>
        <Modal
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={false}
        >
          <h1 className="font-semibold text-3xl text-Primary text-center">
            Verify your Email{" "}
          </h1>
          <p className="text-md text-gray-600 text-center mb-4">
            We have sent a confirmation email to the address you provided. This
            verification link is only good for 24 hours.{" "}
          </p>
          <div className="flex flex-col space-y-2 bg-black p-3 rounded text-white ">
            <p className="text-lg mb-4">NON Governmental Organization</p>
            <div className="flex space-x-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="13"
                viewBox="0 0 13 13"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.5 0C2.9159 0 0 2.9159 0 6.5C0 10.0841 2.9159 13 6.5 13C10.0841 13 13 10.0841 13 6.5C13 2.9159 10.0841 0 6.5 0ZM5.20065 9.36845L2.7872 6.9602L3.705 6.0398L5.19935 7.53155L8.64045 4.09045L9.55955 5.00955L5.20065 9.36845Z"
                  fill="#2EB57E"
                />
              </svg>{" "}
              <p className="text-sm">Business Information</p>
            </div>
            <div className="flex space-x-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="13"
                viewBox="0 0 13 13"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.5 0C2.9159 0 0 2.9159 0 6.5C0 10.0841 2.9159 13 6.5 13C10.0841 13 13 10.0841 13 6.5C13 2.9159 10.0841 0 6.5 0ZM5.20065 9.36845L2.7872 6.9602L3.705 6.0398L5.19935 7.53155L8.64045 4.09045L9.55955 5.00955L5.20065 9.36845Z"
                  fill="#2EB57E"
                />
              </svg>{" "}
              <p className="text-sm"> CAC IT form</p>
            </div>{" "}
            <div className="flex space-x-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="13"
                viewBox="0 0 13 13"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.5 0C2.9159 0 0 2.9159 0 6.5C0 10.0841 2.9159 13 6.5 13C10.0841 13 13 10.0841 13 6.5C13 2.9159 10.0841 0 6.5 0ZM5.20065 9.36845L2.7872 6.9602L3.705 6.0398L5.19935 7.53155L8.64045 4.09045L9.55955 5.00955L5.20065 9.36845Z"
                  fill="#2EB57E"
                />
              </svg>{" "}
              <p className="text-sm"> CAC IT form</p>
            </div>
            <div className="flex space-x-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="13"
                viewBox="0 0 13 13"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.5 0C2.9159 0 0 2.9159 0 6.5C0 10.0841 2.9159 13 6.5 13C10.0841 13 13 10.0841 13 6.5C13 2.9159 10.0841 0 6.5 0ZM5.20065 9.36845L2.7872 6.9602L3.705 6.0398L5.19935 7.53155L8.64045 4.09045L9.55955 5.00955L5.20065 9.36845Z"
                  fill="#2EB57E"
                />
              </svg>{" "}
              <p className="text-sm"> CAC IT form</p>
            </div>
            <div className="flex space-x-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="13"
                viewBox="0 0 13 13"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.5 0C2.9159 0 0 2.9159 0 6.5C0 10.0841 2.9159 13 6.5 13C10.0841 13 13 10.0841 13 6.5C13 2.9159 10.0841 0 6.5 0ZM5.20065 9.36845L2.7872 6.9602L3.705 6.0398L5.19935 7.53155L8.64045 4.09045L9.55955 5.00955L5.20065 9.36845Z"
                  fill="#2EB57E"
                />
              </svg>{" "}
              <p className="text-sm"> CAC IT form</p>
            </div>
          </div>
          <button
            onClick={() => setIsModalOpen(false)}
            className="btn bg-transparent hover:bg-transparent border-gray-200 text-Primary capitalize w-full  hover:border-gray-300 mt-4"
          >
            Cancel{" "}
          </button>
        </Modal>
      </main>
    </div>
  );
};

export default VerifyEmail;
