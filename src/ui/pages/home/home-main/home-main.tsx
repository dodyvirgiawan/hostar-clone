import { PageLayout } from '@/ui/layouts';
import styles from './home-main.module.scss';
import { CardCarousel } from '@/ui/components';
import { HomeMainProps } from './home-main.type';
import { CardMovieWrapper, CardTvWrapper } from '@/ui/components-wrapper';
import Head from 'next/head';

const HomeMain: React.FC<HomeMainProps> = (props) => {
	const { data } = props;

	const {
		topRatedMovieIds,
		topRatedTvSeriesIds,
		trendingMovieOfTheWeekIds,
		trendingTvSeriesOfTheWeekIds,
	} = data;

	return (
		<>
			<Head>
				<title>Disney+ Hotstar | Stream your favourite stories and more</title>

				<meta
					content="Disney+ Hotstar | Stream your favourite stories and more"
					name="title"
				/>

				<meta
					content="Subscribe now to watch Disney, Pixar, Marvel, Star Wars, National Geographic and Star."
					name="description"
				/>
			</Head>

			<PageLayout>
				<div className={styles.homeMainRoot}>
					<CardCarousel title="Top Rated Movies & TV Series">
						{topRatedMovieIds.map((id) => {
							return (
								<div key={id} className={styles.cardWrapper}>
									<CardMovieWrapper id={Number(id)} mediaType="movie" />
								</div>
							);
						})}

						{topRatedTvSeriesIds.map((id) => {
							return (
								<div key={id} className={styles.cardWrapper}>
									<CardTvWrapper id={Number(id)} mediaType="tv" />
								</div>
							);
						})}
					</CardCarousel>

					<CardCarousel title="Top Rated Movie of The Week">
						{trendingMovieOfTheWeekIds.map((id) => {
							return (
								<div key={id} className={styles.cardWrapper}>
									<CardMovieWrapper id={Number(id)} mediaType="movie" />
								</div>
							);
						})}
					</CardCarousel>

					<CardCarousel title="Top Rated TV Series of The Week">
						{trendingTvSeriesOfTheWeekIds.map((id) => {
							return (
								<div key={id} className={styles.cardWrapper}>
									<CardTvWrapper id={Number(id)} mediaType="tv" />
								</div>
							);
						})}
					</CardCarousel>
				</div>
			</PageLayout>
		</>
	);
};

export default HomeMain;
