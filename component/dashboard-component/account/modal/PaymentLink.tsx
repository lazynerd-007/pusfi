import { Modal } from "antd";
import { useState } from "react";
import {
  CustomButton as Button,
  CustomTooltip as Tooltip,
} from "@/lib/AntdComponents";
import { useAppSelector } from "@/store/hooks";
const PaymentLink = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
}) => {
  const [toogleTooltip, setToogleTooltip] = useState(false);
  const wallet = useAppSelector((store) => store?.user?.wallet);
  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      centered={true}
    >
      <div className=" flex flex-col">
        <h2 className="text-2xl font-bold mb-1 text-center">
          Share Account Details
        </h2>
        <p className="text-sm text-gray-500 text-center">
          move fund from this account to another company account
        </p>
        <div className="w-full space-y-6 py-4 mt-4">
          <p className="font-semibold">
            Share this link to get paid directly to your PursFinance account
          </p>
          <div className=" border rounded-md flex items-center space-x-2 p-2">
            <textarea
              className="w-full h-10 p-2  rounded-md resize-none focus:outline-none font-semibold text-[0.7rem]"
              readOnly
            >
              {wallet?.link}
            </textarea>
            <Tooltip title="copied!" trigger={"click"} open={toogleTooltip}>
              <Button
                onClick={() => {
                  setToogleTooltip(true);
                  navigator.clipboard.writeText(wallet?.link).finally(() => {
                    setTimeout(() => {
                      setToogleTooltip(false);
                    }, 2000);
                  });
                }}
                className="bg-black text-white px-4 py-1 rounded-md hover:bg-black focus:outline-none"
                type="primary"
              >
                Copy
              </Button>
            </Tooltip>
          </div>
        </div>{" "}
      </div>{" "}
    </Modal>
  );
};

export default PaymentLink;
