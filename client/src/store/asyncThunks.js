import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";
export const getCategories = createAsyncThunk(
  "app/categories",
  async (data, { rejectWithValue }) => {
    const response = await api.apiGetCategories();
    console.log(response);
    if (response.data.success) {
      return response.data.productCategories;
    } else {
      return rejectWithValue(response);
    }
  }
);
