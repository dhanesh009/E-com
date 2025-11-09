import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

// ✅ Safely handle all errors from API calls
const baseQuery = async (args, api, extraOptions) => {
  const rawBaseQuery = fetchBaseQuery({
    baseUrl: `${BASE_URL}/api`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.userInfo?.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  });

  // Run the base query
  const result = await rawBaseQuery(args, api, extraOptions);

  // ✅ Normalize errors (prevents crashes)
  if (result?.error) {
    result.error = {
      status: result.error.status,
      message:
        result.error?.data?.message ||
        result.error?.error ||
        result.error?.message ||
        "Something went wrong",
    };
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Product", "Order", "User", "Category"],
  endpoints: () => ({}),
});
