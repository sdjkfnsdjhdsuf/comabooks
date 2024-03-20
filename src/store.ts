import { configureStore } from "@reduxjs/toolkit";
import { answersSlice } from "slicers/answers_slice";
import { coverSlice } from "slicers/cover_slicer";
import { pageSlice } from "slicers/page_slicer";
import { previewSlicer } from "slicers/preview_slicer";
import { templateSlice } from "slicers/templates/template_slice";
import { photosSlice } from "slicers/photos_slicer";

export const store = configureStore({
  reducer: {
    activeAnswers: answersSlice.reducer,
    templates: templateSlice.reducer,
    page: pageSlice.reducer,
    preview: previewSlicer.reducer,
    cover: coverSlice.reducer,
    photos: photosSlice.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
