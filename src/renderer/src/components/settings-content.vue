<script setup lang="ts">
import { ElSelect, ElOption, ElInput, ElButton, ElMessage } from 'element-plus'
import { useSettingsStore } from '@renderer/store'
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { CloseOne } from '@icon-park/vue-next'
import { useSettings } from '@renderer/composables'

interface IProps {
  type: 'size' | 'frame'
  inputPlaceholder?: string
}

const props = defineProps<IProps>()
const settingsStore = useSettingsStore()

const selectPlaceholder = computed(() => {
  switch (props.type) {
    case 'size':
      return '选择分辨率'
    case 'frame':
      return '选择帧数'
    default:
      throw new TypeError('未指定 props.type')
  }
})

const { sizeOptions, size, frameOptions, frame } = storeToRefs(settingsStore)
const { addSize, addFrame, removeItem } = useSettings()

let options: typeof sizeOptions | typeof frameOptions
let curItem: typeof size | typeof frame
let addFn: typeof addSize | typeof addFrame
let title: string
if (props.type === 'size') {
  options = sizeOptions
  curItem = size
  addFn = addSize
  title = '分辨率'
} else {
  options = frameOptions
  curItem = frame
  addFn = addFrame
  title = '帧数'
}

const newItem = ref<string>('')

function addItem() {
  if (!newItem.value) {
    ElMessage.error({
      message: '请输入' + title,
      grouping: true
    })
    return
  }
  addFn(newItem.value)
  newItem.value = ''
}
</script>

<template>
  <ElSelect v-model="curItem" :placeholder="selectPlaceholder">
    <ElOption v-for="(item, idx) in options" :key="item" :label="item" :value="item">
      <div class="flex items-center justify-between">
        {{ item }}
        <CloseOne theme="outline" size="18" class="icon" @click="removeItem(props.type, idx)" />
      </div>
    </ElOption>
  </ElSelect>
  <div class="mt-2 flex items-center gap-1">
    <ElInput
      v-model="newItem"
      :placeholder="props.inputPlaceholder"
      size="default"
      clearable
    ></ElInput>
    <ElButton type="success" size="default" @click="addItem">添加</ElButton>
  </div>
</template>

<style scoped lang="scss">
.icon {
  @apply text-slate-300 duration-300 hover:scale-125 hover:text-red-500;
}
</style>
