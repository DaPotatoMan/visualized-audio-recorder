export interface IRecorderOptions {
  /** FPS for visualized video */
  fps: number

  streamConstraints: MediaStreamConstraints
  recorderOptions: MediaRecorderOptions
}
