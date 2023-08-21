import PropTypes from "prop-types";
import AppImage from "./AppImage";
import { Link } from "react-router-dom";
import { Box, Card, Typography } from "@mui/material";

const styles = {
	height: "100%",
	"& .movie__card__poster": {
		width: "100%",
		objectFit: "cover",
	},
	"& .overview": {
		overflow: "hidden",
		lineClamp: "2 !important",
		display: "-webkit-box",
		WebkitLineClamp: "2 !important",
		WebkitBoxOrient: "vertical",
	},
	"& .title": {
		overflow: "hidden",
		lineClamp: "1 !important",
		display: "-webkit-box",
		WebkitLineClamp: "1 !important",
		WebkitBoxOrient: "vertical",
		color: (theme) => theme.palette.gray,
		fontWeight: 600,
		// mt: 1,
	},
	"& .row": {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		mt: 1,
	},
};

export default function MovieCard({ imgSrc, title, rating, overview, id }) {
	return (
		<Link to={`/${id}`}>
			<Card sx={{ ...styles }} elevation={8}>
				<AppImage src={imgSrc} className="movie__card__poster" />
				<Box sx={{ px: 1 }} className="">
					<div className="row">
						<Typography className="title "> {title}</Typography>
						<span>({rating})</span>
					</div>

					<p className="overview ">{overview}</p>
				</Box>
			</Card>
		</Link>
	);
}

MovieCard.propTypes = {
	imgSrc: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	rating: PropTypes.number.isRequired,
	overview: PropTypes.string.isRequired,
	id: PropTypes.number.isRequired,
};
