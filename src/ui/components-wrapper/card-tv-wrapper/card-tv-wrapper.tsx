import { useAppSelector } from '@/redux/store';
import React from 'react';
import { CardTvWrapperProps } from './card-tv-wrapper.type';
import { selectTvById } from '@/redux/slices';
import { CardContent } from '@/ui/components/card-content';

const CardTvWrapper: React.FC<CardTvWrapperProps> = (props) => {
	const { id, mediaType, ...otherProps } = props;

	const tvDetail = useAppSelector(selectTvById(id));

	const handleAddToWatchlist = () => {
		//...
	};

	const handleRemoveFromWatchlist = () => {
		// ...
	};

	if (!tvDetail) return null;

	return (
		<CardContent
			id={Number(id)}
			backdropUrl={tvDetail.backdrop_path}
			mediaType={mediaType}
			overview={tvDetail.overview}
			posterUrl={tvDetail.poster_path}
			title={tvDetail.name}
			onAddToWatchlistClick={handleAddToWatchlist}
			onRemoveFromWatchlistClick={handleRemoveFromWatchlist}
			{...otherProps}
		/>
	);
};

export default CardTvWrapper;
