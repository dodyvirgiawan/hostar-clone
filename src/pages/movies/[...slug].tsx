import { movieApi } from '@/redux/services';
import { MovieModel } from '@/redux/slices';
import { wrapper } from '@/redux/store';
import { MovieDetailMain } from '@/ui/pages/movie-detail';
import { GetServerSideProps } from 'next';

export interface MovieDetailSSRProps {
	movieDetail: Omit<MovieModel, 'poster_path'>;
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
			const movieDetail: MovieModel = movieStateEntities[movieId];

			// ========= 2. Movie Recommendations =========
			await store.dispatch(
				movieApi.endpoints.fetchSimilarMovieById.initiate({
					id: movieId,
					page: 1,
				}),
			);

			const recommendedMovieStateEntities = store.getState().movie.similarMovie;
			const movieRecommendationIds = recommendedMovieStateEntities.ids;

			// ? We want to send essential data only to reduce size and improve performance
			const {
				id,
				backdrop_path,
				title,
				original_language,
				overview,
				release_date,
				runtime,
				...restMovieDetail
			} = movieDetail;

			return {
				props: {
					movieDetail: {
						id,
						backdrop_path,
						title,
						original_language,
						overview,
						release_date,
						runtime,
					},
					movieRecommendationIds,
				},
			};
		},
) satisfies GetServerSideProps<MovieDetailSSRProps>;

const MovieDetail = ({ pageProps }: { pageProps: MovieDetailSSRProps }) => {
	return <MovieDetailMain data={pageProps} />;
};

export default MovieDetail;
