import { movieApi } from '@/redux/services';
import * as R from '@/redux/slices';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

// https://redux.js.org/tutorials/essentials/part-7-rtk-query-basics#configuring-the-store
const reducer = combineReducers({
	[movieApi.reducerPath]: movieApi.reducer,
	movie: R.movieReducer,
});

export const configureStoreWithMiddlewares = () => {
	const enhancedStore = configureStore({
		reducer,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(movieApi.middleware),
	});

	return enhancedStore;
};

export const store = configureStoreWithMiddlewares();
