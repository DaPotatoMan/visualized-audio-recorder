<template>
  <div :class="$style.wrapper">
    <video :class="$style.video" :src="blobUrl" controls autoplay />
  </div>
</template>

<style lang="postcss" module>
.wrapper {
  @apply p-10 m-0;

  .video {
    @apply h-auto w-full max-w-600px
    rounded-md shadow-md;
    aspect-ratio: 16/9;
  }

  background: radial-gradient(rgb(255 255 255 / 40%) 1px, transparent 2px);
  background-size: 25px 25px;

  animation: bg-dot-move 1.2s ease;
}

@keyframes bg-dot-move {
  from {
    background-position: 0px 200px;
  }
}
</style>

<script lang="ts" setup>
defineProps<{ blobUrl: string }>()
</script>
