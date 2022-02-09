import { createVisualizer } from '../visualizer'
import { amplifyStream, destroyStream, getStream, muxStreams } from './utils'
import type { IRecorderOptions } from './types'

const defaults: IRecorderOptions = {
  constraints: { audio: true },
  fps: 24
}

export default class Recorder {
  private options = defaults
  private recorder?: MediaRecorder
  private chunks: BlobPart[] = []

  constructor(options: Partial<IRecorderOptions>) {
    this.options = Object.assign(defaults, options)
  }

  // ? Methods
  async init() {
    this.destroy()

    // Get options
    const { constraints, recorder, amplify, fps } = this.options

    // Initialize streams
    const audio = await getStream(constraints)
    const video = createVisualizer(audio, fps)
    const stream = muxStreams(audio, video)

    // Amplify audio
    let destroyAmplifier: VoidFunction

    if (amplify && amplify > 1)
      destroyAmplifier = amplifyStream(stream, amplify)

    // Setup recorder
    this.recorder = new MediaRecorder(stream, recorder)

    this.recorder.addEventListener('stop', () => {
      destroyStream(stream, audio, video)
      destroyAmplifier?.()
    })

    this.recorder.addEventListener('dataavailable', e =>
      e.data.size > 0 && this.chunks.push(e.data)
    )
  }

  start() {
    this.recorder?.start()
  }

  stop() {
    const recorder = this.recorder

    if (!recorder || recorder?.state === 'inactive') return

    return new Promise<Blob>((resolve) => {
      recorder.addEventListener('stop', () => {
        const blob = new Blob(this.chunks, {
          type: recorder.mimeType
        })

        resolve(blob)
      })

      recorder.stop()
    })
  }

  destroy() {
    if (this.recorder) {
      this.recorder.stop()
      this.recorder = undefined
    }

    this.chunks = []
  }

  // ? Events
  on<T extends keyof MediaRecorderEventMap>(event: T, callback: (this: MediaRecorder, ev: MediaRecorderEventMap[T]) => any, options?: boolean | EventListenerOptions) {
    this.recorder?.addEventListener(event, callback, options)
  }

  off<T extends keyof MediaRecorderEventMap>(event: T, callback: (this: MediaRecorder, ev: MediaRecorderEventMap[T]) => any, options?: boolean | EventListenerOptions) {
    this.recorder?.removeEventListener(event, callback, options)
  }

  emit(event: keyof MediaRecorderEventMap) {
    this.recorder?.dispatchEvent(new Event(event))
  }
}
