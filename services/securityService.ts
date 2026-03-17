import { updateUserPin } from "@/store/userSlice";
import { ApiSlice } from "./Api";


const securitySlice = ApiSlice.enhanceEndpoints({
  addTagTypes: ["hasPin" as const,],
}).injectEndpoints({
  
  endpoints: (builder) => ({
    createPin: builder.mutation({
        query: (body) => ({
          url: "SecurityService/pin",
          body,
          method: "POST",
        }),
      }),
    updatePin: builder.mutation({
        query: (body) => ({
          url: "SecurityService/pin",
          body,
          method: "PUT",
        }),
      }),
    GetSecurityDetails: builder.query({
        query: (id) => ({
          url: `SecurityService/${id}`,
        }),
        providesTags: ["hasPin"],
        onQueryStarted(id, { dispatch, queryFulfilled }) {
          queryFulfilled
            .then((apiResponse) => {
              dispatch(updateUserPin(apiResponse?.data?.data));
            })
            .catch(() => {
              // dispatch(logOut());
            });
        },
      }),
    validatePin: builder.mutation({
        query: (body) => ({
          url: `SecurityService/validate-pin`,
          body,
          method: "POST",
        }),
      }),
   
   
  }),
});

export const {
    useCreatePinMutation,
    useUpdatePinMutation,
    useLazyGetSecurityDetailsQuery,
    useValidatePinMutation

} = securitySlice;
