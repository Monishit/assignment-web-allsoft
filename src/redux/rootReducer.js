import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import authReducer from "./slices/authSlice";
import documentReducer from './slices/documentSlice'

// Root persist config
export const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  whitelist: [""], 
};

// Cart persist config
const cartPersistConfig = {
  key: "cart",
  storage,
  keyPrefix: "redux-",
  whitelist: [""],
};

const goalClassPersistConfig = {
  key: "goalClass",
  storage,
  keyPrefix: "redux-",
  whitelist: [""], // Persist only selected goal and class
};

const rootReducer = combineReducers({
  auth: authReducer,
  document: documentReducer
});

export default rootReducer;