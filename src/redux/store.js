import { configureStore } from "@reduxjs/toolkit";

import { shazamCoreApi } from "./services/shazamCore";
import playerReducer from "./features/playerSlice";

export const store = configureStore({
  reducer: {
    [shazamCoreApi.reducerPath]: shazamCoreApi.reducer,
    player: playerReducer,
  }, 

  // yeh redux ke docs me likha hoon as a boiler code so don't cramp it
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(shazamCoreApi.middleware),
});
