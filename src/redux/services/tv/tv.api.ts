import { TMDB_API_KEY, TMDB_API_V3 } from '@/constants/api';
import * as T from './tv.type';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { normalize } from 'normalizr';
import { tvEntity } from './tv.entity';
import { TvModel } from '@/redux/slices';

export const tvApi = createApi({
	reducerPath: 'tvApi',
	baseQuery: fetchBaseQuery({
		baseUrl: `${TMDB_API_V3}/tv`,
		paramsSerializer: (params) => {
			const urlParams = new URLSearchParams(params);
			urlParams.append('api_key', TMDB_API_KEY);
			return urlParams.toString();
		},
	}),
	endpoints: (builder) => ({
		fetchTopRatedTv: builder.query<
			T.NormalizedFetchTopRatedTvRes,
			T.FetchTopRatedTvArgs
		>({
			query: ({ page, language = 'en-US' }) => ({
				url: 'top_rated',
				method: 'GET',
				params: {
					page,
					language,
				},
			}),
			transformResponse: (response: T.FetchTopRatedTvRes) => {
				const { page, results, total_pages, total_results } = response;

				const normalizedResults = normalize(results || {}, [tvEntity]);
				const { entities, result } = normalizedResults;

				return {
					entities,
					result,
					totalPages: total_pages,
					totalResults: total_results,
					page,
				};
			},
		}),

		fetchSimilarTvById: builder.query<
			T.NormalizedFetchSimilarTvRes,
			T.FetchSimilarTvArgs
		>({
			query: ({ page, language = 'en-US', id }) => ({
				url: `${id}/similar`,
				method: 'GET',
				params: {
					page,
					language,
				},
			}),
			transformResponse: (response: T.FetchSimilarTvRes) => {
				const { page, results, total_pages, total_results } = response;

				const normalizedResults = normalize(results || {}, [tvEntity]);
				const { entities, result } = normalizedResults;

				return {
					entities,
					result,
					totalPages: total_pages,
					totalResults: total_results,
					page,
				};
			},
		}),

		fetchTvDetailById: builder.query<
			T.NormalizedFetchTvDetailByIdRes,
			T.FetchTvDetailByIdArgs
		>({
			query: ({ id, language = 'en-US', append_to_response }) => ({
				url: `${id}`,
				method: 'GET',
				params: {
					language,
					...(!!append_to_response && { append_to_response }),
				},
			}),
			transformResponse: (response: T.FetchTvDetailByIdRes) => {
				const tv = response;

				const normalizedResults = normalize<TvModel>(tv || {}, tvEntity);
				const { entities, result } = normalizedResults;

				return {
					entities,
					result,
				};
			},
		}),
	}),
});

export const {
	useFetchTopRatedTvQuery,
	useFetchSimilarTvByIdQuery,
	useFetchTvDetailByIdQuery,
} = tvApi;
