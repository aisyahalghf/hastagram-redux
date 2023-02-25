import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  errorMessage: "",
  loading: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = true;
    },
    keep_login_request: (state, action) => {
      state.user = action;
      state.loading = true;
    },
    keep_login_payload: (state, action) => {
      state.user = action.payload;
      state.loading = true;
    },
    failed: (state, action) => {
      state.errorMessage = action.payload;
      state.loading = false;
    },
  },
});

export const { registerSuccess, loginSuccess, keepLogin } = authSlice.actions;
export default authSlice.reducer;
