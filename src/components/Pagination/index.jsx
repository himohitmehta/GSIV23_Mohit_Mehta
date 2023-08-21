import { ArrowForward } from "@mui/icons-material";
import { ArrowBack } from "@mui/icons-material";
import { Box, Pagination, PaginationItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Form } from "react-router-dom";
import { PropTypes } from "prop-types";

// the List Pagination component
// prop types are:
// totalPages: the total number of pages
// currentPage: the current page
// q: the search query
export default function ListPagination({ totalPages, currentPage, q }) {
	const navigate = useNavigate();
	// handle the page change

	const handlePageChange = (e, value) => {
		// if the q parameter is not null then add it to the url
		if (q) {
			navigate(`/?q=${q}&page=${value}`);
		} else {
			// else navigate to the page
			navigate(`/?page=${value}`);
		}
	};
	return (
		<Box sx={{ py: 2, display: "flex", justifyContent: "center" }}>
			<Form>
				{/* the pagination component to handle pagination in the application */}
				<Pagination
					sx={{
						display: "flex",
					}}
					count={totalPages}
					variant="outlined"
					shape="rounded"
					page={Number(currentPage)}
					name="page"
					id="page"
					onChange={(event, value) => handlePageChange(event, value)}
					renderItem={(item) => (
						<PaginationItem
							slots={{
								previous: ArrowBack,
								next: ArrowForward,
							}}
							{...item}
						/>
					)}
				/>
			</Form>
		</Box>
	);
}

ListPagination.propTypes = {
	totalPages: PropTypes.number.isRequired,
	currentPage: PropTypes.number.isRequired,
	q: PropTypes.string,
};
