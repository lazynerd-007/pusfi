"use client";
import RemitaCable from "@/assets/icon/RemitaCable";
import RemitaIcon from "@/assets/icon/RemitaIcon";
import RemitaTsi from "@/assets/icon/RemitaTsi";
import RemitaWaec from "@/assets/icon/RemitaWaec";
import RemitaWater from "@/assets/icon/RemitaWater";
import {
  CustomSelect as Select,
  CustomSpinner as Spinner,
} from "@/lib/AntdComponents";
import { useState } from "react";
import { useRouter } from "next/navigation";
import RemitaTable from "./RemitaTable";
import ComingSoon from "@/component/modals/ComingSoon";
import { useGetCategoriesQuery } from "@/services/remitaService";

const Remita = () => {
  const [open, setOpen] = useState(false);
  const date = new Date();
  const route = useRouter();
  const { data: category, isLoading } = useGetCategoriesQuery({});

  return (
    <>
      <div className="max-w-[1640px] flex flex-col p-4  h-screen overflow-y-scroll">
        <header className="flex flex-col md:flex-row justify-between items-center ">
          <span>
            <h2 className="text-3xl font-bold mb-1">
              {" "}
              Remita -{" "}
              <span className="text-2xl text-gray-400 font-medium">Biller</span>
            </h2>
          </span>
          {/* <div className="flex justify-center items-center space-x-5"> */}
          {/* <button className="btn btn-md  bg-black hover:bg-black text-white text-sm normal-case">
              + Quick Service
            </button> */}
          {/* <Select
            className="!w-full !h-[2.5rem]"
            options={[
              { value: "1 month", label: "1 month" },
              { value: "2 month", label: "2 month" },
            ]}
            placeholder="Show stats Yearly"
          /> */}
          {/* </div> */}
        </header>
        {isLoading && <Spinner className="!mx-auto" />}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[1.5em] items-center mt-8">
          {category?.data
            ?.filter((_: any, i: number) => [8, 9, 11, 14].includes(i))
            ?.map((item: Record<string, any>, index: number) => (
              <div
                key={index}
                onClick={() =>
                  route.push(
                    `/remita-biller?id=${item?.categoryId}&name=${item?.categoryName}&desc=${item?.categoryDescription}`
                  )
                }
                className="p-4 bg-white grid grid-cols-[15%_75%] items-center space-x-6 justify-center cursor-pointer justifyaround"
              >
                {/* {item.icon} */}
                <span>
                  <RemitaIcon />
                </span>
                <span className="text-[16px] w-full">{item?.categoryName}</span>
              </div>
            ))}
        </div>
        <div className="mt-8">
          <RemitaTable />
        </div>
      </div>
      <ComingSoon open={open} setOpen={setOpen} />
    </>
  );
};

export default Remita;
