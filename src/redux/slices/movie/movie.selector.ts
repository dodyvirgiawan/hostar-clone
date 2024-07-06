import { RootState } from '@/redux/store';
import { createSelector } from '@reduxjs/toolkit';
import { movieAdapter } from './movie.slice';
import memoize from 'lodash/memoize';

const selectMovie = (state: RootState) => state.movie;

const { selectEntities, selectAll } = movieAdapter.getSelectors<RootState>(
	(state) => state.movie,
);

export const selectAllMovies = createSelector(selectAll, (movie) => movie);

export const selectAllTopRatedMovies = createSelector(
	selectMovie,
	(movie) => movie.topRatedMovie.ids,
);

export const selectAllSimilarMovies = createSelector(
	selectMovie,
	(movie) => movie.similarMovie.ids,
);

export const selectMovieById = memoize((movieId?: string) =>
	createSelector(
		selectEntities,
		(movieEntities) => movieEntities[movieId || ''] || null,
	),
);
