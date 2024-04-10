import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface EditingState {
  isEditing: boolean;
}

const initialState: EditingState = {
  isEditing: false,
};

export const editingSlice = createSlice({
  name: 'editing',
  initialState,
  reducers: {
    setEditing: (state, action: PayloadAction<boolean>) => {
      state.isEditing = action.payload;
    },
  },
});

export const { setEditing } = editingSlice.actions;
