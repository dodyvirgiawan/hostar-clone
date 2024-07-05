import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { movieApi } from '@/redux/services';
import { MovieModel } from './movie.type';

export const topRatedMovieAdapter = createEntityAdapter<MovieModel>();
export const similarMovieAdapter = createEntityAdapter<MovieModel>();

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
			);
	},
});

export const movieReducer = movieSlice.reducer;
