<script setup lang="ts">
import { Plus, UpdateRotation } from '@icon-park/vue-next'
import { useConvert, useVideo } from '@renderer/composables'
import { ElUpload, UploadRequestOptions } from 'element-plus'

const { addVideo } = useVideo()
const { startConvert, isConverting, callSubscribeMain } = useConvert()

async function uploadVideo(options: UploadRequestOptions): Promise<void> {
  const { name: filename, path: filepath } = options.file
  /* return */ addVideo({ filename, filepath, progress: 0, state: 'pending' })
}
callSubscribeMain()
// import { useVideoStore } from '@renderer/store'
// const videoStore = useVideoStore()
// videoStore.$subscribe((_mutation, newState) => {
//   console.log(newState.videoList)
// })
</script>

<template>
  <main>
    <section class="flex justify-center gap-2">
      <div class="button cursor-pointer">
        <!-- todo: cursor-pointer -->
        <!-- items-center 单行, 侧轴中点对齐 (垂直居中) -->
        <ElUpload
          accept="video/*"
          action="#"
          class="flex items-center"
          drag
          multiple
          :http-request="uploadVideo"
          :show-file-list="false"
        >
          <Plus theme="outline" size="42" />
        </ElUpload>
      </div>

      <div class="button cursor-pointer" @click="startConvert">
        <UpdateRotation theme="outline" size="42" :class="{ isConverting: isConverting }" />
      </div>
    </section>
  </main>
</template>

<style scoped lang="scss">
.isConverting {
  @apply animate-spin cursor-wait text-slate-300;
}

.button {
  @apply flex h-20 w-20 items-center justify-center rounded-lg bg-white text-slate-600;
}

// :deep 样式穿透, 可以将样式应用到 (深层) 子组件
:deep(.el-upload-dragger) {
  padding: 0 !important;
  border: none !important;
}
</style>
