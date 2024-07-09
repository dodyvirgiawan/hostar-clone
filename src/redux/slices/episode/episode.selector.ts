import { RootState } from '@/redux/store';
import { createSelector } from '@reduxjs/toolkit';
import { episodeAdapter } from './episode.slice';
import memoize from 'lodash/memoize';
import { selectSeasonById } from '../season';

const { selectEntities } = episodeAdapter.getSelectors<RootState>(
	(state) => state.episode,
);

export const selectEpisodeById = memoize((episodeId?: string) =>
	createSelector(
		selectEntities,
		(episodeEntities) => episodeEntities[episodeId || ''] || null,
	),
);

export const selectEpisodeIdsBySeriesIdAndSeasonId = memoize(
	(seriesId?: number, seasonId?: number) =>
		createSelector(
			[selectEntities, selectSeasonById(String(seasonId))],
			(episodeEntities, season) => {
				const seasonNumber = season.season_number;

				// * Need to get all episodeEntities where seasonNumber and tvSeasonNumber and seriesId match

				let tempEpisodeIds: string[] = [];

				Object.keys(episodeEntities).forEach((key) => {
					const episode = episodeEntities[key];

					if (
						String(seasonNumber) === String(episode.season_number) &&
						String(seriesId) === String(episode.show_id) &&
						seasonNumber !== 0 //? for now we don't include seasonNumber 0 / specials because it is too large
					) {
						tempEpisodeIds.push(episode.id);
					}
				});

				return tempEpisodeIds;
			},
		),
	(...args) => JSON.stringify(args), // ? for two params functions, in lodash memoize need to define it this way as a cache key
);

export const selectEpisodesBySeriesIdAndSeasonId = memoize(
	(seriesId?: number, seasonId?: number) =>
		createSelector(
			[
				selectEntities,
				selectEpisodeIdsBySeriesIdAndSeasonId(seriesId, seasonId),
			],
			(episodeEntities, episodeIds) => {
				// Populate from ID into entity
				const episodes = episodeIds.map((id) => episodeEntities[id]);

				// We want to make sure it is sorted by episode number
				const sortedEpisodes = episodes.sort((a, b) =>
					a.episode_number > b.episode_number ? 1 : -1,
				);

				return sortedEpisodes;
			},
		),
	(...args) => JSON.stringify(args), // ? for two params functions, in lodash memoize need to define it this way as a cache key
);
