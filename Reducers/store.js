import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@Reducers/features/user";
import teamReducer from "@Reducers/features/team";
import profileReducer from "@Reducers/features/profile";
import requestReducer from "@Reducers/features/requestes";

export const store = configureStore({
  reducer: {
    user: userReducer,
    team: teamReducer,
    profile: profileReducer,
    requests: requestReducer,
  },
});
