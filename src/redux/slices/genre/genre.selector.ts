import { RootState } from '@/redux/store';
import { createSelector } from '@reduxjs/toolkit';
import { genreAdapter } from './genre.slice';
import memoize from 'lodash/memoize';

const { selectEntities } = genreAdapter.getSelectors<RootState>(
	(state) => state.genre,
);

export const selectGenreById = memoize((genreId?: string) =>
	createSelector(
		selectEntities,
		(genreEntities) => genreEntities[genreId || ''] || null,
	),
);
