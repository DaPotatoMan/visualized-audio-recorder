<template>
  <button :class="$style.button" @click="isRecording ? stop() : start()">
    <i-carbon-stop v-if="isRecording" />
    <i-carbon-microphone v-else />
  </button>

  <br>
  <span>
    Click button to {{ isRecording ? 'stop' : 'start' }} recording
  </span>
</template>

<style lang="postcss" module>
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

const emit = defineEmits(['finish'])

const isRecording = shallowRef(false)
const recorder = useRecorder({
  fps: 60,
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
