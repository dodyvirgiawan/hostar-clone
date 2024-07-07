import clsx from 'clsx';
import styles from './card-grid.module.scss';
import { CardGridProps } from './card-grid.type';
import { useState } from 'react';

const CardGrid: React.FC<CardGridProps> = (props) => {
	const { title, children, ...otherProps } = props;

	const [hovered, setIsHovered] = useState(false);

	const onMouseOver = () => {
		setIsHovered(true);
	};

	const onMouseOut = () => {
		setIsHovered(false);
	};

	return (
		<div
			className={styles.cardGridRoot}
			onMouseOver={onMouseOver}
			onMouseOut={onMouseOut}
			{...otherProps}
		>
			<h2 className={clsx(styles.titleText, 'font-h2')}>{title}</h2>

			<div className={styles.wrapper}>CardGrid</div>
		</div>
	);
};

export default CardGrid;
