import { Card, Skeleton } from "@mui/material";

export default function MovieCardSkeleton() {
	return (
		<Card>
			<div>
				<Skeleton
					height={360}
					sx={{
						mt: "-96px",
						// mb: "-16px",
					}}
				/>
			</div>
			<div style={{ padding: "8px" }}>
				<Skeleton height={24} sx={{ mt: "-64px" }} />
				<Skeleton height={20} />
				<Skeleton height={20} sx={{ mb: 2 }} />
			</div>
		</Card>
	);
}
