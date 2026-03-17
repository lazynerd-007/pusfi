import { ApiSlice } from "./Api";
import { updateWallet } from "@/store/userSlice";
import { logOut } from "@/store/userSlice";

const walletSlice = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWallet: builder.query({
      query: () => ({
        url: "wallet",
      }),
      onQueryStarted(id, { dispatch, queryFulfilled }) {
        queryFulfilled
          .then((apiResponse) => {
            dispatch(updateWallet(apiResponse?.data?.wallet));
          })
          .catch(() => {
            // dispatch(logOut());
          });
      },
    }),
    getWalletHistory: builder.query({
      query: () => ({
        url: "wallet/history?duration=yearly",
      }),
      transformResponse: (res: Record<string, any>) => {
        const arr = res?.wallet?.map((e: Record<string, any>) => {
          const formattedDate = new Date(e?.date).toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
          });
          return { balance: e?.balance, date: formattedDate };
        });
        return arr;
      },
    }),
    getWalletDetails: builder.query({
      query: (id) => ({
        url: `wallet/account/details?businessId=${id}`,
      }),
    }),
  }),
});

export const {
  useGetWalletQuery,
  useGetWalletHistoryQuery,
  useGetWalletDetailsQuery,
  useLazyGetWalletDetailsQuery,
} = walletSlice;
