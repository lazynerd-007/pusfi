"use client";
import { CustomTabs as Tabs } from "@/lib/AntdComponents";
import { TabsProps } from "antd";
import EmployeeList from "./tab/EmployeeList";
import Contractor from "./tab/Contractor";
import { useEffect, useMemo, useState } from "react";
import { useLazyGetBeneficiariesQuery } from "@/services/payrollService";

const DetailsTab = ({ id }: { id: string }) => {
  const [getBeneficiary, { isLoading, data, isFetching }] =
    useLazyGetBeneficiariesQuery();
  const [active, setActive] = useState("employee");
  const items: TabsProps["items"] = useMemo(
    () => [
      {
        key: "employee",
        label: "Employee List",
        children: (
          <EmployeeList
            id={id}
            isLoading={isFetching}
            data={data?.data?.data}
          />
        ),
      },
      {
        key: "contractor",
        label: "Contractor List",
        children: (
          <Contractor id={id} isLoading={isFetching} data={data?.data?.data} />
        ),
      },
    ],
    [data]
  );
  const onChange = (key: string) => {
    setActive(key);
  };
  useEffect(() => {
    getBeneficiary({ id, count: 10, type: active });
  }, [active, id]);

  return <Tabs items={items} onChange={onChange} defaultActiveKey={active} />;
};

export default DetailsTab;
