import { Modal } from "antd";
import {
  FormEventHandler,
  ChangeEventHandler,
  useState,
  useEffect,
} from "react";
import {
  useCreateEmployeeMutation,
  useGetRolesQuery,
} from "@/services/managementService";
import {
  CustomInput as Input,
  CustomButton as Button,
  CustomSelect as Select,
} from "@/lib/AntdComponents";
import { message } from "antd";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  roleId: "",
};
type DataType = { label: string; value: string };
const AdminstrationModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
}) => {
  const [formData, setFormData] = useState(initialState);
  const [roles, setRoles] = useState<DataType[]>([]);
  const { data } = useGetRolesQuery({});
  const [createEmployee, { isLoading }] = useCreateEmployeeMutation();
  useEffect(() => {
    const roles = data?.data?.map((role: Record<string, string>) => {
      return { label: role.roleName, value: role.id };
    });
    setRoles(roles);
  }, [data]);
  const onInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const onFormSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    if (formData.phoneNumber && formData.roleId)
      createEmployee(formData)
        .unwrap()
        .then((res) => {
          setFormData(initialState);
          message.success("employee created successfully");
          setOpen(false);
        })
        .catch((err) => {
          message.error(
            err?.data?.responseDescription || "something went wrong"
          );
        });
  };
  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      centered={true}
      width="35%"
    >
      <div className=" flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-1 text-center">Send Invite </h2>
        <form
          onSubmit={onFormSubmit}
          className="w-full space-y-4 mt-6 items-center px-2"
        >
          <div className="space-x-2 flex flex-col md:flex-row w-full">
            <div className="w-full space-y-1">
              <label htmlFor="firstName" className="font-semibold text-sm">
                First Name
              </label>
              <Input
                id="firstName"
                placeholder="First Name"
                className="w-full px-3 py-2 border border-gray-300 text-gray-800 placeholder-text-gray-900 text-sm rounded-md focus:outline-none"
                required
                name="firstName"
                onChange={onInputChange}
                value={formData.firstName}
              />
            </div>
            <div className="w-full  space-y-1">
              <label htmlFor="firstName" className="font-semibold text-sm">
                Last Name
              </label>
              <Input
                id="lastName"
                placeholder="Last Name"
                className="w-full px-3 py-2 border border-gray-300 text-gray-800 placeholder-text-gray-900 text-sm rounded-md focus:outline-none"
                required
                name="lastName"
                onChange={onInputChange}
                value={formData.lastName}
              />
            </div>
          </div>

          <div className="flex flex-col space-y-1 w-full">
            <label htmlFor="email" className="font-semibold text-sm">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              className="w-full px-3 py-2 border border-gray-300 text-gray-800 placeholder-text-gray-900 text-sm rounded-md focus:outline-none"
              required
              name="email"
              onChange={onInputChange}
              value={formData.email}
            />
          </div>
          <div className="flex flex-col space-y-1 w-full">
            <label htmlFor="" className="font-semibold text-sm">
              Phone Number
            </label>
            <PhoneInput
              country={"ng"}
              containerClass="!w-full"
              inputClass="phone-input-input !w-full"
              value={formData.phoneNumber}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, phoneNumber: value }))
              }
            />
          </div>

          <div className="flex flex-col space-y-1 w-full">
            <label className="block text-black text-sm font-semibold mb-2">
              Roles
            </label>
            <Select
              className="!w-full"
              placeholder="select roles"
              options={roles}
              onSelect={(value) => {
                setFormData((prev) => ({ ...prev, roleId: value }));
              }}
              value={formData.roleId}
            />
          </div>
          <Button
            loading={isLoading}
            type="primary"
            htmlType="submit"
            className="!h-[3rem] !bg-Primary w-full text-white hover:!text-white !bg-black"
          >
            Send request
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default AdminstrationModal;
