import React from "react";
import { Icon } from "./type";

const UplaodImage = ({ ...props }: Icon) => {
    return (
        <svg
        {...props}
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_3816_20494)">
                <path d="M20 10.6665H20.0133" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M22.6663 5.3335H9.33301C7.12387 5.3335 5.33301 7.12436 5.33301 9.3335V22.6668C5.33301 24.876 7.12387 26.6668 9.33301 26.6668H22.6663C24.8755 26.6668 26.6663 24.876 26.6663 22.6668V9.3335C26.6663 7.12436 24.8755 5.3335 22.6663 5.3335Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M5.33301 19.9999L10.6663 14.6666C11.2744 14.0815 11.9642 13.7734 12.6663 13.7734C13.3685 13.7734 14.0583 14.0815 14.6663 14.6666L21.333 21.3333" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M18.667 18.6664L20.0003 17.3331C20.6084 16.748 21.2982 16.4399 22.0003 16.4399C22.7025 16.4399 23.3922 16.748 24.0003 17.3331L26.667 19.9998" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </g>
            <defs>
                <clipPath id="clip0_3816_20494">
                    <rect width="32" height="32" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
};

export default UplaodImage;
