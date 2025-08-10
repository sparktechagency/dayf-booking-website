/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE
} from "redux-persist";
import authSlice from "./features/authSlice.js";
import geoLocationSlice from "./features/geoLocationSlice.js";
import { baseApi } from "./api/baseApi.js";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import currencyReducer from "./features/currencySlice.js";

const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    }
  };
};

const storage =
  typeof window === "undefined"
    ? createNoopStorage()
    : createWebStorage("local");

const persistedAuthReducer = persistReducer(
  {
    key: "dayf:auth",
    storage
  },
  authSlice
);

const persistedCurrencyReducer = persistReducer(
  {
    key: "dayf:currency",
    storage
  },
  currencyReducer
);

const persistedGeoLocationReducer = persistReducer(
  {
    key: "geoLocation",
    storage
  },
  geoLocationSlice
);

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistedAuthReducer,
    geoLocation: persistedGeoLocationReducer,
    currency: persistedCurrencyReducer
  },
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(baseApi.middleware)
});

export const persistor = persistStore(store);
