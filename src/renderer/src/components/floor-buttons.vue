<script setup lang="ts">
import { ElButton } from 'element-plus'
import { useConvert, useVideo } from '@renderer/composables'

const { removeAll, resetAll } = useVideo()
const { isConverting } = useConvert()

function stop() {
  window.api.stop()
}
</script>

<template>
  <main class="flex justify-center">
    <ElButton type="primary" size="small" @click="stop">结束转码</ElButton>
    <ElButton type="danger" size="small" :disabled="isConverting" @click="removeAll"
      >全部清空</ElButton
    >
    <ElButton type="warning" size="small" :disabled="isConverting" @click="resetAll"
      >全部重置</ElButton
    >
  </main>
</template>

<style scoped lang="scss"></style>
