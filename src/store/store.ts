import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import loaderDialogReducer from "./slices/loaderDialogSlice";
import userInterfaceConfigReducer from "./slices/userInterfaceConfigSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);
const persistedUserInterfaceConfigReducer = persistReducer(
  persistConfig,
  userInterfaceConfigReducer
);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    loaderDialog: loaderDialogReducer,
    userInterfaceConfig: persistedUserInterfaceConfigReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
