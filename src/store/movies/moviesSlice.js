import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	moviesList: [],
	movieDetails: {},
};

const moviesSlice = createSlice({
	name: "movies",
	initialState,
	reducers: {
		setMoviesList() {},
		setMovieDetails() {},
	},
});

export const { setMoviesList, setMovieDetails } = moviesSlice.actions;

export default moviesSlice.reducer;
