import { Icon } from "./type";

const DeleteIcon = ({ ...props }: Icon) => {
  return (
    <svg
      {...props}
      width="40"
      height="45"
      viewBox="0 0 57 57"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_474_6583)">
        <path
          d="M17.5 21.625H39.5"
          stroke="#515B6F"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M25.75 27.125V35.375"
          stroke="#515B6F"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M31.25 27.125V35.375"
          stroke="#515B6F"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M18.875 21.625L20.25 38.125C20.25 38.8543 20.5397 39.5538 21.0555 40.0695C21.5712 40.5853 22.2707 40.875 23 40.875H34C34.7293 40.875 35.4288 40.5853 35.9445 40.0695C36.4603 39.5538 36.75 38.8543 36.75 38.125L38.125 21.625"
          stroke="#515B6F"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M24.375 21.625V17.5C24.375 17.1353 24.5199 16.7856 24.7777 16.5277C25.0356 16.2699 25.3853 16.125 25.75 16.125H31.25C31.6147 16.125 31.9644 16.2699 32.2223 16.5277C32.4801 16.7856 32.625 17.1353 32.625 17.5V21.625"
          stroke="#515B6F"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <rect x="0.5" y="0.5" width="56" height="56" rx="4.5" stroke="#DDE4F7" />
      <defs>
        <clipPath id="clip0_474_6583">
          <rect
            width="33"
            height="33"
            fill="white"
            transform="translate(12 12)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default DeleteIcon;
