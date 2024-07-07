import {
	discoverApi,
	movieApi,
	searchApi,
	trendingApi,
	tvApi,
} from '@/redux/services';
import * as R from '@/redux/slices';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { AppStore } from './store.type';

// https://redux.js.org/tutorials/essentials/part-7-rtk-query-basics#configuring-the-store
const combinedReducer = combineReducers({
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
	watchlist: R.watchlistReducer,
});

// ? https://github.com/kirill-konshin/next-redux-wrapper?tab=readme-ov-file#getserversideprops
// ? This is used to hydrate the server redux state into the client
const hydratedReducer = (state: any, action: any) => {
	if (action.type === HYDRATE) {
		const nextState = {
			...state, // use previous state
			...action.payload, // apply delta from hydration
		};

		return nextState;
	}
	return combinedReducer(state, action);
};

export const configureStoreWithMiddlewares = () => {
	const enhancedStore = configureStore({
		reducer: hydratedReducer,
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

// https://github.com/kirill-konshin/next-redux-wrapper#redux-toolkit
export const wrapper = createWrapper<AppStore>(configureStoreWithMiddlewares, {
	serializeState: (state) => JSON.stringify(state),
	deserializeState: (state) => JSON.parse(state),
});
