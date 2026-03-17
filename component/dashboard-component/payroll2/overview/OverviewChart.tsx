import React, { PureComponent } from "react";
import {
  AreaChart,
  Area,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    date: "12 Jan",
    totalPayment: 4000,
    deductionAmount: 2400,
    amt: 2400,
  },
  {
    date: "12 Feb",
    totalPayment: 3000,
    deductionAmount: 1398,
    amt: 2210,
  },
  {
    date: "12 Mar",
    totalPayment: 2000,
    deductionAmount: 9800,
    amt: 2290,
  },
  {
    date: "12 Apr",
    totalPayment: 2780,
    deductionAmount: 3908,
    amt: 2000,
  },
  {
    date: "12 May",
    totalPayment: 1890,
    deductionAmount: 4800,
    amt: 2181,
  },
  {
    date: "12 Jun",
    totalPayment: 2390,
    deductionAmount: 3800,
    amt: 2500,
  },
  {
    date: "12 Jul",
    totalPayment: 3490,
    deductionAmount: 4300,
    amt: 2100,
  },
  {
    date: "12 Aug",
    totalPayment: 3490,
    deductionAmount: 4300,
    amt: 2100,
  },
  {
    date: "12 Sep",
    totalPayment: 3490,
    deductionAmount: 4300,
    amt: 2100,
  },
  {
    date: "12 Oct",
    totalPayment: 3490,
    deductionAmount: 4300,
    amt: 2100,
  },
  {
    date: "12 Nov",
    totalPayment: 3490,
    deductionAmount: 4300,
    amt: "1M",
  },
  {
    date: "12 Dec",
    totalPayment: 3490,
    deductionAmount: 4300,
    amt: "500K",
  },
];

export default function OverviewChart({
  data,
}: {
  data: Array<Record<string, any>>;
}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={530}
        height={250}
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <XAxis dataKey="date" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="totalPayment"
          stroke="#D4EBEB"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
        <Area
          type="monotone"
          dataKey="deductionAmount"
          stroke="#000"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
