import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
  // isProfileCompleted: false,
};

export const ProfileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      console.log(action?.payload);
      state.profile = action?.payload;
      console.log("hello am payload: " + action?.payload);
      // if (action?.payload?.year && action?.payload?.department != "") {
      //   console.log("am here!!!!");
      //   state.isProfileCompleted = true;
      // }
    },
  },
});

export const { setProfile } = ProfileSlice.actions;

export default ProfileSlice.reducer;
