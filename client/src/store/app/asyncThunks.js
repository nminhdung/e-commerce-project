import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api";
export const getCategories = createAsyncThunk(
  "app/categories",
  async (data, { rejectWithValue }) => {
    const response = await api.apiGetCategories();
    if (response.success) {
      return response.productCategories;
    } else {
      return rejectWithValue(response);
    }
  }
);

export const getBrands = createAsyncThunk(
  "app/brands",
  async (data, { rejectWithValue }) => {
    const response = await api.apiGetBrands();
    if (response.success) {
      return response.listBrand;
    } else {
      return rejectWithValue(response);
    }
  }
);
