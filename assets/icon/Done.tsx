import React from "react";

const Done = ({ ...props }: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      width="96"
      height="92"
      viewBox="0 0 96 92"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Done">
        <g id="Oval" filter="url(#filter0_d_319_44339)">
          <path
            d="M48 80C70.0914 80 88 62.0914 88 40C88 17.9086 70.0914 0 48 0C25.9086 0 8 17.9086 8 40C8 62.0914 25.9086 80 48 80Z"
            fill="white"
          />
        </g>
        <path
          id="Path"
          d="M58.8 33L46 47.4L38 41"
          stroke="black"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_319_44339"
          x="0"
          y="-4"
          width="96"
          height="96"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="4" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.192157 0 0 0 0 0.501961 0 0 0 0 0.905882 0 0 0 0.3 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_319_44339"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_319_44339"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default Done;
