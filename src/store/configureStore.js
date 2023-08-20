import logger from "redux-logger";
import {
	persistStore,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import rootReducer from "./rootReducer";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
	reducer: rootReducer,
	middleware: import.meta.env.DEV
		? (getDefaultMiddleware) =>
				getDefaultMiddleware({
					serializableCheck: {
						ignoredActions: [
							FLUSH,
							REHYDRATE,
							PAUSE,
							PERSIST,
							PURGE,
							REGISTER,
						],
					},
				}).concat(logger)
		: (getDefaultMiddleware) =>
				getDefaultMiddleware({
					serializableCheck: {
						ignoredActions: [
							FLUSH,
							REHYDRATE,
							PAUSE,
							PERSIST,
							PURGE,
							REGISTER,
						],
					},
				}),
	devTools: import.meta.env.DEV,
});

export const persistor = persistStore(store);

export default {
	store,
	persistor,
};
