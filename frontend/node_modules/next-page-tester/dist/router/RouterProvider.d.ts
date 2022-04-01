/// <reference types="react" />
import { ExtendedOptions, MakePageResult, PageObject } from '../commonTypes';
export default function RouterProvider({ pageObject, options, children: initialChildren, makePage, }: {
    pageObject: PageObject;
    options: ExtendedOptions;
    children: JSX.Element;
    makePage: (optionsOverride?: Partial<ExtendedOptions>) => Promise<MakePageResult>;
}): JSX.Element;
