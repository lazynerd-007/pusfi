import {
  CustomPasswordInput as PasswordInput,
  CustomButton as Button,
} from "@/lib/AntdComponents";
import {
  useState,
  ChangeEventHandler,
  FormEventHandler,
  MouseEventHandler,
  WheelEvent,
  useRef,
  ChangeEvent,
  KeyboardEvent,
  useEffect,
} from "react";
import { useUpdatePasswordMutation } from "@/services/authService";
import { message } from "antd";
import { passwordSchema } from "@/lib/validationSchema";
import {
  useCreatePinMutation,
  useUpdatePinMutation,
} from "@/services/securityService";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateUserPin } from "@/store/userSlice";

const initialState = {
  password: "",
  newPassword: "",
  confirmNewPassword: "",
};
const Security = () => {
  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();
  const [updatePin, { isLoading: pinLoading }] = useUpdatePinMutation();
  const [createPin, { isLoading: createPinLoading }] = useCreatePinMutation();
  const [formData, setFormData] = useState(initialState);
  const [validationError, setValidationError] = useState("");
  const [confirmValidationError, setConfirmValidationError] = useState("");
  const [pin, setPin] = useState<string[]>(["", "", "", ""]);
  const [oldPin, setOldPin] = useState<string[]>(["", "", "", ""]);
  const [confirmPin, setConfirmPin] = useState<string[]>(["", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const inputRefsConfirm = useRef<(HTMLInputElement | null)[]>([]);
  const inputRefsOld = useRef<(HTMLInputElement | null)[]>([]);

  const dispatch = useAppDispatch()
  const bussinesId = useAppSelector((state) => state.user.user.businessId);
  const hasPin = useAppSelector((state) => state.user.hasPin.has_pin);

  ///HANDLE PASSWORD SUBMIT*******************
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!validationError && !confirmValidationError)
      updatePassword(formData)
        .unwrap()
        .then(() => {
          message.success("password updated successfully");
          setFormData(initialState);
        })
        .catch((err) => {
          message.error(
            err?.data?.responseDescription ||
              err?.data?.title ||
              "something went wrong"
          );
        });
  };

  ///Hadles New PIN CREATION*********************
  const handleCreatePin: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
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
        message.success("Pin Creation successful");
        dispatch(updateUserPin(res?.data?.data))
        setPin(["", "", "", ""]);
        setConfirmPin(["", "", "", ""]);
       
      })
      .catch((err) => {
        message.error("Pin creation failed");
      });
  };
  ///HANDLES OLD PIN CHANGE*********************
  const handlePinChange: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (pin.join("") !== confirmPin.join("")) {
      message.warning("Pins do not match. Please try again.");
      return;
    }

    updatePin({
      businessId: bussinesId,
      oldPin: oldPin.join(""),
      newPin: pin.join(""),
      newPinConfirmation: confirmPin.join(""),
    })
      .unwrap()
      .then(() => {
        message.success("Pin Update successful");
        setPin(["", "", "", ""]);
        setOldPin(["", "", "", ""]);
        setConfirmPin(["", "", "", ""]);
      })
      .catch((err) => {
        message.error(err?.data?.message || "Pin Update failed");
      });
  };

  ///HANDLE PASSWORD CHANGE**************************
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.name === "newPassword")
      passwordSchema
        .validate({ password: e.target?.value })
        .then(() => setValidationError(""))
        .catch((error) => setValidationError(error.message));
    if (
      e.target.name === "confirmNewPassword" &&
      e.target.value !== formData.newPassword
    )
      setConfirmValidationError("password must match");
    else if (
      e.target.name === "confirmNewPassword" &&
      e.target.value == formData.newPassword
    )
      setConfirmValidationError("");
    setFormData((prevState) => ({
      ...prevState,
      [e.target?.name]: e.target?.value,
    }));
  };

  const handleWheelConfirm = (e: WheelEvent<HTMLInputElement>) => {
    e.preventDefault();
  };

  const handleChangePin = (value: string, index: number) => {
    const newPin = [...pin];
    newPin[index] = value;
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
    newPin[index] = value;
    if (/^\d*$/.test(value)) {
      newPin[index] = value;
      if (value.length > 0 && index < 3) {
        inputRefsConfirm.current[index + 1]?.focus();
      }
      setConfirmPin(newPin);
    }
  };
  const handleChangeOld = (value: string, index: number) => {
    const newPin = [...oldPin];
    newPin[index] = value;
    if (/^\d*$/.test(value)) {
      newPin[index] = value;
      if (value.length > 0 && index < 3) {
        inputRefsOld.current[index + 1]?.focus();
      }
      setOldPin(newPin);
    }
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
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
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
    }
    if (e.key === "Backspace" && index > 0 && confirmPin[index] === "") {
      inputRefsConfirm.current[index - 1]?.focus();
    }
  };
  const handleKeyDownOld = (
    e: KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
    }
    if (e.key === "Backspace" && index > 0 && oldPin[index] === "") {
      inputRefsOld.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex flex-col py-4 w-full space-y-3">
      <span>
        <h1 className="font-semibold">Security Information </h1>
        <p className="text-gray-600 text-sm">
          This is Company information that you can update anytime.
        </p>
      </span>
      <form onSubmit={handleSubmit} className=" w-full rounded-md">
        <div className="mb-4 p-2 grid grid-cols-[400px,1fr] gap-6 items-start">
          <div className="text-sm flex-col flex">
            <h1 className="font-semibold">Change Password</h1>{" "}
            {formData.newPassword && validationError && (
              <ul className="bg-white rounded-[5px] p-[3%]">
                <li className="flex items-center gap-[0.5rem]">
                  <span
                    className={`h-[13px] w-[13px] rounded-full ${
                      /^(.{8,})$/.test(formData.newPassword)
                        ? "bg-black"
                        : "bg-slate-300"
                    }`}
                  ></span>
                  <p className="text-[#252B33] text-[12px] font-[400]">
                    A minimum of 8 characters
                  </p>
                </li>
                <li className="flex items-center gap-[0.5rem]">
                  <span
                    className={`h-[13px] w-[13px] rounded-full ${
                      /.*[a-zA-Z].*/.test(formData.newPassword)
                        ? "bg-black"
                        : "bg-slate-300"
                    }`}
                  ></span>
                  <p className="text-[#252B33] text-[12px] font-[400]">
                    At least one letter
                  </p>
                </li>
                <li className="flex items-center gap-[0.5rem]">
                  <span
                    className={`h-[13px] w-[13px] rounded-full ${
                      /.*[0-9].*/.test(formData.newPassword)
                        ? "bg-black"
                        : "bg-slate-300"
                    }`}
                  ></span>
                  <p className="text-[#252B33] text-[12px] font-[400]">
                    At least one number
                  </p>
                </li>
                <li className="flex items-center gap-[0.5rem]">
                  <span
                    className={`h-[13px] w-[13px] rounded-full ${
                      /[!@#$%^&*(),.?":{}|<>]/.test(formData.newPassword)
                        ? "bg-black"
                        : "bg-slate-300"
                    }`}
                  ></span>
                  <p className="text-[#252B33] text-[12px] font-[400]">
                    At least one special character
                  </p>
                </li>
              </ul>
            )}
            {/* validation */}
          </div>
          <div className="w-full md:w-[400px] flex flex-col space-y-4">
            <div className="flex flex-col  ">
              <label
                className="block text-gray-600 text-sm font-semibold mb-2"
                htmlFor="password"
              >
                Current Password
              </label>
              <PasswordInput
                placeholder="current password"
                id="password"
                type="password"
                required
                name="password"
                onChange={handleChange}
                value={formData.password}
              />
            </div>
            <div className="flex-1 ">
              {" "}
              <label
                className="block text-gray-600 text-sm font-semibold mb-2"
                htmlFor="password"
              >
                New Password
              </label>
              <PasswordInput
                placeholder="Enter your password"
                id="password"
                type="password"
                required
                value={formData.newPassword}
                name="newPassword"
                onChange={handleChange}
              />
            </div>
            <div className="flex-1 ml2">
              {" "}
              <label
                className="block text-gray-600 text-sm font-semibold mb-2"
                htmlFor="confirmpass"
              >
                Confirm password
              </label>
              <PasswordInput
                placeholder="Confirm password"
                id="password"
                type="password"
                name="confirmNewPassword"
                required
                value={formData.confirmNewPassword}
                onChange={handleChange}
              />
              <p>{confirmValidationError}</p>
            </div>
            <div className="flex justify-end items-end my-[1rem]">
              <Button
                htmlType="submit"
                type="primary"
                loading={isLoading}
                className="!bg-black w-full"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </form>
      <hr />
      {/*****************************PIN CHANGE******************************************************/}
      <form className=" w-full rounded-md">
        <div className="mb-4 p-2 grid grid-cols-[400px,1fr] gap-6 items-start">
          <div className="text-sm flex-col flex">
            <h1 className="font-semibold">Change Pin</h1>{" "}
          </div>
          <div className="w-full md:w-[400px] flex flex-col space-y-4">
            <div className={`${hasPin === false ? "hidden" : "block"}`}>
              <h3 className=" font-semibold text-sm mb-2">Old Pin</h3>
              <div className=" flex gap-5">
                {oldPin.map((digit, index) => (
                  <input
                    key={index}
                    type="text" // Change to text to prevent number input scroll behavior
                    inputMode="numeric" // Ensures numeric keyboard on mobile devices
                    placeholder="0"
                    maxLength={1}
                    value={digit}
                    onWheel={handleWheelConfirm}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleChangeOld(e.target.value, index)
                    }
                    onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
                      handleKeyDownOld(e, index)
                    }
                    ref={(el) => {
                      inputRefsOld.current[index] = el;
                    }}
                    className=" w-[50px] h-[50px] border border-gray-200 rounded-md p-1 text-center"
                  />
                ))}
              </div>
            </div>
            <div>
              <h3 className=" font-semibold text-sm mb-2">New Pin</h3>
              <div className=" flex gap-5">
                {pin.map((digit, index) => (
                  <input
                    key={index}
                    type="text" // Change to text to prevent number input scroll behavior
                    inputMode="numeric" // Ensures numeric keyboard on mobile devices
                    placeholder="0"
                    maxLength={1}
                    value={digit}
                    onWheel={handleWheelConfirm}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleChangePin(e.target.value, index)
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
            <div>
              <h3 className=" font-semibold text-sm mb-2">Confirm Pin</h3>
              <div className=" flex gap-5">
                {confirmPin.map((digit, index) => (
                  <input
                    key={index}
                    type="text" // Change to text to prevent number input scroll behavior
                    inputMode="numeric" // Ensures numeric keyboard on mobile devices
                    placeholder="0"
                    maxLength={1}
                    value={digit}
                    onWheel={handleWheelConfirm}
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
            {hasPin === false ? (
              <div className="flex justify-end items-end my-[1rem]">
                <Button
                  htmlType="submit"
                  type="primary"
                  loading={createPinLoading}
                  className="!bg-black w-full"
                  onClick={handleCreatePin}
                >
                  Create Pin
                </Button>
              </div>
            ) : (
              <div className="flex justify-end items-end my-[1rem]">
                <Button
                  htmlType="submit"
                  type="primary"
                  loading={pinLoading}
                  className="!bg-black w-full"
                  onClick={handlePinChange}
                >
                  Save Changes
                </Button>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Security;
