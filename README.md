# visualized-audio-recorder

<a href="https://www.npmjs.com/package/visualized-audio-recorder">
<img src="https://img.shields.io/npm/v/visualized-audio-recorder?color=%23fff&style=flat-square"></img>
<img src="https://img.shields.io/npm/dw/visualized-audio-recorder?color=black&style=flat-square"></img>
<img src="https://img.shields.io/librariesio/release/npm/visualized-audio-recorder?style=flat-square"></img>
</a>
<br>
<br>

This package helps you create visualized audio recordings (outputs webm video).
[View Demo](https://dapotatoman.github.io/visualized-audio-recorder/)


## Usage

1. Install package.

   ```bash
   npm add -D visualized-audio-recorder
   ```

2. Add it to your project.

   ```ts
   import useRecorder from 'visualized-audio-recorder'

   const recorder = useRecorder()

   // Start recording
   await recorder.init()
   recorder.start()

   // Stop recording
   const blob = await recorder.stop()

   // ⇋ Do stuff with blob
   ```

3. Profit 🎉


## Configure recorder

### Basic config
```ts
interface IRecorderOptions {
  fps: number
  quality: number
  wrapper: Element
  effect: IVisualEffect
  streamConstraints: MediaStreamConstraints
  recorderOptions: MediaRecorderOptions
}
```

### Loading a visual effect
 
```ts
import visualEffect from 'visualized-audio-recorder/effects/linear-lines'

useRecorder({
  fps: 60,
  quality: 720,

  effect: visualEffect({
    bgColor: '#fff',
    barColor: '#000'
  })
})
  ```
You can also define your own custom visual effect. Learn how to create one [here](https://github.com/DaPotatoMan/visualized-audio-recorder/blob/main/docs/effect.md).
Read more about the API [here](https://github.com/DaPotatoMan/visualized-audio-recorder/blob/main/docs/api.md).

## License

[MIT License](https://github.com/DaPotatoMan/visualized-audio-recorder/blob/main/LICENSE) © 2022 [dapotatoman](https://github.com/dapotatoman)
