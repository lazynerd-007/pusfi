import { ApiSlice } from "./Api";

const disbursementSlice = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    recurringExpenditure: builder.mutation({
      query: (body) => ({
        url: "disbursement/recurring/expenditure",
        body,
        method: "POST",
      }),
    }),
    scheduledExpenditure: builder.mutation({
      query: (body) => ({
        url: "disbursement/scheduled/expenditure",
        body,
        method: "POST",
      }),
    }),
    verifyAccount: builder.mutation({
      query: (body) => ({
        url: "disbursement/account/verification",
        body,
        method: "POST",
      }),
    }),
    getBanks: builder.query({
      query: () => ({
        url: "disbursement/bank/list",
      }),
      transformResponse: (res: Record<string, any>) => {
        const newList = res?.data.map((e: Record<string, string>) => ({
          value: e?.bankCode,
          label: e?.bankName,
        }));
        return newList;
      },
    }),
    singleTransfer: builder.mutation({
      query: (body) => ({
        url: "disbursement/single/bank/transfer",
        body,
        method: "POST",
      }),
    }),
    bulkTransfer: builder.mutation({
      query: (body) => ({
        url: "disbursement/bulk/bank/transfer",
        body,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useRecurringExpenditureMutation,
  useScheduledExpenditureMutation,
  useGetBanksQuery,
  useVerifyAccountMutation,
  useSingleTransferMutation,
  useBulkTransferMutation
} = disbursementSlice;
