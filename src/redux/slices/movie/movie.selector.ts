import { RootState } from '@/redux/store';
import { createSelector } from '@reduxjs/toolkit';
import {
	movieDetailAdapter,
	similarMovieAdapter,
	topRatedMovieAdapter,
} from './movie.slice';
import memoize from 'lodash/memoize';

// =============== TOP RATED MOVIES SELECTORS ===============

const {
	selectEntities: selectTopRatedMovieEntities,
	selectAll: selectAllTopRatedMovie,
} = topRatedMovieAdapter.getSelectors<RootState>(
	(state) => state.movie.topRatedMovie,
);

export const selectAllTopRatedMovies = createSelector(
	selectAllTopRatedMovie,
	(topRatedMovies) => topRatedMovies,
);

export const selectTopRatedMovieById = memoize((movieId?: string) =>
	createSelector(
		selectTopRatedMovieEntities,
		(topRatedMovieEntities) => topRatedMovieEntities[movieId || ''] || null,
	),
);

// =============== SIMILAR MOVIES SELECTORS ===============

const {
	selectEntities: selectSimilarMovieEntities,
	selectAll: selectAllSimilarMovie,
} = similarMovieAdapter.getSelectors<RootState>(
	(state) => state.movie.similarMovie,
);

export const selectAllSimilarMovies = createSelector(
	selectAllSimilarMovie,
	(similarMovies) => similarMovies,
);

export const selectSimilarMovieById = memoize((movieId?: string) =>
	createSelector(
		selectSimilarMovieEntities,
		(similarMovieEntities) => similarMovieEntities[movieId || ''] || null,
	),
);

// =============== MOVIE DETAIL SELECTORS ===============

const {
	selectEntities: selectMovieDetailEntities,
	selectAll: selectAllMovieDetail,
} = movieDetailAdapter.getSelectors<RootState>(
	(state) => state.movie.movieDetail,
);

export const selectAllMovieDetails = createSelector(
	selectAllMovieDetail,
	(movieDetails) => movieDetails,
);

export const selectMovieDetailById = memoize((movieId?: string) =>
	createSelector(
		selectMovieDetailEntities,
		(movieDetailEntities) => movieDetailEntities[movieId || ''] || null,
	),
);
