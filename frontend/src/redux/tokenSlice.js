import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

export const tokenSlice = createSlice({
  name: "tokenSlicer",
  initialState,
  reducers: {
    tokenAction: (state, { payload }) => {
      return (state = payload);
    },
  },
});

export const { tokenAction } = tokenSlice.actions;

export default tokenSlice.reducer;
