import * as SL from '@/redux/slices';

export const DummyMovie: SL.MovieModel = {
	id: '278',
	backdrop_path: '/zfbjgQE1uSd9wiPTX4VzsLi0rGG.jpg',
	genres: ['18', '80'],
	original_language: 'en',
	overview:
		'Imprisoned in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden. During his long stretch in prison, Dufresne comes to be admired by the other inmates -- including an older prisoner named Red -- for his integrity and unquenchable sense of hope.',
	poster_path: '/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg',
	release_date: '1994-09-23',
	runtime: 142,
	title: 'The Shawshank Redemption',
};

export const DummyEpisode: SL.EpisodeModel = {
	air_date: '2019-07-25',
	episode_number: 1,
	id: '1705013',
	name: 'The Name of the Game',
	overview:
		'When a Supe kills the love of his life, A/V salesman Hughie Campbell teams up with Billy Butcher, a vigilante hell-bent on punishing corrupt Supes — and Hughie’s life will never be the same again.',
	runtime: 61,
	season_number: 1,
	show_id: '76479',
	still_path: '/83vFYTHtCqWwaDtZluSU8bmnFYG.jpg',
};
