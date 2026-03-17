"use client";
import { useState } from "react";
import { Drawer } from "antd";
import PreviewRole from "../adminstration-tab/PreviewRole";
import { CustomButton as Button } from "@/lib/AntdComponents";
import UpdateRoleModal from "./UpdateRoleModal";
interface AccountDetailsProps {
  Open: boolean;
  setOpen: (value: boolean) => void;
  id: string;
}

const RoleDrawal: React.FC<AccountDetailsProps> = ({ Open, setOpen, id }) => {
  const [openModal, setOpenModal] = useState(false);
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Drawer onClose={onClose} maskClosable={false} open={Open}>
        <PreviewRole id={id} />
        <Button
          onClick={() => {
            setOpenModal(true);
          }}
          className="!w-full !mt-[2rem]"
        >
          Update
        </Button>
      </Drawer>
      <UpdateRoleModal id={id} open={openModal} setOpen={setOpenModal} />
    </>
  );
};

export default RoleDrawal;
