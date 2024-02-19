import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData } from "../../types/types";

const loggedInUser = localStorage.getItem("user"); 
const initialState: { isLoggedIn: boolean; user: UserData | null } = {
  isLoggedIn:!!loggedInUser,
  user: loggedInUser ? JSON.parse(loggedInUser) : null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login(state, action: PayloadAction<UserData>) {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;
