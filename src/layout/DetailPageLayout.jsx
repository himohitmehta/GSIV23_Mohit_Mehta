import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

export default function DetailPageLayout() {
	return (
		<>
			<div>
				<div className="navbar">
					<h3>Movie Details</h3>

					<Link to="/">Home</Link>
				</div>
				<div className="container">
					<Outlet />
				</div>
			</div>
		</>
	);
}
