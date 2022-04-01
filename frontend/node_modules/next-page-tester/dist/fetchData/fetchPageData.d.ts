import type { AppInitialProps } from 'next/app';
import { ExtendedOptions, PageObject, PageData } from '../commonTypes';
export default function fetchPageData({ pageObject, appInitialProps, options, }: {
    pageObject: PageObject;
    appInitialProps?: AppInitialProps;
    options: ExtendedOptions;
}): Promise<PageData>;
