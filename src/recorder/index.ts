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
    const audio = await getStream(this.options?.constraints)
    const video = createVisualizer(audio, this.options.visualizerFps)
    const stream = muxStreams(audio, video)

    // Amplify
    const destroyAmplifier = amplifyStream(stream, 7)

    const recorder = new MediaRecorder(stream, this.options.recorder)
    recorder.onstop = () => {
      destroyAmplifier()
      destroyStream(stream, audio, video)
    }

    this.recorder = recorder
  }

  start() {
    this.recorder?.start()
  }

  stop() {
    return new Promise<Blob>((resolve) => {
      this.recorder?.addEventListener('dataavailable', event => resolve(event.data))
      this.recorder?.stop()
    })
  }
}
