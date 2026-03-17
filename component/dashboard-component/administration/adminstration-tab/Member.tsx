import TableIcon from "@/assets/icon/TableIcon";
import { ColumnsType } from "antd/es/table";
import { CustomTable as Table } from "@/lib/AntdComponents";
import {
  useLazyGetEmployeesQuery,
  useGetEmployeesQuery,
} from "@/services/managementService";
import MemberDrawal from "./MemberDrawal";
import { useEffect, useState } from "react";
interface DataType {
  firstName: string;
  email: string;
  roleId: string;
  lastName: string;
  status: string;
  id: string;
}

const Member = () => {
  const [getEmployees, { data, isLoading }] = useLazyGetEmployeesQuery();
  const [Open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const [memberId, setMemberId] = useState("");
  const columns: ColumnsType<DataType> = [
    {
      title: (
        <span className="flex items-center uppercase space-x-2">
          <p>Full Name</p>
          <TableIcon />
        </span>
      ),
      dataIndex: "fullname",
      key: "fullname",
      render: (text: string, record: DataType) => (
        <>
          <h1 className="font-semibold">
            {record?.firstName} {record?.lastName}
          </h1>
        </>
      ),
    },
    {
      title: (
        <span className="flex items-center uppercase space-x-2">
          <p>Email Address</p>
          <TableIcon />
        </span>
      ),
      dataIndex: "email",
      key: "email",
      render: (text: string) => (
        <>
          <h1 className="font-semibold">{text}</h1>
        </>
      ),
    },
    {
      title: (
        <span className="flex items-center uppercase space-x-2">
          <p>Role</p>
          <TableIcon />
        </span>
      ),
      dataIndex: "roleName",
      key: "role",
      render: (text: string) => (
        <>
          <p className="font-semibold">{text}</p>
        </>
      ),
    },
    {
      title: (
        <span className="flex items-center uppercase space-x-2">
          <p>Status</p>
          <TableIcon />
        </span>
      ),
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span className="p-[4%] rounded-[80px] bg-green-50  text-[#0AA07B]  text-center  text-[14px] font-[600]">
          {status ? "Active" : "Inactive"}
        </span>
        // ) : (
        //   <span className="p-[4%] rounded-[80px] bg-[#0AA07B]/[10%] text-[#0AA07B] text-center text-[14px] font-[600]">
        //     {status}
        //   </span>
      ),
    },
    {
      title: (
        <span className="flex items-center uppercase space-x-2">
          <p>Action</p>
          <TableIcon className="ml-4" />
        </span>
      ),
      dataIndex: "roleId",
      render: (id: string, record: DataType) => {
        return (
          <span
            onClick={() => {
              setId(id);
              setMemberId(record?.id);
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
    getEmployees({})
      .unwrap()
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, []);
  return (
    <>
      <Table loading={isLoading} columns={columns} dataSource={data?.data} />
      <MemberDrawal Open={Open} setOpen={setOpen} id={id} memberId={memberId} />
    </>
  );
};

export default Member;
