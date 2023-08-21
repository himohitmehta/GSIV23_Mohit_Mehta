import { Grid } from "@mui/material";
import MovieCardSkeleton from "./MovieCardSkeleton";


// movie List skeleton component
// shown while the movie list is loading
export default function MoviesListSkelton() {
	return (
		<Grid container spacing={3}>
			{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
				<Grid item md={2.4} sm={4} xs={6} key={item}>
					<MovieCardSkeleton />
				</Grid>
			))}
		</Grid>
	);
}
