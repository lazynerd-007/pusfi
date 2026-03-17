import dynamic from "next/dynamic";
import React from "react";

const Login = dynamic(() => import("@/component/login/Login"), {
  ssr: false,
});

export const metadata = {
  title: "Login - PursFinance",
  description: "Login to your PursFinance dashboard",
};

const page = () => {
  return (
      <Login />
  )
}

export default page
