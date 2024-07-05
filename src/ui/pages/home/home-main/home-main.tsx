import { useFetchTopRatedMovieQuery } from '@/redux/services';
import styles from './home-main.module.scss';

const HomeMain: React.FC = () => {
	const reduxState = useFetchTopRatedMovieQuery({ page: 1 });

	return (
		<div className={styles.sample}>
			<p>Hello World</p>
		</div>
	);
};

export default HomeMain;
