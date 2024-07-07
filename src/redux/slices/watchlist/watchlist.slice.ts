import { createSlice } from '@reduxjs/toolkit';
import { discoverApi } from '@/redux/services';
import * as T from './watchlist.type';

const watchlistInitialState: T.WatchlistInitialState = {
	watchlists: [],
};

const watchlistSlice = createSlice({
	name: 'watchlist',
	initialState: watchlistInitialState,
	reducers: {
		insertToWatchlist(state, { payload }) {
			const { id, mediaType } = payload;
			const currentWatchlists = state.watchlists;

			const isAlreadyInWatchlist = !!currentWatchlists.find(
				(item) => item.id === id && item.mediaType === mediaType,
			);

			if (isAlreadyInWatchlist) return;

			const newWatchlists = [payload, ...currentWatchlists];

			state.watchlists = newWatchlists;
		},
		removeFromWatchlist(state, { payload }) {
			const { id, mediaType } = payload;
			const currentWatchlists = state.watchlists;

			const newWatchlists = currentWatchlists.filter(
				(item) => item.id !== id && item.mediaType !== mediaType,
			);

			state.watchlists = newWatchlists;
		},
		resetWatchlist(state, { payload }) {
			state.watchlists = [];
		},
		setWatchlist(state, { payload }) {
			state.watchlists = payload;
		},
	},
});

export const {
	insertToWatchlist,
	removeFromWatchlist,
	resetWatchlist,
	setWatchlist,
} = watchlistSlice.actions;

export const watchlistReducer = watchlistSlice.reducer;
