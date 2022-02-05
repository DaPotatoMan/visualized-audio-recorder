<template>
  <main>
    <button @click="start()">
      Start
    </button>

    <button @click="stop()">
      Stop
    </button>
  </main>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Recorder from '../src'

const canvas = ref<HTMLElement>()
let recorder: Recorder

async function start() {
  await recorder.init()
  recorder.start()
}

function stop() {
  recorder.stop().then((blob) => {
    const url = URL.createObjectURL(blob)
    window.open(url)
  })
}

onMounted(() => {
  recorder = new Recorder({
    recorder: {
      mimeType: 'video/x-matroska;codecs=vp9,opus'
    },

    visualizerFps: 30
  })
})
</script>
