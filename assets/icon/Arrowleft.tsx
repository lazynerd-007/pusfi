import React from "react";
import { Icon } from "./type";

const Arrowleft = ({ ...props }: Icon) => {
  return (
    <svg
    {...props}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_1872_18529)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M2 0C0.895431 0 0 0.895431 0 2L0 14C0 15.1046 0.895431 16 2 16L14 16C15.1046 16 16 15.1046 16 14L16 2C16 0.895431 15.1046 0 14 0L2 0Z"
          fill="#F6513B"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M3.99998 4.9426L9.73697 10.6796L4.46667 10.6796L4.47138 12.0137L12.0139 12.0137L12.0139 4.4712L10.6845 4.4712L10.6798 9.73679L4.94279 3.99979L3.99998 4.9426Z"
          fill="#F9FFFF"
        />
      </g>
      <defs>
        <clipPath id="clip0_1872_18529">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Arrowleft;
