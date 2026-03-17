import TableIcon from "@/assets/icon/TableIcon";
import { ColumnsType } from "antd/es/table";
import { useGetRolesQuery } from "@/services/managementService";
import RoleDrawal from "./RoleDrawal";
import { useState } from "react";
import { CustomTable as Table } from "@/lib/AntdComponents";
interface DataType {
  firstName: string;
  email: string;
  roleId: string;
  lastName: string;
  status: string;
}

const Roles = () => {
  const { data, isLoading } = useGetRolesQuery({});
  const [Open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const columns: ColumnsType<DataType> = [
    {
      title: (
        <span className="flex items-center uppercase space-x-2">
          <p>Role Name</p>
          <TableIcon />
        </span>
      ),
      dataIndex: "roleName",
      key: "fullname",
      render: (text: string) => (
        <>
          <h1 className="font-semibold">{text}</h1>
        </>
      ),
    },
    {
      title: (
        <span className="flex items-center uppercase space-x-2">
          <p>Type</p>
          <TableIcon />
        </span>
      ),
      key: "email",
      render: (text: string) => (
        <>
          <h1 className="font-semibold">Default</h1>
        </>
      ),
    },
    {
      title: (
        <span className="flex items-center uppercase space-x-2">
          <p>Created by</p>
          <TableIcon />
        </span>
      ),
      render: (status) => (
        <span className="p-[4%] rounded-[80px] text-center  text-[14px] font-[600]">
          PursBusiness
        </span>
      ),
    },
    {
      title: (
        <span className="flex items-center uppercase space-x-2">
          <p>Total Member</p>
          <TableIcon />
        </span>
      ),
      render: (status) => (
        <span className="p-[4%] rounded-[80px] text-center  text-[14px] font-[600]">
          1
        </span>
      ),
    },
    {
      title: (
        <span className="flex items-center uppercase space-x-2">
          <p>Action</p>
          <TableIcon className="ml-4" />
        </span>
      ),
      dataIndex: "id",
      render: (id: string, record: DataType) => {
        return (
          <span
            onClick={() => {
              setId(id);
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
  return (
    <>
      <Table loading={isLoading} columns={columns} dataSource={data?.data} />
      <RoleDrawal Open={Open} setOpen={setOpen} id={id} />
    </>
  );
};

export default Roles;
