import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import moviesSlice from "./movies/moviesSlice";
// reducers

// root reducer, all the reducers are combined here
export const rootReducer = combineReducers({
	movies: moviesSlice,
});

// redux persist configuration
const configStorage = {
	key: "root",
	storage,
	whitelist: ["movies"],
};

export default persistReducer(configStorage, rootReducer);
