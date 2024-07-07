export interface Watchlist {
	id: number;
	mediaType: 'movie' | 'tv';
}

export interface WatchlistInitialState {
	watchlists: Watchlist[];
}
