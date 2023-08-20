import { Grid, Skeleton } from "@mui/material";

export default function MovieDetailSkeleton() {
	return (
		<Grid container spacing={3} alignItems={"flex-start"}>
			<Grid item md={3} sm={5} xs={12}>
				<Skeleton
					sx={{
						mt: "-96px",
					}}
					height={480}
				/>
			</Grid>
			<Grid item md={9} sm={7} xs={12}>
				<Skeleton variant="rounded" height={40} />
				<div
					style={{
						display: "flex",
						paddingBottom: "20px",
						paddingTop: "24px",
					}}
				>
					{[1, 2, 3].map((i) => (
						<Skeleton
							sx={{ mt: 1, width: "120px", mr: 2 }}
							height={24}
							variant="rounded"
							key={i}
						/>
					))}
				</div>
				{[11, 12, 13].map((item) => (
					<Skeleton
						key={item}
						variant="rounded"
						sx={{ mb: 4 }}
						height={40}
					/>
				))}
			</Grid>
		</Grid>
	);
}
