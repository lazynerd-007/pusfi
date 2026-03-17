import { ApiSlice } from "./Api";

const collectionSlice = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    CardCheckout: builder.mutation({
      query: (body) => ({
        url: "collections/standardcheckout",
        body,
        method: "POST",
      }),
    }),
    VerifyPayment: builder.mutation({
      query: (body) => ({
        url: "collections/verifypayment",
        body,
        method: "POST",
      }),
    }),
   
  }),
});

export const {
  useCardCheckoutMutation,
  useVerifyPaymentMutation
} = collectionSlice;
