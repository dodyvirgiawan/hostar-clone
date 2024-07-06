import { RootState } from '@/redux/store';
import { createSelector } from '@reduxjs/toolkit';
import { tvAdapter } from './tv.slice';
import memoize from 'lodash/memoize';

const selectTv = (state: RootState) => state.tv;

const { selectEntities, selectAll } = tvAdapter.getSelectors<RootState>(
	(state) => state.tv,
);

export const selectAllTvs = createSelector(selectAll, (tv) => tv);

export const selectAllTopRatedTvs = createSelector(
	selectTv,
	(tv) => tv.topRatedTv.ids,
);

export const selectAllSimilarTvs = createSelector(
	selectTv,
	(tv) => tv.similarTv.ids,
);

export const selectTvById = memoize((tvId?: string) =>
	createSelector(
		selectEntities,
		(tvEntities) => tvEntities[tvId || ''] || null,
	),
);
