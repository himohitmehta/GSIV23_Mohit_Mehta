/* eslint-disable react-refresh/only-export-components */
import { getMovieCast, getMovieDetails } from "../lib/movies.utils";
import AppImage from "../components/common/AppImage";
import { Button, Grid, Skeleton, Typography } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setMovieDetails } from "../store/movies/moviesSlice";
import MovieDetailSkeleton from "../components/Skeletons/MovieDetailSkeleton";
import { Link } from "react-router-dom";

// the loader component to get the movie details from the api
export async function loader({ params }) {
	const movie = await getMovieDetails(params.movieId);
	if (!movie) {
		throw new Response("", {
			status: 404,
			statusText: "Not Found",
		});
	}
	return { movie };
}

// using mapState to get the movie details from the redux store
const mapState = ({ movies }) => ({
	movie: movies.movieDetails,
});

export default function MoviePage() {
	// getting the movie details from the redux store
	const { movie } = useSelector(mapState);

	const dispatch = useDispatch();
	// the useParams hook to get the movie id from the url
	const params = useParams();
	const movieId = params.movieId;
	console.log({
		movie,
		params,
	});
	// the state to store the cast and director of the movie
	const [cast, setCast] = useState([]);
	const [director, setDirector] = useState([]);
	// the state to store the show more button state
	const [showMore, setShowMore] = useState(true);
	// the state to store the page loading state
	const [isPageLoading, setIsPageLoading] = useState(true);
	// the state to store the actors loading state
	const [isActorsLoading, setIsActorsLoading] = useState(true);
	// the handler to handle the show more button click
	const handleClickShowMore = () => {
		// set the show more state to the opposite of the current state
		setShowMore(!showMore);
		console.log({ showMore });
	};

	// the actors array to show in the movie details page, if the show more state is true then it will show the first 10 actors
	const actors = Array.isArray(cast) && showMore ? cast.slice(0, 10) : cast;
	// the handler to fetch the movie details from the api
	const handleFetchMovieDetails = () => {
		// set the page loading state to true
		setIsPageLoading(true);
		// get the movie details from the api
		getMovieDetails(params.movieId)
			.then((json) => {
				console.log({ movie: json });
				// set the page loading state to false
				setIsPageLoading(false);
				// set the movie details in the redux store
				dispatch(setMovieDetails(json));
				// fetch the movie cast
				handleFetchMovieCast(json);
			})
			.catch((error) => console.error(error));
	};
	// the handler to fetch the movie cast from the api
	const handleFetchMovieCast = (movie) => {
		// set the actors loading state to true
		setIsActorsLoading(true);
		// get the movie cast from the api
		getMovieCast(movie.id)
			.then((json) => {
				// set the actors loading state to false
				setIsActorsLoading(false);
				console.log({ cast: json });
				// set the cast and director in the state
				setCast(json.cast);
				const director = json.crew.find(
					(item) => item.job === "Director",
				);
				setDirector(director);
				console.log({ director });
			})
			.catch((error) => console.log({ error }));
	};

	// the useEffect hook to fetch the movie details from the api
	useEffect(() => {
		handleFetchMovieDetails();
	}, [movieId]);

	// while the page is loading show the skeleton
	if (isPageLoading) {
		return <MovieDetailSkeleton />;
	}
	// if the movie is not found show the error message
	if (movie.success === false) {
		return (
			<div
				style={{
					display: "grid",
					placeItems: "center",
					height: "60vh",
				}}
			>
				<div>
					<h1>Movie Not Found</h1>
					<p>Please try again with a different movie.</p>
					<p>
						<i>
							Status Code:{movie.status_code}
							<br />
							Message: {movie.status_message}
						</i>
					</p>
					<Link to="/">Go to Home</Link>
				</div>
			</div>
		);
	}
	// if the movie is found show the movie details
	return (
		<Grid container spacing={3}>
			<Grid
				item
				md={3}
				sm={4}
				xs={12}
				sx={{
					maxHeight: { md: "360px", sm: "360px", xs: "440px" },
					overflow: "hidden",
				}}
			>
				<AppImage
					src={movie.poster_path}
					sx={{
						width: { md: "240px", sm: "100%", xs: "100%" },
						height: { md: "320px", sm: "100%", xs: "400px" },
						maxHeight: { md: "320px", sm: "360px", xs: "400px" },
						objectFit: { md: "fill", xs: "fill" },
						borderRadius: "10px",
					}}
					alt={movie.title || movie.original_title}
				/>
			</Grid>
			<Grid item md={9} sm={8} xs={12}>
				<Typography
					variant="h3"
					component={"h1"}
					className="title"
					sx={{
						fontSize: "2rem",
						color: (theme) => theme.palette.gray,
						"& .rating": {
							color: (theme) => theme.palette.lightGray,
							// fontSize: "1.5rem",
						},
					}}
				>
					{movie.title || movie.original_title}{" "}
					<span className="rating">({movie.vote_average})</span>
				</Typography>
				<Typography sx={{ mt: 1 }}>
					{movie.release_date && movie.release_date} |{" "}
					{movie.runtime ? (
						<>
							{Math.floor(movie.runtime / 60)} hour{" "}
							{movie.runtime % 60} min{" "}
						</>
					) : (
						"No runtime found"
					)}
					| {director?.name && director?.name}{" "}
					{/* director to be added */}
				</Typography>
				{isActorsLoading ? (
					<>
						<Skeleton height={40} />
					</>
				) : (
					<Typography
						variant="body1"
						sx={{
							mt: 1,
							"& span": {
								mr: 1,
							},
						}}
					>
						<b>Cast:</b>
						<span>
							{" "}
							{Array.isArray(actors) &&
								actors
									// .slice(0, 10)
									.map((item) => item.name)
									.join(", ")}
						</span>
						{Array.isArray(cast) && cast.length > 10 && (
							<Button
								sx={{
									color: (theme) => theme.palette.blue,
									textTransform: "none",
									p: 0,
									px: 0,
									// ml: 1,

									mt: "-2px",
									"&:hover": {
										background: "transparent",
									},
								}}
								onClick={handleClickShowMore}
							>
								Show {showMore ? "More" : "Less"}
							</Button>
						)}
						{/* to be added */}
					</Typography>
				)}{" "}
				<Typography variant="body1" sx={{ mt: 2 }}>
					Description:{" "}
					{movie.overview ? movie.overview : "No description found"}
				</Typography>
			</Grid>
		</Grid>
	);
}
