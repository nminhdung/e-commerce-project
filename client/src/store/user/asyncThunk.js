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
      return rejectWithValue(response);
    }
  }
);
