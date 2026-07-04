<script setup lang="ts">
import SettingsCard from '@renderer/components/settings-card.vue'
import SettingsContent from '@renderer/components/settings-content.vue'
import { ElInput } from 'element-plus'

import { useSettingsStore } from '@renderer/store'
import { storeToRefs } from 'pinia'
const settingsStore = useSettingsStore()
const { outputDir } = storeToRefs(settingsStore)

async function callSelectDir() {
  const dirpath = await window.api.selectDir()
  if (dirpath) {
    outputDir.value = dirpath
  }
}
</script>

<template>
  <main>
    <SettingsCard title="分辨率">
      <!-- Attribute 'inputPlaceholder' must be hyphenated -->
      <SettingsContent type="size" input-placeholder="格式: 1920x1080"></SettingsContent>
    </SettingsCard>
    <SettingsCard title="帧数">
      <SettingsContent type="frame" input-placeholder="格式: 60"></SettingsContent>
    </SettingsCard>
    <SettingsCard title="输出目录, 默认 Downloads 目录">
      <div class="flex gap-1">
        <ElInput v-model="outputDir" disabled type="primary" size="default"></ElInput>
        <ElButton type="primary" size="default" @click="callSelectDir">选择</ElButton>
      </div>
    </SettingsCard>
  </main>
</template>

<style scoped lang="scss"></style>
