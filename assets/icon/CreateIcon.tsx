import { Icon } from "./type";

const CreateIcon = ({ ...props }: Icon) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M16 2H8C4 2 2 4 2 8V21C2 21.55 2.45 22 3 22H16C20 22 22 20 22 16V8C22 4 20 2 16 2Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.91 7.8382L7.72 13.0282C7.52 13.2282 7.33001 13.6182 7.29001 13.8982L7.01001 15.8782C6.91001 16.5982 7.41001 17.0982 8.13001 16.9982L10.11 16.7182C10.39 16.6782 10.78 16.4882 10.98 16.2882L16.17 11.0982C17.06 10.2082 17.49 9.1682 16.17 7.8482C14.85 6.5182 13.81 6.9382 12.91 7.8382Z"
        stroke="white"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.17 8.57812C12.61 10.1481 13.84 11.3881 15.42 11.8281"
        stroke="white"
        stroke-width="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CreateIcon;
