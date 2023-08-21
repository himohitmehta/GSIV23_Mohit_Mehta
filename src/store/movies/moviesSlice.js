import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	moviesList: [],
	movieDetails: {},
};

// redux slice for movies

const moviesSlice = createSlice({
	name: "movies",
	initialState,
	reducers: {
		// reducer to set movies list, currently not used
		setMoviesList(state, action) {
			state.moviesList = action.payload;
		},
		// reducer to set movie details
		setMovieDetails(state, action) {
			state.movieDetails = action.payload;
		},
	},
});

export const { setMoviesList, setMovieDetails } = moviesSlice.actions;

export default moviesSlice.reducer;
