import { movieApi } from '@/redux/services';
import { MovieModel } from '@/redux/slices';
import { wrapper } from '@/redux/store';
import { MovieDetailMain } from '@/ui/pages/movie-detail';
import { GetServerSideProps } from 'next';

export interface MovieDetailSSRProps {
	movieDetail: MovieModel;
	movieRecommendationIds: string[];
}

export const getServerSideProps = wrapper.getServerSideProps(
	(store) =>
		async ({ req, res, params }) => {
			const { slug } = params as { slug: string[] };
			const movieId = slug[1];

			// ========= 1. Movie Detail =========
			await store.dispatch(
				movieApi.endpoints.fetchMovieDetailById.initiate({
					id: movieId,
					append_to_response: 'genres',
				}),
			);

			const movieStateEntities = store.getState().movie.entities;
			const movieDetail = movieStateEntities[movieId];

			// ========= 2. Movie Recommendations =========
			await store.dispatch(
				movieApi.endpoints.fetchSimilarMovieById.initiate({
					id: movieId,
					page: 1,
				}),
			);

			const recommendedMovieStateEntities = store.getState().movie.similarMovie;
			const movieRecommendationIds = recommendedMovieStateEntities.ids;

			return {
				props: {
					movieDetail: movieDetail,
					movieRecommendationIds,
				},
			};
		},
) satisfies GetServerSideProps<MovieDetailSSRProps>;

const Search = ({ pageProps }: { pageProps: MovieDetailSSRProps }) => {
	return <MovieDetailMain data={pageProps} />;
};

export default Search;
