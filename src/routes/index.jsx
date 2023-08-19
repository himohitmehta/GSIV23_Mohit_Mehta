import { useLoaderData } from "react-router-dom";
import { getMovies } from "../lib/movies.utils";
import { Link } from "react-router-dom";

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
		<div>
			{moviesList.map((movie) => {
				return (
					<div key={movie.id}>
						{movie.title || movie.original_title}
						<br />
						{movie.overview}
						<br />
						<Link to={`/${movie.id}`}>{movie.id}</Link>
					</div>
				);
			})}
		</div>
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
