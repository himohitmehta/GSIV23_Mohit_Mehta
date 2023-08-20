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
import DetailPageLayout from "./layout/DetailPageLayout";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import { Provider } from "react-redux";
import { persistor, store } from "./store/configureStore";
import { PersistGate } from "redux-persist/integration/react";
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
		element: <DetailPageLayout />,
		loader: movieDetailsLoader,
		children: [
			{
				errorElement: <ErrorPage />,
				children: [
					{
						index: true,
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
			<Provider store={store}>
				<PersistGate persistor={persistor}>
					<ThemeProvider theme={theme}>
						<RouterProvider router={router} />
					</ThemeProvider>
				</PersistGate>
			</Provider>
		</>
	);
}

export default App;
