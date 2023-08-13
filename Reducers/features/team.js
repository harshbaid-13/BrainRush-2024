import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  team: null,
  isAlreadyInTeam: false,
};

export const TeamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    setTeam: (state, action) => {
      // console.log("team data", action?.payload);
      state.team = action?.payload;
      if (action?.payload) {
        state.isAlreadyInTeam = true;
      }
    },
  },
});

export const { setTeam } = TeamSlice.actions;

export default TeamSlice.reducer;
