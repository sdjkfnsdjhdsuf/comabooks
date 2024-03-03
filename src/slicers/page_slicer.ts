import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface PageState {
  value: number;
}

export const pageSlice = createSlice({
  name: "page",
  initialState: {
    value: 0,
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
  async (newNage: number) => {
    return newNage;
  }
);
