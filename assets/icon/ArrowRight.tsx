import { Icon } from "./type";

const ArrowRight = ({ ...props }: Icon) => {
  return (
    <svg
      {...props}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_1872_18540)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M-8.74228e-08 14C-3.91405e-08 15.1046 0.895431 16 2 16L14 16C15.1046 16 16 15.1046 16 14L16 2C16 0.89543 15.1046 -6.60242e-07 14 -6.11959e-07L2 -8.74228e-08C0.89543 -3.91405e-08 -6.60242e-07 0.895431 -6.11959e-07 2L-8.74228e-08 14Z"
          fill="#2FCAA3"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M4.94285 12.0002L10.6798 6.26321L10.6798 11.5335L12.0139 11.5288L12.0139 3.98633L4.47144 3.98633L4.47144 5.31569L9.73703 5.3204L4.00004 11.0574L4.94285 12.0002Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_1872_18540">
          <rect
            width="16"
            height="16"
            fill="white"
            transform="translate(0 16) rotate(-90)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default ArrowRight;
