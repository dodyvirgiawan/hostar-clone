import { useFetchTvSeasonDetailQuery } from '@/redux/services';
import styles from './home-main.module.scss';

const HomeMain: React.FC = () => {
	const reduxData = useFetchTvSeasonDetailQuery({
		season_number: '0',
		series_id: '76479',
	});

	return (
		<div className={styles.sample}>
			<p>Hello World</p>
		</div>
	);
};

export default HomeMain;
