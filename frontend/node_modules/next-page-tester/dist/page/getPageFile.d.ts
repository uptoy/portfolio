import type { ExtendedOptions } from '../commonTypes';
declare type GetPageOptions = {
    pagePath: string;
    options: ExtendedOptions;
};
export declare function getPagePath({ pagePath, options: { pageExtensions, pagesDirectory }, }: GetPageOptions): string;
export declare function getPagePathIfExists(options: GetPageOptions): string | undefined;
export declare function getPageFileIfExists<FileType>({ pagePath, options, }: GetPageOptions): FileType | undefined;
export {};
