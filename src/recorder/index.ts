import { createVisualizer } from '../visualizer'
import { amplifyStream, destroyStream, getStream, muxStreams } from './utils'

export interface IRecorderOptions {
  constraints: Pick<MediaStreamConstraints, 'audio'>
  recorder: MediaRecorderOptions
  visualizerFps: number
}

const defaults: IRecorderOptions = {
  constraints: {
    audio: {
      autoGainControl: true,
      noiseSuppression: true,
      echoCancellation: true,
      suppressLocalAudioPlayback: true
    }
  },

  recorder: {
    mimeType: 'video/webm;codecs=vp9,opus'
  },

  visualizerFps: 60
}

export default class Recorder {
  private options = defaults
  private recorder?: MediaRecorder

  constructor(options: Partial<IRecorderOptions>) {
    this.options = Object.assign(defaults, options)
  }

  async init() {
    this.destroy()

    // ? Initialize streams
    const audio = await getStream(this.options?.constraints)
    const video = createVisualizer(audio, this.options.visualizerFps)
    const stream = muxStreams(audio, video)

    // ? Amplify audio
    const destroyAmplifier = amplifyStream(stream, 7)

    this.recorder = new MediaRecorder(stream, this.options.recorder)
    this.recorder.addEventListener('stop', () => {
      destroyAmplifier()
      destroyStream(stream, audio, video)
    })
  }

  start() {
    this.recorder?.start()
  }

  stop() {
    if (this.recorder?.state === 'inactive') return

    return new Promise<Blob>((resolve) => {
      this.recorder?.addEventListener('dataavailable', event => resolve(event.data))
      this.recorder?.stop()
    })
  }

  destroy() {
    if (this.recorder) {
      this.recorder.stop()
      this.recorder = undefined
    }
  }
}
