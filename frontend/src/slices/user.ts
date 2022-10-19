import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IUser {
  email: string;
  name: string;
  isLoggedIn: boolean;
}

const initialState: IUser = {
  email: "",
  name: "",
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<IUser>) => {
      state = { ...action.payload, isLoggedIn: true };
    },
    removeLogin: (state) => {
      state = { ...initialState };
    },
  },
});

export const { setLogin, removeLogin } = userSlice.actions;

export default userSlice.reducer;
