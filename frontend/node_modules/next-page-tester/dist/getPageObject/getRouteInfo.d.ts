import type { ExtendedOptions, RouteInfo } from '../commonTypes';
export default function getRouteInfo({ options, }: {
    options: ExtendedOptions;
}): Promise<RouteInfo | undefined>;
