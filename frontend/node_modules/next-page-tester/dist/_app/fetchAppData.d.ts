import type { AppInitialProps } from 'next/app';
import { PageObject, ExtendedOptions } from '../commonTypes';
export default function fetchAppData({ pageObject, options, }: {
    pageObject: PageObject;
    options: ExtendedOptions;
}): Promise<AppInitialProps | undefined>;
