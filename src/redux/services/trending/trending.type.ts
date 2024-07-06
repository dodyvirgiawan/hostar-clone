import { MovieModel, TvModel } from '@/redux/slices';

export interface FetchAllTrendingRes {
	page: number;
	results: (MovieModel | TvModel)[];
	total_pages: number;
	total_results: number;
}

export interface NormalizedFetchAllTrendingRes {
	movie: {
		entities: {
			movie?: Record<string, MovieModel>;
		};
		result: string[];
	};
	tv: {
		entities: {
			movie?: Record<string, MovieModel>;
		};
		result: string[];
	};
	page: number;
	totalPages: number;
	totalResults: number;
}

export interface FetchAllTrendingArgs {
	time_window: 'day' | 'week';
	language?: string;
}
