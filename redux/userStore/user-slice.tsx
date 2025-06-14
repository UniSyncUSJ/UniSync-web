import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
  selectedDate: null as Date | null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    setSelectedDate(state, action) {
      state.selectedDate = action.payload;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
