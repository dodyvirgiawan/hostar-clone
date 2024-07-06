import { PageLayout } from '@/ui/layouts';
import styles from './home-main.module.scss';
import { CardCarousel, CardContent } from '@/ui/components';
import { HomeMainProps } from './home-main.type';

const HomeMain: React.FC<HomeMainProps> = (props) => {
	const { content } = props;

	const {
		topRatedMovieIds,
		topRatedTvSeriesIds,
		trendingMovieOfTheWeekIds,
		trendingTvSeriesOfTheWeekIds,
	} = content;

	// console.log(content, '<< asd');

	return (
		<PageLayout>
			<div className={styles.homeMainRoot}>
				{/* <CardCarousel title="Top Rated Movies & TV Series">
					{topRatedMoviesAndTvSeries?.map((item) => {
						if (!item.media_type) return null;

						const title = (() => {
							if (item.media_type === 'tv') return item.name;
							if (item.media_type === 'movie') return item.title;
							return '';
						})();

						return (
							<div className={styles.cardWrapper} key={item.id}>
								<CardContent
									id={Number(item.id)}
									mediaType={item.media_type}
									title={title}
									overview={item.overview}
									posterUrl={item.poster_path}
									backdropUrl={item.backdrop_path}
								/>
							</div>
						);
					})}
				</CardCarousel> */}

				{/* <CardCarousel title="Top Rated Movie of the Week">
					<div className={styles.cardWrapper}>
						<CardTvSeries
							id={sampleTvSeries.id}
							title="first"
							overview={sampleTvSeries.overview}
							posterUrl={sampleTvSeries.poster_path}
							backdropUrl={sampleTvSeries.backdrop_path}
						/>
					</div>

					<div className={styles.cardWrapper}>
						<CardTvSeries
							id={sampleTvSeries.id}
							title={sampleTvSeries.name}
							overview={sampleTvSeries.overview}
							posterUrl={sampleTvSeries.poster_path}
							backdropUrl={sampleTvSeries.backdrop_path}
						/>
					</div>

					<div className={styles.cardWrapper}>
						<CardTvSeries
							id={sampleTvSeries.id}
							title={sampleTvSeries.name}
							overview={sampleTvSeries.overview}
							posterUrl={sampleTvSeries.poster_path}
							backdropUrl={sampleTvSeries.backdrop_path}
						/>
					</div>

					<div className={styles.cardWrapper}>
						<CardTvSeries
							id={sampleTvSeries.id}
							title={sampleTvSeries.name}
							overview={sampleTvSeries.overview}
							posterUrl={sampleTvSeries.poster_path}
							backdropUrl={sampleTvSeries.backdrop_path}
						/>
					</div>

					<div className={styles.cardWrapper}>
						<CardTvSeries
							id={sampleTvSeries.id}
							title={sampleTvSeries.name}
							overview={sampleTvSeries.overview}
							posterUrl={sampleTvSeries.poster_path}
							backdropUrl={sampleTvSeries.backdrop_path}
						/>
					</div>

					<div className={styles.cardWrapper}>
						<CardTvSeries
							id={sampleTvSeries.id}
							title={sampleTvSeries.name}
							overview={sampleTvSeries.overview}
							posterUrl={sampleTvSeries.poster_path}
							backdropUrl={sampleTvSeries.backdrop_path}
						/>
					</div>

					<div className={styles.cardWrapper}>
						<CardTvSeries
							id={sampleTvSeries.id}
							title={sampleTvSeries.name}
							overview={sampleTvSeries.overview}
							posterUrl={sampleTvSeries.poster_path}
							backdropUrl={sampleTvSeries.backdrop_path}
						/>
					</div>

					<div className={styles.cardWrapper}>
						<CardTvSeries
							id={sampleTvSeries.id}
							title={sampleTvSeries.name}
							overview={sampleTvSeries.overview}
							posterUrl={sampleTvSeries.poster_path}
							backdropUrl={sampleTvSeries.backdrop_path}
						/>
					</div>

					<div className={styles.cardWrapper}>
						<CardTvSeries
							id={sampleTvSeries.id}
							title={sampleTvSeries.name}
							overview={sampleTvSeries.overview}
							posterUrl={sampleTvSeries.poster_path}
							backdropUrl={sampleTvSeries.backdrop_path}
						/>
					</div>

					<div className={styles.cardWrapper}>
						<CardTvSeries
							id={sampleTvSeries.id}
							title="last"
							overview={sampleTvSeries.overview}
							posterUrl={sampleTvSeries.poster_path}
							backdropUrl={sampleTvSeries.backdrop_path}
						/>
					</div>
				</CardCarousel>

				<CardCarousel title="Top Rated TV Series of the Week">
					<div className={styles.cardWrapper}>
						<CardMovie
							id={sampleMovie.id}
							title="first"
							overview={sampleMovie.overview}
							posterUrl={sampleMovie.poster_path}
							backdropUrl={sampleMovie.backdrop_path}
						/>
					</div>

					<div className={styles.cardWrapper}>
						<CardMovie
							id={sampleMovie.id}
							title={sampleMovie.title}
							overview={sampleMovie.overview}
							posterUrl={sampleMovie.poster_path}
							backdropUrl={sampleMovie.backdrop_path}
						/>
					</div>

					<div className={styles.cardWrapper}>
						<CardMovie
							id={sampleMovie.id}
							title={sampleMovie.title}
							overview={sampleMovie.overview}
							posterUrl={sampleMovie.poster_path}
							backdropUrl={sampleMovie.backdrop_path}
						/>
					</div>

					<div className={styles.cardWrapper}>
						<CardMovie
							id={sampleMovie.id}
							title={sampleMovie.title}
							overview={sampleMovie.overview}
							posterUrl={sampleMovie.poster_path}
							backdropUrl={sampleMovie.backdrop_path}
						/>
					</div>

					<div className={styles.cardWrapper}>
						<CardMovie
							id={sampleMovie.id}
							title={sampleMovie.title}
							overview={sampleMovie.overview}
							posterUrl={sampleMovie.poster_path}
							backdropUrl={sampleMovie.backdrop_path}
						/>
					</div>

					<div className={styles.cardWrapper}>
						<CardMovie
							id={sampleMovie.id}
							title={sampleMovie.title}
							overview={sampleMovie.overview}
							posterUrl={sampleMovie.poster_path}
							backdropUrl={sampleMovie.backdrop_path}
						/>
					</div>

					<div className={styles.cardWrapper}>
						<CardMovie
							id={sampleMovie.id}
							title={sampleMovie.title}
							overview={sampleMovie.overview}
							posterUrl={sampleMovie.poster_path}
							backdropUrl={sampleMovie.backdrop_path}
						/>
					</div>

					<div className={styles.cardWrapper}>
						<CardMovie
							id={sampleMovie.id}
							title={sampleMovie.title}
							overview={sampleMovie.overview}
							posterUrl={sampleMovie.poster_path}
							backdropUrl={sampleMovie.backdrop_path}
						/>
					</div>

					<div className={styles.cardWrapper}>
						<CardMovie
							id={sampleMovie.id}
							title={sampleMovie.title}
							overview={sampleMovie.overview}
							posterUrl={sampleMovie.poster_path}
							backdropUrl={sampleMovie.backdrop_path}
						/>
					</div>

					<div className={styles.cardWrapper}>
						<CardMovie
							id={sampleMovie.id}
							title="last"
							overview={sampleMovie.overview}
							posterUrl={sampleMovie.poster_path}
							backdropUrl={sampleMovie.backdrop_path}
						/>
					</div>
				</CardCarousel> */}
			</div>
		</PageLayout>
	);
};

export default HomeMain;
