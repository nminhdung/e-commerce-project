import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api";
export const getCurrentUser = createAsyncThunk(
  "user/current",
  async (data, { rejectWithValue }) => {
    const response = await api.getCurrentUser();
    console.log(response)
    if (response.success) {
      return response.result;
    } else {
      let refreshToken = localStorage.getItem("shop/user").refreshToken;
      console.log("error")
      const res = await api.apiRefreshToken({ refreshToken: refreshToken });
      if (res.success) {
        localStorage.getItem("shop/user").token = res.newAccessToken;
      }
      console.log(localStorage.getItem("shop/user").token);
      return rejectWithValue(response);
    }
  }
);
