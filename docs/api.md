## Config
```ts
interface IRecorderOptions {
  /** @default 60 */
  fps: number

  /** @default - screen height of the device */
  quality: number

  /** If provided the visualizer canvas will be appended to the element */
  wrapper: Element

  /** Effect to be rendered */
  effect: IVisualEffect

  streamConstraints: MediaStreamConstraints['audio']
  recorderOptions: MediaRecorderOptions
}
```

## Methods
<br>

### `init(audioStream?: MediaStream): Promise<void>`
This method is optional and is used to initialize the recorder ahead of time. Optionally, an audio stream can be provided.
```ts
await recorder.init()
```

### `start(): Promise<void>`
This method is used to start the recorder.
```ts
await recorder.start()
```

### `stop(): Promise<Blob>`
Stops the recording and returns a blob.
```ts
recorder.stop().then((blob) => {
  // ⇋ Do stuff with blob
})
```

### `destroy(): void`
Destroys the internal media recorder and clears chunk data. Called internally when recording initializes/stops.
```ts
recorder.destroy()
```