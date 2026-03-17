import {
  CustomModal as Modal,
  CustomButton as Button,
} from "@/lib/AntdComponents";
import { useDeleteBeneficiaryMutation } from "@/services/payrollService";
import { message } from "antd";

const DeleteMemberModal = ({
  open,
  setOpen,
  id,
  closeDrawal,
  invalidateAction,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  id: string;
  closeDrawal: () => void;
  invalidateAction: () => void;
}) => {
  const [deleteMember, { isLoading }] = useDeleteBeneficiaryMutation();
  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      centered={true}
      width="35%"
      maskClosable={false}
    >
      <div className=" flex flex-col gap-[1rem] items-center">
        <h2 className="text-[28px] font-[700] text-[#000]">Delete Member</h2>
        <p className="text-[#515B6F] text-[18px] font-[400] text-center">
          permanently delete this member from payroll beneficiary.
        </p>
        <Button
          onClick={() =>
            deleteMember(id)
              .unwrap()
              .then((res) => {
                invalidateAction();
                message.success("beneficiary deleted successfully");
                closeDrawal();
                setOpen(false);
              })
              .catch((err) => {
                message.error(
                  err?.data?.responseDescription || "something went wrong"
                );
              })
          }
          loading={isLoading}
          danger
          type="primary"
          className="!h-[3rem] !bg-[#F6513B] w-full text-white hover:!text-white"
        >
          Yes
        </Button>
        <Button
          disabled={isLoading}
          className="!h-[3rem] w-full"
          onClick={() => setOpen(false)}
        >
          No
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteMemberModal;
