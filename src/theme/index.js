import { createTheme } from "@mui/material";

const theme = createTheme({
	typography: "Inter, sans-serif",
	palette: {
		mode: "light",
		green: "#00BFA6",
		amber: "#fbbc04",
		red: "#cf3721",
		blue: "#4285f4",
		orange: "#f25c00",
		orchid: "#AC69B0",
		gray: "#4a4a4a",
		lightGray: "#9b9b9b",
		disabled: "#dfdfdf",
        text:{
            primary: "#4a4a4a",
        }
	},
	breakpoints: {
		xs: "512px",
		sm: "768px",
		md: "1024px",
	},
});

export default theme;
