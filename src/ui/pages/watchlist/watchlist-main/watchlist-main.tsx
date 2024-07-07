import { PageLayout } from '@/ui/layouts';
import styles from './watchlist-main.module.scss';
import Head from 'next/head';
import { Meta } from '@/constants/meta';
import clsx from 'clsx';
import { useAppSelector } from '@/redux/store';
import { selectAllWatchlists, Watchlist } from '@/redux/slices';
import { CardGrid } from '@/ui/components';
import { CardMovieWrapper, CardTvWrapper } from '@/ui/components-wrapper';
import { usePopulateWatchlist } from '@/lib/hooks';

const WatchlistMain: React.FC = () => {
	const watchlists: Watchlist[] = useAppSelector(selectAllWatchlists);

	usePopulateWatchlist();

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

					<div className={styles.cardGridWrapper}>
						<CardGrid>
							{watchlists.map((item) => {
								console.log(item);

								if (item.mediaType === 'movie') {
									return (
										<div key={item.id} className={styles.cardWrapper}>
											<CardMovieWrapper
												id={Number(item.id)}
												mediaType="movie"
											/>
										</div>
									);
								} else if (item.mediaType === 'tv') {
									return (
										<div key={item.id} className={styles.cardWrapper}>
											<CardTvWrapper id={Number(item.id)} mediaType="tv" />
										</div>
									);
								}

								return null;
							})}
						</CardGrid>
					</div>
				</div>
			</PageLayout>
		</>
	);
};

export default WatchlistMain;
