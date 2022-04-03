<template>
  <div ref="canvasRef" :class="$style.canvasWrapper" />

  <button :class="$style.button" @click="isRecording ? stop() : start()">
    <i-carbon-stop v-if="isRecording" />
    <i-carbon-microphone v-else />
  </button>

  <br>
  <span>Click button to {{ isRecording ? 'stop' : 'start' }} recording</span>
</template>

<style lang="postcss" module>
.canvasWrapper {
  @apply w-720px max-w-full mb-10;

  & > canvas {
    @apply w-full h-full
    border border-light-100/10
    rounded-md shadow-md;
  }
}

.button {
  @apply w-30 h-30 text-4xl
  flex items-center justify-center
  rounded-full shadow-md
  bg-white/10;

  transition: transform 200ms;

  &:active {
    transform: scale3d(0.95, 0.95, 0.95);
  }
}
</style>

<script setup lang="ts">
import useRecorder from '../../../src'
import VisualEffect from '../../../src/effects/profile-linear-lines'

const emit = defineEmits(['finish'])
const canvasRef = ref<HTMLElement>()

const isRecording = shallowRef(false)
const recorder = useRecorder({
  fps: 60,
  quality: 720,
  get wrapper() {
    return canvasRef.value!
  },

  effect: VisualEffect({
    image: '/visualized-audio-recorder/profile.jpg',
    barWidth: 3,
    barColor: 'rgb(0 0 0 / 40%)'
  }),

  streamConstraints: {
    autoGainControl: true,
    echoCancellation: true,
    noiseSuppression: true,
    suppressLocalAudioPlayback: true
  },

  recorderOptions: {
    mimeType: 'video/webm;codecs=vp9,opus'
  }
})

async function start() {
  await recorder.init()
  recorder.start()
  isRecording.value = true
}

async function stop() {
  const blob = await recorder.stop()
  const url = URL.createObjectURL(blob)

  isRecording.value = false
  emit('finish', url)
}
</script>
