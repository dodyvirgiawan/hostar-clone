import { setWatchlist } from '@/redux/slices';
import { useAppDispatch } from '@/redux/store';
import { useEffect, useState } from 'react';

const usePopulateWatchlist = () => {
	const dispatch = useAppDispatch();

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const rawWatchlist = localStorage.getItem('myWatchlist') || '';

		if (!rawWatchlist) {
			localStorage.setItem('myWatchlist', JSON.stringify([]));
			return;
		}

		try {
			const parsedWatchlist = JSON.parse(rawWatchlist);

			if (!Array.isArray(parsedWatchlist)) {
				localStorage.setItem('myWatchlist', JSON.stringify([]));
			} else {
				dispatch(setWatchlist(parsedWatchlist));
				setLoading(false);
			}
		} catch (e) {
			localStorage.setItem('myWatchlist', JSON.stringify([]));
		}
	}, [dispatch]);

	return { loading };
};

export default usePopulateWatchlist;
