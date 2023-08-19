import React from "react";
import PropTypes from "prop-types";
import AppImage from "./AppImage";
import { Link } from "react-router-dom";

export default function MovieCard({
	imgSrc,
	title,
	rating,
	releaseDate,
	overview,
	id,
}) {
	return (
		<div className="movies__card">
			<AppImage src={imgSrc} className="movie__card__poster" />
			<br />
			<Link to={id}> {title}</Link>
			<br />
			{overview}
			<br />
			{rating}
			<br />
			{releaseDate}
			<br />
		</div>
	);
}

MovieCard.propTypes = {
	imgSrc: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	rating: PropTypes.number.isRequired,
	releaseDate: PropTypes.string.isRequired,
	overview: PropTypes.string.isRequired,
	id: PropTypes.number.isRequired,
};
