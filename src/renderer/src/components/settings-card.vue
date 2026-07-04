<script setup lang="ts">
interface IProps {
  title: string
}
const props = defineProps<IProps>()
</script>

<template>
  <main>
    <section class="shadow-md">
      <h2>{{ props.title }}</h2>
      <!-- 匿名插槽 -->
      <slot></slot>
    </section>
  </main>
</template>

<style scoped lang="scss">
section {
  @apply m-3 rounded-lg bg-white p-3;
  h2 {
    @apply mb-2 text-sm text-slate-700 opacity-80;
  }
}
</style>
