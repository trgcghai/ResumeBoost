import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type DisplayMode = "pagination" | "infiniteScroll";

interface UserInterfaceConfigState {
  itemsPerPage: number;
  displayMode: DisplayMode;
}

const initialState: UserInterfaceConfigState = {
  itemsPerPage: 9,
  displayMode: "pagination",
};

export const userInterfaceConfigSlice = createSlice({
  name: "userInterfaceConfig",
  initialState,
  reducers: {
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
    },
    setDisplayMode: (state, action: PayloadAction<DisplayMode>) => {
      state.displayMode = action.payload;
    },
  },
});

export const { setItemsPerPage, setDisplayMode } =
  userInterfaceConfigSlice.actions;
export default userInterfaceConfigSlice.reducer;
