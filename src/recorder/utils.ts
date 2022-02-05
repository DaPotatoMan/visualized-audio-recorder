/** Destroys given audio stream */
export function destroyStream(...streams: MediaStream[]): void {
  if (!streams?.length) throw new Error('No stream was passed')

  streams.forEach(stream => stream.getTracks().forEach((track) => {
    track.stop()
    track.dispatchEvent(new Event('ended'))

    stream.removeTrack(track)
    stream.dispatchEvent(new Event('removetrack'))
  }))
}

export function getStream(constraints?: MediaStreamConstraints) {
  return navigator.mediaDevices.getUserMedia(constraints)
}

export function amplifyStream(stream: MediaStream, level: number) {
  const [audioTrack] = stream.getAudioTracks()
  const streamClone = new MediaStream([audioTrack])

  const ctx = new AudioContext()
  const source = ctx.createMediaStreamSource(streamClone)
  const destination = ctx.createMediaStreamDestination()

  // Filter
  const gainNode = ctx.createGain()
  gainNode.gain.value = level;

  [source, gainNode as AudioNode, destination]
    .reduce((a, b) => a && a.connect(b))

  const [newTrack] = destination.stream.getAudioTracks()

  stream.removeTrack(audioTrack)
  stream.addTrack(newTrack)

  // ? Destroy amplifier stream
  return () => {
    destroyStream(stream)
    destroyStream(streamClone)
    destroyStream(destination.stream)

    destination.disconnect()
    source.disconnect()

    if (ctx.state !== 'closed') ctx.close()
  }
}

export function muxStreams(audio: MediaStream, video: MediaStream) {
  audio.getAudioTracks().forEach(i => video.addTrack(i))
  return video
}

export function setTrackHints(stream: MediaStream, hint: string) {
  stream.getTracks().forEach(i => i.contentHint = hint)
}
