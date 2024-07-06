import { AppProps } from 'next/app';
import React from 'react';

export interface ReduxProviderProps {
	children: React.ReactNode;
	pageProps: AppProps;
}
