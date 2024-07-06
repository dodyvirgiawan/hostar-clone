import { PageLayout } from '@/ui/layouts';
import styles from './home-main.module.scss';
import { CardCarousel, CardMovie, CardTvSeries } from '@/ui/components';
import { sampleMovie, sampleTvSeries } from '../../../../../sample';

const HomeMain: React.FC = () => {
	return (
		<PageLayout>
			<div className={styles.homeMainRoot}>
				<CardCarousel title="Top Rated Movies & TV Series">
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
				</CardCarousel>

				<CardCarousel title="Top Rated Movie of the Week">
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
			</div>
		</PageLayout>
	);
};

export default HomeMain;
