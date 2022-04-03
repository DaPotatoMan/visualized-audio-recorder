// @ts-expect-error type issue
import smoothArray from 'array-smooth'
import { defineVisualEffect } from '../visualizer'

interface IParams {
  lineCap: CanvasLineCap
  bgColor: string
  barColor: string
}

export default defineVisualEffect<IParams>({
  params: {
    lineCap: 'round',
    bgColor: '#09070D',
    barColor: '#fff'
  },

  async setup(analyser: AnalyserNode) {
    analyser.fftSize = 512
    analyser.minDecibels = -90
    analyser.maxDecibels = 20
    analyser.smoothingTimeConstant = 0.85
  },

  render(freqdata, ctx) {
    const data = smoothArray(freqdata, 5)

    // Static variables
    const { width, height } = ctx.canvas
    const { lineCap, bgColor, barColor } = this

    const lineWidth = Math.round(width / 130)
    const gap = Math.round(width / (lineWidth * 2))

    Object.assign(ctx, { lineWidth, lineCap })

    ctx.strokeStyle = barColor
    ctx.fillStyle = bgColor
    ctx.clearRect(0, 0, width, height)
    ctx.fillRect(0, 0, width, height)

    data.forEach((value: number, i: number) => {
      const yClamped = Math.min(Math.max(value, 0), height / 3)
      const x = gap * (i + 1)

      if (x > (width - gap)) return

      ctx.beginPath()
      ctx.moveTo(x, height / 2 + yClamped)
      ctx.lineTo(x, height / 2 - yClamped)
      ctx.stroke()
    })
  }
})
