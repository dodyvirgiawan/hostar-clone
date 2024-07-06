import React from 'react';
import { HomeMain } from '@/ui/pages/home';
import { wrapper } from '@/redux/store';
import { movieApi, trendingApi, tvApi } from '@/redux/services';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { MovieModel, TvModel } from '@/redux/slices';

export interface HomeSSRProps {
	topRatedMoviesAndTvSeries: (MovieModel | TvModel)[];
	trendingMovieOfTheWeek: MovieModel[];
	trendingTvSeriesOfTheWeek: TvModel[];
}

export const getServerSideProps = wrapper.getServerSideProps(
	(store) =>
		async ({ req, res }) => {
			// ========= 1. Fetch top rated movies =========
			await store.dispatch(
				movieApi.endpoints.fetchTopRatedMovie.initiate({ page: 1 }),
			);

			const movieState = store.getState().movie;
			const topRatedMovieIds = movieState.topRatedMovie.ids;
			const movies = movieState.entities;

			const topRatedMovies = topRatedMovieIds.map((id) => movies[id]);

			// 2. ========= Fetch top rated tv series =========
			await store.dispatch(
				tvApi.endpoints.fetchTopRatedTv.initiate({ page: 1 }),
			);

			const tvState = store.getState().tv;
			const topRatedTvSeriesIds = tvState.topRatedTv.ids;
			const tvSeries = tvState.entities;

			const topRatedTvSeries = topRatedTvSeriesIds.map((id) => tvSeries[id]);

			// 3. ========= Fetch trending movie of the week =========
			await store.dispatch(
				trendingApi.endpoints.fetchTrendingMovie.initiate({
					time_window: 'week',
				}),
			);

			const newMovieState = store.getState().movie;
			const trendingMovieState = store.getState().trending;
			const trendingMovieIds = trendingMovieState.trendingMovieIds;
			const trendingMovies = newMovieState.entities;

			const trendingMovieOfTheWeek = trendingMovieIds.map(
				(id) => trendingMovies[id],
			);

			// 3. ========= Fetch trending tv series of the week =========
			await store.dispatch(
				trendingApi.endpoints.fetchTrendingTv.initiate({
					time_window: 'week',
				}),
			);

			const newTvSeriesState = store.getState().tv;
			const trendingTvSeriesState = store.getState().trending;
			const trendingTvSeriesIds = trendingTvSeriesState.trendingTvIds;
			const trendingTvSeries = newTvSeriesState.entities;

			const trendingTvSeriesOfTheWeek = trendingTvSeriesIds.map(
				(id) => trendingTvSeries[id],
			);

			return {
				props: {
					topRatedMoviesAndTvSeries: [...topRatedMovies, ...topRatedTvSeries],
					trendingMovieOfTheWeek,
					trendingTvSeriesOfTheWeek,
				},
			};
		},
) satisfies GetServerSideProps<HomeSSRProps>;

const Home = (
	props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
	return <HomeMain content={props} />;
};

export default Home;
