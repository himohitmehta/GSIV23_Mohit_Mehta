import { Outlet } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import { Container } from "@mui/material";
import { ScrollRestoration } from "react-router-dom";
import PropTypes from "prop-types";

//  the loader function to load the data from the request url, it return the q and page parameters from the url
export async function loader({ request }) {
	const url = new URL(request.url);
	const q = url.searchParams.get("q");
	const page = url.searchParams.get("page");
	// const movies = await getMovies(q);
	return { q, page };
}

//  the application layout component,
// it contains the app header and the outlet to render the child components
// the prop types are:
// usedIn: the page where the layout is used, allowed values are: home, detail
export default function AppLayout({ usedIn }) {
	return (
		<>
			<div>
				<AppHeader usedIn={usedIn} />
				<Container sx={{ pt: "80px" }}>
					<Outlet />
				</Container>
				<ScrollRestoration />
			</div>
		</>
	);
}

AppLayout.propTypes = {
	usedIn: PropTypes.string.isRequired,
};
