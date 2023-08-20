import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import moviesSlice from "./movies/moviesSlice";
// reducers

export const rootReducer = combineReducers({
	movies: moviesSlice,
});

const configStorage = {
	key: "root",
	storage,
	whitelist: ["movies"],
};

export default persistReducer(configStorage, rootReducer);
