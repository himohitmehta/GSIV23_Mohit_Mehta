import { useLoaderData } from "react-router-dom";
import { getMovies } from "../lib/movies.utils";
import MovieCard from "../components/common/MovieCard";
import { Box, Grid } from "@mui/material";
import ListPagination from "../components/Pagination";
import { useNavigation } from "react-router-dom";
import MoviesListSkelton from "../components/Skeletons/MoviesListSkelton";
import { Link } from "react-router-dom";

// the loader function to load index page data,
// it return the movies, q and page parameters from the url to access in the component
// if the q parameter is not null then it will search for movies with the q parameter
// else it will return the upcoming movies
export async function loader({ request }) {
	// let movies = await getMovies();
	const url = new URL(request.url);
	const q = url.searchParams.get("q");
	const page = url.searchParams.get("page");
	let movies = await getMovies(q, page);

	if (!movies) {
		throw new Response("", {
			status: 404,
			statusText: "Not Found",
		});
	}
	return { movies, q, page };
}

// the index page component, it contains the movies list and the pagination component
export default function IndexPage() {
	const { movies, q } = useLoaderData();
	const navigation = useNavigation();
	console.log({ movies, navigation });
	const moviesList = movies.results;
	// while the data is loading show the skeleton
	if (navigation.state === "loading") {
		return <MoviesListSkelton />;
	}

	if (moviesList.length === 0 || !moviesList.length) {
		return (
			<Box
				sx={{
					display: "grid",
					placeItems: "center",
					height: "60vh",
				}}
			>
				<div>
					<h1>No Results Found</h1>
					<p>Please try again with a different search term.</p>
					<Link to="/">Go to Home</Link>
				</div>
			</Box>
		);
	}

	return (
		<>
			<Grid container spacing={2} alignItems={"stretch"}>
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
			<ListPagination
				totalPages={movies.total_pages}
				currentPage={movies.page}
				q={q}
			/>
		</>
	);
}
