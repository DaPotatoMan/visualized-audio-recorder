import { defineVisualEffect } from '../visualizer'

interface IParams {
  image: HTMLImageElement | string

  bgColor: string
  barColor: string
  barWidth: number
  barSpacing: number
}

let image: HTMLImageElement

export default defineVisualEffect<IParams>({
  params: {
    image: '',
    bgColor: '#000',
    barColor: '#369053',
    barWidth: 2,
    barSpacing: 4
  },

  async setup() {
    if (typeof this.image !== 'string') return

    image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image()
      image.src = String(this.image)
      image.crossOrigin = 'anonymous'
      image.onload = () => resolve(image)
      image.onerror = reject
    })
  },

  render(data, ctx) {
    if (!image) return

    // Static variables
    const { width, height } = ctx.canvas
    const { bgColor, barColor } = this

    // ? Apply Base styles
    ctx.fillStyle = bgColor
    ctx.clearRect(0, 0, width, height)
    ctx.fillRect(0, 0, width, height)

    // Draw center picture
    const size = 270
    const x = width / 2
    const y = height / 2

    ctx.save()
    ctx.beginPath()
    ctx.arc(x, y, size / 2, 0, Math.PI * 2, false)
    ctx.clip()
    ctx.drawImage(image, x - size / 2, y - size / 2, size, size)
    ctx.restore()

    // Draw ring
    if (data[0] > 100) {
      ctx.beginPath()
      ctx.strokeStyle = barColor
      ctx.lineWidth = 4
      ctx.arc(x, y, (size + 20) / 2, 0, Math.PI * 2, false)
      ctx.stroke()
    }
  }
})
