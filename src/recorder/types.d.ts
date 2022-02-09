export interface IRecorderOptions {
  constraints: Pick<MediaStreamConstraints, 'audio'>

  /** Options for MediaRecorder */
  recorder?: MediaRecorderOptions

  /** Amplify audio stream. Has to be higher than 1 to be enabled */
  amplify?: number

  /** FPS for visualizer */
  fps: number
}
