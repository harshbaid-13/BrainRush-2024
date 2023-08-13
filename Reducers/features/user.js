import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log(action?.payload);
      state.user = action?.payload;
    },
  },
});

export const { setUser } = UserSlice.actions;

export default UserSlice.reducer;
