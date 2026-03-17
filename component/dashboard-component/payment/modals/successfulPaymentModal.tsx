import { Modal } from "antd";
import React from "react";
import { CustomButton as Button } from "@/lib/AntdComponents";
import { CustomSelect as Select } from "@/lib/AntdComponents";
import { FaRegCopy } from "react-icons/fa";
import SuccessModalLogo from "@/assets/icon/SuccessModalLogo";
const SuccessfulPaymentModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
}) => {
  return (
    <Modal
      centered={true}
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
    >
      <div className="flex flex-col items-center gap-2">
        <SuccessModalLogo />
        <h4 className="text-[28px] font-[700]">Successful</h4>
        <p className="text-[#515B6F] text-[18px] font-[400] text-center">
          Transaction successful and the payment is currently being
          processed .
        </p>
      </div>
    </Modal>
  );
};

export default SuccessfulPaymentModal;
