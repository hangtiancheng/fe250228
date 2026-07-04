<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="flex justify-between border-b bg-gray-50 px-3 py-2 text-xs text-slate-600">
    <section class="opacity-80"><RouterLink :to="{ name: 'Home' }">视频转码</RouterLink></section>

    <section class="flex justify-between gap-2">
      <RouterLink :to="{ name: 'Home' }">转码</RouterLink>
      <RouterLink :to="{ name: 'Settings' }">高级设置</RouterLink>
    </section>
  </main>
</template>

<style scoped lang="scss">
// Sass 混入
@use '../assets/global.scss' as *;

main {
  @include drag;

  section {
    @include no-drag;
  }
}
</style>
