import clsx from 'clsx';
import styles from './card-carousel.module.scss';
import { CardCarouselProps } from './card-carousel.type';
import ForwardIcon from '../../../../public/assets/arrow-forward.svg';
import BackIcon from '../../../../public/assets/arrow-back.svg';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const CardCarousel: React.FC<CardCarouselProps> = (props) => {
	const { title, children, ...otherProps } = props;

	const [hovered, setIsHovered] = useState(false);

	const [scrollOffset, setScrollOffset] = useState(0);
	const [maxScrollOffset, setMaxScrollOffset] = useState(0);

	const cardContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (cardContainerRef.current) {
			const maxOffset =
				cardContainerRef.current.scrollWidth -
				cardContainerRef.current.clientWidth;
			setMaxScrollOffset(-maxOffset);
		}
	}, [cardContainerRef]);

	const scrollNext = () => {
		if (!cardContainerRef.current) return;

		const scrollAmount = cardContainerRef.current.clientWidth;

		setScrollOffset((prevOffset) =>
			Math.max(prevOffset - scrollAmount, maxScrollOffset),
		);
	};

	const scrollPrev = () => {
		if (!cardContainerRef.current) return;

		const scrollAmount = cardContainerRef.current.clientWidth;

		setScrollOffset((prevOffset) => Math.min(prevOffset + scrollAmount, 0));
	};

	const onMouseOver = () => {
		setIsHovered(true);
	};

	const onMouseOut = () => {
		setIsHovered(false);
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
					<div
						className={styles.cardContainer}
						ref={cardContainerRef}
						style={{
							transform: `translateX(${scrollOffset}px)`,
							transition: 'transform 0.3s ease-in-out',
						}}
					>
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
