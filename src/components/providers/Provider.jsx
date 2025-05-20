"use client";

import { persistor, store } from "@/redux/store";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import GoogleMapProvider from "./GoogleMapProvider";

export default function Provider({ children }) {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GoogleMapProvider>{children}</GoogleMapProvider>
      </PersistGate>
    </ReduxProvider>
  );
}
