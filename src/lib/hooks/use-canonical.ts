import { SITE_URL } from '@/constants/api';
import { useRouter } from 'next/router';

// ? Hook that is used to create canonical url's to prevent crawl bots assuming that some URL is considered duplicate and demoting from search results
// ? (Reference: https://nextjs.org/learn-pages-router/seo/crawling-and-indexing/canonical)
// ? This might be the case when there might be duplicate content in home page (top rated movies) and movie detail page (similar movie)
// ? I just extract the current path without the query params
export const useCanonical = () => {
	const router = useRouter();

	const pathSliceLength = Math.min.apply(Math, [
		router.asPath.indexOf('?') > 0
			? router.asPath.indexOf('?')
			: router.asPath.length,
		router.asPath.indexOf('#') > 0
			? router.asPath.indexOf('#')
			: router.asPath.length,
	]);

	return { url: SITE_URL + router.asPath.substring(0, pathSliceLength) };
};

export default useCanonical;
