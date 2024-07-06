import { PageLayout } from '@/ui/layouts';
import styles from './home-main.module.scss';
import { Button, CardCarousel, CardMovie, CardTvSeries } from '@/ui/components';
import { sampleMovie, sampleTvSeries } from '../../../../../sample';

const HomeMain: React.FC = () => {
	return (
		<PageLayout>
			<div className={styles.sampleChildren}>
				<CardCarousel title="Top Rated Movies & TV Series">
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
				</CardCarousel>
			</div>
		</PageLayout>
	);
};

export default HomeMain;
