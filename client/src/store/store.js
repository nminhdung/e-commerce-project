import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./app/appSlice";
import productReducer from "./products/productSlice";
import userReducer from "./user/userSlice";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const commonConfig = {
  key: "shop/user",
  storage,
};
const userConfig = {
  ...commonConfig,
  whitelist: ["isLoggedIn", "token","current"],
};
export const store = configureStore({
  reducer: {
    app: appReducer,
    products: productReducer,
    user: persistReducer(userConfig, userReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
