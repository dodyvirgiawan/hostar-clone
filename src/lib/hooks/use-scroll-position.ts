import { useEffect, useState } from 'react';

// ? I implement this to get scroll constant of scrollY pos divided by viewport height
export const useScrollPosition = () => {
	const [scrollY, setScrollY] = useState(0);
	const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

	const handleScroll = () => {
		setScrollY(window.scrollY);
	};

	const handleResize = () => {
		setViewportHeight(window.innerHeight);
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		window.addEventListener('resize', handleResize);
		handleScroll();
		handleResize();

		return () => {
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return { scrollY, viewportHeight, coefficient: scrollY / viewportHeight };
};

export default useScrollPosition;
