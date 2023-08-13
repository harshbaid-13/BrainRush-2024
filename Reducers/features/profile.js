import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
  isProfileCompleted: false,
};

export const ProfileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      const data = action?.payload;
      // console.log(data);
      state.profile = action?.payload;
      if (data) {
        if (data.year) {
          state.isProfileCompleted = true;
        }
      }
    },
  },
});

export const { setProfile } = ProfileSlice.actions;

export default ProfileSlice.reducer;
