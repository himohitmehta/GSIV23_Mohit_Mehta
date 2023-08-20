import { useLoaderData } from "react-router-dom";
import { getMovies } from "../lib/movies.utils";
import { Link } from "react-router-dom";
import AppImage from "../components/AppImage";
import MovieCard from "../components/MovieCard";
import { Grid } from "@mui/material";
export async function loader({ request }) {
	// let movies = await getMovies();
	const url = new URL(request.url);
	const q = url.searchParams.get("q");
	let movies = await getMovies(q);

	if (!movies) {
		throw new Response("", {
			status: 404,
			statusText: "Not Found",
		});
	}
	return { movies };
}

export default function IndexPage() {
	const { movies } = useLoaderData();
	console.log({ movies });
	const moviesList = movies.results;
	return (
		<Grid container spacing={2}>
			{moviesList.map((movie) => {
				return (
					<Grid item md={2.4} xs={6} sm={4} key={movie.id}>
						<MovieCard
							id={movie.id}
							imgSrc={movie.poster_path}
							title={movie.title}
							rating={movie.vote_average}
							releaseDate={movie.release_date}
							overview={movie.overview}
							key={movie.id}
						/>
					</Grid>
				);
			})}
		</Grid>
	);
}
/**
 * {
    "adult": false,
    "backdrop_path": "/jZIYaISP3GBSrVOPfrp98AMa8Ng.jpg",
    "genre_ids": [
        16,
        35,
        10751,
        14,
        10749
    ],
    "id": 976573,
    "original_language": "en",
    "original_title": "Elemental",
    "overview": "In a city where fire, water, land and air residents live together, a fiery young woman and a go-with-the-flow guy will discover something elemental: how much they have in common.",
    "popularity": 4696.546,
    "poster_path": "/6oH378KUfCEitzJkm07r97L0RsZ.jpg",
    "release_date": "2023-06-14",
    "title": "Elemental",
    "video": false,
    "vote_average": 7.8,
    "vote_count": 1050
}
 */
