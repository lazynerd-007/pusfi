import { ApiSlice } from "./Api";
import {
  updateUser,
  logOut,
  updateBusiness,
  updateWallet,
} from "@/store/userSlice";

const authSlice = ApiSlice.enhanceEndpoints({
  addTagTypes: ["profile" as const, "business" as const],
}).injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "login",
        method: "POST",
        body,
      }),
      onQueryStarted(id, { dispatch, queryFulfilled }) {
        queryFulfilled
          .then((apiResponse) => {
            localStorage.setItem("refresh", apiResponse.data?.refreshToken);
            localStorage.setItem("token", apiResponse.data?.token);
          })
          .catch(() => {});
      },
    }),
    refresh: builder.mutation({
      query: (body) => ({
        url: "login/refresh",
        method: "POST",
        body,
      }),
    }),
    register: builder.mutation({
      query: (body) => ({
        url: "register/user",
        method: "POST",
        body,
      }),
      onQueryStarted(id, { dispatch, queryFulfilled }) {
        queryFulfilled
          .then((apiResponse) => {
            localStorage.setItem(
              "refresh",
              apiResponse?.data?.token?.refreshToken
            );
            localStorage.setItem("token", apiResponse.data?.token?.token);
          })
          .catch(() => {});
      },
    }),
    profile: builder.query({
      query: () => ({
        url: "user/me",
      }),
      providesTags: ["profile"],
      onQueryStarted(id, { dispatch, queryFulfilled }) {
        queryFulfilled
          .then((apiResponse) => {
            dispatch(updateUser(apiResponse?.data?.user));
          })
          .catch((err) => {
             console.warn("Auth Service Profile Fetch Error:", err);
             // CRITICAL FIX: Do NOT logout automatically on network errors/CORS
             // Only logout if it's strictly a 401 (Unauthorized) from the server
             // But since we are getting Network Errors (status: "FETCH_ERROR"), we should ignore logout.
             
             if (err?.error?.status === 401) {
                // dispatch(logOut());
             }
          });
      },
    }),
    generateOtp: builder.mutation({
      query: (body) => ({
        url: "validation/phone/generate/otp",
        method: "POST",
        body,
      }),
    }),
    validateOtp: builder.mutation({
      query: (body) => ({
        url: "validation/phone/validate/otp",
        method: "POST",
        body,
      }),
    }),
    generateEmailOtp: builder.mutation({
      query: (body) => ({
        url: "validation/email/generate/otp",
        method: "POST",
        body,
      }),
    }),
    validateEmailOtp: builder.mutation({
      query: (body) => ({
        url: "validation/email/validate/otp",
        method: "POST",
        body,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (body) => ({
        url: "password/forgot",
        method: "POST",
        body,
      }),
    }),
    resetPassword: builder.mutation({
      query: (body) => ({
        url: "password/reset",
        method: "POST",
        body,
      }),
    }),
    businessProfile: builder.query({
      query: () => ({
        url: "business",
      }),
      providesTags: ["business"],
      onQueryStarted(id, { dispatch, queryFulfilled }) {
        queryFulfilled
          .then((apiResponse) => {
            dispatch(updateBusiness(apiResponse?.data?.business));
          })
          .catch(() => {
            // dispatch(logOut());
          });
      },
    }),
    createBusiness: builder.mutation({
      query: (body) => ({
        url: "business/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["business"],
    }),
    createBusinessOwner: builder.mutation({
      query: (body) => ({
        url: "business/create/owner",
        method: "POST",
        body,
        formData: true,
      }),
      invalidatesTags: ["business"],
    }),
    updateBusinessOwner: builder.mutation({
      query: (body) => ({
        url: "business/update",
        method: "POST",
        body,
        formData: true,
      }),
      invalidatesTags: ["business"],
    }),
    updateUserOwner: builder.mutation({
      query: (body) => ({
        url: "user/update/owner",
        method: "POST",
        body,
        formData: true,
      }),
    }),
    completeBusinessOnboarding: builder.mutation({
      query: (body) => ({
        url: "business/complete/onboarding",
        method: "POST",
        body,
        formData: true,
      }),
      invalidatesTags: ["business"],
    }),
    createIndividualOwner: builder.mutation({
      query: (body) => ({
        url: "user/update/owner",
        method: "POST",
        body,
        headers: {
          // "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
        formData: true,
      }),
    }),
    updateProfilePicture: builder.mutation({
      query: (body) => ({
        url: "user/update/profile/picture",
        method: "PUT",
        body,
        headers: {
          // "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
        formData: true,
      }),
      invalidatesTags: ["profile"],
    }),
    updateBusinessLogo: builder.mutation({
      query: (body) => ({
        url: "business/update/logo",
        method: "PUT",
        body,
        headers: {
          // "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
        formData: true,
      }),
      invalidatesTags: ["business"],
    }),
    updatePassword: builder.mutation({
      query: (body) => ({
        url: "password/change",
        method: "POST",
        body,
        headers: {
          // "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useBusinessProfileQuery,
  useCompleteBusinessOnboardingMutation,
  useCreateBusinessMutation,
  useCreateBusinessOwnerMutation,
  useCreateIndividualOwnerMutation,
  useUpdateBusinessOwnerMutation,
  useUpdateUserOwnerMutation,
  useForgotPasswordMutation,
  useGenerateOtpMutation,
  useProfileQuery,
  useLazyBusinessProfileQuery,
  useLazyProfileQuery,
  useRefreshMutation,
  useResetPasswordMutation,
  useValidateOtpMutation,
  useGenerateEmailOtpMutation,
  useValidateEmailOtpMutation,
  useUpdateProfilePictureMutation,
  useUpdateBusinessLogoMutation,
  useUpdatePasswordMutation,
} = authSlice;
