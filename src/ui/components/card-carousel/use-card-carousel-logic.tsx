import { useEffect, useMemo, useRef, useState } from 'react';

// ? I usually split the code that is logic heavy to a hook for the component.
// ? And i import the variables / handlers needed on the main component
export const useCardCarouselLogic = () => {
	const [scrollOffset, setScrollOffset] = useState(0);
	const [maxScrollOffset, setMaxScrollOffset] = useState(0);

	const cardContainerRef = useRef<HTMLDivElement>(null);

	const renderPrevArrow = useMemo(() => scrollOffset > 0, [scrollOffset]);
	const renderNextArrow = useMemo(
		() => scrollOffset < maxScrollOffset,
		[scrollOffset, maxScrollOffset],
	);

	useEffect(() => {
		if (!cardContainerRef.current) return;

		// ? maxOffset would be the delta between the width of the container, and the width of the viewable content (if all card is displayed)
		const maxOffset =
			cardContainerRef.current.clientWidth -
			cardContainerRef.current.scrollWidth;

		setMaxScrollOffset(Math.abs(maxOffset));
	}, [cardContainerRef]);

	const scrollNext = () => {
		if (!cardContainerRef.current) return;

		const scrollAmount = cardContainerRef.current.clientWidth / 1.5; // ? 1.5 is a multiplier just to decrease the scrollAmount (prevent a card item not being accesible, can be tweaked)

		// ? to prevent from scrolling to blank space on the right-most content
		// ? need to find the min value between to-be-offset and the max scroll offset (the right most)
		setScrollOffset((prevOffset) =>
			Math.min(prevOffset + scrollAmount, maxScrollOffset),
		);
	};

	const scrollPrev = () => {
		if (!cardContainerRef.current) return;

		const scrollAmount = cardContainerRef.current.clientWidth / 1.5; // ? 1.5 is a divider just to decrease the scrollAmount (prevent a card item not being accesible, can be tweaked)

		// ? to prevent from scrolling to blank space on the left-most content
		// ? need to find the max value between to-be-offset and 0 (the left most)
		setScrollOffset((prevOffset) => Math.max(prevOffset - scrollAmount, 0));
	};

	return {
		handlers: { scrollNext, scrollPrev },
		state: {
			renderNextArrow,
			renderPrevArrow,
			containerRef: cardContainerRef,
			scrollOffset,
			maxScrollOffset,
		},
	};
};
