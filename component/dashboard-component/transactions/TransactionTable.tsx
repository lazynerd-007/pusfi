import { useEffect, useState } from "react";
import {
  CustomTable as Table,
  CustomDatePicker as DatePicker,
  CustomInput as Input,
  CustomButton as Button,
} from "@/lib/AntdComponents";
import TableIcon from "@/assets/icon/TableIcon";
import FilterIcon from "@/assets/icon/FilterIcon";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import AccountDrawal from "../account/AccountDrawal";
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
  perPage: 10,
};

const TransactionTable = () => {
  const [fetchTransactions, { isLoading, data }] = useTransactionsMutation();
  const profile = useAppSelector((store) => store?.user?.user);
  
  // Supabase State
  const supabase = createClient();
  const [supabaseTransactions, setSupabaseTransactions] = useState<any[]>([]);
  const [isSupabaseLoading, setIsSupabaseLoading] = useState(false);
  const [totalSupabaseCount, setTotalSupabaseCount] = useState(0);

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const [id, setId] = useState("");
  const [filter, setFilter] = useState(false);
  const [tableFilter, setTableFilter] = useState(initialState);
  const [open, setOpen] = useState(false);

  const fetchSupabaseTransactions = async () => {
      setIsSupabaseLoading(true);
      try {
          const currentPage = tableParams.pagination?.current || 1;
          const pageSize = tableParams.pagination?.pageSize || 10;
          const from = (currentPage - 1) * pageSize;
          const to = from + pageSize - 1;

          let query = supabase
            .from('transactions')
            .select('*', { count: 'exact' })
            .order('created_at', { ascending: false })
            .range(from, to);

          // Apply filters
          if (tableFilter.startDate) {
             query = query.gte('created_at', new Date(tableFilter.startDate).toISOString());
          }
          if (tableFilter.endDate) {
             query = query.lte('created_at', new Date(tableFilter.endDate).toISOString());
          }
          if (tableFilter.amount) {
             query = query.eq('amount', tableFilter.amount);
          }

          const { data: txData, count, error } = await query;

          if (error) throw error;

          if (txData) {
             setSupabaseTransactions(txData);
             setTotalSupabaseCount(count || 0);
             setTableParams((prev) => ({
                 ...prev,
                 pagination: {
                     ...prev.pagination,
                     total: count || 0,
                 }
             }));
          }
      } catch (err) {
          console.error("Supabase Transaction Fetch Error:", err);
      } finally {
          setIsSupabaseLoading(false);
      }
  };

  useEffect(() => {
      fetchSupabaseTransactions();
  }, [tableParams.pagination?.current, tableParams.pagination?.pageSize, filter]);

  const columns: ColumnsType<DataType> = [
    {
      title: (
        <span className="flex items-center uppercase space-x-2">
          <p>Date</p>
          <TableIcon />
        </span>
      ),
      dataIndex: "created_at", // Changed from createdAt to match Supabase
      render: (date) =>
        `${new Date(date || Date.now()).toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
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
      dataIndex: "description", // Changed from accountName to description
      render: (name, record: any) => `${name || record.recipient_name || record.accountName || 'Transaction'}`,
      width: "30%",
    },
    {
      title: (
        <span className="flex items-center uppercase space-x-2">
          <p>type</p>
          <TableIcon />
        </span>
      ),
      dataIndex: "type", // Changed from transactionType
      render: (type, record: any) => {
        const txType = type || record.transactionType;
        return txType === "debit" ? (
          <span className="p-[4%] rounded-[80px] bg-[#FF39561A]/[10%] text-[#FF3956] text-center  text-[14px] font-[600]">
            {txType}
          </span>
        ) : (
          <span className="p-[4%] rounded-[80px] bg-[#0AA07B]/[10%] text-[#0AA07B] text-center text-[14px] font-[600]">
            {txType}
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
          <span className="flex items-center uppercase">
            <p>Status</p>
            <TableIcon />
          </span>
        ),
        dataIndex: "status",
        render: (status) => (
            <span className={`capitalize ${status === 'success' ? 'text-green-600' : status === 'pending' ? 'text-yellow-600' : 'text-red-600'}`}>
                {status}
            </span>
        ),
        width: "10%",
      },
    {
      title: (
        <span className="flex items-center uppercase space-x-2">
          <p>Action</p>
          <TableIcon className="ml-4" />
        </span>
      ),
      dataIndex: "reference",
      render: (id: any, record: DataType) => {
        return (
          <span
            onClick={() => {
              setId(id);
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
    setTableParams((prev) => ({
      ...prev,
      pagination,
    }));
  };

  // Use Supabase data if available, else fallback
  const displayData = supabaseTransactions.length > 0 ? supabaseTransactions : (data?.data?.data || []);
  const displayLoading = isSupabaseLoading || isLoading;

  return (
    <div className="bg-white flex flex-col gap-[0.5rem] p-[2%]">
      <h4 className=" text-[19px] font-[600]">Transaction</h4>
      <div className="flex items-center justify-start w-full gap-[1rem] flex-wrap md:flex-nowrap">
        <DatePicker
          onChange={(_, date) =>
            setTableFilter((prev) => ({
              ...prev,
              startDate: date as string,
            }))
          }
          className="h-fit !w-[15rem]"
          placeholder="Start Date"
        />
        <DatePicker
          onChange={(_, date) =>
            setTableFilter((prev) => ({
              ...prev,
              endDate: date as string,
            }))
          }
          className="h-fit !w-[15rem]"
          placeholder="End Date"
        />
        <div className="w-fit">
          <Input
            value={tableFilter?.amount}
            onChange={(e) =>
              setTableFilter((prev) => ({
                ...prev,
                amount: e.target.value,
              }))
            }
            className="h-fit w-fit"
            placeholder="Amount"
          />
        </div>
        <Button
          onClick={() => {
            setFilter((prev) => !prev);
          }}
          className="!bg-[#000000]"
          icon={<FilterIcon />}
        >
          filter
        </Button>
      </div>
      <div className="relative overflow-x-auto  sm:rounded-lg w-[22rem] md:w-full">
        <Table
          columns={columns}
          dataSource={displayData}
          pagination={tableParams.pagination}
          loading={displayLoading}
          onChange={handleTableChange}
          rowKey="id" 
        />
      </div>
      <AccountDrawal Open={open} onClose={() => setOpen(false)} id={id} />
    </div>
  );
};

export default TransactionTable;
