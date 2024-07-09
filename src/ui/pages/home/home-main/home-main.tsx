import { PageLayout } from '@/ui/layouts';
import styles from './home-main.module.scss';
import { CardCarousel } from '@/ui/components';
import { HomeMainProps } from './home-main.type';
import * as CW from '@/ui/components-wrapper';
import Head from 'next/head';
import { Meta } from '@/constants/meta';
import { useEffect, useMemo, useState } from 'react';
import * as H from '@/lib/hooks';

const maxMovieHeading = 3;
const maxTvHeading = 2;
const duration = 5000;

const HomeMain: React.FC<HomeMainProps> = (props) => {
	const {
		data: {
			topRatedMovieIds,
			topRatedTvSeriesIds,
			trendingMovieOfTheWeekIds,
			trendingTvSeriesOfTheWeekIds,
		},
	} = props;

	// ========== Get the current trending content to display as a hero content that alternates
	const featuredTrendingContents = useMemo(() => {
		const movies = trendingMovieOfTheWeekIds
			.slice(0, maxMovieHeading)
			.map((id) => ({ id: `movie${id}`, type: 'movie', mediaId: Number(id) }));
		const tvSeries = trendingTvSeriesOfTheWeekIds
			.slice(0, maxTvHeading)
			.map((id) => ({ id: `tv${id}`, type: 'tv', mediaId: Number(id) }));

		return [...movies, ...tvSeries];
	}, [trendingMovieOfTheWeekIds, trendingTvSeriesOfTheWeekIds]);

	const { loading } = H.usePopulateWatchlist();

	const [currIndex, setCurrIndex] = useState(0);

	useEffect(() => {
		setTimeout(() => {
			const max = maxMovieHeading + maxTvHeading;
			const toBeIndex = currIndex + 1;

			const nextIndex = (() => {
				if (toBeIndex > max - 1) return 0;
				return toBeIndex;
			})();

			setCurrIndex(nextIndex);
		}, duration);
	});

	return (
		<>
			<Head>
				<title>{Meta.home.title}</title>

				<meta content={Meta.home.title} name="title" />
				<meta content={Meta.home.description} name="description" />
			</Head>

			<PageLayout>
				<div className={styles.homeMainRoot}>
					{featuredTrendingContents.map((content, idx) => {
						if (content.type === 'movie') {
							return (
								<CW.HeroContentMovieWrapper
									enableHref
									key={content.mediaId}
									show={currIndex === idx}
									id={content.mediaId}
									loadingButton={loading}
								/>
							);
						}

						if (content.type === 'tv') {
							return (
								<CW.HeroContentTvWrapper
									enableHref
									key={content.mediaId}
									show={currIndex === idx}
									id={content.mediaId}
									loadingButton={loading}
								/>
							);
						}

						return null;
					})}

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
