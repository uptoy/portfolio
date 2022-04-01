import React from 'react';
import type { NextPage } from 'next';
import type { PageProps } from '../commonTypes';
import type { AppContext, AppInitialProps } from 'next/app';
declare type Props = {
    Component: NextPage;
    pageProps: PageProps | undefined;
};
declare const DefaultApp: React.FC<Props> & {
    getInitialProps?: (appContext: AppContext) => Promise<AppInitialProps>;
};
export default DefaultApp;
