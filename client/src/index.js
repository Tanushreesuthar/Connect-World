import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import authReducer from "./state";
import { configureStore } from "@reduxjs/toolkit"; //configureStore is used to create a Redux store, which holds the application's global state.
import { Provider } from "react-redux";
//The Provider component is used to wrap your entire React application and provides access to the Redux store for all components in the app.
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist"; //These lines import various constants and functions from the "redux-persist" library, which is used for persisting and rehydrating Redux state across sessions. The constants (FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER) are used to configure Redux Persist's behavior.
import storage from "redux-persist/lib/storage"; // it is typically used to store state data in the browser's local storage.
import { PersistGate } from "redux-persist/integration/react"; //PersistGate is used to wrap your application, ensuring that your app doesn't render until persisted state has been retrieved and rehydrated into the Redux store.
const persistConfig = { key: "root", storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, authReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);