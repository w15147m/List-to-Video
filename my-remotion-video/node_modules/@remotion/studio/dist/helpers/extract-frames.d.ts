type Options = {
    track: {
        width: number;
        height: number;
    };
    container: string;
    durationInSeconds: number | null;
};
export type ExtractFramesTimestampsInSecondsFn = (options: Options) => Promise<number[]> | number[];
export type ExtractFramesProps = {
    src: string;
    timestampsInSeconds: number[] | ExtractFramesTimestampsInSecondsFn;
    onFrame: (frame: VideoFrame) => void;
    signal?: AbortSignal;
};
export declare function extractFrames({ src, timestampsInSeconds, onFrame, signal, }: ExtractFramesProps): Promise<void>;
export {};
