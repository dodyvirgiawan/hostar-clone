import { GenreModel, TvModel } from '@/redux/slices';

export interface HeroContentTvProps {
	title: TvModel['name'];
	backdropUrl: TvModel['backdrop_path'];
	airDate: TvModel['first_air_date'];
	language: TvModel['original_language'];
	overview: TvModel['overview'];
	genres: GenreModel[];
	numberOfSeasons: number;
	isInWatchlist?: boolean;
	onAddToWatchlist?: () => void;
	onRemoveFromWatchlist?: () => void;
	loadingButton?: boolean;
}
