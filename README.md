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

1. Install plugin.

   ```bash
   npm add -D visualized-audio-recorder
   ```

2. Add it to Vite config file.

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

## License

[MIT License](./LICENSE) © 2022 [dapotatoman](https://github.com/dapotatoman)
