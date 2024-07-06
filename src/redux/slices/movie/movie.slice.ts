import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { movieApi } from '@/redux/services';
import { MovieDetailModel, MovieModel } from './movie.type';

export const topRatedMovieAdapter = createEntityAdapter<MovieModel>();
export const similarMovieAdapter = createEntityAdapter<MovieModel>();
export const movieDetailAdapter = createEntityAdapter<MovieDetailModel>();

const movieSlice = createSlice({
	name: 'movie',
	initialState: {
		topRatedMovie: topRatedMovieAdapter.getInitialState({
			totalPages: 0,
			totalResults: 0,
			page: 0,
		}),
		similarMovie: similarMovieAdapter.getInitialState({
			totalPages: 0,
			totalResults: 0,
			page: 0,
		}),
		movieDetail: movieDetailAdapter.getInitialState({
			selectedMovieId: '',
		}),
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addMatcher(
				movieApi.endpoints.fetchTopRatedMovie.matchFulfilled,
				(state, action) => {
					const { entities, totalPages, totalResults, page } = action.payload;

					state.topRatedMovie.totalPages = totalPages;
					state.topRatedMovie.totalResults = totalResults;
					state.topRatedMovie.page = page;

					const { movie = {} } = entities;

					topRatedMovieAdapter.setAll(state.topRatedMovie, movie);
				},
			)
			.addMatcher(
				movieApi.endpoints.fetchSimilarMovieById.matchFulfilled,
				(state, action) => {
					const { entities, totalPages, totalResults, page } = action.payload;

					state.similarMovie.totalPages = totalPages;
					state.similarMovie.totalResults = totalResults;
					state.similarMovie.page = page;

					const { movie = {} } = entities;

					similarMovieAdapter.setAll(state.similarMovie, movie);
				},
			)
			.addMatcher(
				movieApi.endpoints.fetchMovieDetailById.matchFulfilled,
				(state, action) => {
					const { movie = {} } = action.payload;

					movieDetailAdapter.upsertMany(state.movieDetail, movie);

					// ? We also need to store the current selected id application wide to communicate to components
					const { id } = action.meta.arg.originalArgs;

					if (!id) return;

					state.movieDetail.selectedMovieId = id;
				},
			);
	},
});

export const movieReducer = movieSlice.reducer;
