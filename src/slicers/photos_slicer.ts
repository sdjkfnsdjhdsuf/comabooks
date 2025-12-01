import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PhotoEnityDto, PhotoService, UplaodService } from "generated";

export interface PhotosSliceState {
  photos: Record<string, PhotoEnityDto>;
  loading: boolean;
}

export const fetchPhotos = createAsyncThunk(
  "photos/fetch",
  async (templateId: string) => {
    const responsePhotos = await PhotoService.photoControllerGetPhotos(
      {
        templateId,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return responsePhotos;
  }
);

export const addPhoto = createAsyncThunk(
  "photos/add",
  async (payload: {
    photoUrl: string;
    date: Date;
    description: string;
    templateId: string;
    hideDate: boolean;
    hideDescription: boolean;
    questionTxt: string;
    status: string;
  }) => {
    const responsePhoto = await PhotoService.photoControllerEditAnswer(
      {
        body: {
          date: payload.date,
          description: payload.description,
          photoUrl: payload.photoUrl,
          templateId: payload.templateId,
          hideDate: payload.hideDate,
          hideDescription: payload.hideDescription,
          questionTxt: payload.questionTxt,
          status: payload.status,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return responsePhoto;
  }
);

export const updatePhoto = createAsyncThunk(
  "photos/update",
  async (payload: {
    photoId: string;
    photoUrl: string;
    date: Date;
    description: string;
    templateId: string;
    userId: string;
    hideDate: boolean;
    hideDescription: boolean;
    questionTxt: string;
    status: string;
  }) => {
    const {
      photoId,
      photoUrl,
      date,
      description,
      templateId,
      userId,
      hideDate,
      hideDescription,
      questionTxt,
      status,
    } = payload;

    const response = await PhotoService.photoControllerEditPhoto(
      {
        photoId,
        body: {
          _id: photoId,
          photoUrl,
          date,
          description,
          templateId,
          userId,
          hideDate,
          hideDescription,
          questionTxt,
          status,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    return response; // предполагаем, что это PhotoEnityDto
  }
);

export const deletePhoto = createAsyncThunk(
  "photos/delete",
  async (photoId: string) => {
    await PhotoService.photoControllerDeletePhoto(
      { photoId },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return photoId;
  }
);

export const photosSlice = createSlice({
  name: "photos",
  initialState: {
    photos: {},
    loading: false,
  } as PhotosSliceState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhotos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPhotos.fulfilled, (state, action) => {
        state.photos = action.payload.reduce(
          (prev: Record<string, PhotoEnityDto>, newVal: PhotoEnityDto) => ({
            ...prev,
            [newVal._id]: newVal,
          }),
          {}
        );
        state.loading = false;
      })
      .addCase(addPhoto.pending, (state) => {
        state.loading = true;
      })
      .addCase(addPhoto.fulfilled, (state, action) => {
        const newPhoto = action.payload as PhotoEnityDto;
        state.photos[newPhoto._id] = newPhoto;
        state.loading = false;
      })
      .addCase(updatePhoto.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePhoto.fulfilled, (state, action) => {
        const updatedPhoto = action.payload as PhotoEnityDto;
        state.photos[updatedPhoto._id] = updatedPhoto;
        state.loading = false;
      })
      .addCase(deletePhoto.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePhoto.fulfilled, (state, action) => {
        const deletedPhotoId = action.payload as string;
        delete state.photos[deletedPhotoId];
        state.loading = false;
      });
  },
});
