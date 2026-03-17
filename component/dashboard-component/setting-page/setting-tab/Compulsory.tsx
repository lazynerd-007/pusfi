import { Avatar } from "antd";
import React from "react";

const Compulsory = () => {
  return (
    <div className="flex flex-col py-4 w-full space-y-3">
      <span>
        <h1 className="font-semibold">Compulsory Information </h1>
        <p className="text-gray-600 text-sm">
          This is Company information that you can update anytime.
        </p>
      </span>
      <div className=" w-full rounded-md">
        <div className="mb-4 p-2 flex flex-col md:flex-row space-x-24 ">
          <div className="text-sm flex-col flex">
            <h1 className="font-semibold">Business Owner</h1>{" "}
            <span className="text-sm mt-2">
              The companys owner as listed in the registration account{" "}
            </span>
          </div>{" "}
          <div className="flex flex-col space-y-4 w-full md:w-[400px]">
            <div className="flex items-center space-x-8">
              <Avatar
                style={{ backgroundColor: "#CDA4FF" }}
                size={40}
                className="!text-sm text-black"
              >
                JD
              </Avatar>
              <span className="text-sm">
                <p>Thomas Shelby</p>
                <p className="font-semibold">Director</p>
              </span>
            </div>
            <div className="flex items-center space-x-8">
              <Avatar
                style={{ backgroundColor: "#CDA4FF" }}
                size={40}
                className="!text-sm text-black"
              >
                JD
              </Avatar>
              <span className="text-sm">
                <p>Thomas Shelby</p>
                <p className="font-semibold">Director</p>
              </span>
            </div>
            <div className="flex items-center space-x-8">
              <Avatar
                style={{ backgroundColor: "#CDA4FF" }}
                size={40}
                className="!text-sm text-black"
              >
                JD
              </Avatar>
              <span className="text-sm">
                <p>Thomas Shelby</p>
                <p className="font-semibold">Director</p>
              </span>
            </div>
          </div>
        </div>
        <hr />
        <div className="mb-4 py-4 px-2 flex flex-col md:flex-row space-x-24 ">
          <div className="text-sm flex-col flex">
            <h1 className="font-semibold">Manage Refrence</h1>{" "}
            <p className="text-sm mt-2 max-w-xs">
              As per the Banking regulation, it is mandatory to provide two
              refrences.{" "}
            </p>
          </div>{" "}
          <div className="flex flex-col space-y-4 w-full md:w-[400px]">
            <div className="flex items-center space-x-8">
              <Avatar
                style={{ backgroundColor: "#CDA4FF" }}
                size={40}
                className="!text-sm text-black"
              >
                JD
              </Avatar>
              <p>First Refrence</p>
              <button className="text-sm font-medium">+ Add Refrence</button>
            </div>
            <div className="flex items-center space-x-8">
              <Avatar
                style={{ backgroundColor: "#CDA4FF" }}
                size={40}
                className="!text-sm text-black"
              >
                JD
              </Avatar>
              <p>First Refrence</p>
              <button className="text-sm font-medium">+ Add Refrence</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compulsory;
