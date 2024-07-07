import { PageLayout } from '@/ui/layouts';
import styles from './movie-detail-main.module.scss';
import { MovieDetailMainProps } from './movie-detail-main.type';
import Head from 'next/head';

const MovieDetailMain: React.FC<MovieDetailMainProps> = (props) => {
	const { data } = props;

	const { movieDetail, movieRecommendationIds } = data;

	const title = `${movieDetail.title} full movie. Watch now in Disney Hotstar+`;

	return (
		<>
			<Head>
				<title>{title}</title>

				<meta content={title} name="title" />
				<meta content={movieDetail.overview} name="description" />
			</Head>

			<PageLayout>
				<div className={styles.homeMainRoot}>MovieDetailMain</div>
			</PageLayout>
		</>
	);
};

export default MovieDetailMain;
