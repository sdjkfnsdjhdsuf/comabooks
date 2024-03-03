import { createSlice } from "@reduxjs/toolkit";
import { TempalteResponceDto } from "generated";
import { fetchTemplates } from "./template_thrunk";

export interface TemplateSliceState {
  templates: TempalteResponceDto[];
  loading: boolean;
}

export const templateSlice = createSlice({
  name: "templates",
  initialState: {
    templates: [],
    loading: false,
  } as TemplateSliceState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTemplates.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchTemplates.fulfilled, (state, action) => {
        state.templates = action.payload;
        state.loading = false;
      });
  },
});
