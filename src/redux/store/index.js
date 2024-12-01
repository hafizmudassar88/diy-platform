import { combineReducers, configureStore } from "@reduxjs/toolkit";
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
import localforage from "localforage"; // Import localforage
import sidebarReducer from "../reducers/sidebar.js";
import homeHeroReducer from "../reducers/homeHero.js";
import homeAboutReducer from "../reducers/homeAbout.js";
import homeContactReducer from "../reducers/homeContact.js";

// Check if we are in a browser environment
const isBrowser = typeof window !== "undefined";

// Configure localforage for use as storage
if (isBrowser) {
  localforage.config({
    driver: localforage.INDEXEDDB, // Primary storage driver
    name: "myReduxStore", // Custom database name
  });
}

// Redux Persist configuration
const persistConfig = {
  key: "root",
  storage: isBrowser ? localforage : null, // Use localforage only in the browser
};

// Combine reducers
const rootReducer = combineReducers({
  sidebar: sidebarReducer,
  homeHero: homeHeroReducer,
  homeAbout: homeAboutReducer,
  homeContact: homeContactReducer,
});

// Conditionally apply persistReducer for CSR compatibility
const persistedReducer = isBrowser
  ? persistReducer(persistConfig, rootReducer)
  : rootReducer;

// Configure the Redux store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Conditionally create persistor only in the browser
export const persistor = isBrowser ? persistStore(store) : null;
