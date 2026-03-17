"use client";
import { useState, useRef, ChangeEvent, KeyboardEvent } from "react";
import { CustomButton as Button } from "@/lib/AntdComponents";
import { useCreatePinMutation } from "@/services/securityService";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { message } from "antd";
import { updateUserPin } from "@/store/userSlice";

const Pin = () => {
  const [pin, setPin] = useState<string[]>(["", "", "", ""]);
  const [confirmPin, setConfirmPin] = useState<string[]>(["", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const inputRefsConfirm = useRef<(HTMLInputElement | null)[]>([]);
  const [createPin, { isLoading }] = useCreatePinMutation();

  const dispatch = useAppDispatch()
  const bussinesId = useAppSelector((state) => state.user.user.businessId);
  const { replace } = useRouter();
  const handleChange = (value: string, index: number) => {
    const newPin = [...pin];
    if (/^\d*$/.test(value)) {
    newPin[index] = value;
    if (value.length > 0 && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }

    setPin(newPin);
  }
  };

  const handleChangeConfirm = (value: string, index: number) => {
    const newPin = [...confirmPin];
    if (/^\d*$/.test(value)){
    newPin[index] = value;

    if (value.length > 0 && index < 3) {
      inputRefsConfirm.current[index + 1]?.focus();
    }

    setConfirmPin(newPin);
  }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
    }
    if (e.key === "Backspace" && index > 0 && pin[index] === "") {
      inputRefs.current[index - 1]?.focus();
    }
  };
  const handleKeyDownConfirm = (
    e: KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
    }
    if (e.key === "Backspace" && index > 0 && confirmPin[index] === "") {
      inputRefsConfirm.current[index - 1]?.focus();
    }
  };

  const handleSave = () => {
    if (pin.join("") !== confirmPin.join("")) {
      message.warning("Pins do not match. Please try again.");
      return;
    }

    createPin({
      businessId: bussinesId,
      pin: pin.join(""),
      pinConfirmation: confirmPin.join(""),
    })
      .unwrap()
      .then((res) => {
        dispatch(updateUserPin(res?.data?.data))
        replace("/dashboard");
      })
      .catch((err) => {
        message.error("Pin creation failed");
      });
  };
const skip = () => {
  replace("/dashboard");
}
  return (
    <main>
      <h1 className=" font-semibold text-lg">Create Pin</h1>
      <p className=" text-[#5A5C5C] text-base">
        This pin will be used to make payment on the platform
      </p>

      <section className=" bg-white px-5 py-10 space-y-5 mt-5">
        <div>
          <h3 className=" font-semibold text-sm mb-2">New Pin</h3>
          <div className=" flex gap-5">
            {pin.map((digit, index) => (
              <input
                key={index}
                type="text"  // Change to text to prevent number input scroll behavior
                    inputMode="numeric"  // Ensures numeric keyboard on mobile devices
                placeholder="0"
                maxLength={1}
                value={digit}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChange(e.target.value, index)
                }
                onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
                  handleKeyDown(e, index)
                }
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                className=" w-[50px] h-[50px] border border-gray-200 rounded-md p-1 text-center"
              />
            ))}
          </div>
        </div>

        <div className=" ">
          <h3 className=" font-semibold text-sm mb-2">Confirm Pin</h3>
          <div className=" flex gap-5">
            {confirmPin.map((digit, index) => (
              <input
                key={index}
                type="text"  // Change to text to prevent number input scroll behavior
                inputMode="numeric"  // Ensures numeric keyboard on mobile devices
                placeholder="0"
                maxLength={1}
                value={digit}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChangeConfirm(e.target.value, index)
                }
                onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
                  handleKeyDownConfirm(e, index)
                }
                ref={(el) => {
                  inputRefsConfirm.current[index] = el;
                }}
                className=" w-[50px] h-[50px] border border-gray-200 rounded-md p-1 text-center"
              />
            ))}
          </div>
        </div>

        <div className=" flex justify-center">
          <div className=" space-y-4 max-w-[40%] w-full">
            <Button
              loading={isLoading}
              className="!bg-[#000] !h-[3rem] !mx-auto w-full text-white hover:!text-white"
              onClick={handleSave}
            >
              Save
            </Button>
            <Button 
            onClick={skip}
            className="!bg-white !h-[3rem] !mx-auto w-full text-black">
              Skip Later
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Pin;
