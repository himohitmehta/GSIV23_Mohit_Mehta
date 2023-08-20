import { AppBar, Toolbar, Container, Stack } from "@mui/material";
import SearchInput from "./SearchInput";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PropTypes from "prop-types";
import { ArrowBack } from "@mui/icons-material";
export default function AppHeader({ usedIn = "home" }) {
	return (
		<AppBar
			color={"default"}
			elevation={4}
			position="fixed"
			sx={{ m: 0, background: "white" }}
		>
			<Toolbar>
				<Container
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					{usedIn === "home" && <SearchInput />}
					{usedIn === "detail" && (
						<Stack
							direction="row"
							alignItems="center"
							sx={{
								"& .back-button": {
									mr: 2,
								},
							}}
						>
							<Link to="/" className="back-button">
								<ArrowBack />
							</Link>
							<p className="title">Movie Details</p>
						</Stack>
					)}
					<Link to="/">
						<HomeIcon />
					</Link>
				</Container>
			</Toolbar>
		</AppBar>
	);
}

AppHeader.propTypes = {
	usedIn: PropTypes.oneOf(["home", "detail"]),
};
