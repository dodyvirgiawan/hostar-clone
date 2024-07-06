import styles from './card-movie.module.scss';
import { CardMovieProps } from './card-movie.type';
import { useState } from 'react';
import { TMDB_IMG_URL } from '@/constants/api';
import Image from 'next/image';
import clsx from 'clsx';
import { useDebounce } from '@/lib/hooks';

const CardMovie: React.FC<CardMovieProps> = (props) => {
	const {
		title,
		overview,
		posterUrl,
		backdropUrl,
		isInWatchlist = false,
		onWatchlistClick,
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

	return (
		<div
			className={styles.cardMovieRoot}
			onMouseOver={onMouseOver}
			onMouseOut={onMouseOut}
			{...otherProps}
		>
			<div className={styles.noExpand}>
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
					[styles.expandCard]: debouncedExpand,
					[styles.noExpandCard]: !debouncedExpand,
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
					<p className={clsx('font-small', styles.overviewText)}>{overview}</p>
				</div>
			</div>
		</div>
	);
};

export default CardMovie;
