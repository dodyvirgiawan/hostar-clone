import { discoverApi } from '@/redux/services';
import { wrapper } from '@/redux/store';
import { SearchMain } from '@/ui/pages/search';
import { GetServerSideProps } from 'next';

export interface SearchSSRProps {
	discoverMovieIds: string[];
	discoverTvSeriesIds: string[];
}

export const getServerSideProps = wrapper.getServerSideProps(
	(store) =>
		async ({ req, res }) => {
			// ========= 1. Discover movies =========
			await store.dispatch(
				discoverApi.endpoints.fetchDiscoverMovie.initiate({ page: 1 }),
			);

			const movieDiscoverState = store.getState().discover;
			const discoverMovieIds = movieDiscoverState.discoverMovieIds;

			// ========= 1. Discover TV serues =========
			await store.dispatch(
				discoverApi.endpoints.fetchDiscoverTv.initiate({ page: 1 }),
			);

			const tvSeriesDiscoverState = store.getState().discover;
			const discoverTvSeriesIds = tvSeriesDiscoverState.discoverTvIds;

			return {
				props: {
					discoverMovieIds,
					discoverTvSeriesIds,
				},
			};
		},
) satisfies GetServerSideProps<SearchSSRProps>;

const Search = ({ pageProps }: { pageProps: SearchSSRProps }) => {
	return <SearchMain data={pageProps} />;
};

export default Search;
