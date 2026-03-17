import { ApiSlice } from "./Api";

const payrollSlice = ApiSlice.enhanceEndpoints({
  addTagTypes: [
    "roles" as const,
    "permissions" as const,
    "employees" as const,
    "employee" as const,
  ],
}).injectEndpoints({
  endpoints: (builder) => ({
    getRoles: builder.query({
      query: () => ({
        url: "roles/business",
      }),
      providesTags: ["roles"],
    }),
    getSingleRole: builder.query({
      query: (id) => ({
        url: `roles/business/id?roleId=${id}`,
      }),
      providesTags: ["employee"],
    }),
    getPermissions: builder.query({
      query: () => ({
        url: "roles/permissions",
      }),
    }),
    getEmployees: builder.query({
      query: () => ({
        url: "employee",
      }),
      providesTags: ["employees"],
    }),
    getSingleEmployee: builder.query({
      query: (id) => ({
        url: `employee/id?employeeId=${id}`,
      }),
    }),
    createRole: builder.mutation({
      query: (body) => ({
        url: "roles/create",
        body,
        method: "POST",
      }),
      invalidatesTags: ["roles"],
    }),
    updateRole: builder.mutation({
      query: (body) => ({
        url: "roles/update",
        body,
        method: "POST",
      }),
      invalidatesTags: ["roles"],
    }),
    createEmployee: builder.mutation({
      query: (body) => ({
        url: "employee/create",
        body,
        method: "POST",
      }),
      invalidatesTags: ["employees"],
    }),
    updateEmployee: builder.mutation({
      query: (body) => ({
        url: "employee/update",
        body,
        method: "POST",
      }),
      invalidatesTags: ["employee"],
    }),
  }),
});

export const {
  useGetRolesQuery,
  useGetSingleRoleQuery,
  useGetPermissionsQuery,
  useGetEmployeesQuery,
  useGetSingleEmployeeQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useLazyGetEmployeesQuery,
  useLazyGetSingleEmployeeQuery,
  useLazyGetSingleRoleQuery,
} = payrollSlice;
