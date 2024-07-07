import styles from './card-content.module.scss';
import { CardContentProps } from './card-content.type';
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

const CardContent: React.FC<CardContentProps> = (props) => {
	const {
		id,
		title,
		overview,
		posterUrl,
		backdropUrl,
		mediaType,
		isInWatchlist = false,
		buttonLoading = false,
		loading = false,
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

	if (loading)
		return (
			<div className={styles.cardContentRoot}>
				<div className={styles.noExpandLoading} />
			</div>
		);

	return (
		<Link as="" href={`/${mediaType}/${id}`} passHref>
			<div
				className={styles.cardContentRoot}
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
								sizes="(max-width 1540px) 232px"
								alt={title}
								fill
								src={`${TMDB_IMG_URL}/w342${posterUrl}`} // ? Use small image size to improve performance
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
								sizes="(max-width 1540px) 336px"
								alt={title}
								fill
								src={`${TMDB_IMG_URL}/w300${backdropUrl}`} // ? Use small image size to improve performance
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
										<Image
											priority
											alt="Remove from Watchlist"
											src={RemoveIcon}
										/>
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

export default CardContent;
