import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PhotoEnityDto, PhotoService, UplaodService } from "generated";

export interface PhotosSliceState {
  photos: Record<string, PhotoEnityDto>;
  loading: boolean;
}

export const photosSlice = createSlice({
  name: "photos",
  initialState: {
    photos: {},
    loading: false,
  } as PhotosSliceState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhotos.pending, (state, action) => {
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
      .addCase(addPhoto.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addPhoto.fulfilled, (state, action) => {
        const newPhoto = action.payload;
        state.photos[newPhoto._id] = newPhoto;
        state.loading = false;
      })
      .addCase(deletePhoto.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deletePhoto.fulfilled, (state, action) => {
        const deletedPhotoId = action.payload;
        delete state.photos[deletedPhotoId];
        state.loading = false;
      });
  },
});

// export default photosSlice.reducer;

export const fetchPhotos = createAsyncThunk(
  "photos/fetch",
  async (templateId: string) => {
    const responsePhotos = await PhotoService.photoControllerGetPhotos(
      {
        templateId
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
  }) => {
    const responsePhoto = await PhotoService.photoControllerEditAnswer(
      {
        body: {
          date: payload.date,
          description: payload.description,
          photoUrl: payload.photoUrl,
          templateId: payload.templateId,
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
  async (payload: { photoId: string; photoUrl: string; date: Date; description: string; templateId: string; userId: string }) => {
    const { photoId, photoUrl, date, description, templateId, userId } = payload;
    const response = await PhotoService.photoControllerEditPhoto({
      photoId,
      body: {
        _id: photoId,
        photoUrl,
        date,
        description,
        templateId,
        userId,
      },
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response;
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
