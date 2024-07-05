import { TMDB_API_KEY, TMDB_API_V3 } from '@/constants/api';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import * as T from './movie.type';
import { normalize } from 'normalizr';
import { movieEntity } from './movie.entity';

export const movieApi = createApi({
	reducerPath: 'movieApi',
	baseQuery: fetchBaseQuery({
		baseUrl: `${TMDB_API_V3}/movie`,
		paramsSerializer: (params) => {
			const urlParams = new URLSearchParams(params);
			urlParams.append('api_key', TMDB_API_KEY);
			return urlParams.toString();
		},
	}),
	endpoints: (builder) => ({
		fetchTopRatedMovie: builder.query<
			T.NormalizedFetchTopRatedMovieRes,
			T.FetchTopRatedMovieArgs
		>({
			query: ({ page, language = 'en-US', region }) => ({
				url: 'top_rated',
				method: 'GET',
				params: {
					page,
					language,
					...(!!region && { region }),
				},
			}),
			transformResponse: (response: T.FetchTopRatedMovieRes) => {
				const { page, results, total_pages, total_results } = response;

				return {
					entities: normalize(results || {}, [movieEntity]).entities,
					totalPages: total_pages,
					totalResults: total_results,
					page,
				};
			},
		}),
		fetchSimilarMovieById: builder.query<
			T.NormalizedFetchSimilarMovieRes,
			T.FetchSimilarMovieArgs
		>({
			query: ({ page, language = 'en-US', id }) => ({
				url: `${id}/similar`,
				method: 'GET',
				params: {
					page,
					language,
				},
			}),
		}),
	}),
});

export const { useFetchTopRatedMovieQuery, useFetchSimilarMovieByIdQuery } =
	movieApi;
