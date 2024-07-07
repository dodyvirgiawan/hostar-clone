import { useAppSelector } from '@/redux/store';
import React from 'react';
import { CardMovieWrapperProps } from './card-movie-wrapper.type';
import { selectMovieById } from '@/redux/slices';
import { CardContent } from '@/ui/components/card-content';

const CardMovieWrapper: React.FC<CardMovieWrapperProps> = (props) => {
	const { id, mediaType, ...otherProps } = props;

	const movieDetail = useAppSelector(selectMovieById(id));

	const handleAddToWatchlist = () => {
		console.log('add watchlist');
	};

	const handleRemoveFromWatchlist = () => {
		console.log('remove watchlist');
	};

	return (
		<CardContent
			id={Number(id)}
			backdropUrl={movieDetail.backdrop_path}
			mediaType={mediaType}
			overview={movieDetail.overview}
			posterUrl={movieDetail.poster_path}
			title={movieDetail.title}
			onAddToWatchlistClick={handleAddToWatchlist}
			onRemoveFromWatchlistClick={handleRemoveFromWatchlist}
			{...otherProps}
		/>
	);
};

export default CardMovieWrapper;
