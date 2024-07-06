import styles from './page-layout.module.scss';
import { TemplateProps } from './template.type';

const Template: React.FC<TemplateProps> = (props) => {
	const { children, ...otherProps } = props;

	return (
		<div className={styles.sample} {...otherProps}>
			{children}
		</div>
	);
};

export default Template;
