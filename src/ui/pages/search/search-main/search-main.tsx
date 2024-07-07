import { PageLayout } from '@/ui/layouts';
import styles from './search-main.module.scss';
import { SearchMainProps } from './search-main.type';
import { CardMovieWrapper, CardTvWrapper } from '@/ui/components-wrapper';
import Head from 'next/head';
import { Meta } from '@/constants/meta';
import { CardContent, CardGrid, SearchField } from '@/ui/components';
import { useState } from 'react';

const SearchMain: React.FC<SearchMainProps> = (props) => {
	const { data } = props;

	const { discoverMovieIds, discoverTvSeriesIds } = data;

	const [search, setSearch] = useState('');

	return (
		<>
			<Head>
				<title>{Meta.search.title}</title>

				<meta content={Meta.search.title} name="title" />
				<meta content={Meta.search.description} name="description" />
			</Head>

			<PageLayout>
				<div className={styles.searchMainRoot}>
					<div className={styles.searchFieldWrapper}>
						<SearchField
							value={search}
							onChange={setSearch}
							placeholder="Movies, shows and more"
						/>
					</div>

					<div className={styles.cardGridWrapper}>
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

							{/* <div key="haha" className={styles.cardWrapper}>
								<CardContent
									id={1}
									backdropUrl=""
									mediaType="movie"
									overview=""
									posterUrl=""
									title=""
									loading
								/>
							</div> */}
						</CardGrid>
					</div>
				</div>
			</PageLayout>
		</>
	);
};

export default SearchMain;
