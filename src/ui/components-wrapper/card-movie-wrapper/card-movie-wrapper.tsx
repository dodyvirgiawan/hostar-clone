import { useAppSelector } from '@/redux/store';
import React from 'react';
import { CardMovieWrapperProps } from './card-movie-wrapper.type';
import * as SL from '@/redux/slices';
import { CardContent } from '@/ui/components/card-content';
import { useWatchlistStorage } from '@/lib/hooks';
import { useFetchMovieDetailByIdQuery } from '@/redux/services';

const CardMovieWrapper: React.FC<CardMovieWrapperProps> = (props) => {
	const { id, mediaType, ...otherProps } = props;

	const movieDetail = useAppSelector(SL.selectMovieById(id));

	const {
		handlers: { onAddToWatchlist, onRemoveFromWatchlist },
		state: { isInWatchlist },
	} = useWatchlistStorage({
		currentWatchlistDetail: { id, mediaType },
	});

	// ? If for some reason when reaching this component, data is not yet upserted to slice
	// ? We need to refetch it again. Case is when refreshing in watchlist page
	// ? In watchlist page we do not fetch anything page-wide.
	const { isFetching } = useFetchMovieDetailByIdQuery(
		{ id: String(id) },
		{ skip: !!movieDetail },
	);

	return (
		<CardContent
			loading={isFetching || !movieDetail}
			id={Number(id)}
			backdropUrl={movieDetail?.backdrop_path || ''}
			mediaType={mediaType}
			overview={movieDetail?.overview || ''}
			posterUrl={movieDetail?.poster_path || ''}
			title={movieDetail?.title || ''}
			isInWatchlist={isInWatchlist}
			onAddToWatchlistClick={onAddToWatchlist}
			onRemoveFromWatchlistClick={onRemoveFromWatchlist}
			{...otherProps}
		/>
	);
};

export default CardMovieWrapper;
