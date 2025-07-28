import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { tagTypesList } from "../tagtypes";
import { getFromSessionStorage } from "../../utils/sessionStorage";
import { getBackendBaseUrl } from "../../config/envConfig";
import { setUser } from "../features/authSlice";

const baseQuery = fetchBaseQuery({
  // baseUrl: "http://167.172.237.31:5000/api/v1",
  baseUrl: getBackendBaseUrl(),
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const otpToken = getFromSessionStorage("dayf-signup-token");
    const forgotPassToken = getFromSessionStorage("forgotPassToken");
    const changePassToken = getFromSessionStorage("changePasswordToken");

    const token = getState().auth.token;
console.log(token)
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    if (otpToken) {
      headers.set("token", otpToken);
    }

    if (forgotPassToken) {
      headers.set("token", forgotPassToken);
    }

    if (changePassToken) {
      headers.set("token", changePassToken);
    }
    return headers;
  }
});

const baseQueryWithRefreshToken = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    const res = await baseQuery(
      { url: "/auth/refresh-token", method: "POST", body: {} },
      api,
      extraOptions
    );

    if (res?.data?.accessToken) {
      const user = api.getState().auth.user;

      api.dispatch(
        setUser({
          user,
          token: res.data.accessToken
        })
      );

      result = await baseQuery(args, api, extraOptions);
    } else {
      // api.dispatch(logout());
    }
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: tagTypesList,
  endpoints: () => ({})
});
