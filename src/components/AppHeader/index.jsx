import { AppBar, Toolbar, Container, Stack, IconButton } from "@mui/material";
import SearchInput from "./SearchInput";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PropTypes from "prop-types";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

// the app header component to handle the app navigation and search
export default function AppHeader({ usedIn = "home" }) {
	// react router hook to navigate in the application
	const navigate = useNavigate();

	// handle the back button click to navigate to the previous page
	const handleBackButton = () => {
		navigate(-1);
	};
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
					{/* check if the AppHeader is used in home page or movie detail page
					then render the appropriate component
					*/}
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
							<IconButton
								onClick={handleBackButton}
								className="back-button"
							>
								<ArrowBack />
							</IconButton>
							<p className="title">Movie Details</p>
						</Stack>
					)}
					{/* the link to home page */}
					<Link to="/">
						<HomeIcon />
					</Link>
				</Container>
			</Toolbar>
		</AppBar>
	);
}
// prop types for the AppHeader component
AppHeader.propTypes = {
	usedIn: PropTypes.oneOf(["home", "detail"]),
};
