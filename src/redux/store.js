import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer/auth";
import contentReducer from "./reducer/content";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    content: contentReducer,
  },
});
