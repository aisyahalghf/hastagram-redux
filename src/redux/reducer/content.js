import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  content: {},
  errorMessage: null,
};

export const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    contentAllUser: (state, action) => {
      state.content = action.payload;
    },
    getAllContents: (state, action) => {
      state.content = action;
    },
    userAlbum: (state, action) => {
      state.content = action.payload;
    },
    userAlbumRequest: (state, action) => {
      state.content = action;
    },
  },
});

export const { contentAllUser, getAllContent, userAlbum, userAlbumRequest } =
  contentSlice.actions;

export default contentSlice.reducer;
