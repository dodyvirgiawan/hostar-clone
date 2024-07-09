import React from 'react';
import { HomeMain } from '@/ui/pages/home';
import { wrapper } from '@/redux/store';
import { movieApi, trendingApi, tvApi } from '@/redux/services';
import { GetServerSideProps } from 'next';

export interface HomeSSRProps {
	topRatedMovieIds: string[];
	topRatedTvSeriesIds: string[];
	trendingMovieOfTheWeekIds: string[];
	trendingTvSeriesOfTheWeekIds: string[];
}

/**
 *  ? Home Page
 * 	?	- SSR Content:
 * 	?			[1] Top Rated Movies
 * 	?			[2] Top Rated TV Series
 * 	?			[3] Trending Movies (time_window: week)
 * 	?			[4] Trending TV Series (time_window: week)
 *  ?
 *  ? - NoSSR Content:
 * 	?     n/a
 *	?
 *  ? Note: The recommended max page data size for SSR is 128kb. (https://nextjs.org/docs/messages/large-page-data). If I send them all raw, it reduces performance.
 * 	?					Therefore I only include normalized contents to its string of IDs, and will populate on client when state is hydrated.
 * 	?
 */

export const getServerSideProps = wrapper.getServerSideProps(
	(store) => async () => {
		// ========= 1. Fetch top rated movies =========
		await store.dispatch(
			movieApi.endpoints.fetchTopRatedMovie.initiate({ page: 1 }),
		);

		const movieState = store.getState().movie;
		const topRatedMovieIds = movieState.topRatedMovie.ids;

		// 2. ========= Fetch top rated tv series =========
		await store.dispatch(tvApi.endpoints.fetchTopRatedTv.initiate({ page: 1 }));

		const tvState = store.getState().tv;
		const topRatedTvSeriesIds = tvState.topRatedTv.ids;

		// 3. ========= Fetch trending movie of the week =========
		await store.dispatch(
			trendingApi.endpoints.fetchTrendingMovie.initiate({
				time_window: 'week',
			}),
		);

		const trendingMovieState = store.getState().trending;
		const trendingMovieOfTheWeekIds = trendingMovieState.trendingMovieIds;

		// 3. ========= Fetch trending tv series of the week =========
		await store.dispatch(
			trendingApi.endpoints.fetchTrendingTv.initiate({
				time_window: 'week',
			}),
		);

		const trendingTvSeriesState = store.getState().trending;
		const trendingTvSeriesOfTheWeekIds = trendingTvSeriesState.trendingTvIds;

		return {
			props: {
				topRatedMovieIds,
				topRatedTvSeriesIds,
				trendingMovieOfTheWeekIds,
				trendingTvSeriesOfTheWeekIds,
			},
		};
	},
) satisfies GetServerSideProps<HomeSSRProps>;

const Home = ({ pageProps }: { pageProps: HomeSSRProps }) => {
	return <HomeMain data={pageProps} />;
};

export default Home;
