import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	moviesList: [],
	movieDetails: {},
};

const moviesSlice = createSlice({
	name: "movies",
	initialState,
	reducers: {
		setMoviesList(state, action) {
			state.moviesList = action.payload;
		},
		setMovieDetails(state, action) {
			state.movieDetails = action.payload;
		},
	},
});

export const { setMoviesList, setMovieDetails } = moviesSlice.actions;

export default moviesSlice.reducer;
