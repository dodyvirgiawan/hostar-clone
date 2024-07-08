import { useEffect, useMemo, useState } from 'react';

// ? I implement this to get scroll constant of scrollY pos divided by viewport height
export const useScrollCoefficient = () => {
	const [scrollY, setScrollY] = useState(0);
	const [viewportHeight, setViewportHeight] = useState(0);

	const handleScroll = () => {
		if (typeof window === undefined) return;

		setScrollY(window.scrollY);
	};

	const handleResize = () => {
		if (typeof window === undefined) return;

		setViewportHeight(window.innerHeight);
	};

	useEffect(() => {
		if (typeof window === undefined) return;

		window.addEventListener('scroll', handleScroll);
		window.addEventListener('resize', handleResize);
		handleScroll();
		handleResize();

		return () => {
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const coefficient = useMemo(() => {
		if (!scrollY && scrollY !== 0) return 0;
		if (!viewportHeight && viewportHeight !== 0) return 0;
		if (scrollY === 0 && viewportHeight === 0) return 0;

		return (Number(scrollY) / Number(viewportHeight)) * 2;
	}, [scrollY, viewportHeight]);

	return {
		scrollY,
		viewportHeight,
		coefficient,
	};
};

export default useScrollCoefficient;
