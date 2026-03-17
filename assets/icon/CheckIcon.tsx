import { Icon } from "./type";

const CheckIcon = ({ ...props }: Icon) => {
  return (
    <svg
      {...props}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8 0C3.5888 0 0 3.5888 0 8C0 12.4112 3.5888 16 8 16C12.4112 16 16 12.4112 16 8C16 3.5888 12.4112 0 8 0ZM6.4008 11.5304L3.4304 8.5664L4.56 7.4336L6.3992 9.2696L10.6344 5.0344L11.7656 6.1656L6.4008 11.5304Z"
        fill="black"
      />
    </svg>
  );
};

export default CheckIcon;
