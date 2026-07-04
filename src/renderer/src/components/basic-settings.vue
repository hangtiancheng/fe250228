<script setup lang="ts">
import { useSettingsStore } from '@renderer/store'
import { ElSelect, ElOption } from 'element-plus'
import { storeToRefs } from 'pinia'

const settingsStore = useSettingsStore()
const { sizeOptions, size, frameOptions, frame } = storeToRefs(settingsStore)
</script>

<template>
  <main class="flex gap-2 bg-white p-3">
    <ElSelect v-model="size" placeholder="选择分辨率">
      <ElOption v-for="item of sizeOptions" :key="item" :label="item" :value="item"></ElOption>
    </ElSelect>
    <ElSelect v-model="frame" placeholder="选择帧数">
      <ElOption v-for="item of frameOptions" :key="item" :label="item" :value="item"></ElOption>
    </ElSelect>
  </main>
</template>

<style scoped lang="scss"></style>
