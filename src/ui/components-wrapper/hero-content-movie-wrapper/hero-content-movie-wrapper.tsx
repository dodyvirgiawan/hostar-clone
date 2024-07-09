import React, { useMemo } from 'react';
import { HeroContentMovieWrapperProps } from './hero-content-movie-wrapper.type';
import { useWatchlistStorage } from '@/lib/hooks';
import { useAppSelector } from '@/redux/store';
import * as SL from '@/redux/slices';
import { HeroContentMovie } from '@/ui/components/hero-content-movie';

const HeroContentMovieWrapper: React.FC<HeroContentMovieWrapperProps> = (
	props,
) => {
	const { id, loadingButton = false, ...otherProps } = props;

	const currentWatchlistDetail = useMemo<SL.Watchlist>(
		() => ({
			id: `movie${id}`,
			mediaType: 'movie',
			mediaId: id || 0,
		}),
		[id],
	);

	const {
		handlers: { onAddToWatchlist, onRemoveFromWatchlist },
		state: { isInWatchlist },
	} = useWatchlistStorage({
		currentWatchlistDetail,
	});

	const movie = useAppSelector(SL.selectMovieById(id || 0));

	const movieGenres = useAppSelector(
		SL.selectMovieGenresByMovieId(Number(movie?.id)),
	);

	if (!movie) return null;

	return (
		<HeroContentMovie
			title={movie.title}
			overview={movie.overview}
			backdropUrl={movie.backdrop_path}
			genres={movieGenres || []}
			language={movie.original_language}
			releaseDate={movie.release_date}
			runtime={movie.runtime}
			loadingButton={loadingButton}
			isInWatchlist={isInWatchlist}
			onAddToWatchlist={onAddToWatchlist}
			onRemoveFromWatchlist={onRemoveFromWatchlist}
			{...otherProps}
		/>
	);
};

export default HeroContentMovieWrapper;
