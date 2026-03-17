"use client";
import { Drawer } from "antd";
import { useEffect, useState } from "react";
import { useLazyGetSingleEmployeeQuery } from "@/services/managementService";
import {
  CustomSwitch as Switch,
  CustomInput as Input,
  CustomSpinner as Spinner,
} from "@/lib/AntdComponents";
import PreviewRole from "./PreviewRole";
interface AccountDetailsProps {
  Open: boolean;
  setOpen: (value: boolean) => void;
  id: string;
  memberId: string;
}

const MemberDrawal: React.FC<AccountDetailsProps> = ({
  Open,
  setOpen,
  id,
  memberId,
}) => {
  const [getEmployee, { data, isLoading }] = useLazyGetSingleEmployeeQuery();
  const [childrenDrawer, setChildrenDrawer] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  const showChildrenDrawer = () => {
    setChildrenDrawer(true);
  };

  const onChildrenDrawerClose = () => {
    setChildrenDrawer(false);
  };
  useEffect(() => {
    if (id)
      getEmployee(memberId)
        .unwrap()
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
  }, [memberId]);
  return (
    <Drawer
      onClose={onClose}
      maskClosable={false}
      open={Open}
      extra={
        <div className="flex items-center gap-[0.5rem]">
          <p>preview role</p>
          <Switch
            className="bg-gray-400"
            checked={childrenDrawer}
            onChange={(e) => setChildrenDrawer(e)}
          />
        </div>
      }
    >
      {isLoading ? (
        <div className="flex items-center justify-center h-[100vh] w-full absolute opacity-[0.7] bg-gray-100 z-[100]">
          <Spinner className="!m-auto !block" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-[0.5rem]">
            <span className="flex flex-col w-full">
              <label
                htmlFor="firstName"
                className="text-[#181336] text-[16px] font-[600]"
              >
                First Name
              </label>
              <Input
                value={data?.data?.firstName}
                disabled
                id="firstName"
                placeholder="First Name"
              />
            </span>
            <span className="flex flex-col w-full">
              <label
                htmlFor="lastName"
                className="text-[#181336] text-[16px] font-[600]"
              >
                Last Name
              </label>
              <Input
                value={data?.data?.lastName}
                disabled
                id="lastName"
                placeholder="Last Name"
              />
            </span>
            <span className="flex flex-col w-full">
              <label
                htmlFor="email"
                className="text-[#181336] text-[16px] font-[600]"
              >
                Email Address
              </label>
              <Input
                value={data?.data?.email}
                disabled
                id="email"
                type="email"
                placeholder="Email"
              />
            </span>
            {/* <span className="flex flex-col w-full">
          <label
            htmlFor="role"
            className="text-[#181336] text-[16px] font-[600]"
          >
            Role
          </label>
          <Input disabled id="email" type="email" placeholder="Email" />
        </span> */}
            {/* <Button type="primary">save</Button> */}
            {/* <Button>cancel</Button> */}
          </div>
          <Drawer
            open={childrenDrawer}
            onClose={onChildrenDrawerClose}
            closable={false}
          >
            <PreviewRole id={id} />
          </Drawer>
        </>
      )}
    </Drawer>
  );
};

export default MemberDrawal;
