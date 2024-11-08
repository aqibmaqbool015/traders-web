import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  User: {},
  selectedUserPackage: {},
};
const allSlices = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.User = action.payload;
    },
    setSelectedUserPackage: (state, action) => {
      state.selectedUserPackage = action.payload;
    },
  },
});

export const { setUser, setSelectedUserPackage } = allSlices.actions;

export default allSlices.reducer;
