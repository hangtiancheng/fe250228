<script setup lang="ts">
import { CloseOne } from '@icon-park/vue-next'
import { computed, toRef } from 'vue'
import { IVideoItem } from '@renderer/types'
import { useVideo } from '@renderer/composables'

const props = defineProps<{
  videoItem: IVideoItem
  idx: number
}>()

const { removeVideo } = useVideo()

// const { videoItem } = toRefs(props)
const videoItem = toRef(props, 'videoItem')
const bgColor = computed(() => {
  switch (videoItem.value.state) {
    case 'convert':
      return 'lightblue'
    case 'done':
      return 'lightgreen'
    case 'error':
      return 'lightpink'
    default: // 'pending'
      return 'white'
  }
})
</script>

<template>
  <section class="video" :style="`--progress: ${videoItem.progress}%; --bg-color: ${bgColor}`">
    <div class="z-10 text-slate-600">{{ `${videoItem.progress}%-${videoItem.state}` }}</div>

    <div class="name z-10">{{ videoItem.filename }}</div>

    <div class="icon" @click="removeVideo(idx)"><CloseOne theme="outline" size="18" /></div>
  </section>
</template>

<style scoped lang="scss">
.video {
  @apply mx-3 mb-2 flex items-center justify-between rounded-lg bg-white px-3 py-[8px] text-xs text-slate-600;

  .name {
    @apply truncate;
  }

  .icon {
    @apply cursor-pointer text-slate-500 opacity-50 duration-300 hover:scale-150 hover:text-red-500 hover:opacity-100;

    // 等价于
    // &:hover {
    //   @apply text-red-500 opacity-90;
    // }

    // 默认所有可过渡属性都会获得过渡效果
    // transition-property: all; //! 默认
  }
  // 父元素相对定位
  @apply relative;
  // 伪类, &::before 等价于 .video::before
  // p::before p 元素的第一个子元素, content 属性指定元素的内容, 通常是 ''
  // p::after p 元素的最后一个子元素, content 属性指定元素的内容, 通常是 ''
  &::before {
    content: '';

    // #region
    // 使用 absolute 绝对定位, fixed 固定定位后, 元素脱离文档流, 成为定位元素
    // 使用 relative 相对定位, sticky 粘性定位后, 元素不脱离文档流
    // fixed 相对定位的参考点: 本元素的原位置
    // absolute 绝对定位的参考点: 本元素的包含块, 包含块: 最近的有定位属性的祖先元素; 如果不存在, 则是 (浏览器) 窗口
    // fixed 固定定位的参考点: (浏览器) 窗口
    // 子元素绝对定位
    // #endregion

    // [z-index](https://developer.mozilla.org/zh-CN/docs/Web/CSS/z-index)
    @apply absolute bottom-0 left-0 right-0 top-0 z-0 rounded-lg opacity-50;
    background-color: var(--bg-color);
    width: var(--progress); // todo: dynamic
  }
}
</style>
