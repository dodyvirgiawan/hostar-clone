import type { AppProps } from 'next/app';
import '@/styles/index.scss';
import { ReduxProvider } from '@/ui/components-wrapper';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ReduxProvider>
			<Component {...pageProps} />
		</ReduxProvider>
	);
}
