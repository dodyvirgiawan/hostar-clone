import { MediaTypeUrl } from '@/constants/media-type-url';
import { MediaType } from '@/redux/slices';
import kebabCase from 'lodash/kebabCase';

export const generateUrlFromContent = ({
	id,
	mediaType,
	title,
}: {
	id: number;
	mediaType: MediaType;
	title: string;
}) => {
	return `/${MediaTypeUrl[mediaType]}/${kebabCase(title)}/${id}`;
};
