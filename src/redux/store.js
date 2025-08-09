import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import rootReducer, { rootPersistConfig } from "./rootReducer";

// Configure persisted reducer
const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

// Create the Redux store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

// Create persistor
const persistor = persistStore(store);

// Export the store and persistor
export { store, persistor };