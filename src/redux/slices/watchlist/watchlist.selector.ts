import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';
import { MovieModel, selectMovieEntities } from '@/redux/slices/movie';
import { TvModel, selectTvEntities } from '@/redux/slices/tv';
import { Watchlist } from './watchlist.type';
import { memoize } from 'lodash';

const selectWatchlist = (state: RootState) => state.watchlist;

export const selectAllWatchlists = createSelector(
	selectWatchlist,
	(watchlist) => watchlist.watchlists || [],
);

export const selectWatchlistsContent = createSelector(
	[selectMovieEntities, selectTvEntities, selectAllWatchlists],
	(movieData, tvData, watchlist: Watchlist[]) => {
		const watchlistContent = watchlist.map((item) => {
			if (item.mediaType === 'movie') {
				return movieData[Number(item.mediaId)];
			}

			if (item.mediaType === 'tv') {
				return tvData[Number(item.mediaId)];
			}
		});

		const filteredWatchlist = watchlistContent.filter((item) => !!item);

		return filteredWatchlist;
	},
);

export const selectWatchlistsByTitle = memoize((title?: string) =>
	createSelector(
		[selectAllWatchlists, selectWatchlistsContent],
		(watchlists, watchlistData) => {
			if (!title) return watchlists;

			const filteredWatchlist = watchlistData.filter((item: any) => {
				if (item?.title) {
					const movieTitle = (item as MovieModel).title;

					return movieTitle.toLowerCase().includes(title);
				}

				if (item?.name) {
					const tvTitle = (item as TvModel).name as TvModel['name'];

					return tvTitle.toLowerCase().includes(title);
				}

				return false;
			});

			const translatedWatchlist = filteredWatchlist.map((item: any) => {
				if (item?.title) {
					const movieId = (item as MovieModel).id;

					return watchlists.find(
						(item: Watchlist) => item.id === `movie${movieId}`,
					);
				}
				if (item?.title) {
					const tvId = (item as TvModel).id;

					return watchlists.find(
						(item: Watchlist) => item.id === `movie${tvId}`,
					);
				}
			});

			return translatedWatchlist;
		},
	),
);
