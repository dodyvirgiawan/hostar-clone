import { RootState } from '@/redux/store';
import { createSelector } from '@reduxjs/toolkit';
import { seasonAdapter } from './season.slice';
import memoize from 'lodash/memoize';

const { selectEntities } = seasonAdapter.getSelectors<RootState>(
	(state) => state.season,
);

export const selectSeasonById = memoize((seasonId?: string) =>
	createSelector(
		selectEntities,
		(seasonEntities) => seasonEntities[seasonId || ''] || null,
	),
);
