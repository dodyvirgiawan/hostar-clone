import { useAppSelector } from '@/redux/store';
import React from 'react';
import { CardTvWrapperProps } from './card-tv-wrapper.type';
import { selectTvById } from '@/redux/slices';
import { CardContent } from '@/ui/components/card-content';
import { useWatchlistStorage } from '@/lib/hooks';
import { useFetchTvDetailByIdQuery } from '@/redux/services';

const CardTvWrapper: React.FC<CardTvWrapperProps> = (props) => {
	const { id, mediaType, ...otherProps } = props;

	const tvDetail = useAppSelector(selectTvById(id));

	const {
		handlers: { onAddToWatchlist, onRemoveFromWatchlist },
		state: { isInWatchlist },
	} = useWatchlistStorage({
		currentWatchlistDetail: { id: `${mediaType}${id}`, mediaType, mediaId: id },
	});

	// ? If for some reason when reaching this component, data is not yet upserted to slice
	// ? We need to refetch it again. Case is when refreshing in watchlist page
	// ? In watchlist page we do not fetch anything page-wide.
	const { isFetching } = useFetchTvDetailByIdQuery(
		{ id: String(id) },
		{ skip: !!tvDetail },
	);

	return (
		<CardContent
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
