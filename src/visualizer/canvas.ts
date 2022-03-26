// @ts-expect-error type issue
import smoothArray from 'array-smooth'
import { destroyStream } from 'media-utils'

const config = {
  lineCap: 'round',
  gap: 5,
  lineWidth: 10,
  maxLines: 40,
  bufferSize: 512
}

// Methods
function renderVisualizer(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, buffer: Uint8Array) {
  const data = smoothArray(buffer, 4)

  const { gap, lineCap, lineWidth } = config
  const { width, height } = canvas

  Object.assign(ctx, { lineWidth, lineCap })

  // ? Clear canvas
  ctx.clearRect(0, 0, width, height)

  // ? Draw background
  ctx.fillStyle = '#09070D'
  ctx.fillRect(0, 0, width, height)

  // ? Draw lines
  ctx.strokeStyle = '#fff'

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

export async function drawVisualizer(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, stream: MediaStream) {
  try {
    config.lineWidth = Math.round(canvas.width / 130)
    config.gap = Math.round(canvas.width / (config.lineWidth * 2))
    config.maxLines = Math.round(canvas.width / (config.gap - config.lineWidth))

    // ? Create analyser
    const context = new AudioContext()
    const analyser = context.createAnalyser()
    analyser.fftSize = config.bufferSize
    analyser.minDecibels = -90
    analyser.maxDecibels = 20
    analyser.smoothingTimeConstant = 0.85

    const audio = stream.clone()
    context.createMediaStreamSource(audio)
      .connect(analyser)

    const data = new Uint8Array(analyser.frequencyBinCount)
      .slice(0, config.maxLines)

    let isActive = true

    // ? Stop rendering when stream is destroyed
    stream.addEventListener('removetrack', () => {
      destroyStream(audio)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      isActive = false
    })

    function render() {
      if (!isActive) return

      requestAnimationFrame(render)
      analyser.getByteFrequencyData(data)
      renderVisualizer(canvas, ctx, data)
    }

    requestAnimationFrame(render)
  }
  catch (error) {
    console.error(error)
  }
}