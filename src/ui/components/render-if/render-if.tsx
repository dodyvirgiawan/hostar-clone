import { RenderIfProps } from './render-if.type';

const RenderIf: React.FC<RenderIfProps> = (props) => {
	const { children, isTrue } = props;

	if (isTrue) return <>{children}</>;

	return null;
};

export default RenderIf;
