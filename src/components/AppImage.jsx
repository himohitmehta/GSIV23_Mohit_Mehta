import PropTypes from "prop-types";

export default function AppImage({
	src = "",
	alt = "",
	style,
	className = "",
	...props
}) {
	return (
		<img
			src={`https://image.tmdb.org/t/p/original${src}`}
			alt={alt}
			style={style}
			className={className}
			{...props}
		/>
	);
}

AppImage.propTypes = {
	src: PropTypes.string.isRequired,
	alt: PropTypes.string.isRequired,
	style: PropTypes.object,
	className: PropTypes.string,
};
