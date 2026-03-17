"use client";
import { CgMenuRightAlt } from "react-icons/cg";
import OnBoardingTabs from "../onBoarding-tabs/OnBoardingTabs";
const Onboarding = () => {
  return (
    <main className="mx-auto flex flex-col p-4 h-screen overflow-y-scroll">
      <label
        htmlFor="my-drawer-2"
        className="flex lg:hidden text-blue-800 px-3"
      >
        <CgMenuRightAlt size="25" />
      </label>
      <div className="text-center flex flex-col items-center py-6">
        <h1 className="font-semibold text-black text-lg mb-2">
          Welcome to your dashboard
        </h1>
        <p className="max-w-3xl text-sm">
          Your account is currently in{" "}
          <span className="text-red-400">test mode</span>, so there are a few
          more things to do before you can go live and start recieving payments,
          Follow the steps below too get activated.
        </p>
      </div>
      <OnBoardingTabs />
    </main>
  );
};

export default Onboarding;
