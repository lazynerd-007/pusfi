"use client";
import "react-phone-input-2/lib/style.css";
import {
  CustomButton as Button,
  CustomInput as Input,
  CustomSelect as Select,
  CustomDatePicker as DatePicker,
  CustomUpload as Upload,
} from "@/lib/AntdComponents";
import { message, type UploadProps } from "antd";
import Image from "next/image";
import PhoneInput from "react-phone-input-2";
import DeleteIcon from "@/assets/icon/DeleteIcon";
import LinkIcon from "@/assets/icon/LinkIcon";
import { useState, ChangeEventHandler, FormEventHandler } from "react";
import {
  useBusinessProfileQuery,
  useProfileQuery,
  useUpdateUserOwnerMutation,
} from "@/services/authService";
import { useFetchCountryQuery } from "@/services/country";
import { RcFile } from "antd/es/upload";

const gender = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
];
type dataType = {
  Bvn: string;
  FirstName: string;
  LastName: string;
  PhoneNumber: string;
  DateOfBirth: string;
  Nationality: string;
  HomeAddress: string;
  isIndividual: string;
  Email: string;
  RoleId: string;
  BusinessId: string;
  file: RcFile | string;
};
const OwnerInfo = ({
  setActive,
}: {
  setActive: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const dataBody = new FormData();
  const checkFileSize = (file: RcFile) => {
    const isLt2M = file.size / 1024 / 1024 < 5;
    if (!isLt2M) {
      message.error("Image must must be less than 5MB!");
    }
    return isLt2M;
  };
  const { data: country } = useFetchCountryQuery({});
  const { data: user } = useProfileQuery({});
  const { data: business } = useBusinessProfileQuery({});
  const [create, { isLoading }] = useUpdateUserOwnerMutation();
  const [bvnError, setBvnError] = useState("");
  const [formData, setFormData] = useState<dataType>({
    isIndividual: (business?.merchantType === "individual").toString(),
    Bvn: "",
    FirstName: "",
    LastName: "",
    PhoneNumber: "",
    DateOfBirth: "",
    Nationality: "Nigeria",
    HomeAddress: "",
    Email: user?.email,
    RoleId: user?.roleId,
    BusinessId: business?.id,
    file: "",
  });
  const [selectedCountry, setSelectedCountry] = useState(
    "https://flagcdn.com/ng.svg"
  );
  const props: UploadProps = {
    name: "file",
    multiple: false,
    accept: ".jpg,.jpeg,.png,application/pdf",
    onDrop(e) {
      // console.log("Dropped files", e.dataTransfer.files);
    },
    // accept: "image/png,image/jpeg,video/mp4",
  };
  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target?.name]: e.target?.value,
    }));
    if (e.target?.name === "Bvn")
      if (e.target?.value?.length === 11) {
        setBvnError("");
      } else {
        setBvnError("BVN must be exactly 11 digits");
      }
  };
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    for (const [key, value] of Object.entries({
      ...formData,
      Email: user?.user?.email,
      RoleId: user?.user?.roleId,
      BusinessId: business?.business?.id,
    })) {
      dataBody.append(key, value);
    }
    if (!bvnError && formData?.file)
      create(dataBody)
        .unwrap()
        .then((res) => {
          setActive("3");
        })
        .catch((err) => {
          message.error(
            err?.data?.responseDescription || "something went wrong"
          );
        });
  };
  const handleCountryChange = (
    value: string,
    option: Record<string, string> | Record<string, string>[]
  ) => {
    if (!Array.isArray(option)) {
      setSelectedCountry(option?.flag);
      setFormData((prev) => ({ ...prev, Nationality: option?.name }));
    }
  };
  return (
    <main className="">
      <span className="flex flex-col">
        <h2 className="text-black font-semibold mb-1">
          Tell us about yourself
        </h2>
        <p className="text-sm">
          This is Business Owner information that you can update anytime.
        </p>
      </span>
      <div className="flex flex-col bg-white w-full mt-4 p-3 rounded-md">
        <div className="flex flex-col md:flex-row justify-between items-start border-b py-2 border-[#D6DDEB]">
          <span>
            <h5 className="text-[#181336] text-[16px] font-[700]">
              Enter business Owner Details
            </h5>
            <p className="text-[#515B6F] text-[16px] font-[400]">
              Personal information of the business Owner(s)
            </p>
          </span>
          <Button type="primary" className="!w-fit !bg-[#000000] !p-[8px]">
            Add Business Owner
          </Button>
        </div>
        <div className="flex justify-end py-[0.5rem] mt-4">
          <DeleteIcon className="cursor-pointer" />
        </div>
        <div className="grid grid-cols-[40%_60%] justify-between items-start border-b border-[#D6DDEB] w-[90%]">
          <span>
            <h5 className="text-[#181336] text-[16px] font-[700]">
              Tell us your about business
            </h5>
            <p className="text-[#515B6F] text-[16px] font-[400]">
              This must be the name on your registration document.
            </p>
          </span>
          <form onSubmit={handleSubmit} className="flex flex-col gap-[0.5rem]">
            <div className="flex flex-col gap-[0.1rem]">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                BVN
              </label>
              <span>
                <Input
                  max={11}
                  min={11}
                  name="Bvn"
                  required
                  onChange={handleChange}
                  value={formData.Bvn}
                  placeholder="BVN"
                />
                {bvnError && (
                  <p className="text-red-500 text-[14px] font-[400]">
                    {bvnError}
                  </p>
                )}
                <p className="text-[#000000] text-[14px] font-[400]">
                  To get your BVN dial *565*0# on your registered mobile number.
                </p>
              </span>
            </div>
            <div className="flex items-center justify-between gap-[1rem]">
              <span className="w-full">
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Legal First name
                </label>
                <Input
                  value={formData.FirstName}
                  onChange={handleChange}
                  name="FirstName"
                  required
                  placeholder="First Name"
                  className="!w-full"
                />
              </span>
              <span className="w-full">
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Legal Last name
                </label>
                <Input
                  value={formData.LastName}
                  onChange={handleChange}
                  name="LastName"
                  required
                  placeholder="Last Name"
                  className="!w-full"
                />
              </span>
            </div>
            <div className="flex flex-col gap-[0.1rem]">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Phone Number
              </label>
              <PhoneInput
                country={"ng"}
                containerClass="!w-full"
                inputClass="phone-input-input !w-full"
                value={formData.PhoneNumber}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, PhoneNumber: value }))
                }
              />
            </div>
            {/* <div className="flex flex-col gap-[0.1rem]">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Gender
              </label>
              <Select
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, merchantType: value }))
                }
                value={formData.merchantType}
                options={gender}
              />
            </div> */}
            <div className="flex flex-col gap-[0.1rem]">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Date of Birth
              </label>
              <DatePicker
                // value={formData.DateOfBirth}
                onChange={(value, date) =>
                  setFormData((prev) => ({
                    ...prev,
                    DateOfBirth: `${date}`,
                  }))
                }
              />
            </div>
            <div className="flex flex-col gap-[0.1rem]">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Nationality
              </label>
              <Select
                showSearch
                placeholder="Select a country"
                value={formData.Nationality}
                optionFilterProp="value"
                onChange={handleCountryChange}
                style={{ width: "100%" }}
                options={country}
                defaultValue={"Nigeria"}
                suffixIcon={
                  <Image
                    src={selectedCountry}
                    alt="flag"
                    width={40}
                    height={45}
                    className="border"
                  />
                }
              />
            </div>
            <div className="flex flex-col gap-[0.1rem]">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Residential Address
              </label>
              <Input
                value={formData.HomeAddress}
                name="HomeAddress"
                onChange={handleChange}
                required
                placeholder="2,oseni close..."
              />
            </div>
            {/* <div className="flex items-center justify-between gap-[1.5rem]">
              <span className="flex flex-col w-full">
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  From of ID
                </label>
                <Select
                  className="!w-full"
                  options={[
                    { label: "NIN", value: "NIN" },
                    { label: "Passport", value: "Passport" },
                    { label: "Driver license", value: "Driver license" },
                  ]}
                />
              </span>
              <span className="flex flex-col w-full">
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  ID Number
                </label>
                <Input placeholder="Id Number" />
              </span>
            </div> */}
            <div className="grid grid-cols-1 gap-[0.1rem] items-stretch">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Upload ID
              </label>
              <Upload
                {...props}
                onRemove={(file) => {
                  setFormData((prev) => ({ ...prev, file: "" }));
                }}
                beforeUpload={(file) => {
                  if (checkFileSize(file))
                    setFormData((prev) => ({
                      ...prev,
                      file: file,
                    }));
                  return false;
                }}
                className="border border-dashed h-[80px] p-4"
              >
                <span className="flex items-center gap-[0.2rem]  stroke-[#515B6F] hover:stroke-[#000000]">
                  <LinkIcon className="stroke-inherit" />
                  <p className="text-[#515B6F] text-[16px] font-[500]">
                    Attach Document
                  </p>
                </span>
              </Upload>
            </div>
            {/* <div className="flex items-center gap-4 my-4"> */}
            <Button
              htmlType="submit"
              loading={isLoading}
              className="!bg-[#000] !h-[3rem] !mx-auto w-full"
              type="primary"
            >
              Save
            </Button>
            {/* <Button className="!bg-white !text-black !h-[3rem] !mx-auto w-[50%] ">
                Cancel
              </Button> */}
            {/* </div> */}
          </form>
        </div>
      </div>
    </main>
  );
};

export default OwnerInfo;
