import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_COUNTRY,
  prepareHeaders: (headers) => {
    headers.set("Accept", "application/json");
  },
});

export const CountrySlice = createApi({
  reducerPath: "country",
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    fetchCountry: builder.query({
      query: () => ({
        url: "all",
      }),
      transformResponse: (response: Record<string, any>) => {
        const countryNames = response.map((country: Record<string, any>) => ({
          label: country.name.common,
          flag: country?.flags?.svg,
          value: country.name.common,
        }));
        return countryNames;
      },
    }),
  }),
});

export const { useFetchCountryQuery } = CountrySlice;
