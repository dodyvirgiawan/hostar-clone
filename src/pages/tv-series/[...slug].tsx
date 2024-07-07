import { tvApi } from '@/redux/services';
import { TvModel } from '@/redux/slices';
import { wrapper } from '@/redux/store';
import { TvSeriesDetailMain } from '@/ui/pages/tv-series-detail';
import { GetServerSideProps } from 'next';

export interface TvDetailSSRProps {
	tvDetail: TvModel;
	tvRecommendationIds: string[];
}

export const getServerSideProps = wrapper.getServerSideProps(
	(store) =>
		async ({ req, res, params }) => {
			const { slug } = params as { slug: string[] };
			const tvId = slug[1];

			// ========= 1. Tv Detail =========
			await store.dispatch(
				tvApi.endpoints.fetchTvDetailById.initiate({
					id: tvId,
				}),
			);

			const tvStateEntities = store.getState().tv.entities;
			const tvDetail = tvStateEntities[tvId];

			// ========= 2. Tv Recommendations =========
			await store.dispatch(
				tvApi.endpoints.fetchSimilarTvById.initiate({
					id: tvId,
					page: 1,
				}),
			);

			const recommendedTvStateEntities = store.getState().tv.similarTv;
			const tvRecommendationIds = recommendedTvStateEntities.ids;

			return {
				props: {
					tvDetail: tvDetail,
					tvRecommendationIds,
				},
			};
		},
) satisfies GetServerSideProps<TvDetailSSRProps>;

const TvSeriesDetail = ({ pageProps }: { pageProps: TvDetailSSRProps }) => {
	return <TvSeriesDetailMain data={pageProps} />;
};

export default TvSeriesDetail;
