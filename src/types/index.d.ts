export interface IVisualEffect<T = {}> {
  setup(this: T, analyser: AnalyserNode): void | Promise<void>
  render(this: T, data: Uint8Array, ctx: CanvasRenderingContext2D): void
}

export interface IDefineVisualEffect<T> extends IVisualEffect<T> {
  params: T
}

export interface IRecorderOptions {
  /** @default 60 */
  fps: number

  /** @default - screen height of the device */
  quality: number

  /** If provided the visualizer canvas will be appended to the element */
  wrapper: Element

  /** Effect to be rendered */
  effect: IVisualEffect

  streamConstraints: MediaStreamConstraints['audio']
  recorderOptions: MediaRecorderOptions
}
