import React from 'react';

export interface CardMovieProps {
	title: string;
	overview: string;
	posterUrl: string;
	backdropUrl: string;
	isInWatchlist?: boolean;
	onWatchlistClick?: () => void;
}
