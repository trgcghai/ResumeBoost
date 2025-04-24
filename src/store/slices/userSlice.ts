import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type User = {
  id?: string;
  email: string;
  avatar?: string;
  role?: string;
  isAdmin?: boolean;
};

type UserState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
};

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    persistComplete: (state) => {
      state.isLoading = false;
    },
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = {
        ...action.payload,
        role: action.payload.role,
        isAdmin: action.payload.admin,
      };
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

export const { login, logout, updateUser, persistComplete } = userSlice.actions;

export default userSlice.reducer;
