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
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import { Provider } from "react-redux";
import { persistor, store } from "./store/configureStore";
import { PersistGate } from "redux-persist/integration/react";

//  the router to handle the routes
const router = createBrowserRouter([
	{
		path: "/",
		element: <AppLayout usedIn={"home"} />,
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
					// {
					// 	path: ":movieId",
					// 	element: <MoviePage />,
					// 	loader: movieDetailsLoader,
					// },
				],
			},
		],
	},
	{
		path: "/:movieId",
		element: <AppLayout usedIn={"detail"} />,
		// loader: movieDetailsLoader,
		children: [
			{
				errorElement: <ErrorPage />,
				children: [
					{
						index: true,
						element: <MoviePage />,
						// loader: movieDetailsLoader,
					},
				],
			},
		],
	},
]);

// The App Component that will be rendered
function App() {
	return (
		<>
			{/* Redux provider */}
			<Provider store={store}>
				{/* Persistor to persist the redux state */}
				<PersistGate persistor={persistor}>
					{/* mui theme provider to setup the theme */}
					<ThemeProvider theme={theme}>
						{/* The router provider for handling all routes in the app */}
						<RouterProvider router={router} />
					</ThemeProvider>
				</PersistGate>
			</Provider>
		</>
	);
}

export default App;
