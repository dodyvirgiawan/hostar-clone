import { PageLayout } from '@/ui/layouts';
import styles from './search-main.module.scss';
import { SearchMainProps } from './search-main.type';
import { CardMovieWrapper, CardTvWrapper } from '@/ui/components-wrapper';
import Head from 'next/head';
import { Meta } from '@/constants/meta';
import { CardGrid } from '@/ui/components';

const SearchMain: React.FC<SearchMainProps> = (props) => {
	const { data } = props;

	const { discoverMovieIds, discoverTvSeriesIds } = data;

	return (
		<>
			<Head>
				<title>{Meta.search.title}</title>

				<meta content={Meta.search.title} name="title" />
				<meta content={Meta.search.description} name="description" />
			</Head>

			<PageLayout>
				<div className={styles.homeMainRoot}>
					<CardGrid title="Discover">
						{discoverMovieIds.map((id) => {
							return (
								<div key={id} className={styles.cardWrapper}>
									<CardMovieWrapper id={Number(id)} mediaType="movie" />
								</div>
							);
						})}

						{discoverTvSeriesIds.map((id) => {
							return (
								<div key={id} className={styles.cardWrapper}>
									<CardTvWrapper id={Number(id)} mediaType="tv" />
								</div>
							);
						})}
					</CardGrid>
				</div>
			</PageLayout>
		</>
	);
};

export default SearchMain;
