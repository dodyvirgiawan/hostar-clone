import { GenreModel, TvModel } from '@/redux/slices';

// ============ TOP RATED TV SERIES ============

export interface FetchTopRatedTvRes {
	page: number;
	total_pages: number;
	total_results: number;
	results: TvModel[];
}

export interface NormalizedFetchTopRatedTvRes {
	entities: {
		tv?: Record<string, TvModel>;
	};
	result: string[];
	page: number;
	totalPages: number;
	totalResults: number;
}

export interface FetchTopRatedTvArgs {
	page: number;
	language?: string;
}

// ============ SIMILAR TV SERIES ============

export interface FetchSimilarTvRes {
	page: number;
	total_pages: number;
	total_results: number;
	results: TvModel[];
}

export interface NormalizedFetchSimilarTvRes {
	entities: {
		tv?: Record<string, TvModel>;
	};
	result: string[];
	page: number;
	totalPages: number;
	totalResults: number;
}

export interface FetchSimilarTvArgs {
	id: string;
	page: number;
	language?: string;
}

// ============ TV SERIES DETAIL BY ID ============

export type FetchTvDetailByIdRes = TvModel;

export interface NormalizedFetchTvDetailByIdRes {
	entities: {
		tv?: Record<string, TvModel>;
		genre?: Record<string, GenreModel>;
	};
	result: string;
}

export interface FetchTvDetailByIdArgs {
	id: string;
	language?: string;
	append_to_response?: string; // ? This is needed to append genres
}
