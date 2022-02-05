import { drawVisualizer } from './canvas'

export function createVisualizer(audio: MediaStream, fps: number) {
  const canvas = document.createElement('canvas')
  canvas.width = screen.width
  canvas.height = screen.height

  const ctx = canvas.getContext('2d')!
  drawVisualizer(canvas, ctx, audio)

  return canvas.captureStream(fps)
}
