import type { ExtendedOptions, NextExistingPageFiles, NextErrorPageFiles, MultiEnv } from './commonTypes';
export declare function loadExistingPageFiles({ absolutePagePath, options, }: {
    absolutePagePath: string;
    options: ExtendedOptions;
}): MultiEnv<NextExistingPageFiles>;
export declare function loadErrorPageFiles({ absolutePagePath, options, }: {
    absolutePagePath: string;
    options: ExtendedOptions;
}): MultiEnv<NextErrorPageFiles>;
