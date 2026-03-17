import TableIcon from "@/assets/icon/TableIcon";
import { Dropdown, Menu, MenuProps } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { useState } from "react";
import MemberDrawal from "./MemberDrawal";
interface DataType {
  fullname: string;
  email: string;
  role: string;
}

const SentData: DataType[] = [
  {
    fullname: "Samuel Woodfree",
    email: "samuel@email.com",
    role: "Operation Manager",
  },
  {
    fullname: "Samuel Woodfree",
    email: "samuel@email.com",
    role: "Operation Manager",
  },
  {
    fullname: "Samuel Woodfree",
    email: "samuel@email.com",
    role: "Operation Manager",
  },
  {
    fullname: "Samuel Woodfree",
    email: "samuel@email.com",
    role: "Operation Manager",
  },
  {
    fullname: "Samuel Woodfree",
    email: "samuel@email.com",
    role: "Operation Manager",
  },
];

const Sent = () => {
  const [Open, setOpen] = useState(false);
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
    },
    {
      title: (
        <span className="flex items-center uppercase space-x-2">
          <p>Email</p>
          <TableIcon />
        </span>
      ),
      dataIndex: "email",
      key: "emai;",
    },
    {
      title: (
        <span className="flex items-center uppercase space-x-2">
          <p>Role</p>
          <TableIcon />
        </span>
      ),
      dataIndex: "role",
      key: "role",
    },

    {
      title: (
        <span className="flex items-center uppercase space-x-2">
          <p>Action</p>
          <TableIcon className="ml-4" />
        </span>
      ),
      dataIndex: "id",
      render: (_: any, record: DataType) => {
        const menu: React.ReactElement<MenuProps> = (
          <Menu>
            <Menu.Item key="show-details" onClick={() => setOpen(true)}>
              View Rules
            </Menu.Item>
            <Menu.Item key="download-receipt">Edit Details</Menu.Item>
            <Menu.Item key="report-transaction">Delete</Menu.Item>
          </Menu>
        );

        return (
          <Dropdown overlay={menu} trigger={["click"]}>
            <span className="cursor-pointer">...</span>
          </Dropdown>
        );
      },
    },
  ];
  return (
    <div>
      <Table columns={columns} dataSource={SentData} />
      {/* <MemberDrawal Open={Open} setOpen={setOpen} /> */}
    </div>
  );
};

export default Sent;
