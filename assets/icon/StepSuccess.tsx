import { Icon } from "./type";
import React from "react";
const StepSuccess = ({ ...props  }: Icon) => {
    return (
        <svg
        { ...props }
            width="58"
            height="57"
            viewBox="0 0 58 57"
            fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle
                cx="29.0012"
                cy="28.0184"
                r="28"
                transform="rotate(0.0376019 29.0012 28.0184)"
                fill="#1AD48E" />
            <path
                d="M21.0019 28.0127L26.998 34.0166L37.0059 22.0232"
                stroke="white"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round" />
        </svg>


    );
};

export default StepSuccess;
