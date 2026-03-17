"use client";
import { useEffect, useState } from "react";
import {
  CustomTable as Table,
  CustomSelect as Select,
} from "@/lib/AntdComponents";
import TableIcon from "@/assets/icon/TableIcon";
import FilterIcon from "@/assets/icon/FilterIcon";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import PayrollDrawal from "../PayrollDrawal";
import {
  useGetPayrollQuery,
  useGetBeneficiariesQuery,
  useGetBusinessBeneficiariesQuery,
  useLazyGetBusinessBeneficiariesQuery,
  useLazyGetPayrollBeneficiariesQuery,
} from "@/services/payrollService";

export interface DataType {
  firstName: string;
  lastName: string;
  purpose: string;
  type: string;
  amount: string;
}

export interface TableParams {
  pagination?: TablePaginationConfig;
}
const initialState = {
  userId: "",
  businessId: "",
  startDate: "",
  filterBy: "",
  endDate: "",
  amount: "",
  page: 1,
  perPage: 10,
};
type listType = {
  value: string;
  label: string;
};

const OverviewTable = () => {
  const [
    fetchBusinessBeneficiaries,
    { isLoading, data: businessBeneficiaries },
  ] = useLazyGetBusinessBeneficiariesQuery();
  const [fetchPayrollBeneficiaries, { isLoading: payrollLoading }] =
    useLazyGetPayrollBeneficiariesQuery();
  const { data: payroll } = useGetPayrollQuery({});
  const [data, setData] = useState<DataType[]>();
  // const [tableParams, setTableParams] = useState<TableParams>({
  //   pagination: {
  //     current: 1,
  //     pageSize: 10,
  //   },
  // });
  const [id, setId] = useState("");
  const [beneficiaryId, setBeneficiaryId] = useState("");
  const [open, setOpen] = useState(false);
  const [payrollList, setPayrollList] = useState<listType[]>([
    { label: "All", value: "" },
  ]);
  // const [open, setOpen] = useState(false);
  // const [selectedAccount, setSelectedAccount] = useState<DataType | null>(null);
  const columns: ColumnsType<DataType> = [
    {
      title: (
        <span className="flex items-center uppercase space-x-2">
          <p>Name</p>
          <TableIcon />
        </span>
      ),
      render: (_, record) => `${record?.firstName} ${record?.lastName}`,
      width: "20%",
    },
    {
      title: (
        <span className="flex items-center uppercase space-x-2">
          <p>Email Address</p>
          <TableIcon />
        </span>
      ),
      dataIndex: "email",
      render: (email) => `${email}`,
      width: "30%",
    },
    {
      title: (
        <span className="flex items-center uppercase space-x-2">
          <p>Type</p>
          <TableIcon />
        </span>
      ),
      dataIndex: "employmentType",
      render: (type) => `${type}`,

      width: "20%",
    },
    {
      title: (
        <span className="flex items-center uppercase space-x-2">
          <p>Action</p>
          <TableIcon className="ml-4" />
        </span>
      ),
      dataIndex: "memberId",
      width: "10%",
      render: (id: any, record: DataType) => {
        return (
          <span
            onClick={() => {
              setBeneficiaryId(id);
              setOpen(true);
            }}
            className="cursor-pointer"
          >
            ...
          </span>
        );
      },
    },
  ];
  useEffect(() => {
    if (payroll) setPayrollList([{ label: "All", value: "" }, ...payroll]);
  }, [payroll]);
  useEffect(() => {
    if (id) {
      fetchPayrollBeneficiaries(id)
        .unwrap()
        .then((res) => {
          setData(res?.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      fetchBusinessBeneficiaries({})
        .unwrap()
        .then((res) => {
          setData(res?.data);
        })
        .catch((err) => {
          // console.log(err);
        });
    }
  }, [id]);

  return (
    <>
      <section className="">
        <div className="flex flex-col gap-[2rem] bg-white p-[1%]">
          {/* <h4 className="text-[18px] font-[600] text-black">Team Members</h4> */}
          <span className="flex items-baseline gap-1">
            <label htmlFor="select">Filter By:</label>
            <Select
              onSelect={(value) => setId(value)}
              options={payrollList}
              id="select"
              defaultValue={payrollList[0].value}
              className="!w-[15rem]"
            />
          </span>
          <Table
            columns={columns}
            //   rowKey={(record) => record.login.uuid}
            dataSource={data}
            loading={isLoading || payrollLoading}
            // onChange={handleTableChange}
          />
        </div>
      </section>
      <PayrollDrawal
        Open={open}
        onClose={() => setOpen(false)}
        id={beneficiaryId}
        invalidateAction={() => {
          setId((prev) => prev);
        }}
      />
    </>
  );
};

export default OverviewTable;
