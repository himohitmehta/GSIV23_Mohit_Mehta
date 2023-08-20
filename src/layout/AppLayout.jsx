import { Outlet } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import { Container } from "@mui/material";
export async function loader({ request }) {
	const url = new URL(request.url);
	const q = url.searchParams.get("q");
	// const movies = await getMovies(q);
	return { q };
}
export default function AppLayout() {
	// const { q } = useLoaderData();
	// const navigation = useNavigation();
	// const submit = useSubmit();
	// useEffect(() => {
	// 	document.getElementById("q").value = q;
	// }, [q]);
	// const searching =
	// 	navigation.location &&
	// 	new URLSearchParams(navigation.location.search).has("q");
	return (
		<>
			<div>
				{/* <div className="navbar">
					<Form id="search-form" role="search">
						<input
							id="q"
							aria-label="Search contacts"
							placeholder="Search"
							type="search"
							name="q"
							defaultValue={q}
							onChange={(event) => {
								const isFirstSearch = q == null;
								submit(event.currentTarget.form, {
									replace: !isFirstSearch,
								});
							}}
							className={searching ? "loading" : ""}
						/>
					</Form>
					<Link to="/">Home</Link>
				</div> */}
				<AppHeader usedIn="home" />
				<Container sx={{ pt: "64px" }}>
					<Outlet />
				</Container>
			</div>
		</>
	);
}
