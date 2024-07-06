import { StaticImageData } from 'next/image';
import HomeIcon from '../../public/assets/home-icon.svg';
import SearchIcon from '../../public/assets/search-icon.svg';
import WatchlistIcon from '../../public/assets/watchlist-icon.svg';

export interface MenuItem {
	icon: StaticImageData;
	title: string;
	url: string;
}

export const Menus: MenuItem[] = [
	{ icon: HomeIcon, title: 'Search', url: '/search' },
	{ icon: SearchIcon, title: 'Home', url: '/' },
	{ icon: WatchlistIcon, title: 'Watchlist', url: '/watchlist' },
];
