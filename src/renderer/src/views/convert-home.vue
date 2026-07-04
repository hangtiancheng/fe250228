<script setup lang="ts">
import CeilButtons from '@renderer/components/ceil-buttons.vue'
import BasicSettings from '@renderer/components/basic-settings.vue'
import FloorButtons from '@renderer/components/floor-buttons.vue'
import VideoList from '@renderer/components/video-list.vue'
</script>

<template>
  <main>
    <BasicSettings class="mt-5" /> <CeilButtons class="mt-5" /> <FloorButtons class="mt-3" />
    <VideoList class="mt-5" />
  </main>
</template>

<style scoped lang="css"></style>
