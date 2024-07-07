import styles from './card-episode.module.scss';
import { CardEpisodeProps } from './card-episode.type';
import Image from 'next/image';
import { TMDB_IMG_URL } from '@/constants/api';
import clsx from 'clsx';

const CardEpisode: React.FC<CardEpisodeProps> = (props) => {
	const {
		name,
		season,
		episode,
		duration,
		airDate,
		overview,
		posterUrl,
		loading,
		...otherProps
	} = props;

	if (loading) return <div className={styles.cardEpisodeLoadingRoot} />;

	return (
		<div className={styles.cardEpisodeRoot} {...otherProps}>
			<div className={styles.imageContainer}>
				<Image
					sizes="(max-width 1540px) 220px"
					alt={`${name} poster`}
					fill
					src={`${TMDB_IMG_URL}/w300${posterUrl}`} // ? Use small image size to improve performance
				/>
			</div>

			<div className={styles.contentContainer}>
				<p className={clsx('font-p', styles.nameText)}>{name}</p>

				<div className={styles.detailChipContainer}>
					<div className={styles.chipItem}>
						<p
							className={clsx('font-small', styles.chipText)}
						>{`S${season} E${episode}`}</p>
					</div>

					<div className={styles.circleDivider} />

					<div className={styles.chipItem}>
						<p className={clsx('font-small', styles.chipText)}>{airDate}</p>
					</div>

					<div className={styles.circleDivider} />

					<div className={styles.chipItem}>
						<p className={clsx('font-small', styles.chipText)}>{duration}m</p>
					</div>
				</div>

				<p className={clsx('font-small', styles.overviewText)}>{overview}</p>
			</div>
		</div>
	);
};

export default CardEpisode;
