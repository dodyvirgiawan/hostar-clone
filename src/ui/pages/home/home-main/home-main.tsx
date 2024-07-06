import { PageLayout } from '@/ui/layouts';
import styles from './home-main.module.scss';
import { CardCarousel } from '@/ui/components';
import { HomeMainProps } from './home-main.type';
import { CardMovieWrapper, CardTvWrapper } from '@/ui/components-wrapper';

const HomeMain: React.FC<HomeMainProps> = (props) => {
	const { data } = props;

	console.log(data);

	return (
		<PageLayout>
			<div className={styles.homeMainRoot}>
				{/* <CardCarousel title="Top Rated Movies & TV Series">
					{topRatedMovieIds?.map((id) => {
						return (
							<div key={id} className={styles.cardWrapper}>
								<CardMovieWrapper id={Number(id)} mediaType="movie" />
							</div>
						);
					})}

					{topRatedTvSeriesIds?.map((id) => {
						return (
							<div key={id} className={styles.cardWrapper}>
								<CardTvWrapper id={Number(id)} mediaType="tv" />
							</div>
						);
					})}
				</CardCarousel> */}
			</div>
		</PageLayout>
	);
};

export default HomeMain;
