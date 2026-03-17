"use client";
import { useEffect, useState } from "react";
import {
  CustomTable as Table,
  CustomDatePicker as DatePicker,
  CustomInput as Input,
} from "@/lib/AntdComponents";
import TableIcon from "@/assets/icon/TableIcon";
import FilterIcon from "@/assets/icon/FilterIcon";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { Dropdown, Menu, MenuProps } from "antd";
import AccountDrawal from "./AccountDrawal";
import { useTransactionsMutation } from "@/services/transactionService";
import { useAppSelector } from "@/store/hooks";
import { createClient } from "@/lib/supabase/client";

export interface DataType {
  name: string;
  date: string;
  purpose: string;
  type: string;
  amount: string;
}

export interface TableParams {
  pagination?: TablePaginationConfig;
}
const startDate: any = "";
const endDate: any = "";
const initialState = {
  userId: "",
  businessId: "",
  startDate,
  filterBy: "",
  endDate,
  amount: "",
  page: 1,
  perPage: 5,
};

const AccountTable = () => {
  const [fetchTransactions, { isLoading: isLegacyLoading, data }] = useTransactionsMutation();
  const profile = useAppSelector((store) => store?.user?.user);
  
  // Supabase State
  const [supabaseTransactions, setSupabaseTransactions] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isSupabaseLoading, setIsSupabaseLoading] = useState(true);
  const supabase = createClient();

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 5,
    },
  });
  const [id, setId] = useState("");
  const [filter, setFilter] = useState(false);
  const [tableFilter, setTableFilter] = useState(initialState);
  const [open, setOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<DataType | null>(null);

  useEffect(() => {
    const fetchSupabaseData = async () => {
      setIsSupabaseLoading(true);
      const { current, pageSize } = tableParams.pagination || { current: 1, pageSize: 5 };
      const from = ((current || 1) - 1) * (pageSize || 5);
      const to = from + (pageSize || 5) - 1;

      // Build Query
      let query = supabase
        .from('transactions')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(from, to);

      // Apply Filters
      if (tableFilter.filterBy) {
        query = query.ilike('description', `%${tableFilter.filterBy}%`);
      }
      
      const { data: txData, count, error } = await query;
      
      if (txData) {
        setSupabaseTransactions(txData);
        setTotalCount(count || 0);
      }
      setIsSupabaseLoading(false);
    };

    fetchSupabaseData();
  }, [tableParams.pagination, tableFilter.filterBy, supabase]);
  
  const columns: ColumnsType<DataType> = [
    {
      title: (
        <span className="flex items-center uppercase space-x-2">
          <p>Date</p>
          <TableIcon />
        </span>
      ),
      dataIndex: "created_at",
      render: (date) =>
        `${new Date(date).toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        })}`,
      width: "20%",
    },
    {
      title: (
        <span className="flex items-center uppercase space-x-2">
          <p>Description</p>
          <TableIcon />
        </span>
      ),
      dataIndex: "description",
      render: (name) => `${name}`,
      width: "30%",
    },
    // {
    //   title: (
    //     <span className="flex items-center uppercase space-x-2">
    //       <p>Purpose</p>
    //       <TableIcon />
    //     </span>
    //   ),
    //   dataIndex: "purpose",
    //   render: (purpose) => `${purpose}`,
    //   width: "20%",
    // },
    {
      title: (
        <span className="flex items-center uppercase space-x-2">
          <p>type</p>
          <TableIcon />
        </span>
      ),
      dataIndex: "type",
      render: (type) => {
        // Handle both 'debit'/'credit' and 'transactionType' formats
        const txType = type || "debit";
        return txType.toLowerCase() === "debit" ? (
          <span className="p-[4%] rounded-[80px] bg-[#FF39561A]/[10%] text-[#FF3956] text-center  text-[14px] font-[600]">
            DEBIT
          </span>
        ) : (
          <span className="p-[4%] rounded-[80px] bg-[#0AA07B]/[10%] text-[#0AA07B] text-center text-[14px] font-[600]">
            CREDIT
          </span>
        );
      },
      width: "20%",
    },
    {
      title: (
        <span className="flex items-center uppercase">
          <p>Amount</p>
          <TableIcon />
        </span>
      ),
      dataIndex: "amount",
      render: (amount) => `₦${Number(amount).toLocaleString()}`,
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
      render: (_: any, record: any) => {
        return (
          <span
            onClick={() => {
              const txId = record.id || record.reference;
              setId(txId);
              setSelectedAccount(record);
              setOpen(true);
            }}
            className="cursor-pointer font-bold text-lg"
          >
            ...
          </span>
        );
      },
    },
  ];
  const handleTableChange = (pagination: TablePaginationConfig) => {
    setTableParams({
      pagination,
    });
  };

  // Determine which data to show: Supabase (Priority) -> Legacy -> Empty
  const displayData = supabaseTransactions.length > 0 ? supabaseTransactions : (data?.data?.data || []);
  const displayTotal = totalCount > 0 ? totalCount : (data?.data?.total || 0);

  return (
    <>
      <span className="flex items-center space-x-3 mb-3">
        <Input
          placeholder="Filter by name"
          onChange={(e) =>
            setTableFilter((prev) => ({ ...prev, filterBy: e.target.value }))
          }
          className="!w-[300px] !h-[2.5rem] !bg-white"
        />
        {/* <DatePicker
          className="!w-[300px] !h-[2.5rem] !bg-white"
          placeholder="Filter by Date"
        /> */}
        <Dropdown
          overlayClassName="w-[200px] rounded-sm p-2 bg-white shadow-xl"
          menu={{
            items: [
              {
                key: "1",
                label: "All",
                onClick: () => {
                  setFilter(!filter);
                  setTableFilter(initialState);
                },
              },
            ],
          }}
          trigger={["click"]}
        >
          <span className="cursor-pointer border border-gray-300 rounded-md p-2 bg-white">
            <FilterIcon />
          </span>
        </Dropdown>
      </span>
      <Table
        columns={columns}
        dataSource={displayData}
        loading={isSupabaseLoading}
        pagination={{
          ...tableParams.pagination,
          total: displayTotal,
        }}
        onChange={handleTableChange}
        rowKey={(record) => record.id || record.reference}
      />
      <AccountDrawal
        Open={open}
        onClose={() => setOpen(false)}
        id={id}
      />
    </>
  );
};

export default AccountTable;
