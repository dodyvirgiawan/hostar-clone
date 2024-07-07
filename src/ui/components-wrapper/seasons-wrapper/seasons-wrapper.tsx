import React from 'react';
import { SeasonsWrapperProps } from './seasons-wrapper.type';
import { selectEpisodeIdsBySeriesIdAndSeasonId } from '@/redux/slices';
import { useAppSelector } from '@/redux/store';
import { CardEpisodeWrapper } from '../card-episode-wrapper';
import { useFetchTvSeasonDetailQuery } from '@/redux/services';
import { RenderIf } from '@/ui/components/render-if';
import { CardEpisode } from '@/ui/components/card-episode';

const SeasonsWrapper: React.FC<SeasonsWrapperProps> = (props) => {
	const { seasonId, tvSeriesId, seasonNumber } = props;

	const episodeIds = useAppSelector(
		selectEpisodeIdsBySeriesIdAndSeasonId(tvSeriesId, seasonId),
	);

	const { isFetching } = useFetchTvSeasonDetailQuery(
		{
			season_number: String(seasonNumber),
			series_id: String(tvSeriesId),
		},
		{
			refetchOnMountOrArgChange: true,
			skip: !!episodeIds.length, // ? This is to prevent fetching whenever first load, because data is already from server (SSR)
		},
	);

	return (
		<>
			<RenderIf isTrue={!isFetching}>
				{episodeIds.map((id) => {
					return <CardEpisodeWrapper id={Number(id)} key={id} />;
				})}
			</RenderIf>

			<RenderIf isTrue={isFetching}>
				<>
					{Array.from(Array(5).keys()).map((idx) => {
						return (
							<CardEpisode
								key={idx}
								posterUrl=""
								name=""
								season={0}
								episode={0}
								duration={0}
								airDate=""
								overview=""
								loading
							/>
						);
					})}
				</>
			</RenderIf>
		</>
	);
};

export default SeasonsWrapper;
