import { AppBar, Container, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import AppHeader from "../components/AppHeader";

export default function DetailPageLayout() {
	return (
		<>
			<div>
				<AppHeader usedIn="detail" />
				{/* <AppBar
					color={"default"}
					elevation={4}
					position="fixed"
					sx={{ m: 0, background: "white" }}
				>
					{" "}
					<Toolbar>
						<Container
							sx={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
							}}
						>
							<p>Movie Details</p>

							<Link to="/">Home</Link>
						</Container>
					</Toolbar>
				</AppBar> */}
				<Container
					sx={{
						marginTop: "80px",
					}}
				>
					<Outlet />
				</Container>
			</div>
		</>
	);
}
