import { store } from '@/redux/store';
import React from 'react';
import { Provider } from 'react-redux';
import { ReduxProviderProps } from './redux-provider.type';

// ? This is only used if we dont want to integrate redux toolkit with SSR, for this case this is unused.
const ReduxProvider: React.FC<ReduxProviderProps> = (props) => {
	const { children, ...otherProps } = props;

	return (
		<Provider store={store} {...otherProps}>
			{children}
		</Provider>
	);
};

export default ReduxProvider;
