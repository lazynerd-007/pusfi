import FilterIcon from "@/assets/icon/FilterIcon";
import TableIcon from "@/assets/icon/TableIcon";
import { Dropdown, Menu, MenuProps, TablePaginationConfig } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { BsSquare } from "react-icons/bs";
import BenefiaryDrawal from "../contact-drawal/BenefiaryDrawal";
export interface DataType {
  account: string;
  acctNum: string;
  acctBank: string;
}

export interface TableParams {
  pagination?: TablePaginationConfig;
}

const Beneficiary = () => {
  const [data, setData] = useState<DataType[]>();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 5,
    },
  });
  const [open, setOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<DataType | null>(null);
  const onClose = () => {
    setOpen(false);
  };
  const columns: ColumnsType<DataType> = [
    {
      title: (
        <span className="flex items-center uppercase space-x-2">
          <BsSquare />
        </span>
      ),
      dataIndex: "",
      render: () => <BsSquare />,
      width: "20%",
    },
    {
      title: (
        <span className="flex items-center uppercase space-x-2">
          <p>Account Name</p>
          <TableIcon />
        </span>
      ),
      dataIndex: "account",
      render: (account) => `${account}`,
      width: "20%",
    },
    {
      title: (
        <span className="flex items-center uppercase space-x-2">
          <p>Account Number </p>
          <TableIcon />
        </span>
      ),
      dataIndex: "acctNum",
      render: (acctNum) => `${acctNum}`,
      width: "20%",
    },
    {
      title: (
        <span className="flex items-center uppercase space-x-2">
          <p>Account Bank</p>
          <TableIcon />
        </span>
      ),
      dataIndex: "acctBank",
      render: (acctBank) => `${acctBank}`,
      width: "20%",
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
            <Menu.Item
              key="show-details"
              onClick={() => {
                setSelectedAccount(record);
                setOpen(true);
              }}
            >
              View details{" "}
            </Menu.Item>
            <Menu.Item key="download-receipt">Add contact</Menu.Item>
            <Menu.Item key="download-receipt">Remove beneficiary</Menu.Item>
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
  const fetchData = () => {
    setLoading(true);
    fetch(`https://testapi.io/api/omobolaji1/beneficiary`)
      .then((res) => res.json())
      .then((results) => {
        setData(results);
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: 200,
          },
        });
      });
  };

  useEffect(() => {
    fetchData();
  }, [JSON.stringify(tableParams)]);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setTableParams({
      pagination,
    });
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };
  return (
    <div className="bg-white flex flex-col gap-[0.5rem] p-[2%]">
      <div className="flex justify-between w-full cursor-pointer">
        <h4 className=" text-[15px] font-[600]">Beneficiary List</h4>
        <span className="flex items-center rounded-[5px] border border-[#B8C9C9] p-[1%] justify-self-end self-end">
          <FilterIcon />
          <p className="text-[#202430] text-[16px] font-[500]">filter</p>
        </span>
      </div>
      <div className="relative overflow-x-auto  sm:rounded-lg w-[22rem] md:w-full">
        <Table
          columns={columns}
          dataSource={data}
          pagination={tableParams.pagination}
          loading={loading}
          onChange={handleTableChange}
        />
      </div>
      <BenefiaryDrawal contactData={selectedAccount} Open={open} onClose={onClose} />

    </div>
  );
};

export default Beneficiary;
