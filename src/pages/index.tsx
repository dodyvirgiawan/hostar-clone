import React from 'react';
import { HomeMain } from '@/ui/pages/home';
import { wrapper } from '@/redux/store';
import { movieApi, trendingApi, tvApi } from '@/redux/services';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

export interface HomeSSRProps {
	topRatedMovieIds: string[];
	topRatedTvSeriesIds: string[];
	trendingMovieOfTheWeekIds: string[];
	trendingTvSeriesOfTheWeekIds: string[];
}

// ? If i pass all the movie and tv series object via server, it is around ~150kb, which is higher than threshold.
// ? https://nextjs.org/docs/messages/large-page-data
// ? Therefore I only pass the normalized id, and get the required data in client side (the normalized entities is hydrated using next-redux-wrapper, so no need to refetch)
export const getServerSideProps = wrapper.getServerSideProps(
	(store) =>
		async ({ req, res }) => {
			// ========= 1. Fetch top rated movies =========
			await store.dispatch(
				movieApi.endpoints.fetchTopRatedMovie.initiate({ page: 1 }),
			);

			const movieState = store.getState().movie;
			const topRatedMovieIds = movieState.topRatedMovie.ids;

			// 2. ========= Fetch top rated tv series =========
			await store.dispatch(
				tvApi.endpoints.fetchTopRatedTv.initiate({ page: 1 }),
			);

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

const Home = (
	props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
	return <HomeMain data={props} />;
};

export default Home;
