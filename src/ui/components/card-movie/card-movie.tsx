import styles from './card-movie.module.scss';
import { CardMovieProps } from './card-movie.type';
import { useState } from 'react';
import { TMDB_IMG_URL } from '@/constants/api';
import Image from 'next/image';
import clsx from 'clsx';
import { useDebounce } from '@/lib/hooks';
import { Button } from '../button';
import { RenderIf } from '../render-if';
import AddIcon from '../../../../public/assets/add-icon.svg';
import RemoveIcon from '../../../../public/assets/remove-icon.svg';
import Link from 'next/link';
import { ButtonProps } from '../button/button.type';

const CardMovie: React.FC<CardMovieProps> = (props) => {
	const {
		id,
		title,
		overview,
		posterUrl,
		backdropUrl,
		isInWatchlist = false,
		buttonLoading = false,
		onAddToWatchlistClick,
		onRemoveFromWatchlistClick,
		...otherProps
	} = props;

	const [expand, setIsExpand] = useState(false);

	// ? Need to debounce because don't want to immediate expand (500ms)
	const debouncedExpand = useDebounce(expand, 600);

	const onMouseOver = () => {
		setIsExpand(true);
	};

	const onMouseOut = () => {
		setIsExpand(false);
	};

	const handleAddToWatchlist: ButtonProps['onClick'] = (e) => {
		e?.preventDefault();

		if (onAddToWatchlistClick) onAddToWatchlistClick();
	};

	const handleRemoveFromWatchlist: ButtonProps['onClick'] = (e) => {
		e?.preventDefault();

		if (onRemoveFromWatchlistClick) onRemoveFromWatchlistClick();
	};

	return (
		<Link href={`/movie/${id}`} passHref>
			<div
				className={styles.cardMovieRoot}
				onMouseOver={onMouseOver}
				onMouseOut={onMouseOut}
				{...otherProps}
			>
				<>
					<div
						className={clsx(styles.noExpand, {
							[styles.noExpandHide]: expand,
							[styles.noExpandShow]: !expand,
						})}
					>
						<div className={styles.imageContainerNoExpand}>
							<Image
								alt={title}
								layout="fill"
								objectFit="cover"
								src={`${TMDB_IMG_URL}/w500${posterUrl}`}
							/>
						</div>
					</div>

					<div
						className={clsx(styles.expand, {
							[styles.expandHide]: debouncedExpand,
							[styles.expandShow]: !debouncedExpand,
						})}
					>
						<div className={styles.imageContainer}>
							<Image
								alt={title}
								layout="fill"
								objectFit="cover"
								src={`${TMDB_IMG_URL}/original${backdropUrl}`}
							/>

							<div className={styles.ornament} />
						</div>

						<div className={styles.contentContainer}>
							<p className={clsx('font-h5', styles.title)}>{title}</p>
							<p className={clsx('font-small', styles.overviewText)}>
								{overview}
							</p>

							<RenderIf isTrue={!isInWatchlist}>
								<Button
									className={styles.button}
									fullWidth
									onClick={handleAddToWatchlist}
									loading={buttonLoading}
								>
									<div className={styles.logoContainer}>
										<Image alt="Add to Watchlist" src={AddIcon} />
									</div>

									<p className={clsx('font-p', styles.buttonText)}>
										Add to Watchlist
									</p>
								</Button>
							</RenderIf>

							<RenderIf isTrue={isInWatchlist}>
								<Button
									className={styles.button}
									fullWidth
									onClick={handleRemoveFromWatchlist}
									loading={buttonLoading}
								>
									<div className={styles.logoContainer}>
										<Image alt="Remove from Watchlist" src={RemoveIcon} />
									</div>

									<p className={clsx('font-p', styles.buttonText)}>
										Remove from Watchlist
									</p>
								</Button>
							</RenderIf>
						</div>
					</div>
				</>
			</div>
		</Link>
	);
};

export default CardMovie;
