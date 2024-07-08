import React from 'react';

export interface SearchFieldProps {
	value: string;
	onChange?: (value: string) => void;
	placeholder?: string;
}
