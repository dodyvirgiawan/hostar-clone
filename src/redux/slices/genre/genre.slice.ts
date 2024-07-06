import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { movieApi } from '@/redux/services';
import { GenreModel } from './genre.type';

export const genreAdapter = createEntityAdapter<GenreModel>();

const genreSlice = createSlice({
	name: 'genre',
	initialState: genreAdapter.getInitialState({}),
	reducers: {},
	extraReducers: (builder) => {
		builder.addMatcher(
			movieApi.endpoints.fetchMovieDetailById.matchFulfilled,
			(state, action) => {
				const { genre = {} } = action.payload;

				genreAdapter.upsertMany(state, genre);
			},
		);
	},
});

export const genreReducer = genreSlice.reducer;
