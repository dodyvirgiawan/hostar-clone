export interface MovieModel {
	id: string;
	title: string;
	poster_path: string;
	backdrop_path: string;
	overview: string;
	release_date: string;
}

export interface MovieDetailModel extends MovieModel {
	genres?: string[]; // ? This is needed in MovieDetailPage, with append_to_response
}
