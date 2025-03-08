'use client'
import React from "react";
import { UserProvider } from "./UserContext";
import { FormProvider } from "./FormContext";
import { ResumeProvider } from "./ResumeContext";
import { Provider } from "react-redux";
import store from "@/redux/store";

const AppProvider = ({ children }) => {
  return (
    <Provider store={store}>
      <UserProvider>
        <ResumeProvider>
          <FormProvider>{children}</FormProvider>
        </ResumeProvider>
      </UserProvider>
    </Provider>
  );
};

export default AppProvider;
