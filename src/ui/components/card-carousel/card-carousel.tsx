import clsx from 'clsx';
import styles from './card-carousel.module.scss';
import { CardCarouselProps } from './card-carousel.type';
import ForwardIcon from '../../../../public/assets/arrow-forward.svg';
import BackIcon from '../../../../public/assets/arrow-back.svg';
import Image from 'next/image';
import { useRef, useState } from 'react';

const CardCarousel: React.FC<CardCarouselProps> = (props) => {
	const { title, children, ...otherProps } = props;

	const [hovered, setIsHovered] = useState(false);

	const cardContainerRef = useRef<HTMLDivElement>(null);

	const onMouseOver = () => {
		setIsHovered(true);
	};

	const onMouseOut = () => {
		setIsHovered(false);
	};

	const scrollNext = () => {
		console.log('scroll next');

		if (cardContainerRef.current) {
			const scrollAmount = cardContainerRef.current.clientWidth;
			cardContainerRef.current.scrollLeft += scrollAmount;
		}
	};

	const scrollPrev = () => {
		console.log('scroll prev');

		if (cardContainerRef.current) {
			const scrollAmount = cardContainerRef.current.clientWidth;
			cardContainerRef.current.scrollLeft -= scrollAmount;
		}
	};

	return (
		<div
			className={styles.cardCarouselRoot}
			onMouseOver={onMouseOver}
			onMouseOut={onMouseOut}
			{...otherProps}
		>
			<p className={clsx(styles.titleText, 'font-h2')}>{title}</p>

			<div className={styles.wrapper}>
				<div className={styles.cardWrapper}>
					<div className={styles.cardContainer} ref={cardContainerRef}>
						{children}
					</div>
				</div>

				<div
					onClick={scrollPrev}
					className={clsx(styles.leftArrowContainer, {
						[styles.hide]: !hovered,
						[styles.show]: !!hovered,
					})}
				>
					<div className={styles.logoContainer}>
						<Image alt="Previous" src={BackIcon} />
					</div>
				</div>

				<div
					onClick={scrollNext}
					className={clsx(styles.rightArrowContainer, {
						[styles.hide]: !hovered,
						[styles.show]: !!hovered,
					})}
				>
					<div className={styles.logoContainer}>
						<Image alt="Next" src={ForwardIcon} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default CardCarousel;
