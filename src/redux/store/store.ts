import { movieApi, trendingApi, tvApi } from '@/redux/services';
import * as R from '@/redux/slices';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

// https://redux.js.org/tutorials/essentials/part-7-rtk-query-basics#configuring-the-store
const reducer = combineReducers({
	[movieApi.reducerPath]: movieApi.reducer,
	[tvApi.reducerPath]: tvApi.reducer,
	[trendingApi.reducerPath]: trendingApi.reducer,
	movie: R.movieReducer,
	tv: R.tvReducer,
	trending: R.trendingReducer,
	genre: R.genreReducer,
	episode: R.episodeReducer,
	season: R.seasonReducer,
});

export const configureStoreWithMiddlewares = () => {
	const enhancedStore = configureStore({
		reducer,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware()
				.concat(movieApi.middleware)
				.concat(tvApi.middleware)
				.concat(trendingApi.middleware),
	});

	return enhancedStore;
};

export const store = configureStoreWithMiddlewares();
