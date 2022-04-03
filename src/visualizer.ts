import { destroyStream, onAnyTrackEnded } from 'media-utils'
import type { IDefineVisualEffect, IRecorderOptions, IVisualEffect } from 'src/types'

async function useVisualizer(effect: IVisualEffect, stream: MediaStream, canvasCTX: CanvasRenderingContext2D) {
  const context = new AudioContext()
  const analyser = context.createAnalyser()
  analyser.fftSize = 512
  analyser.smoothingTimeConstant = 0.75
  await effect.setup?.(analyser)

  const audio = stream.clone()
  context.createMediaStreamSource(audio)
    .connect(analyser)

  const data = new Uint8Array(analyser.frequencyBinCount)
  let isActive = true

  function render() {
    if (!isActive) return

    requestAnimationFrame(render)
    analyser.getByteFrequencyData(data)
    effect.render(data, canvasCTX)
  }

  onAnyTrackEnded(stream, () => destroyStream(audio), true)
  onAnyTrackEnded(stream, () => isActive = false)
  render()
}

export async function createVisualizer(audio: MediaStream, recorder: IRecorderOptions) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')!

  if (!canvas?.captureStream)
    throw new Error('This browser does not support captureStream')

  // Set canvas dimensions
  const ratio = (16 / 9)
  const quality = recorder.quality || screen.height
  canvas.width = quality * ratio
  canvas.height = quality

  // Init effect
  await useVisualizer(recorder.effect, audio, ctx)

  const stream = canvas.captureStream(recorder.fps || 60)
  stream.getTracks().forEach(i => i.contentHint = 'detail')

  recorder.wrapper?.appendChild(canvas)

  return stream
}

export function defineVisualEffect<T>(entry: IDefineVisualEffect<T>) {
  return (options?: Partial<T>) => {
    const params = Object.assign({}, entry.params, options)

    return {
      setup: entry.setup.bind(params),
      render: entry.render.bind(params)
    } as IVisualEffect<T>
  }
}
