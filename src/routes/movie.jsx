/* eslint-disable react-refresh/only-export-components */
import { useLoaderData } from "react-router-dom";
import { getMovieCast, getMovieDetails } from "../lib/movies.utils";
import AppImage from "../components/AppImage";
import { Button, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";

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

/**
 * 
 * {
    "adult": false,
    "backdrop_path": "/rRcNmiH55Tz0ugUsDUGmj8Bsa4V.jpg",
    "belongs_to_collection": null,
    "budget": 45000000,
    "genres": [
        {
            "id": 35,
            "name": "Comedy"
        },
        {
            "id": 10749,
            "name": "Romance"
        }
    ],
    "homepage": "https://www.nohardfeelingsmovie.com",
    "id": 884605,
    "imdb_id": "tt15671028",
    "original_language": "en",
    "original_title": "No Hard Feelings",
    "overview": "On the brink of losing her childhood home, Maddie discovers an intriguing job listing: wealthy helicopter parents looking for someone to “date” their introverted 19-year-old son, Percy, before he leaves for college. To her surprise, Maddie soon discovers the awkward Percy is no sure thing.",
    "popularity": 1812.181,
    "poster_path": "/4K7gQjD19CDEPd7A9KZwr2D9Nco.jpg",
    "production_companies": [
        {
            "id": 117188,
            "logo_path": null,
            "name": "Excellent Cadaver",
            "origin_country": "US"
        },
        {
            "id": 86647,
            "logo_path": null,
            "name": "Odenkirk Provissiero Entertainment",
            "origin_country": "US"
        },
        {
            "id": 5,
            "logo_path": "/2I2kWmd0GCZaxaRu8DVcP2xD861.png",
            "name": "Columbia Pictures",
            "origin_country": "US"
        }
    ],
    "production_countries": [
        {
            "iso_3166_1": "US",
            "name": "United States of America"
        }
    ],
    "release_date": "2023-06-15",
    "revenue": 82995526,
    "runtime": 104,
    "spoken_languages": [
        {
            "english_name": "English",
            "iso_639_1": "en",
            "name": "English"
        }
    ],
    "status": "Released",
    "tagline": "Pretty. Awkward.",
    "title": "No Hard Feelings",
    "video": false,
    "vote_average": 7.1,
    "vote_count": 669
}
 */
export default function MoviePage() {
	const { movie } = useLoaderData();
	console.log({
		movie,
	});
	const [cast, setCast] = useState([]);
	const [director, setDirector] = useState([]);
	const [showMore, setShowMore] = useState(true);
	const handleClickShowMore = () => {
		setShowMore(!showMore);
		console.log({ showMore });
	};

	const actors = Array.isArray(cast) && showMore ? cast.slice(0, 10) : cast;
	useEffect(() => {
		if (movie) {
			getMovieCast(movie.id)
				.then((json) => {
					console.log({ cast: json });
					setCast(json.cast);
					const director = json.crew.find(
						(item) => item.job === "Director",
					);
					setDirector(director);
					console.log({ director });
				})
				.catch((error) => console.log({ error }));
		}
	}, [movie]);
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
				<Typography variant="body1" sx={{ mt: 1 }}>
					<b>Cast:</b>
					{Array.isArray(actors) &&
						actors
							// .slice(0, 10)
							.map((item) => item.name)
							.join(", ")}
					{Array.isArray(cast) && cast.length > 10 && (
						<Button
							sx={{
								color: (theme) => theme.palette.blue,
								textTransform: "none",
								p: 0,
								px: 0,
								ml: 1,
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
				<Typography variant="body1" sx={{ mt: 2 }}>
					Description: {movie.overview}
				</Typography>
			</Grid>
		</Grid>
	);
}
