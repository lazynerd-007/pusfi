"use client";
import { useRouter } from "next/navigation";
import {
  CustomInput as Input,
  CustomRadioGroup as RadioGroup,
  CustomDatePicker as DatePicker,
  CustomInputNumber as InputNumber,
  CustomButton as Button,
  CustomSelect as Select,
  CustomSpinner as Spinner,
} from "@/lib/AntdComponents";
import {
  useCreateBeneficiariesMutation,
  useGetPayrollQuery,
} from "@/services/payrollService";
import { useGetBanksQuery } from "@/services/disbursementService";
import { useVerifyAccountMutation } from "@/services/disbursementService";
import { RadioChangeEvent, message } from "antd";
import {
  useState,
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
} from "react";
import { GrFormPreviousLink } from "react-icons/gr";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const employeeOptions = [
  {
    label: "Employee",
    value: "employee",
  },
  {
    label: "Contractor",
    value: "contractor",
  },
];
const salary: any = "";
const hireDate: any = "";
const initialState = {
  email: "",
  employmentType: "",
  firstName: "",
  lastName: "",
  hireDate,
  salary,
  address: "",
  lga: "",
  state: "",
  accountNumber: "",
  bankCode: "",
  bankName: "",
  businessId: "",
  reference: "",
  phone: "",
};
const AddMember = () => {
  const { back } = useRouter();
  const { data } = useGetBanksQuery({});
  const [verify, { isLoading: isVerifying }] = useVerifyAccountMutation();
  const { data: payroll } = useGetPayrollQuery({});
  const [createBeneficiary, { isLoading }] = useCreateBeneficiariesMutation();
  const [formData, setFormData] = useState(initialState);
  const onInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const onFormSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    if (formData.employmentType && formData.hireDate) {
      createBeneficiary({ ...formData, salary: formData.salary.toString() })
        .unwrap()
        .then((res) => {
          message.success("beneficiary created successfully");
          setFormData(initialState);
          back();
        })
        .catch((err) => {
          const errors = Object?.keys(err?.errors || {}).join(", ");
          const errorsShape2 = `${
            JSON.parse(err?.data?.responseDescription)[0]?.message
          }`;
          message.error(
            err?.errors
              ? `please provide ${errors} field(s)`
              : errorsShape2
              ? errorsShape2.toString()
              : "something went wrong"
          );
        });
    }
  };
  useEffect(() => {
    if (formData.accountNumber.length === 10 && formData.bankCode)
      verify({
        accountNumber: formData.accountNumber,
        bankCode: formData.bankCode,
        currency: "NGN",
      })
        .unwrap()
        .then((res) => {
          setFormData((prev) => ({ ...prev, bankName: res?.data?.data }));
        })
        .catch((err) => {
          message.error(
            err?.data?.responseDescription || "something went wrong"
          );
        });
  }, [
    JSON.stringify(formData.accountNumber),
    JSON.stringify(formData.bankCode),
  ]);
  return (
    <div className="relative flex flex-col gap-4 px-[2%] w-[95%] mx-auto">
      <header className="flex flex-col space-y-3 my-1 border-b border-[#D6DDEB] py-[2%]">
        <div className="md:flex items-center justify-between space-y-2 md:space-y-0">
          <span className="text-2xl font-medium flex gap-1 items-center">
            <GrFormPreviousLink className="cursor-pointer" onClick={back} />
            <span>
              <h2 className="text-2xl font-medium">
                Add employees and contractors |{" "}
                <span className="text-gray-400">Add one</span>
              </h2>
            </span>
          </span>
        </div>
      </header>
      <div>
        <h2 className="text-[18px] text-[#061A14] font-semibold">
          Employee Onboarding
        </h2>
        <p className="font-normal text-base text-[#5A5C5C]">
          This is Company information that you can update anytime.
        </p>
      </div>
      {/* form */}
      <form onSubmit={onFormSubmit} className="bg-white p-4 space-y-4">
        {isVerifying && (
          <div className="flex items-center justify-center h-full w-full absolute opacity-[0.7] bg-gray-100 z-[100]">
            <Spinner className="!m-auto !block" />
          </div>
        )}

        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <div className="space-y-2 w-full md:max-w-sm">
            <p className="font-semibold text-base">Employment Status</p>
            <p className="font-normal text-base text-[#515B6F]">
              Indicate whether an Employee or Contractor{" "}
            </p>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <RadioGroup
              className="!flex !flex-col gap-[0.5rem]"
              options={employeeOptions}
              value={formData.employmentType}
              onChange={(e: RadioChangeEvent) => {
                setFormData((prev) => ({
                  ...prev,
                  employmentType: e.target.value,
                }));
              }}
            />
          </div>
        </div>
        <hr />
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <div className="space-y-2 w-full md:max-w-sm">
            <p className="font-semibold text-base">Full Name </p>
            <p className="font-normal text-base text-[#515B6F]">
              Please Enter Employee Full Name for Payroll Processing
            </p>
          </div>
          {/* <div className="flex flex-col gap-2 w-full"> */}
          <div className="flex items-start justify-between gap-2">
            <span className="flex flex-col gap-2 w-full">
              <label className="font-semibold text-[#24272C] text-base">
                First Name
              </label>
              <Input
                name="firstName"
                value={formData.firstName}
                className="!w-full"
                placeholder="Enter your name"
                required
                onChange={onInputChange}
              />
            </span>
            <span className="flex flex-col gap-2 w-full">
              <label className="font-semibold text-[#24272C] text-base">
                Last Name
              </label>
              <Input
                name="lastName"
                required
                onChange={onInputChange}
                value={formData.lastName}
                className="!w-full"
                placeholder="Enter your name"
              />
            </span>
          </div>
        </div>
        <hr />
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <div className="space-y-2 w-full md:max-w-sm">
            <p className="font-semibold text-base">Email Address </p>
            <p className="font-normal text-base text-[#515B6F]">
              Provide a Valid Email for Payroll Notifications and Updates.
            </p>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label className="text-[#24272C] font-semibold text-base">
              Email
            </label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={onInputChange}
              required
              className="!w-full"
              placeholder="Enter your email"
            />
          </div>
        </div>
        <hr />
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <div className="space-y-2 w-full md:max-w-sm">
            <p className="font-semibold text-base">Phone Number </p>
            <p className="font-normal text-base text-[#515B6F]">
              Enter Employee Contact Number for Communication and Updates
            </p>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label className="text-[#24272C] text-[16px] font-[700]">
              Phone
            </label>
            <PhoneInput
              country={"ng"}
              disableDropdown
              disableCountryCode
              containerClass="!w-full"
              inputClass="phone-input-input !w-full"
              value={formData.phone}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, phone: value }))
              }
            />
          </div>
        </div>
        <hr />
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <div className="space-y-2 w-full md:max-w-sm">
            <p className="font-semibold text-base">Account Details</p>
            <p className="font-normal text-base text-[#515B6F]">
              Securely Enter Employees Necessary Bank Account Information
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-start justify-between gap-3">
              <span className="flex flex-col gap-2 w-full">
                <label className="text-[#24272C] text-[16px] font-[700]">
                  Select Bank
                </label>
                <Select
                  showSearch
                  placeholder="select bank"
                  optionFilterProp="label"
                  onSelect={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      bankCode: value,
                    }))
                  }
                  id="bank"
                  options={data}
                />
              </span>
              <span className="flex flex-col gap-2 w-full">
                <label className="text-[#24272C] text-[16px] font-[700]">
                  Account Number
                </label>
                <Input
                  onChange={onInputChange}
                  name="accountNumber"
                  maxLength={10}
                  minLength={10}
                  value={formData.accountNumber}
                  required
                  type="number"
                  className="!w-full"
                  placeholder=""
                />
              </span>
            </div>
            {/* disabled input */}
            <Input disabled value={formData.bankName} />
          </div>
        </div>
        <hr />
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <div className="space-y-2 w-full md:max-w-sm">
            <p className="font-semibold text-base">Hire Date</p>
            <p className="font-normal text-base text-[#515B6F]">
              Please Specify Employee Joining Date with the Company.
            </p>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label className="text-[#24272C] text-[16px] font-[700]">
              Hire Date
            </label>
            <DatePicker
              onChange={(_, date) => {
                setFormData((prev) => ({ ...prev, hireDate: date }));
              }}
              className="!w-full"
              placeholder="Hire Date"
            />
          </div>
        </div>
        <hr />
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <div className="space-y-2 w-full md:max-w-sm">
            <p className="font-semibold text-base">Select Payroll</p>
            <p className="font-normal text-base text-[#515B6F]">
              Choose Payroll Preferences for Customized Payments
            </p>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label className="text-[#24272C] text-[16px] font-[700]">
              Payroll
            </label>
            <Select
              value={formData.reference}
              onSelect={(value) =>
                setFormData((prev) => ({ ...prev, reference: value }))
              }
              options={payroll || []}
            />
          </div>
        </div>
        <hr />
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <div className="space-y-2 w-full md:max-w-sm">
            <p className="font-semibold text-base">Salary Information</p>
            <p className="font-normal text-base text-[#515B6F]">
              Please Provide Details of Your Compensation
            </p>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label className="text-[#24272C] text-[16px] font-[700]">
              Enter Salary
            </label>
            <InputNumber
              controls={false}
              value={formData.salary}
              className="!w-full"
              placeholder="salary"
              required
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, salary: e }));
              }}
            />
          </div>
        </div>
        <hr />
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <div className="space-y-2 w-full md:max-w-sm">
            <p className="font-semibold text-base">Address Details</p>
            <p className="font-normal text-base text-[#515B6F]">
              Enter Employee Current Residence Information
            </p>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <span className="flex flex-col gap-2">
              <label className="text-[#24272C] text-[16px] font-[700]">
                Address
              </label>
              <Input
                value={formData.address}
                name="address"
                onChange={onInputChange}
                required
                className="!w-full"
                placeholder="Enter your address"
              />
            </span>
            <span className="flex items-start gap-2 justify-between">
              <span className="flex flex-col gap-2 w-full">
                <label className="text-[#24272C] text-[16px] font-[700]">
                  LGA
                </label>
                <Input
                  name="lga"
                  value={formData.lga}
                  onChange={onInputChange}
                  className="!w-full"
                  placeholder="Enter your name"
                />
              </span>
              <span className="flex flex-col gap-2 w-full">
                <label className="text-[#24272C] text-[16px] font-[700]">
                  State
                </label>
                <Input
                  name="state"
                  value={formData.state}
                  onChange={onInputChange}
                  className="!w-full"
                  placeholder="Enter state"
                />
              </span>
            </span>
          </div>
        </div>
        <hr />
        {/* submit button */}
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <div className="space-y-2 w-full md:max-w-sm" />
          <div>
            <Button
              htmlType="submit"
              loading={isLoading}
              type="primary"
              className="!bg-black text-white !h-[45px] font-semibold w-full text-base"
            >
              Save and Continue
            </Button>
          </div>
        </div>
      </form>
      {/* end */}
    </div>
  );
};

export default AddMember;
