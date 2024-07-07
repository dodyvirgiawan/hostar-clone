import React from 'react';

export type TabItem = {
	id: string;
	value: string;
	label: string;
};

export interface TabsProps {
	tabs: TabItem[];
	value?: TabItem['value'];
	onChange?: (value: TabItem['value']) => void;
}
