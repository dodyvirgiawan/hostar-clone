import { store } from '@/redux/store';
import React from 'react';
import { Provider } from 'react-redux';
import { ReduxProviderProps } from './redux-provider.type';

const ReduxProvider: React.FC<ReduxProviderProps> = (props) => {
	const { children, ...otherProps } = props;

	return (
		<Provider store={store} {...otherProps}>
			{children}
		</Provider>
	);
};

export default ReduxProvider;
