import { ApiSlice } from "./Api";

const billPaymentSlice = ApiSlice.enhanceEndpoints({
  addTagTypes: ["transaction" as const],
}).injectEndpoints({
  endpoints: (builder) => ({
    getBillPaymentWallet: builder.query({
      query: () => ({
        url: "billpayment/wallet",
      }),
      providesTags: ["transaction"],
    }),
    getBillPaymentTransactions: builder.query({
      query: ({ product, paymentMethod, type, status, page }) => ({
        url: "billpayment/transactions/all",
        params: {
          paymentMethod,
          type,
          status,
          product,
          page,
        },
      }),
      providesTags: ["transaction"],
    }),
    getBillPaymentRecurringTransactions: builder.query({
      query: ({ product, paymentMethod, type, status, page }) => ({
        url: "billpayment/transactions/recurring",
        params: {
          paymentMethod,
          type,
          status,
          product,
          page,
        },
      }),
    }),
    getBillPaymentTransactionDetails: builder.query({
      query: ({ id }) => ({
        url: "billpayment/transactions/details",
        params: {
          transactionId: id,
        },
      }),
    }),
    getBillPaymentAnalytics: builder.query({
      query: () => ({
        url: "billpayment/analytics",
      }),
      providesTags: ["transaction"],
    }),
    getBillPaymentDataPlans: builder.query({
      query: (body) => ({
        url: "billpayment/dataplans",
        params: {
          networkId: body?.id,
        },
      }),
      transformResponse: (res: Record<string, any>) => {
        const arr = res?.data?.map((e: Record<string, any>) => {
          return {
            ...e,
            value: e?.planDescription,
            label: e?.planDescription,
          };
        });
        return arr;
      },
    }),
    getBillPaymentNetworks: builder.query({
      query: () => ({
        url: "billpayment/networks",
      }),
    }),
    fundWalletInstant: builder.mutation({
      query: (body) => ({
        url: "billpayment/fund/wallet/instant",
        body,
        method: "POST",
      }),
      invalidatesTags: ["transaction"],
    }),
    fundWalletScheduled: builder.mutation({
      query: (body) => ({
        url: "billpayment/fund/wallet/scheduled",
        body,
        method: "POST",
      }),
      invalidatesTags: ["transaction"],
    }),
    fundWalletRecurring: builder.mutation({
      query: (body) => ({
        url: "billpayment/fund/wallet/recurring",
        body,
        method: "POST",
      }),
      invalidatesTags: ["transaction"],
    }),
    sellAirtime: builder.mutation({
      query: (body) => ({
        url: "billpayment/sell/airtime",
        body,
        method: "POST",
      }),
      invalidatesTags: ["transaction"],
    }),
    sellDataPlan: builder.mutation({
      query: (body) => ({
        url: "billpayment/sell/dataplan",
        body,
        method: "POST",
      }),
      invalidatesTags: ["transaction"],
    }),
  }),
});

export const {
  useFundWalletInstantMutation,
  useFundWalletRecurringMutation,
  useFundWalletScheduledMutation,
  useGetBillPaymentAnalyticsQuery,
  useGetBillPaymentDataPlansQuery,
  useGetBillPaymentNetworksQuery,
  useGetBillPaymentRecurringTransactionsQuery,
  useGetBillPaymentTransactionDetailsQuery,
  useGetBillPaymentTransactionsQuery,
  useGetBillPaymentWalletQuery,
  useLazyGetBillPaymentAnalyticsQuery,
  useLazyGetBillPaymentDataPlansQuery,
  useLazyGetBillPaymentNetworksQuery,
  useLazyGetBillPaymentRecurringTransactionsQuery,
  useLazyGetBillPaymentTransactionDetailsQuery,
  useLazyGetBillPaymentTransactionsQuery,
  useLazyGetBillPaymentWalletQuery,
  useSellAirtimeMutation,
  useSellDataPlanMutation,
} = billPaymentSlice;
