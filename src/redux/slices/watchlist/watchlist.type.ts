export interface Watchlist {
	id: string;
	mediaId: number;
	mediaType: 'movie' | 'tv';
}

export interface WatchlistInitialState {
	watchlists: Watchlist[];
}
