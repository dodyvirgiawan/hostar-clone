import { useAppSelector } from '@/redux/store';
import React from 'react';
import { CardMovieWrapperProps } from './card-movie-wrapper.type';
import { selectMovieById } from '@/redux/slices';
import { CardContent } from '@/ui/components/card-content';

const CardMovieWrapper: React.FC<CardMovieWrapperProps> = (props) => {
	const { id, mediaType, ...otherProps } = props;

	const movieDetail = useAppSelector(selectMovieById(id));

	return (
		<CardContent
			id={Number(id)}
			backdropUrl={movieDetail.backdrop_path}
			mediaType={mediaType}
			overview={movieDetail.overview}
			posterUrl={movieDetail.poster_path}
			title={movieDetail.title}
			{...otherProps}
		/>
	);
};

export default CardMovieWrapper;
