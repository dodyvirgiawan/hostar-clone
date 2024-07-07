import { PageLayout } from '@/ui/layouts';
import styles from './movie-detail-main.module.scss';
import { MovieDetailMainProps } from './movie-detail-main.type';
import Head from 'next/head';
import Image from 'next/image';
import { TMDB_IMG_URL } from '@/constants/api';
import clsx from 'clsx';
import { getYear } from '@/lib/utils';
import { useAppSelector } from '@/redux/store';
import { selectMovieGenresByMovieId } from '@/redux/slices';
import { CardCarousel, RenderIf, Tabs } from '@/ui/components';
import { tabs } from './movie-detail-main.constant';
import { useState } from 'react';
import { CardMovieWrapper } from '@/ui/components-wrapper';

const MovieDetailMain: React.FC<MovieDetailMainProps> = (props) => {
	const { data } = props;

	const { movieDetail, movieRecommendationIds } = data;

	const movieGenres = useAppSelector(
		selectMovieGenresByMovieId(Number(movieDetail.id)),
	);

	const movieGenreString = movieGenres?.map((item) => item.name);
	const title = `${movieDetail.title} full movie. ${movieGenreString?.join(' ')} film in Disney Hotstar+`;

	const [tabValue, setTabValue] = useState(tabs[0].value);

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
							alt={title}
							fill
							src={`${TMDB_IMG_URL}/w1280${movieDetail.backdrop_path}`} // ? Use small image size to improve performance
						/>

						<div className={styles.content}>
							<div className={styles.movieDetailContent}>
								<p className="font-h1">{movieDetail.title}</p>

								<div className={styles.detailChipContainer}>
									<div className={styles.chipItem}>
										<p className={clsx('font-small', styles.chipText)}>
											{getYear(movieDetail.release_date)}
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
							</div>
						</div>

						<div className={styles.ornament} />
					</div>

					<div className={styles.tabContainer}>
						<Tabs tabs={tabs} value={tabValue} onChange={setTabValue} />
					</div>

					<div className={styles.cardContainer}>
						<CardCarousel>
							{movieRecommendationIds.map((id) => {
								return (
									<div key={id} className={styles.cardWrapper}>
										<CardMovieWrapper id={Number(id)} mediaType="movie" />
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

export default MovieDetailMain;
