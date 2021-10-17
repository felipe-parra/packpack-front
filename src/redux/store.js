import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./ducks/";
import { restoreSessionAction } from "./ducks/auth";

export default function generateStore() {
  let store = configureStore({
    reducer: rootReducer,
  });
  restoreSessionAction()(store.dispatch, store.getState());
  return store;
}
