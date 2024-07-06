import { PageLayout } from '@/ui/layouts';
import styles from './home-main.module.scss';

const HomeMain: React.FC = () => {
	return (
		<PageLayout>
			<div className={styles.sampleChildren}></div>
		</PageLayout>
	);
};

export default HomeMain;
