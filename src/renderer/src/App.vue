<script setup lang="ts">
import NavigationBar from './components/navigation-bar.vue'
import CopyrightInfo from '@renderer/components/copyright-info.vue'
//! IPC 测试
// window.electron.ipcRenderer.on('desktop-path', (_event, desktopPath: string) => {
//   outputDir.value = desktopPath
// })
</script>

<template>
  <main>
    <NavigationBar />
    <RouterView />
    <CopyrightInfo class="mt-2" />
  </main>
</template>

<style lang="scss" scoped></style>
