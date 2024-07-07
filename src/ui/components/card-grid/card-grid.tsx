import clsx from 'clsx';
import styles from './card-grid.module.scss';
import { CardGridProps } from './card-grid.type';

const CardGrid: React.FC<CardGridProps> = (props) => {
	const { title, children, ...otherProps } = props;

	return (
		<div className={styles.cardGridRoot} {...otherProps}>
			<h2 className={clsx(styles.titleText, 'font-h2')}>{title}</h2>

			<div className={styles.wrapper}>{children}</div>
		</div>
	);
};

export default CardGrid;
