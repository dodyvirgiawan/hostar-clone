import { setWatchlist } from '@/redux/slices';
import { useAppDispatch } from '@/redux/store';
import { useEffect, useState } from 'react';

const usePopulateWatchlist = () => {
	const dispatch = useAppDispatch();

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const rawWatchlist = localStorage.getItem('myWatchlist') || '';

		if (!rawWatchlist) return;

		const myWatchlist = JSON.parse(rawWatchlist);
		dispatch(setWatchlist(myWatchlist));
		setLoading(false);
	}, [dispatch]);

	return { loading };
};

export default usePopulateWatchlist;
