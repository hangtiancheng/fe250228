import { dialog } from 'electron'

export async function selectDir(): Promise<string> {
  const retVal = await dialog.showOpenDialog({
    title: '选择输出目录',
    properties: ['openDirectory', 'createDirectory']
  })
  return retVal.canceled ? '' : retVal.filePaths[0]
}
