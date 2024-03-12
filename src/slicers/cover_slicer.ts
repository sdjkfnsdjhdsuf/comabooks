import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CoverEntityDto, CoverService } from "generated";

export interface CoverState {
  value: CoverEntityDto | null;
  loading: boolean;
}

export const coverSlice = createSlice({
  name: "cover",
  initialState: {
    value: null,
    loading: true,
  } as CoverState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCover.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchCover.fulfilled, (state, action) => {
        state.value = action.payload;
        state.loading = false;
      })
      .addCase(setCover.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(setCover.fulfilled, (state, action) => {
        state.value = action.payload;
        state.loading = false;
      });
  },
});

export const fetchCover = createAsyncThunk(
  "cover/fetch",
  async (templateId: string): Promise<CoverEntityDto> => {
    const responseCover = await CoverService.coverControllerGetCover(
      { id: templateId },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return responseCover.value;
  }
);

export const setCover = createAsyncThunk(
  "cover/set",
  async (payload: {
    bookName: string;
    coverUrl: string;
    fullName: string;
    fullNamePartner: string;
    templateId: string;
  }): Promise<CoverEntityDto> => {
    const { bookName, coverUrl, fullName, fullNamePartner, templateId } =
      payload;
    const newCover = await CoverService.coverControllerSetCoverByTemplateId(
      {
        id: templateId,
        body: {
          bookName,
          coverUrl,
          fullName,
          fullNamePartner,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return newCover;
  }
);
