/* eslint-disable react-refresh/only-export-components */
import { getMovieCast, getMovieDetails } from "../lib/movies.utils";
import AppImage from "../components/AppImage";
import { Button, Grid, Skeleton, Typography } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setMovieDetails } from "../store/movies/moviesSlice";
import MovieDetailSkeleton from "../components/Skeletons/MovieDetailSkeleton";

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

const mapState = ({ movies }) => ({
	movie: movies.movieDetails,
});

export default function MoviePage() {
	const { movie } = useSelector(mapState);

	const dispatch = useDispatch();
	const params = useParams();
	const movieId = params.movieId;
	console.log({
		movie,
		params,
	});
	const [cast, setCast] = useState([]);
	const [director, setDirector] = useState([]);
	const [showMore, setShowMore] = useState(true);
	const [isPageLoading, setIsPageLoading] = useState(true);
	const [isActorsLoading, setIsActorsLoading] = useState(true);
	const handleClickShowMore = () => {
		setShowMore(!showMore);
		console.log({ showMore });
	};

	const actors = Array.isArray(cast) && showMore ? cast.slice(0, 10) : cast;
	const handleFetchMovieDetails = () => {
		setIsPageLoading(true);
		getMovieDetails(params.movieId)
			.then((json) => {
				console.log({ movie: json });
				setIsPageLoading(false);
				dispatch(setMovieDetails(json));
				handleFetchMovieCast(json);
			})
			.catch((error) => console.error(error));
	};
	const handleFetchMovieCast = (movie) => {
		setIsActorsLoading(true);
		getMovieCast(movie.id)
			.then((json) => {
				setIsActorsLoading(false);
				console.log({ cast: json });
				setCast(json.cast);
				const director = json.crew.find(
					(item) => item.job === "Director",
				);
				setDirector(director);
				console.log({ director });
			})
			.catch((error) => console.log({ error }));
	};
	useEffect(() => {
		handleFetchMovieDetails();
	}, [movieId]);

	if (isPageLoading) {
		return <MovieDetailSkeleton />;
	}
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
					{movie.release_date} | {Math.floor(movie.runtime / 60)} hour{" "}
					{movie.runtime % 60} min | {director.name}{" "}
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
					Description: {movie.overview}
				</Typography>
			</Grid>
		</Grid>
	);
}
