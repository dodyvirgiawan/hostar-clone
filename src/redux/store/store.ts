import {
	discoverApi,
	movieApi,
	searchApi,
	trendingApi,
	tvApi,
} from '@/redux/services';
import * as R from '@/redux/slices';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

// https://redux.js.org/tutorials/essentials/part-7-rtk-query-basics#configuring-the-store
const reducer = combineReducers({
	[movieApi.reducerPath]: movieApi.reducer,
	[tvApi.reducerPath]: tvApi.reducer,
	[trendingApi.reducerPath]: trendingApi.reducer,
	[discoverApi.reducerPath]: discoverApi.reducer,
	[searchApi.reducerPath]: searchApi.reducer,
	movie: R.movieReducer,
	tv: R.tvReducer,
	trending: R.trendingReducer,
	genre: R.genreReducer,
	episode: R.episodeReducer,
	season: R.seasonReducer,
	discover: R.discoverReducer,
	search: R.searchReducer,
});

export const configureStoreWithMiddlewares = () => {
	const enhancedStore = configureStore({
		reducer,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware()
				.concat(movieApi.middleware)
				.concat(tvApi.middleware)
				.concat(trendingApi.middleware)
				.concat(discoverApi.middleware)
				.concat(searchApi.middleware),
	});

	return enhancedStore;
};

export const store = configureStoreWithMiddlewares();
