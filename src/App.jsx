import { createBrowserRouter } from "react-router-dom";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import ErrorPage from "./components/error";
import IndexPage from "./routes";
import MoviePage from "./routes/movie";

const router = createBrowserRouter([
	{
		path: "/",
		element: <AppLayout />,
		errorElement: <ErrorPage />,
		children: [
			{
				errorElement: <ErrorPage />,
				children: [
					{
						index: true,
						element: <IndexPage />,
					},
					{
						path: ":movieId",
						element: <MoviePage />,
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
