import { PageLayout } from '@/ui/layouts';
import styles from './search-main.module.scss';
import { SearchMainProps } from './search-main.type';
import { CardMovieWrapper, CardTvWrapper } from '@/ui/components-wrapper';
import Head from 'next/head';

const SearchMain: React.FC<SearchMainProps> = (props) => {
	const { data } = props;

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
				<div className={styles.homeMainRoot}>SearchMain</div>
			</PageLayout>
		</>
	);
};

export default SearchMain;
