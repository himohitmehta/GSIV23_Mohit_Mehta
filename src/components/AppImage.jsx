import PropTypes from "prop-types";

export default function AppImage({
	src = "",
	alt = "",
	style,
	className = "",
	...props
}) {
	if (src !== null)
		return (
			<img
				src={`https://image.tmdb.org/t/p/w200${src}`}
				alt={alt || "image"}
				style={style}
				className={className}
				{...props}
			/>
		);
	return <div className="movie__card__poster__placeholder"></div>;
}

AppImage.propTypes = {
	src: PropTypes.string.isRequired,
	alt: PropTypes.string,
	style: PropTypes.object,
	className: PropTypes.string,
};
