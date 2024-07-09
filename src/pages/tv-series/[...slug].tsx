import { tvApi } from '@/redux/services';
import { TvModel } from '@/redux/slices';
import { wrapper } from '@/redux/store';
import { TvSeriesDetailMain } from '@/ui/pages/tv-series-detail';
import { GetServerSideProps } from 'next';

export interface TvDetailSSRProps {
	tvDetail: Omit<TvModel, 'poster_path' | 'seasons'>;
	tvRecommendationIds: string[];
}

/**
 *  ? Tv Detail Detail Page
 * 	?	- SSR Content:
 * 	?			[1] The detail of the TV Series
 * 	?			[2] ONLY the episodes in first season
 * 	?						-> Because in the client it is rendered as tabs, and the first season is the opened tab by default.
 *  ?						-> For the rest of the seasons, user might not open them, so it will be fetched on demand in client-side
 * 	?						-> This is also to reduce size
 * 	?			[3] List of similar/recommended TV series
 * 	?						-> Although this is also not visible by default (as the default opened tab is list of Seasons), I still want it to be SSR'd as it only store the string of tv series Ids
 *  ?						-> In my opinion, it doesn't impact the payload size that much, and user will have the content faster when they open the tab.
 *  ?
 * 	? - NoSSR Content:
 * 	?     [1] Other episodes in other season
 * 	?						-> Because user might not open them
 * 	?
 * 	?
 * 	? * Notes: Based on my experience consuming TMDB API, the first season is usually "Specials" season and contains many episodes (and therefore large object).
 * 	?					I don't include this "Specials" season because I'm assuming the relevant content user want to see is the actual episodes.
 */
export const getServerSideProps = wrapper.getServerSideProps(
	(store) =>
		async ({ params }) => {
			const { slug } = params as { slug: string[] };
			const tvId = slug[1];

			// ========= 1. Tv Detail =========
			await store.dispatch(
				tvApi.endpoints.fetchTvDetailById.initiate({
					id: tvId,
				}),
			);

			const tvStateEntities = store.getState().tv.entities;
			const tvDetail: TvModel = tvStateEntities[tvId];

			// ========= 2. Tv Recommendations =========
			await store.dispatch(
				tvApi.endpoints.fetchSimilarTvById.initiate({
					id: tvId,
					page: 1,
				}),
			);

			const recommendedTvStateEntities = store.getState().tv.similarTv;
			const tvRecommendationIds = recommendedTvStateEntities.ids;

			// ========= 3. Populate episodes of the first season ========
			// ? We need to pre fetch and populate the first episode selection
			// ? Because it will be rendered, the other season will be fetched on demand
			// ? because user might not open them.
			const seasonEntities = store.getState().season.entities;

			// ? We don't include season 0 / specials (due to it is usually too large)
			const totalSeasons = tvDetail.seasons.length;
			const firstTvSeasonId =
				totalSeasons > 1 ? tvDetail.seasons[1] : tvDetail.seasons[0];

			const firstSeasonDetail = seasonEntities[firstTvSeasonId];

			await store.dispatch(
				tvApi.endpoints.fetchTvSeasonDetail.initiate({
					series_id: tvId,
					season_number: firstSeasonDetail.season_number,
				}),
			);

			// ? We want to send essential data only to reduce size and improve performance
			const {
				id,
				backdrop_path,
				first_air_date,
				name,
				original_language,
				overview,
			} = tvDetail;

			return {
				props: {
					tvDetail: {
						id,
						backdrop_path,
						first_air_date,
						name,
						original_language,
						overview,
					},
					tvRecommendationIds,
				},
			};
		},
) satisfies GetServerSideProps<TvDetailSSRProps>;

const TvSeriesDetail = ({ pageProps }: { pageProps: TvDetailSSRProps }) => {
	return <TvSeriesDetailMain data={pageProps} />;
};

export default TvSeriesDetail;
