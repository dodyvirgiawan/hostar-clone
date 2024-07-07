import clsx from 'clsx';
import styles from './tabs.module.scss';
import { TabsProps } from './tabs.type';

const Tabs: React.FC<TabsProps> = (props) => {
	const { tabs, onChange, value, ...otherProps } = props;

	const onSelect: TabsProps['onChange'] = (value) => {
		if (onChange) onChange(value);
	};

	return (
		<div className={styles.tabsRoot} {...otherProps}>
			{tabs.map((tab) => {
				return (
					<div
						role="tab"
						key={tab.id}
						className={styles.tabItem}
						onClick={() => onSelect(tab.value)}
					>
						<p
							className={clsx('font-p', styles.tabLabelText, {
								[styles.selectedText]: value === tab.value,
								[styles.unselectedText]: value !== tab.value,
							})}
						>
							{tab.label}
						</p>
					</div>
				);
			})}
		</div>
	);
};

export default Tabs;
