import { HeroContentMovieProps } from './hero-content-movie.type';
import styles from './hero-content-movie.module.scss';
import Image from 'next/image';
import { useScrollCoefficient } from '@/lib/hooks';
import clsx from 'clsx';
import { RenderIf } from '../render-if';
import { Button } from '../button';
import { Icon } from '@/constants/icon';
import { TMDB_IMG_URL } from '@/constants/api';
import dayjs from 'dayjs';

const HeroContentMovie: React.FC<HeroContentMovieProps> = (props) => {
	const {
		title,
		backdropUrl,
		releaseDate,
		runtime,
		language,
		overview,
		genres,
		onAddToWatchlist,
		onRemoveFromWatchlist,
		isInWatchlist,
		loadingButton = false,
		...otherProps
	} = props;

	const { coefficient } = useScrollCoefficient();

	return (
		<div className={styles.heroContentMovieRoot} {...otherProps}>
			<Image
				priority
				alt={`${title} backdrop`}
				fill
				style={{ opacity: 1 - coefficient }}
				src={`${TMDB_IMG_URL}/w1280${backdropUrl}`} // ? Use small image size to improve performance
			/>

			<div className={styles.content}>
				<div className={styles.movieDetailContent}>
					<p className="font-h1">{title}</p>

					<div className={styles.detailChipContainer}>
						<RenderIf isTrue={!!releaseDate}>
							<div className={styles.chipItem}>
								<p className={clsx('font-small', styles.chipText)}>
									{dayjs(releaseDate).year()}
								</p>
							</div>

							<div className={styles.circleDivider} />
						</RenderIf>

						<RenderIf isTrue={!!runtime}>
							<div className={styles.chipItem}>
								<p className={clsx('font-small', styles.chipText)}>
									{runtime} min
								</p>
							</div>

							<div className={styles.circleDivider} />
						</RenderIf>

						<RenderIf isTrue={!!language}>
							<div className={styles.chipItem}>
								<p
									className={clsx(
										'font-small',
										styles.chipText,
										styles.language,
									)}
								>
									{language}
								</p>
							</div>
						</RenderIf>
					</div>

					<p className={clsx('font-p', styles.overviewText)}>{overview}</p>

					<div className={styles.genreChipContainer}>
						{genres?.map((genre, idx) => {
							const isLast = idx === genres.length - 1;

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
								loading={loadingButton}
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
	);
};

export default HeroContentMovie;
