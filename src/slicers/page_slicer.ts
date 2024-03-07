import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface PageState {
  value: number | null;
}

export const pageSlice = createSlice({
  name: "page",
  initialState: {
    value: null,
  } as PageState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(thunkSetPage.fulfilled, (state, action) => {
      state.value = action.payload;
    });
  },
});

export const thunkSetPage = createAsyncThunk(
  "page/set",
  async (newNage: number | null) => {
    return newNage;
  }
);
