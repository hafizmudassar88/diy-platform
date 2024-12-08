import React from 'react';
import { UserProvider } from './UserContext';
import { FormProvider } from './FormContext';

const AppProvider = ({ children }) => {
  return (
    <UserProvider>
      <FormProvider>
        {children}
      </FormProvider>
    </UserProvider>
  );
};

export default AppProvider;
