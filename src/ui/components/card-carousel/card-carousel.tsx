import clsx from 'clsx';
import styles from './card-carousel.module.scss';
import { CardCarouselProps } from './card-carousel.type';
import ForwardIcon from '../../../../public/assets/arrow-forward.svg';
import BackIcon from '../../../../public/assets/arrow-back.svg';
import Image from 'next/image';
import { useState } from 'react';
import { RenderIf } from '../render-if';
import { useCardCarouselLogic } from './use-card-carousel-logic';

const CardCarousel: React.FC<CardCarouselProps> = (props) => {
	const { title, children, ...otherProps } = props;

	const {
		handlers: { scrollNext, scrollPrev },
		state: { renderNextArrow, renderPrevArrow, containerRef, scrollOffset },
	} = useCardCarouselLogic();

	const [hovered, setIsHovered] = useState(false);

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
			<RenderIf isTrue={!!title}>
				<h2 className={clsx(styles.titleText, 'font-h2')}>{title}</h2>
			</RenderIf>

			<div className={styles.wrapper}>
				<div className={styles.cardWrapper}>
					<div
						className={styles.cardContainer}
						ref={containerRef}
						style={{
							transform: `translateX(${scrollOffset}px)`,
							transition: 'transform 0.3s ease-in-out',
						}}
					>
						{children}
					</div>
				</div>

				<RenderIf isTrue={renderPrevArrow}>
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
				</RenderIf>

				<RenderIf isTrue={renderNextArrow}>
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
				</RenderIf>
			</div>
		</div>
	);
};

export default CardCarousel;
