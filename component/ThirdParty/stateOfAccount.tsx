"use client";

import {
    CustomButton as Button,
    CustomTable as Table
} from "@/lib/AntdComponents";
import Image from "next/image";
import logo from "@/assets/logo.svg";
import { ColumnsType } from "antd/es/table";
import "../customStyles/soa.css"

export interface DataType {
    transDate: string;
    valueDate: string;
    reference: string;
    debit: string;
    credit: string;
    balance: string;
    branch: string;
    remarks: string;
}
const StatementOfAccount = () => {
    const data = [
        {
            transDate: "01-Apr-2023", valueDate: "01-Apr-2023", reference: "Pursbusiness", debit: "N44,345.00", credit: "N44,345.00", balance: "N440,345.00", branch: "Purscliq", remarks: "NIS instant payment",
        },
        {
            transDate: "01-Apr-2023", valueDate: "01-Apr-2023", reference: "Pursbusiness", debit: "N44,345.00", credit: "N44,345.00", balance: "N440,345.00", branch: "Purscliq", remarks: "NIS instant payment",
        },
        {
            transDate: "01-Apr-2023", valueDate: "01-Apr-2023", reference: "Pursbusiness", debit: "N44,345.00", credit: "N44,345.00", balance: "N440,345.00", branch: "Purscliq", remarks: "NIS instant payment",
        },
        {
            transDate: "01-Apr-2023", valueDate: "01-Apr-2023", reference: "Pursbusiness", debit: "N44,345.00", credit: "N44,345.00", balance: "N440,345.00", branch: "Purscliq", remarks: "NIS instant payment",
        },
        {
            transDate: "01-Apr-2023", valueDate: "01-Apr-2023", reference: "Pursbusiness", debit: "N44,345.00", credit: "N44,345.00", balance: "N440,345.00", branch: "Purscliq", remarks: "NIS instant payment",
        },
        {
            transDate: "01-Apr-2023", valueDate: "01-Apr-2023", reference: "Pursbusiness", debit: "N44,345.00", credit: "N44,345.00", balance: "N440,345.00", branch: "Purscliq", remarks: "NIS instant payment",
        },
        {
            transDate: "01-Apr-2023", valueDate: "01-Apr-2023", reference: "Pursbusiness", debit: "N44,345.00", credit: "N44,345.00", balance: "N440,345.00", branch: "Purscliq", remarks: "NIS instant payment",
        },
        {
            transDate: "01-Apr-2023", valueDate: "01-Apr-2023", reference: "Pursbusiness", debit: "N44,345.00", credit: "N44,345.00", balance: "N440,345.00", branch: "Purscliq", remarks: "NIS instant payment",
        },
    ]

    const columns: ColumnsType<DataType> = [
        {
            title: (
                <span className="flex items-center space-x-2 text-[#7C8493] text-base">
                    <p>Trans Date</p>
                </span>
            ),
            dataIndex: "transDate",
            render: (transDate) =>
                `${transDate}`,

        },
        {
            title: (
                <span className="flex items-center space-x-2 text-[#7C8493] text-base">
                    <p>Value Date</p>
                </span>
            ),
            dataIndex: "valueDate",
            render: (valueDate) =>
                `${valueDate}`,

        },
        {
            title: (
                <span className="flex items-center space-x-2 text-[#7C8493] text-base">
                    <p>Reference</p>
                </span>
            ),
            dataIndex: "reference",
            render: (reference) =>
                `${reference}`,

        },
        {
            title: (
                <span className="flex items-center space-x-2 text-[#7C8493] text-base">
                    <p>Debit</p>
                </span>
            ),
            dataIndex: "debit",
            render: (debit) =>
                `${debit}`,
        },
        {
            title: (
                <span className="flex items-center space-x-2 text-[#7C8493] text-base">
                    <p>Credit</p>
                </span>
            ),
            dataIndex: "credit",
            render: (credit) =>
                `${credit}`,
        },
        {
            title: (
                <span className="flex items-center space-x-2 text-[#7C8493] text-base">
                    <p>Balance</p>
                </span>
            ),
            dataIndex: "balance",
            render: (balance) =>
                `${balance}`,
        },
        {
            title: (
                <span className="flex items-center space-x-2 text-[#7C8493] text-base">
                    <p>Branch</p>
                </span>
            ),
            dataIndex: "branch",
            render: (branch) =>
                `${branch}`,
        },
        {
            title: (
                <span className="flex items-center space-x-2 text-[#7C8493] text-base">
                    <p>Remarks</p>
                </span>
            ),
            dataIndex: "remarks",
            render: (remarks) =>
                `${remarks}`,
        },

    ]

    return (
        <>
            <div className="min-h-screen flex flex-col justify-between bg-BgImage mx-auto max-w-[1640px] bg-[#FAFAFA] relative">
                <nav className="py-4 px-8 bg-white flex justify-between items-center sticky top-0">
                    <Image src={logo} alt="logo" />
                    <a
                        className="px-[10px] py-[5px] border border-[#000000] border-solid rounded-[8px]"
                        href="https://pursfinance.com"
                        target="_blank"
                    >
                        learn about us
                    </a>
                </nav>
                <main className="flex flex-col items-center h-full justify-center bg-white w-[90%] md:w-[80%] m-auto my-[2rem] p-6  overflow-scroll ">
                    <div className=" w-full">
                        <div>
                            <h2 className=" font-bold text-xl">Statement Period -
                                <span className=" font-normal text-sm">1 Apr - Apr 30</span>
                            </h2>
                        </div>
                        <div className=" max-w-[300px] space-y-3">
                            <div className=" font-medium text-sm grid grid-cols-2 gap-6  ">
                                <span>Account number</span>
                                <span>0170XXXXXX</span>
                            </div>

                            <div className=" font-medium text-sm grid grid-cols-2 gap-6">
                                <span>Account type</span>
                                <span>Savings</span>
                            </div>

                            <div className=" font-medium text-sm grid grid-cols-2 gap-6">
                                <span>Currency</span>
                                <span className=" text-left">Naira</span>
                            </div>

                            <div className=" font-medium text-sm grid grid-cols-2 gap-6">
                                <span>Account Name</span>
                                <span>John Doe</span>
                            </div>

                            <div className=" font-medium text-sm grid grid-cols-2 gap-6">
                                <span>Opening Balance</span>
                                <span>NGN 10,000,0000</span>
                            </div>
                        </div>
                        <hr className=" w-[80%] mt-4" />
                    </div>

                    <div className="   mt-5">
                        <Table
                            columns={columns}
                            dataSource={data}
                            pagination={{ pageSize: 4 }} 
                        />
                    </div>

                </main>
                <footer
                    className={`py-4 px-8 bg-white flex justify-end items-center gap-1 sticky bottom-0`}
                >
                    <Button
                        className="no-print"
                        onClick={() => {
                            window.print();
                        }}
                    >
                        Download Receipt
                    </Button>
                </footer>
            </div>
        </>
    )
}

export default StatementOfAccount