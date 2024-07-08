import { WatchlistMain } from '@/ui/pages/watchlist';
import React from 'react';

// ? I don't use SSR in watchlist page as most of the content depends on client's localStorage, which is stored on client side.
const Watchlist: React.FC = () => {
	return <WatchlistMain />;
};

export default Watchlist;
