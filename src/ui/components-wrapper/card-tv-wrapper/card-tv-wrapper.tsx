import { useAppDispatch, useAppSelector } from '@/redux/store';
import React, { useMemo } from 'react';
import { CardTvWrapperProps } from './card-tv-wrapper.type';
import * as SL from '@/redux/slices';
import { CardContent, CardContentProps } from '@/ui/components/card-content';
import { useWatchlistStorage } from '@/lib/hooks';
import { useFetchTvDetailByIdQuery } from '@/redux/services';

const CardTvWrapper: React.FC<CardTvWrapperProps> = (props) => {
	const { id, mediaType, mode, ...otherProps } = props;

	const tvDetail = useAppSelector(SL.selectTvById(id));

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
	const { isFetching } = useFetchTvDetailByIdQuery(
		{ id: String(id) },
		{ skip: !!tvDetail },
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
			loading={isFetching || !tvDetail}
			id={Number(id)}
			backdropUrl={tvDetail?.backdrop_path || ''}
			mediaType={mediaType}
			overview={tvDetail?.overview || ''}
			posterUrl={tvDetail?.poster_path || ''}
			isInWatchlist={isInWatchlist}
			title={tvDetail?.name || ''}
			onAddToWatchlistClick={onAddToWatchlist}
			onRemoveFromWatchlistClick={onRemoveFromWatchlist}
			{...otherProps}
		/>
	);
};

export default CardTvWrapper;
