import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type User = {
  id?: string;
  email: string;
  avatar?: string;
};

type UserState = {
  user: User | null;
  isAuthenticated: boolean;
};

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      state.user = state.user ? { ...state.user, ...action.payload } : null;
    },
  },
});

export const { login, logout, updateUser } = userSlice.actions;

export default userSlice.reducer;
