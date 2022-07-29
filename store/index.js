import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from "./settingsSlice";
import statesLoadReducer from "./statesLoadSlice";

export const store = configureStore({
    reducer: {
        settings: settingsReducer,
        statesLoad:statesLoadReducer
    }
});