import { setTrackHints } from '../recorder/utils'
import { drawVisualizer } from './canvas'

export function createVisualizer(audio: MediaStream, fps: number) {
  const canvas = document.createElement('canvas')

  // ? Set canvas dimensions
  const ratio = (16 / 9)
  const quality = 720 || screen.height

  canvas.width = quality * ratio
  canvas.height = quality

  const ctx = canvas.getContext('2d')!
  drawVisualizer(canvas, ctx, audio)

  const stream = canvas.captureStream(fps)
  setTrackHints(stream, 'detail')

  return stream
}
