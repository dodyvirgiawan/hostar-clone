import { useAppSelector } from '@/redux/store';
import React from 'react';
import { CardEpisodeWrapperProps } from './card-episode-wrapper.type';
import * as SL from '@/redux/slices';
import { CardEpisode } from '@/ui/components/card-episode';

const CardEpisodeWrapper: React.FC<CardEpisodeWrapperProps> = (props) => {
	const { id, ...otherProps } = props;

	const episodeDetail = useAppSelector(SL.selectEpisodeById(String(id)));

	return (
		<CardEpisode
			posterUrl={episodeDetail.still_path}
			name={episodeDetail.name}
			season={episodeDetail.season_number}
			episode={episodeDetail.episode_number}
			duration={episodeDetail.runtime}
			airDate={episodeDetail.air_date}
			overview={episodeDetail.overview}
			{...otherProps}
		/>
	);
};

export default CardEpisodeWrapper;
