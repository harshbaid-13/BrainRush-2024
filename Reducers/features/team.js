import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  team: null,
  isAlreadyInTeam: false,
  sentRequestFromTheTeam: null,
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
      } else {
        state.isAlreadyInTeam = false;
      }
    },
    setTeamRequest: (state, action) => {
      console.log(action?.payload);
      state.sentRequestFromTheTeam = action?.payload;
    },
  },
});

export const { setTeam, setTeamRequest } = TeamSlice.actions;

export default TeamSlice.reducer;
