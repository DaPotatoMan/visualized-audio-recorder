interface IRecorderOptions {
  constraints: Pick<MediaStreamConstraints, 'audio'>

  /** Options for MediaRecorder */
  recorder?: MediaRecorderOptions

  /** Amplify audio stream. Has to be higher than 1 to be enabled */
  amplify?: number

  /** FPS for visualizer */
  fps: number
}

declare class Recorder {
    private options;
    private recorder?;
    private chunks;
    constructor(options: Partial<IRecorderOptions>);
    init(): Promise<void>;
    start(): void;
    stop(): Promise<Blob> | undefined;
    destroy(): void;
    on<T extends keyof MediaRecorderEventMap>(event: T, callback: (this: MediaRecorder, ev: MediaRecorderEventMap[T]) => any, options?: boolean | EventListenerOptions): void;
    off<T extends keyof MediaRecorderEventMap>(event: T, callback: (this: MediaRecorder, ev: MediaRecorderEventMap[T]) => any, options?: boolean | EventListenerOptions): void;
    emit(event: keyof MediaRecorderEventMap): void;
}

export { Recorder as default };
