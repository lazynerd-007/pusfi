import { ApiSlice } from "./Api";

const transactionSlice = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getExpenses: builder.query({
      query: () => ({
        url: "transactions/expense",
      }),
    }),
    Transactions: builder.mutation({
      query: (body) => ({
        url: "transactions/filters",
        body,
        method: "POST",
      }),
    }),
    disbursementTransactions: builder.mutation({
      query: (body) => ({
        url: "transactions/disbursement",
        body,
        method: "POST",
      }),
    }),
    generateStatement: builder.mutation({
      query: (body) => ({
        url: "transactions/account/statement",
        body,
        method: "POST",
      }),
    }),
    getSingleTransaction: builder.query({
      query: (id) => ({
        url: `transactions/single?transactionId=${id}`,
      }),
    }),
    getTransactionStatus: builder.query({
      query: (time) => ({
        url: `transactions/status?time=${time || "day"}`,
      }),
    }),
  }),
});

export const {
  useGetExpensesQuery,
  useTransactionsMutation,
  useDisbursementTransactionsMutation,
  useGenerateStatementMutation,
  useLazyGetSingleTransactionQuery,
  useLazyGetExpensesQuery,
  useGetTransactionStatusQuery,
  useGetSingleTransactionQuery,
  useLazyGetTransactionStatusQuery,
} = transactionSlice;
