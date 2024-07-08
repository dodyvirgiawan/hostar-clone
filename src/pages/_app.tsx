import type { AppProps } from 'next/app';
import '@/styles/index.scss';
import { wrapper } from '@/redux/store';
import { Provider } from 'react-redux';
import Head from 'next/head';
import { useCanonical } from '@/lib/hooks';

const App = ({ Component, ...rest }: AppProps) => {
	const { store, props } = wrapper.useWrappedStore(rest);

	const { url: canonicalUrl } = useCanonical();

	return (
		<>
			<Head>
				<meta content="notranslate" name="google" />
				<link href={canonicalUrl} rel="canonical" />
			</Head>

			<Provider store={store}>
				<Component {...props} />
			</Provider>
		</>
	);
};

export default App;
