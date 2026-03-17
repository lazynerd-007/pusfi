import {
  CustomModal as Modal,
  CustomButton as Button,
} from "@/lib/AntdComponents";
import Image from "next/image";
import ComingSoonIcon from "@/assets/comingsoon.png";

const ComingSoon = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Modal
      centered
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      className="!rounnded-[4px]"
    >
      <div className="bg-white flex flex-col gap-[1rem] items-center justify-center">
        <Image
          alt="coming soon"
          width={227.994}
          height={151.981}
          className="w-[227.994px] h-[151.981px]"
          src={ComingSoonIcon}
        />
        <span className="text-[#515B6F] text-[18px] font-[400]">
          This feature is not currently available
        </span>
        <Button
          className="!bg-black text-white text-sm normal-case !w-full"
          type="primary"
          onClick={() => setOpen(false)}
        >
          Close
        </Button>
      </div>
    </Modal>
  );
};

export default ComingSoon;
