import { styled } from "@mui/material";
import PropTypes from "prop-types";

// styled image component to render the images in the app
const StyledImage = styled("img")(() => ({}));

export default function AppImage({
	src = "",
	alt = "",
	style,
	className = "",
	...props
}) {
	// if src is not null then render the image component
	if (src !== null)
		return (
			<StyledImage
				src={`https://image.tmdb.org/t/p/w200${src}`}
				alt={alt || "image"}
				style={style}
				className={className}
				{...props}
			/>
		);
	// else render the placeholder component
	return <div className="movie__card__poster__placeholder"></div>;
}

// the propTypes for the component
AppImage.propTypes = {
	src: PropTypes.string.isRequired,
	alt: PropTypes.string,
	style: PropTypes.object,
	className: PropTypes.string,
};
