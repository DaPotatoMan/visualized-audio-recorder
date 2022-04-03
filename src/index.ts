import { destroyStream, destroyStreams, getStream, muxStreams } from 'media-utils'
import type { IRecorderOptions } from './types'
import { createVisualizer } from './visualizer'
import visualEffect from './effects/linear-lines'

const isSupported = 'captureStream' in document.createElement('canvas')
const defaultOptions: Partial<IRecorderOptions> = {
  effect: visualEffect(),
  streamConstraints: true
}

export default function Recorder(options: Partial<IRecorderOptions>) {
  let recorder: MediaRecorder
  let chunks: Blob[]

  function destroy() {
    try {
      chunks = []

      if (recorder) {
        recorder.stop()
        destroyStream(recorder.stream)
      }
    }
    catch (error) { }
  }

  async function init(audioStream?: MediaStream) {
    destroy()

    // Initialize streams
    const params = Object.assign({}, defaultOptions, options) as IRecorderOptions

    const audio = audioStream || await getStream({ audio: params.streamConstraints || true })
    const video = await createVisualizer(audio, params)
    const stream = muxStreams(video, audio)

    // Setup recorder
    recorder = new MediaRecorder(stream, params.recorderOptions)
    recorder.addEventListener('stop', () => destroyStreams([stream, audio, video], true))
    recorder.addEventListener('dataavailable', i => i.data.size > 0 && chunks.push(i.data))
  }

  async function start() {
    if (!recorder || !recorder?.stream) await init()
    recorder.start()
  }

  function stop() {
    if (!recorder || recorder?.state === 'inactive')
      throw new Error('Recorder is not active.')

    return new Promise<Blob>((resolve) => {
      recorder.addEventListener('stop', () => {
        const blob = new Blob(chunks, { type: recorder.mimeType })

        destroy()
        resolve(blob)
      })

      recorder.stop()
    })
  }

  return { init, start, stop, destroy, isSupported }
}

export { defineVisualEffect } from './visualizer'
