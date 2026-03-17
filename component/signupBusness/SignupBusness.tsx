"use client";
import { useRouter } from "next/navigation";
import logo from "@/assets/logo.svg";
import {
  CustomInput as Input,
  CustomButton as Button,
  CustomSelect as Select,
} from "@/lib/AntdComponents";
import { message, Alert } from "antd";
import Image from "next/image";
import { useFetchCountryQuery } from "@/services/country";
import {
  useCreateBusinessMutation,
  useGenerateEmailOtpMutation,
  useLazyBusinessProfileQuery,
} from "@/services/authService";
import { useState, ChangeEventHandler, FormEventHandler } from "react";
import { useAppSelector } from "@/store/hooks";

const initailState = {
  businessName: "",
  country: "Nigeria",
  merchantType: "",
  businessSize: "",
};

const SignupBusness = () => {
  const { replace } = useRouter();
  const { data } = useFetchCountryQuery({});
  const [create, { isLoading }] = useCreateBusinessMutation();
  const [getBusinessProfile, { isLoading: isBusinessProfileLoading }] =
    useLazyBusinessProfileQuery();
  const [generateMail, {}] = useGenerateEmailOtpMutation();
  const profile = useAppSelector((store) => store?.user?.user);
  const [selectedCountry, setSelectedCountry] = useState(
    "https://flagcdn.com/ng.svg"
  );
  const [formData, setFormData] = useState(initailState);
  const [alert, setAlert] = useState("");
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    create(formData)
      .unwrap()
      .then((res) => {
        getBusinessProfile({});
        generateMail({ username: profile?.email })
          .unwrap()
          .then(() => {
            setFormData(initailState);
            replace("/verifyEmail");
            localStorage.setItem(`verify-${profile?.email}`, "false");
          })
          .catch(() => {
            setFormData(initailState);
            replace("/verifyEmail");
          });
      })
      .catch((err) => {
        setAlert(err?.data?.responseDescription || err?.data?.title);
      });
  };
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (alert) setAlert("");
    setFormData((prevState) => ({
      ...prevState,
      [e.target?.name]: e.target?.value,
    }));
  };

  const handleCountryChange = (
    value: string,
    option: Record<string, string> | Record<string, string>[]
  ) => {
    if (!Array.isArray(option)) {
      setSelectedCountry(option?.flag);
      setFormData((prev) => ({ ...prev, country: option?.name }));
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-BgImage mx-auto max-w-[1640px] bg-[#FAFAFA]">
      <nav className="py-4 px-8">
        <Image src={logo} alt="logo" />
      </nav>
      <main className=" flex flex-col items-center justify-center bg-white w-full md:w-[480px] mx-auto mt-4 p-6">
        {alert && <Alert type="error" closable message={alert} />}
        <h1 className="font-semibold text-3xl text-Primary">
          Create an account
        </h1>
        <p className="text-sm text-gray-600">
          Sign up to create your merchant account
        </p>
        <form onSubmit={handleSubmit} className="w-full space-y-4 mt-4">
          <div className="">
            <label
              className="block text-gray-600 text-sm font-semibold mb-2"
              htmlFor="busness"
            >
              Busness/ Company Name{" "}
            </label>
            <Input
              value={formData.businessName}
              required
              onChange={handleChange}
              id="busness"
              type="text"
              name="businessName"
            />
            <p className="text-xs text-gray-400 my-3">
              Please ensure that the business name provided is the same name on
              your registration documents
            </p>
          </div>

          <div className="country-selector flex items-center">
            <Select
              showSearch
              placeholder="Select a country"
              value={formData.country}
              optionFilterProp="value"
              onChange={handleCountryChange}
              style={{ width: "100%" }}
              options={data}
              defaultValue={"Nigeria"}
              suffixIcon={
                <Image
                  src={selectedCountry}
                  alt="flag"
                  width={40}
                  height={45}
                  className=" border"
                />
              }
            />
          </div>
          <div className="">
            <label className="block text-gray-600 text-sm font-semibold mb-2">
              What type of business do you run?{" "}
            </label>
            <Select
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, merchantType: value }))
              }
              value={formData.merchantType}
              className="!w-full"
              options={[
                { value: "individual", label: "Individual" },
                { value: "business", label: "Business" },
                // { value: "enterprise", label: "Enterprise" },
                { value: "limited liability", label: "Limited Liability" },
              ]}
            />
          </div>
          <div className="">
            <label className="block text-gray-600 text-sm font-semibold mb-2">
              Business size?{" "}
            </label>
            <Select
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, businessSize: value }))
              }
              value={formData.businessSize}
              className="!w-full"
              options={[
                { value: "0-10", label: "0-10" },
                { value: "10-50", label: "10-50" },
                { value: "50-Above", label: "50-Above" },
              ]}
            />
          </div>
          <Button
            loading={isLoading || isBusinessProfileLoading}
            htmlType="submit"
            type="primary"
            className="!h-[3rem] !bg-black w-full"
          >
            Submit
          </Button>
        </form>
      </main>
    </div>
  );
};

export default SignupBusness;
