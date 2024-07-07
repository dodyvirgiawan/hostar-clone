import { setWatchlist } from '@/redux/slices';
import { useAppDispatch } from '@/redux/store';
import { useEffect } from 'react';

const usePopulateWatchlist = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		const rawWatchlist = localStorage.getItem('myWatchlist') || '';

		if (!rawWatchlist) return;

		const myWatchlist = JSON.parse(rawWatchlist);
		dispatch(setWatchlist(myWatchlist));
	}, [dispatch]);
};

export default usePopulateWatchlist;
