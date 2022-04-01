/// <reference types="react" />
export declare function makeRenderMethods({ serverPageElement, clientPageElement, }: {
    serverPageElement: JSX.Element;
    clientPageElement: JSX.Element;
}): {
    serverRenderToString: () => {
        html: string;
    };
    serverRender: () => {
        nextRoot: HTMLElement;
    };
    render: () => {
        nextRoot: HTMLElement;
    };
};
export declare function cleanupDOM(): void;
