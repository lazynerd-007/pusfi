import { ApiSlice } from "./Api";

const payrollSlice = ApiSlice.enhanceEndpoints({
  addTagTypes: [
    "payroll" as const,
    "beneficiaries" as const,
    "single-payroll" as const,
    "single-beneficiary" as const,
  ],
}).injectEndpoints({
  endpoints: (builder) => ({
    createPayroll: builder.mutation({
      query: (body) => ({
        url: "payroll/create",
        body,
        method: "POST",
      }),
    }),
    createBeneficiaries: builder.mutation({
      query: (body) => ({
        url: "payroll/beneficiaries",
        body,
        method: "POST",
      }),
      invalidatesTags: ["beneficiaries"],
    }),
    updatePayroll: builder.mutation({
      query: (body) => ({
        url: "payroll/update",
        body,
        method: "POST",
      }),
    }),
    payrollHistory: builder.mutation({
      query: (body) => ({
        url: "payroll/history",
        body,
        method: "POST",
      }),
    }),
    manualPayroll: builder.mutation({
      query: (body) => ({
        url: "payroll/manual",
        body,
        method: "POST",
      }),
    }),
    getBeneficiaries: builder.query({
      query: ({ id, count, type }) => ({
        url: "payroll/employees/contractor",
        params: {
          payrollId: id,
          count: count,
          beneficiaryType: type,
        },
      }),
      providesTags: ["beneficiaries"],
    }),
    togglePayroll: builder.mutation({
      query: (body) => ({
        url: "payroll/toggle",
        body,
        method: "POST",
      }),
      invalidatesTags: ["single-payroll"],
    }),
    getPayroll: builder.query({
      query: (body) => ({
        url: "payroll",
        params: {
          count: body?.count,
        },
      }),
      providesTags: ["payroll"],
    }),
    getSinglePayroll: builder.query({
      query: (id) => ({
        url: "payroll/single",
        params: {
          payrollId: id,
        },
      }),
      providesTags: ["single-payroll"],
    }),
    getPayrollBeneficiaries: builder.query({
      query: (payrollId) => ({
        url: `payroll/beneficiaries?payrollId=${payrollId}`,
      }),
      providesTags: ["beneficiaries"],
    }),
    getBusinessBeneficiaries: builder.query({
      query: () => ({
        url: "payroll/business/beneficiaries",
      }),
      providesTags: ["beneficiaries"],
    }),
    getSingleBeneficiary: builder.query({
      query: (body) => ({
        url: `payroll/single/beneficiary`,
        params: {
          payrollId: body?.payrollId,
          beneficiaryId: body?.beneficiaryId,
        },
      }),
      providesTags: ["single-beneficiary"],
    }),
    updateBeneficiary: builder.mutation({
      query: (body) => ({
        url: "payroll/update/beneficiaries",
        body,
        method: "PUT",
      }),
      invalidatesTags: ["beneficiaries", "single-beneficiary"],
    }),
    deleteBeneficiary: builder.mutation({
      query: (body) => ({
        url: `payroll/delete/beneficiary`,
        method: "DELETE",
        params: {
          payrollId: body?.payrollId,
          beneficiaryId: body?.beneficiaryId,
        },
      }),
      invalidatesTags: ["beneficiaries"],
    }),
    deletePayroll: builder.mutation({
      query: (body) => ({
        url: `payroll/delete`,
        method: "DELETE",
        params: {
          payrollId: body?.payrollId,
        },
      }),
      invalidatesTags: ["payroll"],
    }),
    getPayrollAnalytics: builder.query({
      query: (body) => ({
        url: `payroll/analytics`,
        params: {
          page: body?.page,
          type: "history",
          count: 10,
        },
      }),
      providesTags: ["payroll"],
    }),
    getNextPayrollAnalytics: builder.query({
      query: (body) => ({
        url: `payroll/analytics`,
        params: {
          type: "history",
        },
      }),
      transformResponse: (res: any) => {
        return res?.data?.reduce(
          (
            accumulator: Record<string, any>,
            currentValue: Record<string, any>
          ) => {
            const currentDate = new Date(currentValue?.payoutDate);
            if (new Date() > currentDate) {
              currentDate.setMonth(currentDate.getMonth() + 1);
            }
            if (currentDate <= new Date(accumulator?.payoutDate)) {
              return currentValue;
            } else {
              return accumulator;
            }
          },
          { ...res?.data[0] }
        );
      },
      providesTags: ["payroll"],
    }),
    getPayrollOverview: builder.query({
      query: (body) => ({
        url: `payroll/analytics/transaction`,
        params: {
          payrollId: body?.id,
        },
      }),
      providesTags: ["single-payroll"],
    }),
    getPayrollDashboardAnalytics: builder.query({
      query: (body) => ({
        url: `payroll/analytics/dashboard`,
        params: {
          payrollId: "1",
        },
      }),
      providesTags: ["single-payroll"],
      transformResponse: (res: Record<string, any>) => {
        const arr = res?.data?.barchart?.map((e: Record<string, any>) => {
          const formattedDate = parseInt(e?.date?.split("-")[1], 10);
          return {
            date: `${formattedDate} ${e?.month}`,
            totalPayment: e?.total_gross_payment,
            deductionAmount: e?.total_deductions,
          };
        });
        return { ...res?.data, barchart: arr };
      },
    }),
  }),
});

export const {
  useCreatePayrollMutation,
  useManualPayrollMutation,
  usePayrollHistoryMutation,
  useUpdatePayrollMutation,
  useCreateBeneficiariesMutation,
  useGetBeneficiariesQuery,
  useLazyGetBeneficiariesQuery,
  useGetPayrollQuery,
  useGetPayrollBeneficiariesQuery,
  useLazyGetPayrollBeneficiariesQuery,
  useGetBusinessBeneficiariesQuery,
  useLazyGetBusinessBeneficiariesQuery,
  useGetSingleBeneficiaryQuery,
  useLazyGetSingleBeneficiaryQuery,
  useUpdateBeneficiaryMutation,
  useDeleteBeneficiaryMutation,
  useDeletePayrollMutation,
  useGetSinglePayrollQuery,
  useLazyGetSinglePayrollQuery,
  useTogglePayrollMutation,
  useGetPayrollAnalyticsQuery,
  useGetPayrollDashboardAnalyticsQuery,
  useGetPayrollOverviewQuery,
  useLazyGetPayrollAnalyticsQuery,
  useLazyGetPayrollDashboardAnalyticsQuery,
  useLazyGetPayrollOverviewQuery,
  useGetNextPayrollAnalyticsQuery,
} = payrollSlice;
