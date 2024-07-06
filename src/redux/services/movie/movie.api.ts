import { TMDB_API_KEY, TMDB_API_V3 } from '@/constants/api';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import * as T from './movie.type';
import { normalize } from 'normalizr';
import { movieEntity } from './movie.entity';
import { MovieDetailModel } from '@/redux/slices';

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
			transformResponse: (response: T.FetchSimilarMovieRes) => {
				const { page, results, total_pages, total_results } = response;

				return {
					entities: normalize(results || {}, [movieEntity]).entities,
					totalPages: total_pages,
					totalResults: total_results,
					page,
				};
			},
		}),
		fetchMovieDetailById: builder.query<
			T.NormalizedFetchMovieDetailByIdRes,
			T.FetchMovieDetailByIdArgs
		>({
			query: ({ id, language = 'en-US', append_to_response }) => ({
				url: `${id}`,
				method: 'GET',
				params: {
					language,
					...(!!append_to_response && { append_to_response }),
				},
			}),
			transformResponse: (response: T.FetchMovieDetailByIdRes) => {
				const movie = response;

				return normalize<MovieDetailModel>(movie || {}, movieEntity).entities;
			},
		}),
	}),
});

export const {
	useFetchTopRatedMovieQuery,
	useFetchSimilarMovieByIdQuery,
	useFetchMovieDetailByIdQuery,
} = movieApi;
