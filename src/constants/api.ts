// ? Store all the env as variable

export const TMDB_API_BASE_URL = process.env.NEXT_PUBLIC_TMDB_API_URL;
export const TMDB_API_V3 = `${TMDB_API_BASE_URL}/3`;
export const TMDB_API_KEY =
	process.env.NEXT_PUBLIC_TMDB_API_KEY || 'INPUT_API_KEY_HERE';
export const TMDB_IMG_URL =
	process.env.TMDB_IMG_URL || 'https://image.tmdb.org/t/p';
export const SITE_URL =
	process.env.NEXT_PUBLIC_SITE_URL || 'https://hotstar-clone-mu.vercel.app';
