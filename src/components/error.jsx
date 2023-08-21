import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useRouteError } from "react-router-dom";

// the error page component to show the error message when an error occurs.
export default function ErrorPage() {
	const error = useRouteError();
	console.error(error);

	return (
		<Box
			sx={{
				display: "grid",
				placeItems: "center",
				height: "60vh",
			}}
			id="error-page"
		>
			<div>
				<h1>Oops!</h1>
				<p>Sorry, an unexpected error has occurred.</p>
				<p>
					<i>{error.statusText || error.message}</i>
				</p>
				<Link to="/">Go to Home page</Link>
			</div>
		</Box>
	);
}
