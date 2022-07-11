import { configureStore } from "@reduxjs/toolkit";

import postsReducer from "./features/postsSlice";
import accountReducer from "./features/accountSlice";

export default configureStore({
  reducer: {
    posts: postsReducer,
    account: accountReducer,
  },
});
