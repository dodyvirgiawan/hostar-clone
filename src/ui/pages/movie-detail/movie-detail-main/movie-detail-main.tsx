import { PageLayout } from '@/ui/layouts';
import styles from './movie-detail-main.module.scss';
import { MovieDetailMainProps } from './movie-detail-main.type';
import Head from 'next/head';
import Image from 'next/image';
import { TMDB_IMG_URL } from '@/constants/api';
import clsx from 'clsx';
import { useAppSelector } from '@/redux/store';
import * as SL from '@/redux/slices';
import {
	Button,
	CardCarousel,
	RenderIf,
	TabPanel,
	Tabs,
} from '@/ui/components';
import { tabs } from './movie-detail-main.constant';
import { useState } from 'react';
import { CardMovieWrapper } from '@/ui/components-wrapper';
import { usePopulateWatchlist, useWatchlistStorage } from '@/lib/hooks';
import dayjs from 'dayjs';
import { Icon } from '@/constants/icon';

const MovieDetailMain: React.FC<MovieDetailMainProps> = (props) => {
	const { data } = props;

	const { loading } = usePopulateWatchlist();

	const { movieDetail, movieRecommendationIds } = data;

	const movieGenres = useAppSelector(
		SL.selectMovieGenresByMovieId(Number(movieDetail.id)),
	);

	const movieGenreString = movieGenres?.map((item) => item.name);
	const title = `${movieDetail.title} full movie. ${movieGenreString?.join(' ')} film in Disney Hotstar+`;

	const [tabValue, setTabValue] = useState(tabs[0].value);

	const {
		handlers: { onAddToWatchlist, onRemoveFromWatchlist },
		state: { isInWatchlist },
	} = useWatchlistStorage({
		currentWatchlistDetail: {
			id: `movie${movieDetail.id}`,
			mediaType: 'movie',
			mediaId: Number(movieDetail.id),
		},
	});
	return (
		<>
			<Head>
				<title>{title}</title>

				<meta content={title} name="title" />
				<meta content={movieDetail.overview} name="description" />
			</Head>

			<PageLayout>
				<div className={styles.homeMainRoot}>
					<div className={styles.backdropContainer}>
						<Image
							priority
							alt={`${movieDetail.title} backdrop`}
							fill
							src={`${TMDB_IMG_URL}/w1280${movieDetail.backdrop_path}`} // ? Use small image size to improve performance
						/>

						<div className={styles.content}>
							<div className={styles.movieDetailContent}>
								<p className="font-h1">{movieDetail.title}</p>

								<div className={styles.detailChipContainer}>
									<div className={styles.chipItem}>
										<p className={clsx('font-small', styles.chipText)}>
											{dayjs(movieDetail.release_date).year()}
										</p>
									</div>

									<div className={styles.circleDivider} />

									<div className={styles.chipItem}>
										<p className={clsx('font-small', styles.chipText)}>
											{movieDetail.runtime} min
										</p>
									</div>

									<div className={styles.circleDivider} />

									<div className={styles.chipItem}>
										<p
											className={clsx(
												'font-small',
												styles.chipText,
												styles.language,
											)}
										>
											{movieDetail.original_language}
										</p>
									</div>
								</div>

								<p className={clsx('font-p', styles.overviewText)}>
									{movieDetail.overview}
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

					<div className={styles.tabContainer}>
						<Tabs tabs={tabs} value={tabValue} onChange={setTabValue} />
					</div>

					<div className={styles.cardContainer}>
						<TabPanel value="more-like-this" currentValue={tabValue}>
							<CardCarousel>
								{movieRecommendationIds.map((id) => {
									return (
										<div key={id} className={styles.cardWrapper}>
											<CardMovieWrapper id={Number(id)} mediaType="movie" />
										</div>
									);
								})}
							</CardCarousel>
						</TabPanel>
					</div>
				</div>
			</PageLayout>
		</>
	);
};

export default MovieDetailMain;
