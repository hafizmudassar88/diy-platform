"use client";
import React from "react";
import { Provider } from "react-redux";
import { persistor, store } from ".";
import { PersistGate } from "redux-persist/integration/react";

export default function StoreProvider({ children }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>{children}</PersistGate>
    </Provider>
  );
}
