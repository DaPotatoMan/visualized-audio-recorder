// @ts-expect-error type issue
import smoothArray from 'array-smooth'
import { defineVisualEffect } from '../visualizer'

interface IParams {
  image: HTMLImageElement | string
  imageBorderColor: string
  imageBorderSize: number

  bgColor: string
  barColor: string
  barWidth: number
  barCap: CanvasLineCap
}

let image: HTMLImageElement

export default defineVisualEffect<IParams>({
  params: {
    image: '',
    imageBorderColor: 'rgb(0 0 0 / 8%)',
    imageBorderSize: 10,

    bgColor: '#fff',
    barColor: 'rgb(0 0 0 / 40%)',
    barCap: 'round',
    barWidth: 2
  },

  async setup(analyser) {
    analyser.smoothingTimeConstant = 0.8

    if (typeof this.image !== 'string') return

    image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image()
      image.src = String(this.image)
      image.crossOrigin = 'anonymous'
      image.onload = () => resolve(image)
      image.onerror = reject
    })
  },

  render(freqdata, ctx) {
    if (!image) return

    // Static variables
    const { width, height } = ctx.canvas

    // ? Apply Base styles
    ctx.fillStyle = this.bgColor
    ctx.strokeStyle = this.barColor
    ctx.lineWidth = this.barWidth
    ctx.lineCap = this.barCap

    ctx.clearRect(0, 0, width, height)
    ctx.fillRect(0, 0, width, height)

    // Draw lines
    const lineWidth = Math.round(width / 130)
    const gap = Math.round(width / (lineWidth * 2))
    const data = smoothArray(freqdata, 5)

    data.forEach((value: number, i: number) => {
      const yClamped = Math.min(Math.max(value, 0), height / 3)
      const x = gap * (i + 1)

      if (x > (width - gap)) return

      ctx.beginPath()
      ctx.moveTo(x, height / 2 + yClamped)
      ctx.lineTo(x, height / 2 - yClamped)
      ctx.stroke()
    })

    // Draw center picture
    const size = 270
    const x = width / 2
    const y = height / 2

    ctx.save()
    ctx.beginPath()
    ctx.arc(x, y, size / 2, 0, Math.PI * 2, false)

    ctx.lineWidth = this.imageBorderSize
    ctx.strokeStyle = this.imageBorderColor
    ctx.stroke()

    ctx.clip()
    ctx.drawImage(image, x - size / 2, y - size / 2, size, size)
    ctx.restore()
  }
})
