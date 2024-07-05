import { MovieModel } from '@/redux/slices';

// ============ TOP RATED MOVIES ============

export interface FetchTopRatedMovieRes {
	page: number;
	total_pages: number;
	total_results: number;
	results: MovieModel[];
}

export interface NormalizedFetchTopRatedMovieRes {
	entities: {
		movie?: Record<string, MovieModel>;
	};
	page: number;
	totalPages: number;
	totalResults: number;
}

export interface FetchTopRatedMovieArgs {
	page: number;
	language?: string;
	region?: string;
}

// ============ SIMILAR MOVIES ============

export interface FetchSimilarMovieRes {
	page: number;
	total_pages: number;
	total_results: number;
	results: MovieModel[];
}

export interface NormalizedFetchSimilarMovieRes {
	entities: {
		movie?: Record<string, MovieModel>;
	};
	page: number;
	totalPages: number;
	totalResults: number;
}

export interface FetchSimilarMovieArgs {
	id: string;
	page: number;
	language?: string;
}
