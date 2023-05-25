// import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import * as reducers from './reducers';
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import characterReducer from './reducers/characterReducer';

export const store = configureStore({
    reducer: characterReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false,
    })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch