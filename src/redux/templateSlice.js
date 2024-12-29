
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchTemplateData,
  fetchTemplateDataById,
  createTemplateData,
  updateTemplateData,
  deleteTemplateData,
} from "./api";

// Initial State
const initialState = {
  data: [],
  status: "idle",
  error: null,
};

// Async Thunks
export const getTemplateData = createAsyncThunk(
  "template/getTemplateData",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchTemplateData();
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getTemplateDataById = createAsyncThunk(
  "template/getTemplateDataById",
  async (id, { rejectWithValue }) => {
    try {
      return await fetchTemplateDataById(id);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const addTemplateData = createAsyncThunk(
  "template/addTemplateData",
  async (newData, { rejectWithValue }) => {
    try {
      return await createTemplateData(newData);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const editTemplateData = createAsyncThunk(
  "template/editTemplateData",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      return await updateTemplateData(id, updatedData);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const removeTemplateData = createAsyncThunk(
  "template/removeTemplateData",
  async (id, { rejectWithValue }) => {
    try {
      return await deleteTemplateData(id);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Slice
const templateSlice = createSlice({
  name: "template",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(getTemplateData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTemplateData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getTemplateData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Fetch by ID
      .addCase(getTemplateDataById.fulfilled, (state, action) => {
        state.data = state.data.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
      })

      // Add
      .addCase(addTemplateData.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })

      // Edit
      .addCase(editTemplateData.fulfilled, (state, action) => {
        state.data = state.data.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
      })

      // Remove
      .addCase(removeTemplateData.fulfilled, (state, action) => {
        state.data = state.data.filter((item) => item.id !== action.meta.arg);
      });
  },
});

export default templateSlice.reducer;
