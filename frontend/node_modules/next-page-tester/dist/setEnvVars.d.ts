import { RuntimeEnvironment } from './constants';
export declare function setEnvVars({ runtimeEnv, }: {
    runtimeEnv: RuntimeEnvironment;
}): void;
export declare function loadBaseEnvironment({ nextRoot, dotenvFile, }: {
    nextRoot: string;
    dotenvFile?: string;
}): void;
export declare function cleanupEnvVars(): void;
