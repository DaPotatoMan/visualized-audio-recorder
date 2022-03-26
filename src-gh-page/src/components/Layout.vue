<template>
  <main :class="$style.layout" v-bind="$attrs">
    <slot />
  </main>

  <footer :class="$style.footer">
    Made with ❤ By <a href="https://github.com/DaPotatoMan">@DaPotatoMan</a>
  </footer>
</template>

<style lang="postcss" module>
.layout {
  @apply flex-grow h-full;
}
</style>

<script lang="ts">
export default defineComponent({
  inheritAttrs: false
})
</script>
