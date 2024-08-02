import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
// reducer 를 철자를 조심하세요.
export default configureStore({
  reducer: {
    user: userSlice,
  },
});
