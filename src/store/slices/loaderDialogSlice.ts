import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoaderDialogState {
  isOpen: boolean;
  isError: boolean;
  message: string;
}

const initialState: LoaderDialogState = {
  isOpen: false,
  isError: false,
  message: "Đang xử lý...",
};

export const loaderDialogSlice = createSlice({
  name: "loaderDialog",
  initialState,
  reducers: {
    showLoaderDialog: (state, action: PayloadAction<string>) => {
      state.isOpen = true;
      state.message = action.payload;
    },
    showLoaderDialogWithError: (state, action: PayloadAction<string>) => {
      state.isOpen = true;
      state.isError = true;
      state.message = action.payload;
    },
    hideLoaderDialog: (state) => {
      state.isOpen = false;
    },
  },
});

export const { showLoaderDialog, showLoaderDialogWithError, hideLoaderDialog } =
  loaderDialogSlice.actions;
export default loaderDialogSlice.reducer;
