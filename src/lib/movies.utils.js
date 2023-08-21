import { TMDB_ACCESS_TOKEN } from "../constants/TMDB";

const options = {
	method: "GET",
	headers: {
		accept: "application/json",
		Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
	},
};

export async function getMovies(query, page) {
	const url = `https://api.themoviedb.org/3/discover/movie?language=en-US&page=${
		page || 1
	}&sort_by=release_date.desc&release_date.lte=2023-09-05&release_date.gte=2023-08-22`;

	const response = await fetch(url, options);

	let movies = await response.json();

	if (!movies) movies = [];
	if (query) {
		movies = await fetch(
			`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${
				page || 1
			}`,
			options,
		);
		return movies.json();
	}
	return movies;
}

export async function getMovieDetails(query) {
	const url = `https://api.themoviedb.org/3/movie/${query}?language=en-US`;

	const response = await fetch(url, options);

	let movie = await response.json();

	return movie;
}

export async function getMovieCast(id) {
	const url = `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`;
	const response = await fetch(url, options);
	let cast = await response.json();
	return cast;
}
