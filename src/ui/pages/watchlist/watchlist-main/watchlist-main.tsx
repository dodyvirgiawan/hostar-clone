import { PageLayout } from '@/ui/layouts';
import styles from './watchlist-main.module.scss';
import Head from 'next/head';
import { Meta } from '@/constants/meta';
import clsx from 'clsx';
import { useAppSelector } from '@/redux/store';
import { selectWatchlistsByTitle, Watchlist } from '@/redux/slices';
import { CardContent, CardGrid, RenderIf, SearchField } from '@/ui/components';
import { CardMovieWrapper, CardTvWrapper } from '@/ui/components-wrapper';
import { useDebounce, usePopulateWatchlist } from '@/lib/hooks';
import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/constants/icon';
import { useState } from 'react';

const WatchlistMain: React.FC = () => {
	const { loading } = usePopulateWatchlist();

	const [search, setSearch] = useState('');

	const debouncedSearch = useDebounce(search, 700); // ? We only want to search after user has not typed in 700ms

	const watchlists: Watchlist[] = useAppSelector(
		selectWatchlistsByTitle(debouncedSearch),
	);

	return (
		<>
			<Head>
				<title>{Meta.watchlist.title}</title>

				<meta content={Meta.watchlist.title} name="title" />
				<meta content={Meta.watchlist.description} name="description" />
			</Head>

			<PageLayout>
				<div className={styles.watchlistMainRoot}>
					<div className={styles.titleWrapper}>
						<h1 className={clsx('font-h1', styles.titleText)}>Watchlist</h1>
					</div>

					<div className={styles.searchFieldWrapper}>
						<SearchField
							value={search}
							onChange={setSearch}
							placeholder="Search your watchlist"
						/>
					</div>

					<div className={styles.cardGridWrapper}>
						<RenderIf isTrue={loading}>
							<CardGrid title="">
								{Array.from(Array(20).keys()).map((idx) => {
									return (
										<div key={idx} className={styles.cardWrapper}>
											<CardContent
												id={idx}
												backdropUrl=""
												mediaType="movie"
												overview=""
												posterUrl=""
												title=""
												loading
											/>
										</div>
									);
								})}
							</CardGrid>
						</RenderIf>

						<RenderIf isTrue={!loading}>
							<RenderIf isTrue={watchlists.length === 0}>
								<div className={styles.noResultContainer}>
									<div className={styles.noResultImageContainer}>
										<Image alt="Empty watchlist" src={Icon.NoResult} />
									</div>

									<h1 className={clsx(styles.noResultText, 'font-h1')}>
										No watchlist found
									</h1>

									<h2 className={clsx(styles.noResultDetailText, 'font-h2')}>
										Try{' '}
										<Link href="/search" passHref>
											<span className={styles.searchTextCTA}>searching</span>
										</Link>{' '}
										for content and adding it to your watchlist
									</h2>
								</div>
							</RenderIf>

							<RenderIf isTrue={watchlists.length > 0}>
								<CardGrid>
									{watchlists.map((item) => {
										if (item.mediaType === 'movie') {
											return (
												<div key={item.id} className={styles.cardWrapper}>
													<CardMovieWrapper
														id={Number(item.mediaId)}
														mediaType="movie"
													/>
												</div>
											);
										} else if (item.mediaType === 'tv') {
											return (
												<div key={item.id} className={styles.cardWrapper}>
													<CardTvWrapper
														id={Number(item.mediaId)}
														mediaType="tv"
													/>
												</div>
											);
										}

										return null;
									})}
								</CardGrid>
							</RenderIf>
						</RenderIf>
					</div>
				</div>
			</PageLayout>
		</>
	);
};

export default WatchlistMain;
