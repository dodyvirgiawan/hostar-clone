import React from 'react';

export interface CardMovieProps {
	id: number;
	title: string;
	overview: string;
	posterUrl: string;
	backdropUrl: string;
	isInWatchlist?: boolean;
	onAddToWatchlistClick?: () => void;
	onRemoveFromWatchlistClick?: () => void;
	buttonLoading?: boolean;
}
