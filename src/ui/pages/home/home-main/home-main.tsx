import { PageLayout } from '@/ui/layouts';
import styles from './home-main.module.scss';
import { CardMovie } from '@/ui/components';
import { sampleMovie } from '../../../../../sample';

const HomeMain: React.FC = () => {
	return (
		<PageLayout>
			<div className={styles.sampleChildren}>
				<div className={styles.sampleCard}>
					<CardMovie
						title={sampleMovie.title}
						overview={sampleMovie.overview}
						posterUrl={sampleMovie.poster_path}
						backdropUrl={sampleMovie.backdrop_path}
					/>

					<CardMovie
						title={sampleMovie.title}
						overview={sampleMovie.overview}
						posterUrl={sampleMovie.poster_path}
						backdropUrl={sampleMovie.backdrop_path}
					/>
				</div>
			</div>
		</PageLayout>
	);
};

export default HomeMain;
