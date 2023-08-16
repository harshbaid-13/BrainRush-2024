import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  requests: [],
  hasRequests: false,
};

export const RequestSlice = createSlice({
  name: "requests",
  initialState,
  reducers: {
    setRequest: (state, action) => {
      // console.log(action?.payload);
      state.requests = action?.payload;
      if (action?.payload?.length > 0) {
        state.hasRequests = true;
      }
    },
  },
});

export const { setRequest } = RequestSlice.actions;

export default RequestSlice.reducer;
