import { useState, useEffect } from 'react';

const useDebounce = (
	value: string | number | boolean | Record<string, any> | null,
	delay = 700,
) => {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);
		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]);

	return debouncedValue;
};

export default useDebounce;
