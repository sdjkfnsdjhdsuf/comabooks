import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface PreviewState {
  value: boolean;
}

export const switchPreview = createAsyncThunk(
  "switchpreview",
  async (val: boolean) => {
    return val;
  }
);

export const previewSlicer = createSlice({
  name: "preview",
  initialState: {
    value: false,
  } as PreviewState,
  reducers: {},
  extraReducers: (builders) =>
    builders.addCase(switchPreview.fulfilled, (state, action) => {
      state.value = action.payload;
    }),
});
