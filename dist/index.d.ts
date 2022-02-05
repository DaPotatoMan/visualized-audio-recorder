interface IRecorderOptions {
    constraints: Pick<MediaStreamConstraints, 'audio'>;
    recorder: MediaRecorderOptions;
    visualizerFps: number;
}
declare class Recorder {
    private options;
    private recorder?;
    constructor(options: Partial<IRecorderOptions>);
    init(): Promise<void>;
    start(): void;
    stop(): Promise<Blob>;
}

export { Recorder as default };
