import { RootState } from '@/redux/store';
import { createSelector } from '@reduxjs/toolkit';
import { episodeAdapter } from './episode.slice';
import memoize from 'lodash/memoize';

const { selectEntities } = episodeAdapter.getSelectors<RootState>(
	(state) => state.episode,
);

export const selectEpisodeById = memoize((episodeId?: string) =>
	createSelector(
		selectEntities,
		(episodeEntities) => episodeEntities[episodeId || ''] || null,
	),
);
