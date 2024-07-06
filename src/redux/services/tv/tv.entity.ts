import { schema } from 'normalizr';

export const genreEntity = new schema.Entity('genre');

export const tvEntity = new schema.Entity('tv', {
	genres: [genreEntity],
});
