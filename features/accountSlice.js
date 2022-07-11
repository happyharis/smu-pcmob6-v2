import { createSlice } from "@reduxjs/toolkit";

export const accountSlice = createSlice({
  name: "account",
  initialState: {
    username: "",
    photoUri: "",
  },
  reducers: {
    setUsernameProfile: (state, action) => {
      state.username = action.payload;
    },
    setPhotoUri: (state, action) => {
      state.photoUri = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUsernameProfile, setPhotoUri } = accountSlice.actions;

export default accountSlice.reducer;
