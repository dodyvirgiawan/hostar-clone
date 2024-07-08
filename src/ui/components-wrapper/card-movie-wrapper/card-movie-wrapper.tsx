import { useAppDispatch, useAppSelector } from '@/redux/store';
import React, { useMemo } from 'react';
import { CardMovieWrapperProps } from './card-movie-wrapper.type';
import * as SL from '@/redux/slices';
import { CardContent, CardContentProps } from '@/ui/components/card-content';
import { useWatchlistStorage } from '@/lib/hooks';
import { useFetchMovieDetailByIdQuery } from '@/redux/services';

const CardMovieWrapper: React.FC<CardMovieWrapperProps> = (props) => {
	const { id, mediaType, mode = 'default', ...otherProps } = props;

	const movieDetail = useAppSelector(SL.selectMovieById(id));

	const currentWatchlistDetail = useMemo(
		() => ({
			id: `${mediaType}${id}`,
			mediaType,
			mediaId: id,
		}),
		[mediaType, id],
	);

	const {
		handlers: { onAddToWatchlist, onRemoveFromWatchlist },
		state: { isInWatchlist },
	} = useWatchlistStorage({
		currentWatchlistDetail,
	});

	// ? If for some reason when reaching this component, data is not yet upserted to slice
	// ? We need to refetch it again. Case is when refreshing in watchlist page
	// ? In watchlist page we do not fetch anything page-wide.
	const { isFetching } = useFetchMovieDetailByIdQuery(
		{ id: String(id) },
		{ skip: !!movieDetail },
	);

	const dispatch = useAppDispatch();
	const toBeDeletedWatchlists = useAppSelector(SL.selectToBeDeletedWatchlists);

	const handleSelect: CardContentProps['onSelect'] = (reason) => {
		if (reason === 'add') {
			dispatch(SL.insertToBeDeletedWatchlist(currentWatchlistDetail));
		}

		if (reason === 'remove') {
			dispatch(SL.removeFromToBeDeletedWatchlist(currentWatchlistDetail));
		}
	};

	const isSelected = useMemo(() => {
		if (mode === 'default') return false;

		return !!toBeDeletedWatchlists.find(
			(watchlist: SL.Watchlist) => watchlist.id === currentWatchlistDetail.id,
		);
	}, [mode, toBeDeletedWatchlists, currentWatchlistDetail]);

	return (
		<CardContent
			mode={mode}
			selected={isSelected}
			onSelect={handleSelect}
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
