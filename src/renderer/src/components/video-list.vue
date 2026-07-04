<script setup lang="ts">
import { ElScrollbar } from 'element-plus'
import VideoItem from './video-item.vue'
import { useVideoStore } from '@renderer/store'
import { storeToRefs } from 'pinia'
const videoStore = useVideoStore()
const { videoList } = storeToRefs(videoStore)
</script>

<template>
  <main class="h-80 overflow-y-auto">
    <!-- v-if 比 v-for 的优先级更高 -->
    <!-- eslint: This 'v-if' should be moved to the wrapper element. -->
    <ElScrollbar v-if="videoList.length">
      <VideoItem
        v-for="(videoItem, idx) of videoList"
        :key="videoItem.filepath"
        :video-item="videoItem"
        :idx="idx"
      />
    </ElScrollbar>
    <div v-else class="text-center text-xs text-slate-600 opacity-80">请添加视频</div>
  </main>
</template>

<style scoped lang="scss"></style>
