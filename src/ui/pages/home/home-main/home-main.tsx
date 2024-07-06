import { PageLayout } from '@/ui/layouts';
import styles from './home-main.module.scss';
import { Button, CardMovie, CardTvSeries } from '@/ui/components';
import { sampleMovie, sampleTvSeries } from '../../../../../sample';

const HomeMain: React.FC = () => {
	return (
		<PageLayout>
			<div className={styles.sampleChildren}>
				<div className={styles.sampleCard}>
					<CardMovie
						id={sampleMovie.id}
						title={sampleMovie.title}
						overview={sampleMovie.overview}
						posterUrl={sampleMovie.poster_path}
						backdropUrl={sampleMovie.backdrop_path}
					/>
				</div>

				<div className={styles.sampleCard}>
					<CardTvSeries
						id={sampleTvSeries.id}
						title={sampleTvSeries.name}
						overview={sampleTvSeries.overview}
						posterUrl={sampleTvSeries.poster_path}
						backdropUrl={sampleTvSeries.backdrop_path}
					/>
				</div>
			</div>
		</PageLayout>
	);
};

export default HomeMain;
