import { Modal } from "antd";
import { FormEventHandler, ChangeEventHandler, useState } from "react";
import {
  useCreateRoleMutation,
  useGetPermissionsQuery,
} from "@/services/managementService";
import {
  CustomInput as Input,
  CustomButton as Button,
  CustomRadioGroup as RadioGroup,
} from "@/lib/AntdComponents";
import { message } from "antd";
import { useAppSelector } from "@/store/hooks";
const permissions: string[] | [] = [];
const initialState = {
  businessId: "",
  roleName: "",
  description: "",
  permissions,
};
type DataType = { label: string; value: string };
const RoleModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
}) => {
  const businessProfile = useAppSelector((state) => state?.user?.business);
  const [formData, setFormData] = useState(initialState);
  // const [roles, setRoles] = useState<DataType[]>([]);
  const { data } = useGetPermissionsQuery({});
  const [createRole, { isLoading }] = useCreateRoleMutation();
  const [rolePermission, setRolePermission] = useState({
    CreateNewUser: false,
    ModifyUser: false,
    CreateRole: false,
    ModifyRole: false,
    ViewRole: false,
    ViewUser: false,
    ViewBusiness: false,
    ViewWallet: false,
    ViewTransaction: false,
    ViewTransactionStatement: false,
    CreateCollections: false,
    CreateDisbursement: false,
    ViewDisbursement: false,
    CreateInvoice: false,
    ViewInvoice: false,
    CreatePayroll: false,
    ModifyPayroll: false,
    ViewPayroll: false,
    UpdateBusiness: false,
    ViewBillPayment: false,
    ModifyBillPayment: false,
    CreateBillPaymentTransaction: false,
    ViewBillPaymentTransaction: false,
    ViewRemitaPaymentTransaction: false,
    CreateRemitaPaymentTransaction: false,
  });
  const onInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const onFormSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    const permissionsList: string[] = [];
    for (var [key, value] of Object.entries(rolePermission)) {
      if (value) permissionsList.push(key);
    }
    setFormData((prev) => ({ ...prev, permissions: permissionsList }));
    if (formData.permissions.length > 0)
      createRole({ ...formData, businessId: businessProfile?.id })
        .unwrap()
        .then((res) => {
          setFormData(initialState);
          message.success("role created successfully");
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
        <h2 className="text-3xl font-semibold text-center">
          Create Roles and Permission
        </h2>

        <form
          onSubmit={onFormSubmit}
          className="w-full space-y-6 mt-6 items-center px-2"
        >
          <div className="w-full space-y-1">
            <label htmlFor="roleName" className="font-semibold text-sm mb-2">
              what do you want to call this role
            </label>
            <Input
              id="roleName"
              placeholder="Role Name"
              className="w-full px-3 py-2 border border-gray-300 text-gray-800 placeholder-text-gray-900 text-sm rounded-md focus:outline-none"
              required
              name="roleName"
              onChange={onInputChange}
              value={formData.roleName}
            />
          </div>
          <div className="w-full  space-y-1">
            <label htmlFor="roleDesc" className="font-semibold text-sm">
              Role Description
            </label>
            <Input
              id="roleDesc"
              placeholder="Role Description"
              className="w-full px-3 py-2 border border-gray-300 text-gray-800 placeholder-text-gray-900 text-sm rounded-md focus:outline-none"
              required
              name="description"
              onChange={onInputChange}
              value={formData.description}
            />
          </div>
          <div className="h-[20rem] space-y-3 overflow-y-scroll">
            <div className="flex flex-col gap-[0.5rem]">
              <h4 className="text-[#181336] text-[16px] font-[700]">
                User management
              </h4>
              <span className="flex items-center justify-between w-full">
                <p className="text-[#515B6F] text-[16px] font-[400]">
                  Create User
                </p>
                <RadioGroup
                  onChange={(e) =>
                    setRolePermission((prev) => ({
                      ...prev,
                      CreateNewUser: e.target.value,
                    }))
                  }
                  options={[
                    { label: "Yes", value: true },
                    { label: "No", value: false },
                  ]}
                />
              </span>
              <span className="flex items-center justify-between w-full">
                <p className="text-[#515B6F] text-[16px] font-[400]">
                  Modify User
                </p>
                <RadioGroup
                  onChange={(e) =>
                    setRolePermission((prev) => ({
                      ...prev,
                      ModifyUser: e.target.value,
                    }))
                  }
                  options={[
                    { label: "Yes", value: true },
                    { label: "No", value: false },
                  ]}
                />
              </span>
              <span className="flex items-center justify-between w-full">
                <p className="text-[#515B6F] text-[16px] font-[400]">
                  Create Role
                </p>
                <RadioGroup
                  onChange={(e) =>
                    setRolePermission((prev) => ({
                      ...prev,
                      CreateRole: e.target.value,
                    }))
                  }
                  options={[
                    { label: "Yes", value: true },
                    { label: "No", value: false },
                  ]}
                />
              </span>
              <span className="flex items-center justify-between w-full">
                <p className="text-[#515B6F] text-[16px] font-[400]">
                  Modify Role
                </p>
                <RadioGroup
                  onChange={(e) =>
                    setRolePermission((prev) => ({
                      ...prev,
                      ModifyRole: e.target.value,
                    }))
                  }
                  options={[
                    { label: "Yes", value: true },
                    { label: "No", value: false },
                  ]}
                />
              </span>
              <span className="flex items-center justify-between w-full">
                <p className="text-[#515B6F] text-[16px] font-[400]">
                  View Role
                </p>
                <RadioGroup
                  onChange={(e) =>
                    setRolePermission((prev) => ({
                      ...prev,
                      ViewRole: e.target.value,
                    }))
                  }
                  options={[
                    { label: "Yes", value: true },
                    { label: "No", value: false },
                  ]}
                />
              </span>
              <span className="flex items-center justify-between w-full">
                <p className="text-[#515B6F] text-[16px] font-[400]">
                  View User
                </p>
                <RadioGroup
                  onChange={(e) =>
                    setRolePermission((prev) => ({
                      ...prev,
                      ViewUser: e.target.value,
                    }))
                  }
                  options={[
                    { label: "Yes", value: true },
                    { label: "No", value: false },
                  ]}
                />
              </span>
            </div>
            <div className="flex flex-col gap-[0.5rem]">
              <h4 className="text-[#181336] text-[16px] font-[700 ] font-semibold mb-1">
                Account
              </h4>
              <span className="flex items-center justify-between">
                <p className="text-[#515B6F] text-[16px] font-[400]">
                  Can View Account
                </p>
                <RadioGroup
                  onChange={(e) =>
                    setRolePermission((prev) => ({
                      ...prev,
                      ViewWallet: e.target.value,
                    }))
                  }
                  options={[
                    { label: "Yes", value: true },
                    { label: "No", value: false },
                  ]}
                />
              </span>
              <span className="flex items-center justify-between">
                <p className="text-[#515B6F] text-[16px] font-[400]">
                  Can download statement
                </p>
                <RadioGroup
                  onChange={(e) =>
                    setRolePermission((prev) => ({
                      ...prev,
                      ViewTransactionStatement: e.target.value,
                    }))
                  }
                  options={[
                    { label: "Yes", value: true },
                    { label: "No", value: false },
                  ]}
                />
              </span>
              <span className="flex items-center justify-between">
                <p className="text-[#515B6F] text-[16px] font-[400]">
                  Can create payment
                </p>
                <RadioGroup
                  onChange={(e) =>
                    setRolePermission((prev) => ({
                      ...prev,
                      CreateDisbursement: e.target.value,
                    }))
                  }
                  options={[
                    { label: "Yes", value: true },
                    { label: "No", value: false },
                  ]}
                />
              </span>
            </div>
            <div className="flex flex-col gap-[0.3rem]">
              <h4 className="text-[#181336] text-[16px] font-[700]">Invoice</h4>
              <span className="flex items-center justify-between">
                <p className="text-[#515B6F] text-[16px] font-[400]">
                  Can create invoice
                </p>
                <RadioGroup
                  onChange={(e) =>
                    setRolePermission((prev) => ({
                      ...prev,
                      CreateInvoice: e.target.value,
                    }))
                  }
                  options={[
                    { label: "Yes", value: true },
                    { label: "No", value: false },
                  ]}
                />
              </span>
              <span className="flex items-center justify-between">
                <p className="text-[#515B6F] text-[16px] font-[400]">
                  Can view invoice
                </p>
                <RadioGroup
                  onChange={(e) =>
                    setRolePermission((prev) => ({
                      ...prev,
                      ViewInvoice: e.target.value,
                    }))
                  }
                  options={[
                    { label: "Yes", value: true },
                    { label: "No", value: false },
                  ]}
                />
              </span>
            </div>
            <div className="flex flex-col gap-[0.3rem]">
              <h4 className="text-[#181336] text-[16px] font-[700]">Payroll</h4>
              <span className="flex items-center justify-between">
                <p className="text-[#515B6F] text-[16px] font-[400]">
                  Can create payroll
                </p>
                <RadioGroup
                  onChange={(e) =>
                    setRolePermission((prev) => ({
                      ...prev,
                      CreatePayroll: e.target.value,
                    }))
                  }
                  options={[
                    { label: "Yes", value: true },
                    { label: "No", value: false },
                  ]}
                />
              </span>
              <span className="flex items-center justify-between">
                <p className="text-[#515B6F] text-[16px] font-[400]">
                  Can view payroll
                </p>
                <RadioGroup
                  onChange={(e) =>
                    setRolePermission((prev) => ({
                      ...prev,
                      ViewPayroll: e.target.value,
                    }))
                  }
                  options={[
                    { label: "Yes", value: true },
                    { label: "No", value: false },
                  ]}
                />
              </span>
            </div>
            <div className="flex flex-col gap-[0.3rem]">
              <h4 className="text-[#181336] text-[16px] font-[700]">
                Business Profile
              </h4>
              <span className="flex items-center justify-between">
                <p className="text-[#515B6F] text-[16px] font-[400]">
                  Can update Business
                </p>
                <RadioGroup
                  onChange={(e) =>
                    setRolePermission((prev) => ({
                      ...prev,
                      UpdateBusiness: e.target.value,
                    }))
                  }
                  options={[
                    { label: "Yes", value: true },
                    { label: "No", value: false },
                  ]}
                />
              </span>
            </div>
            <div className="flex flex-col gap-[0.3rem]">
              <h4 className="text-[#181336] text-[16px] font-[700]">
                Bill Payments
              </h4>
              <span className="flex items-center justify-between">
                <p className="text-[#515B6F] text-[16px] font-[400]">
                  Can view bill payments
                </p>
                <RadioGroup
                  onChange={(e) =>
                    setRolePermission((prev) => ({
                      ...prev,
                      ViewBillPayment: e.target.value,
                    }))
                  }
                  value={rolePermission?.ViewBillPayment}
                  options={[
                    { label: "Yes", value: true },
                    { label: "No", value: false },
                  ]}
                />
              </span>
              <span className="flex items-center justify-between">
                <p className="text-[#515B6F] text-[16px] font-[400]">
                  Can update bill payments
                </p>
                <RadioGroup
                  onChange={(e) =>
                    setRolePermission((prev) => ({
                      ...prev,
                      ModifyBillPayment: e.target.value,
                    }))
                  }
                  value={rolePermission?.ModifyBillPayment}
                  options={[
                    { label: "Yes", value: true },
                    { label: "No", value: false },
                  ]}
                />
              </span>
              <span className="flex items-center justify-between">
                <p className="text-[#515B6F] text-[16px] font-[400]">
                  Create bill payment transactions
                </p>
                <RadioGroup
                  onChange={(e) =>
                    setRolePermission((prev) => ({
                      ...prev,
                      CreateBillPaymentTransaction: e.target.value,
                    }))
                  }
                  value={rolePermission?.CreateBillPaymentTransaction}
                  options={[
                    { label: "Yes", value: true },
                    { label: "No", value: false },
                  ]}
                />
              </span>
              <span className="flex items-center justify-between">
                <p className="text-[#515B6F] text-[16px] font-[400]">
                  Can view bill payments transactions
                </p>
                <RadioGroup
                  onChange={(e) =>
                    setRolePermission((prev) => ({
                      ...prev,
                      ViewBillPaymentTransaction: e.target.value,
                    }))
                  }
                  value={rolePermission?.ViewBillPaymentTransaction}
                  options={[
                    { label: "Yes", value: true },
                    { label: "No", value: false },
                  ]}
                />
              </span>
            </div>
            <div className="flex flex-col gap-[0.3rem]">
              <h4 className="text-[#181336] text-[16px] font-[700]">
                Remita Transaction
              </h4>
              <span className="flex items-center justify-between">
                <p className="text-[#515B6F] text-[16px] font-[400]">
                  Can view remita transactions
                </p>
                <RadioGroup
                  onChange={(e) =>
                    setRolePermission((prev) => ({
                      ...prev,
                      ViewRemitaPaymentTransaction: e.target.value,
                    }))
                  }
                  value={rolePermission?.ViewRemitaPaymentTransaction}
                  options={[
                    { label: "Yes", value: true },
                    { label: "No", value: false },
                  ]}
                />
              </span>
              <span className="flex items-center justify-between">
                <p className="text-[#515B6F] text-[16px] font-[400]">
                  Can create remita transactions
                </p>
                <RadioGroup
                  onChange={(e) =>
                    setRolePermission((prev) => ({
                      ...prev,
                      CreateRemitaPaymentTransaction: e.target.value,
                    }))
                  }
                  value={rolePermission?.CreateRemitaPaymentTransaction}
                  options={[
                    { label: "Yes", value: true },
                    { label: "No", value: false },
                  ]}
                />
              </span>
            </div>
          </div>
          <Button
            loading={isLoading}
            type="primary"
            htmlType="submit"
            className="!h-[3rem] !bg-black w-full text-white hover:!text-white"
          >
            save Role
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default RoleModal;
