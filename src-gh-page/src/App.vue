<template>
  <Layout :class="$style.layout">
    <RecordingPlayer v-if="blobUrl" :blob-url="blobUrl" />
    <Recorder v-else @finish="blobUrl = $event" />
  </Layout>
</template>

<style lang="postcss" module>
.layout {
  @apply flex flex-col items-center justify-center;
}
</style>

<script lang="ts" setup>
const blobUrl = shallowRef('')
</script>
