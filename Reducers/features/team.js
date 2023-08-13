import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  team: null,
};

export const TeamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    setTeam: (state, action) => {
      console.log(action?.payload);
      state.team = action?.payload;
    },
  },
});

export const { setTeam } = TeamSlice.actions;

export default TeamSlice.reducer;
