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
import sidebarReducer from "../reducers/sidebar.js";
import homeHeroReducer from "../reducers/homeHero.js";
import homeAboutReducer from "../reducers/homeAbout.js";
import homeContactReducer from "../reducers/homeContact.js";
import storage from "localforage";

const persistConfig = {
  key: "root",
  storage: storage,
};

const rootReducer = combineReducers({
  sidebar: sidebarReducer,
  homeHero: homeHeroReducer,
  homeAbout: homeAboutReducer,
  homeContact: homeContactReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
