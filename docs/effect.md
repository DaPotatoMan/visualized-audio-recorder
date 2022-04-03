## Creating your own visual effect

<br>

### Define the effect `(my-effect.ts)`

```ts
import { defineVisualEffect } from 'visualized-audio-recorder'

interface IParams {
  color: string
}

export default defineVisualEffect<IParams>({
  params: {
    color: 'red'
  },

  setup(analyser) {
    analyser.fftSize = 512
    analyser.minDecibels = -90
    analyser.maxDecibels = 20
    analyser.smoothingTimeConstant = 0.85

    if (!this.color) this.color = 'blue'
  },

  render(data, ctx) {
    const { width, height } = ctx.canvas
    const { color } = this

    // Draw background color
    ctx.fillStyle = color
    ctx.clearRect(0, 0, width, height)
    ctx.fillRect(0, 0, width, height)
  }
})
```

### Loading the effect
```ts
import visualEffect from 'my-effect.ts'

useRecorder({
  effect: visualEffect({ color: 'green' })
})