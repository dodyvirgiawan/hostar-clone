import { Sidebar } from '@/ui/components';
import styles from './page-layout.module.scss';
import { PageLayoutProps } from './page-layout.type';
import { Menus } from '@/constants/menu';

const PageLayout: React.FC<PageLayoutProps> = (props) => {
	const { children, ...otherProps } = props;

	return (
		<div className={styles.pageLayoutRoot} {...otherProps}>
			<Sidebar menus={Menus} />

			<main className={styles.childrenContainer}>{children}</main>
		</div>
	);
};

export default PageLayout;
