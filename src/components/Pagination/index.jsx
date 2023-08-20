import { ArrowForward } from "@mui/icons-material";
import { ArrowBack } from "@mui/icons-material";
import { Box, Pagination, PaginationItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Form } from "react-router-dom";
import { PropTypes } from "prop-types";
export default function ListPagination({ totalPages, currentPage, q }) {
	const navigate = useNavigate();
	const handlePageChange = (e, value) => {
		if (q) {
			navigate(`/?q=${q}&page=${value}`);
		} else {
			navigate(`/?page=${value}`);
		}
	};
	return (
		<Box sx={{ py: 1, display: "flex", justifyContent: "center" }}>
			<Form>
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
