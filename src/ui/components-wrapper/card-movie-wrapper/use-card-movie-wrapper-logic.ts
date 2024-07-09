import * as SR from '@/redux/services';
import * as SL from '@/redux/slices';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { CardContentProps } from '@/ui/components/card-content';
import { useMemo } from 'react';
import { CardMovieWrapperProps } from './card-movie-wrapper.type';

export const useCardMovieWrapperLogic = ({
	currentWatchlistDetail,
	mode,
}: {
	currentWatchlistDetail: SL.Watchlist;
	mode: CardMovieWrapperProps['mode'];
}) => {
	const movieDetail = useAppSelector(
		SL.selectMovieById(currentWatchlistDetail.mediaId),
	);
	const toBeDeletedWatchlists = useAppSelector(SL.selectToBeDeletedWatchlists);

	// ? If reaching this component and data is not yet upserted to slice, we need to refetch.
	// ? Case is when refreshing page in watchlist page
	// ? In watchlist page we do not fetch anything page-wide, only in this component
	const { isFetching } = SR.useFetchMovieDetailByIdQuery(
		{ id: String(currentWatchlistDetail.mediaId) },
		{ skip: !!movieDetail },
	);

	const dispatch = useAppDispatch();

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

	return {
		handlers: { onSelectCard: handleSelect },
		state: { isSelected, movieDetail, isFetching },
	};
};
