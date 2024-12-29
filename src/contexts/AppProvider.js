'use client'
import React from "react";
import { UserProvider } from "./UserContext";
import { FormProvider } from "./FormContext";
import { Provider } from "react-redux";
import store from "@/redux/store";

const AppProvider = ({ children }) => {
  return (
    <Provider store={store}>
      <UserProvider>
        <FormProvider>{children}</FormProvider>
      </UserProvider>
    </Provider>
  );
};

export default AppProvider;
