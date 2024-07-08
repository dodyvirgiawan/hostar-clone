import { PageLayout } from '@/ui/layouts';
import styles from './home-main.module.scss';
import { Button, CardCarousel, RenderIf } from '@/ui/components';
import { HomeMainProps } from './home-main.type';
import { CardMovieWrapper, CardTvWrapper } from '@/ui/components-wrapper';
import Head from 'next/head';
import { Meta } from '@/constants/meta';
import { useMemo } from 'react';
import Image from 'next/image';
import { useAppSelector } from '@/redux/store';
import { selectMovieById, selectMovieGenresByMovieId } from '@/redux/slices';
import clsx from 'clsx';
import dayjs from 'dayjs';
import {
	usePopulateWatchlist,
	useScrollCoefficient,
	useWatchlistStorage,
} from '@/lib/hooks';
import { TMDB_IMG_URL } from '@/constants/api';
import { Icon } from '@/constants/icon';

const HomeMain: React.FC<HomeMainProps> = (props) => {
	const { data } = props;

	const {
		topRatedMovieIds,
		topRatedTvSeriesIds,
		trendingMovieOfTheWeekIds,
		trendingTvSeriesOfTheWeekIds,
	} = data;

	const { coefficient } = useScrollCoefficient();

	const featuredTrendingMovieId = useMemo(() => {
		if (!trendingMovieOfTheWeekIds.length) return null;
		return Number(trendingMovieOfTheWeekIds[0]);
	}, [trendingMovieOfTheWeekIds]);

	const featuredMovie = useAppSelector(
		selectMovieById(featuredTrendingMovieId || 0),
	);

	const movieGenres = useAppSelector(
		selectMovieGenresByMovieId(Number(featuredMovie?.id)),
	);

	const { loading } = usePopulateWatchlist();

	const {
		handlers: { onAddToWatchlist, onRemoveFromWatchlist },
		state: { isInWatchlist },
	} = useWatchlistStorage({
		currentWatchlistDetail: {
			id: `movie${featuredMovie?.id}`,
			mediaType: 'movie',
			mediaId: Number(featuredMovie?.id),
		},
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
					<RenderIf isTrue={!!featuredMovie}>
						<div className={styles.backdropContainer}>
							<Image
								priority
								alt={`${featuredMovie?.title} backdrop`}
								fill
								style={{ opacity: 1 - coefficient }}
								src={`${TMDB_IMG_URL}/w1280${featuredMovie?.backdrop_path}`} // ? Use small image size to improve performance
							/>

							<div className={styles.content}>
								<div className={styles.movieDetailContent}>
									<p className="font-h1">{featuredMovie?.title}</p>

									<div className={styles.detailChipContainer}>
										<RenderIf isTrue={!!featuredMovie?.release_date}>
											<div className={styles.chipItem}>
												<p className={clsx('font-small', styles.chipText)}>
													{dayjs(featuredMovie?.release_date).year()}
												</p>
											</div>

											<div className={styles.circleDivider} />
										</RenderIf>

										<RenderIf isTrue={!!featuredMovie?.runtime}>
											<div className={styles.chipItem}>
												<p className={clsx('font-small', styles.chipText)}>
													{featuredMovie?.runtime} min
												</p>
											</div>

											<div className={styles.circleDivider} />
										</RenderIf>

										<RenderIf isTrue={!!featuredMovie?.original_language}>
											<div className={styles.chipItem}>
												<p
													className={clsx(
														'font-small',
														styles.chipText,
														styles.language,
													)}
												>
													{featuredMovie?.original_language}
												</p>
											</div>
										</RenderIf>
									</div>

									<p className={clsx('font-p', styles.overviewText)}>
										{featuredMovie?.overview}
									</p>

									<div className={styles.genreChipContainer}>
										{movieGenres?.map((genre, idx) => {
											const isLast = idx === movieGenres.length - 1;

											return (
												<>
													<div className={styles.chipItem}>
														<p className={clsx('font-small', styles.chipText)}>
															{genre.name}
														</p>
													</div>

													<RenderIf isTrue={!isLast}>
														<div className={styles.lineDivider} />
													</RenderIf>
												</>
											);
										})}
									</div>

									<div className={styles.buttonContainer}>
										<RenderIf isTrue={!isInWatchlist}>
											<Button
												loading={loading}
												fullWidth
												className={styles.button}
												onClick={onAddToWatchlist}
											>
												<div className={styles.logoContainer}>
													<Image alt="Select" src={Icon.Add} />
												</div>

												<p className={clsx('font-p', styles.buttonText)}>
													Add to Watchlist
												</p>
											</Button>
										</RenderIf>

										<RenderIf isTrue={isInWatchlist}>
											<Button
												fullWidth
												className={styles.button}
												onClick={onRemoveFromWatchlist}
											>
												<div className={styles.logoContainer}>
													<Image priority alt="Deselect" src={Icon.Remove} />
												</div>

												<p className={clsx('font-p', styles.buttonText)}>
													Remove from Watchlist
												</p>
											</Button>
										</RenderIf>
									</div>
								</div>
							</div>

							<div className={styles.ornament} />
						</div>
					</RenderIf>

					<div className={styles.carouselContainer}>
						<CardCarousel title="Top Rated Movies & TV Series">
							{topRatedMovieIds.map((id) => {
								return (
									<div key={id} className={styles.cardWrapper}>
										<CardMovieWrapper id={Number(id)} mediaType="movie" />
									</div>
								);
							})}

							{topRatedTvSeriesIds.map((id) => {
								return (
									<div key={id} className={styles.cardWrapper}>
										<CardTvWrapper id={Number(id)} mediaType="tv" />
									</div>
								);
							})}
						</CardCarousel>

						<CardCarousel title="Top Rated Movie of The Week">
							{trendingMovieOfTheWeekIds.map((id) => {
								return (
									<div key={id} className={styles.cardWrapper}>
										<CardMovieWrapper id={Number(id)} mediaType="movie" />
									</div>
								);
							})}
						</CardCarousel>

						<CardCarousel title="Top Rated TV Series of The Week">
							{trendingTvSeriesOfTheWeekIds.map((id) => {
								return (
									<div key={id} className={styles.cardWrapper}>
										<CardTvWrapper id={Number(id)} mediaType="tv" />
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
