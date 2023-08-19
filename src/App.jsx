import { createBrowserRouter } from "react-router-dom";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import ErrorPage from "./components/error";
import IndexPage from "./routes";
import MoviePage from "./routes/movie";
import { loader as moviesLoader } from "./routes/index";
import { loader as movieDetailsLoader } from "./routes/movie";
import { loader as rootLoader } from "./layout/AppLayout";

const router = createBrowserRouter([
	{
		path: "/",
		element: <AppLayout />,
		errorElement: <ErrorPage />,
		loader: rootLoader,
		children: [
			{
				errorElement: <ErrorPage />,
				children: [
					{
						index: true,
						element: <IndexPage />,
						loader: moviesLoader,
					},
					{
						path: ":movieId",
						element: <MoviePage />,
						loader: movieDetailsLoader,
					},
				],
			},
		],
	},
]);

function App() {
	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

export default App;
