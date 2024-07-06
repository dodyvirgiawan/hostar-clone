import type { AppProps } from 'next/app';
import '@/styles/index.scss';
import { wrapper } from '@/redux/store';
import { Provider } from 'react-redux';

const App = ({ Component, ...rest }: AppProps) => {
	const { store, props } = wrapper.useWrappedStore(rest);

	return (
		<Provider store={store}>
			<Component {...props} />
		</Provider>
	);
};

export default App;
