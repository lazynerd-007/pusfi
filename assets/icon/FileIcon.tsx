import { Icon } from "./type";

const FileIcon = ({ ...props }: Icon) => {
  return (
    <svg
      {...props}
      width="56"
      height="56"
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="28" cy="28" r="28" fill="#F6513B" fill-opacity="0.1" />
      <g clip-path="url(#clip0_3935_2111)">
        <path
          d="M25 21H23C22.4696 21 21.9609 21.2107 21.5858 21.5858C21.2107 21.9609 21 22.4696 21 23V35C21 35.5304 21.2107 36.0391 21.5858 36.4142C21.9609 36.7893 22.4696 37 23 37H33C33.5304 37 34.0391 36.7893 34.4142 36.4142C34.7893 36.0391 35 35.5304 35 35V23C35 22.4696 34.7893 21.9609 34.4142 21.5858C34.0391 21.2107 33.5304 21 33 21H31"
          stroke="#F6513B"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M29 19H27C25.8954 19 25 19.8954 25 21C25 22.1046 25.8954 23 27 23H29C30.1046 23 31 22.1046 31 21C31 19.8954 30.1046 19 29 19Z"
          stroke="#F6513B"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M25 28H25.01"
          stroke="#F6513B"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M29 28H31"
          stroke="#F6513B"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M25 32H25.01"
          stroke="#F6513B"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M29 32H31"
          stroke="#F6513B"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_3935_2111">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(16 16)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default FileIcon;
