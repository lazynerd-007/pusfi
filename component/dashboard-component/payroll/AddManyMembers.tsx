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
  accountNumber: "",
  bankName: "",
  phone: "",
  reference: "",
};
const AddManyMembers = () => {
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
          message.error(
            err?.data?.responseDescription || "something went wrong"
          );
        });
    }
  };
  return (
    <div className="relative flex flex-col px-[2%] w-[95%] mx-auto">
      <header className="flex flex-col space-y-3 my-1 border-b border-[#D6DDEB] py-[2%]">
        <div className="flex items-center justify-between ">
          <span className="text-2xl font-medium flex gap-1 items-center">
            <GrFormPreviousLink className="cursor-pointer" onClick={back} />
            <span>
              <h2 className="text-2xl font-medium">
                Add employees and contractors |{" "}
                <span className="text-gray-400">Invite many</span>
              </h2>
            </span>
          </span>
        </div>
      </header>
      <form
        onSubmit={onFormSubmit}
        className="bg-white rounded-[10px] flex flex-col p-[2%] gap-[1rem] w[90%] mxauto relative overflow-x-hidden"
      >
        {isVerifying && (
          <div className="flex items-center justify-center h-full w-full absolute opacity-[0.7] bg-gray-100 z-[100]">
            <Spinner className="!m-auto !block" />
          </div>
        )}
        <span className="grid grid-cols-[40%_50%] gap-[10%]">
          <span className="flex flex-col gap-1">
            <h6 className="text-[#181336] text-[16px] font-[700]">
              Account Details
            </h6>
            <p className="text-[#515B6F] text-[16px] font-[400]">
              Securely Enter Employees Necessary Bank Account Information
            </p>
          </span>
          <span className="flex flex-col gap-4">
            <span className="flex items-start justify-between gap-3">
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
            </span>
            <Input disabled value={formData.bankName} />
          </span>
        </span>
        <span className="grid grid-cols-[40%_50%] gap-[10%]">
          <span className="flex flex-col gap-1">
            <h6 className="text-[#181336] text-[16px] font-[700]">Hire Date</h6>
            <p className="text-[#515B6F] text-[16px] font-[400]">
              Please Specify Employee Joining Date with the Company.
            </p>
          </span>
          <span className="flex flex-col gap-2">
            <label className="text-[#24272C] text-[16px] font-[700]">
              Hire Date
            </label>
            <DatePicker
              onChange={(_, date) => {
                setFormData((prev) => ({ ...prev, hireDate: date as string }));
              }}
              className="!w-full"
              placeholder="Hire Date"
            />
          </span>
        </span>
        <span className="grid grid-cols-[40%_50%] gap-[10%]">
          <span className="flex flex-col gap-1">
            <h6 className="text-[#181336] text-[16px] font-[700]">
              Select Payroll
            </h6>
            <p className="text-[#515B6F] text-[16px] font-[400]">
              Choose Payroll Preferences for Customized Payments
            </p>
          </span>
          <span className="flex flex-col gap-2">
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
          </span>
        </span>
        <span className="grid grid-cols-[40%_50%] gap-[10%]">
          <span className="flex flex-col gap-1">
            <h6 className="text-[#181336] text-[16px] font-[700]">
              Phone Number
            </h6>
            <p className="text-[#515B6F] text-[16px] font-[400]">
              Enter Employee Contact Number for Communication and Updates
            </p>
          </span>
          <span className="flex flex-col gap-2">
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
          </span>
        </span>
        <span className="grid grid-cols-[40%_50%] gap-[10%]">
          <span className="flex flex-col gap-1">
            <h6 className="text-[#181336] text-[16px] font-[700]">
              Salary Information
            </h6>
            <p className="text-[#515B6F] text-[16px] font-[400]">
              Please Provide Details of Your Compensation
            </p>
          </span>
          <span className="flex flex-col gap-2">
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
          </span>
        </span>
        <Button
          htmlType="submit"
          loading={isLoading}
          type="primary"
          className="!bg-black !w-[50%] self-end"
        >
          save
        </Button>
      </form>
    </div>
  );
};

export default AddManyMembers;
