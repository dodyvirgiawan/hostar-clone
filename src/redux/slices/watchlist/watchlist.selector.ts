import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';

const selectWatchlist = (state: RootState) => state.watchlist;

export const selectAllWatchlists = createSelector(
	selectWatchlist,
	(watchlist) => watchlist.watchlists || [],
);
