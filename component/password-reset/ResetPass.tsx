"use client";
import {
  useState,
  FormEventHandler,
  ChangeEventHandler,
  useEffect,
} from "react";
import logo from "@/assets/logo.svg";
import { passwordSchema } from "@/lib/validationSchema";
import {
  CustomPasswordInput as PasswordInput,
  CustomButton as Button,
} from "@/lib/AntdComponents";
import { message, Alert } from "antd";
import Image from "next/image";
import {
  useResetPasswordMutation,
  useForgotPasswordMutation,
} from "@/services/authService";
import { useSearchParams, useRouter } from "next/navigation";
const initialState = {
  email: "",
  newPassword: "",
  confirmPassword: "",
  otp: "",
};
const ResetPass = () => {
  const { replace } = useRouter();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [forgetPassword, { isLoading: isResending }] =
    useForgotPasswordMutation();
  const [formData, setFormData] = useState(initialState);
  const [validationError, setValidationError] = useState("");
  const [confirmValidationError, setConfirmValidationError] = useState("");
  const [alert, setAlert] = useState("");
  const searchParams = useSearchParams();
  useEffect(() => {
    const otp = searchParams.get("token");
    const email = searchParams.get("email");
    setFormData((prev) => ({ ...prev, otp: otp || "", email: email || "" }));
  }, [searchParams]);
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (alert) setAlert("");
    if (e.target.name === "password")
      passwordSchema
        .validate({ password: e.target?.value })
        .then(() => setValidationError(""))
        .catch((error) => setValidationError(error.message));
    if (
      e.target.name === "confirmPassword" &&
      e.target.value !== formData.newPassword
    )
      setConfirmValidationError("password must match");
    else if (
      e.target.name === "confirmPassword" &&
      e.target.value === formData.newPassword
    )
      setConfirmValidationError("");
    setFormData((prevState) => ({
      ...prevState,
      [e.target?.name]: e.target?.value,
    }));
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!validationError && !confirmValidationError)
      resetPassword(formData)
        .unwrap()
        .then((res) => {
          message.success("password reset successfully");
          setFormData(initialState);
          replace("/");
        })
        .catch((err) => {
          setAlert(
            err?.data?.title ||
              err?.data?.responseDescription ||
              "something went wrong"
          );
        });
  };
  const resendLink = () => {
    forgetPassword({ email: formData.email })
      .unwrap()
      .then((res) => {
        message.success("password reset mail successfully");
        setFormData(initialState);
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
      <main className=" flex flex-col items-center justify-center bg-white w-full md:w-[550px] mx-auto mt-4 p-6">
        {alert && <Alert type="error" closable message={alert} />}
        <h1 className="font-semibold text-2xl mb-2 text-black">
          Change Password{" "}
        </h1>
        <p className=" text-gray-700 text-lg text-center">
          Your new password must be different from previous used passwords
        </p>
        <form onSubmit={handleSubmit} className="w-full space-y-5 mt-8">
          <div className="w-full flex flex-col items-start justify-start gap-[0.2rem]">
            <label
              htmlFor="password"
              className="text-[#181336] text-sm font-[500]"
            >
              Password
            </label>
            <PasswordInput
              className="w-full"
              placeholder=" Enter your password"
              id="password"
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
            />
            {formData.newPassword && validationError && (
              <ul className="bg-white rounded-[5px] p-[3%]">
                <li className="flex items-center gap-[0.5rem]">
                  <span
                    className={`h-[13px] w-[13px] rounded-full ${
                      /^(.{8,})$/.test(formData.newPassword)
                        ? "bg-black"
                        : "bg-slate-300"
                    }`}
                  ></span>
                  <p className="text-[#252B33] text-[12px] font-[400]">
                    A minimum of 8 characters
                  </p>
                </li>
                <li className="flex items-center gap-[0.5rem]">
                  <span
                    className={`h-[13px] w-[13px] rounded-full ${
                      /.*[a-zA-Z].*/.test(formData.newPassword)
                        ? "bg-black"
                        : "bg-slate-300"
                    }`}
                  ></span>
                  <p className="text-[#252B33] text-[12px] font-[400]">
                    At least one letter
                  </p>
                </li>
                <li className="flex items-center gap-[0.5rem]">
                  <span
                    className={`h-[13px] w-[13px] rounded-full ${
                      /.*[0-9].*/.test(formData.newPassword)
                        ? "bg-black"
                        : "bg-slate-300"
                    }`}
                  ></span>
                  <p className="text-[#252B33] text-[12px] font-[400]">
                    At least one number
                  </p>
                </li>
                <li className="flex items-center gap-[0.5rem]">
                  <span
                    className={`h-[13px] w-[13px] rounded-full ${
                      /[!@#$%^&*(),.?":{}|<>]/.test(formData.newPassword)
                        ? "bg-black"
                        : "bg-slate-300"
                    }`}
                  ></span>
                  <p className="text-[#252B33] text-[12px] font-[400]">
                    At least one special character
                  </p>
                </li>
              </ul>
            )}
          </div>
          <div className="w-full flex flex-col items-start justify-start gap-[0.2rem]">
            <label
              htmlFor="confirmPassword"
              className="text-[#181336] text-sm font-[500]"
            >
              Confirm password
            </label>
            <PasswordInput
              className="w-full"
              placeholder="Confirm your password"
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              name="confirmPassword"
            />
            <p>{confirmValidationError}</p>
          </div>
          <Button
            loading={isLoading}
            htmlType="submit"
            type="primary"
            disabled={isResending}
            className="!h-[3rem] !bg-black w-full !text-white"
          >
            {isResending ? "Resending...." : " Reset Password"}
          </Button>

          <span
            onClick={resendLink}
            className="text-sm font-medium text-gray-600 flex items-center justify-center cursor-pointer underline"
          >
            Resend Link
          </span>
        </form>
      </main>
    </div>
  );
};

export default ResetPass;
