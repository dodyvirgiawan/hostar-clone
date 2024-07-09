import { PageLayout } from '@/ui/layouts';
import styles from './home-main.module.scss';
import { CardCarousel } from '@/ui/components';
import { HomeMainProps } from './home-main.type';
import * as CW from '@/ui/components-wrapper';
import Head from 'next/head';
import { Meta } from '@/constants/meta';
import { useMemo } from 'react';
import * as H from '@/lib/hooks';

const HomeMain: React.FC<HomeMainProps> = (props) => {
	const {
		data: {
			topRatedMovieIds,
			topRatedTvSeriesIds,
			trendingMovieOfTheWeekIds,
			trendingTvSeriesOfTheWeekIds,
		},
	} = props;

	// ========== Get the current trending movie to display as a hero content
	const featuredTrendingMovieId = useMemo(() => {
		if (!trendingMovieOfTheWeekIds.length) return null;
		return Number(trendingMovieOfTheWeekIds[0]);
	}, [trendingMovieOfTheWeekIds]);

	const { loading } = H.usePopulateWatchlist();

	return (
		<>
			<Head>
				<title>{Meta.home.title}</title>

				<meta content={Meta.home.title} name="title" />
				<meta content={Meta.home.description} name="description" />
			</Head>

			<PageLayout>
				<div className={styles.homeMainRoot}>
					<CW.HeroContentMovieWrapper
						id={featuredTrendingMovieId}
						loadingButton={loading}
					/>

					<div className={styles.carouselContainer}>
						<CardCarousel title="Top Rated Movies & TV Series">
							{topRatedMovieIds.map((id) => {
								return (
									<div key={id} className={styles.cardWrapper}>
										<CW.CardMovieWrapper id={Number(id)} mediaType="movie" />
									</div>
								);
							})}

							{topRatedTvSeriesIds.map((id) => {
								return (
									<div key={id} className={styles.cardWrapper}>
										<CW.CardTvWrapper id={Number(id)} mediaType="tv" />
									</div>
								);
							})}
						</CardCarousel>

						<CardCarousel title="Top Rated Movie of The Week">
							{trendingMovieOfTheWeekIds.map((id) => {
								return (
									<div key={id} className={styles.cardWrapper}>
										<CW.CardMovieWrapper id={Number(id)} mediaType="movie" />
									</div>
								);
							})}
						</CardCarousel>

						<CardCarousel title="Top Rated TV Series of The Week">
							{trendingTvSeriesOfTheWeekIds.map((id) => {
								return (
									<div key={id} className={styles.cardWrapper}>
										<CW.CardTvWrapper id={Number(id)} mediaType="tv" />
									</div>
								);
							})}
						</CardCarousel>
					</div>
				</div>
			</PageLayout>
		</>
	);
};

export default HomeMain;
