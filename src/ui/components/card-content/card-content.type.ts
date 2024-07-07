export interface CardContentProps {
	id: number;
	title: string;
	overview: string;
	posterUrl: string;
	backdropUrl: string;
	mediaType: 'tv' | 'movie';
	isInWatchlist?: boolean;
	onAddToWatchlistClick?: () => void;
	onRemoveFromWatchlistClick?: () => void;
	buttonLoading?: boolean;
	loading?: boolean;
}
