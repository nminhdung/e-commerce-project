import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api";
export const getNewProducts = createAsyncThunk(
  "product/products",
  async (data, { rejectWithValue }) => {
    const response = await api.apiGetProducts({ sort: "-createdAt" });
    if (response.success) {
      return response.listProduct;
    } else {
      return rejectWithValue(response);
    }
  }
);
