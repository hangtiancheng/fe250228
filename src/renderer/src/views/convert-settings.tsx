import { FolderIcon, FolderOpenIcon } from 'lucide-react'

import SettingsContent from '../components/settings-content'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { InputGroup, InputGroupAddon, InputGroupInput } from '../components/ui/input-group'
import { useSettingsStore } from '../store/use-settings-store'

export default function ConvertSettings(): JSX.Element {
  const outputDir = useSettingsStore((s) => s.outputDir)
  const setOutputDir = useSettingsStore((s) => s.setOutputDir)

  const handleSelectDir = async (): Promise<void> => {
    const dir = await window.api.selectDir()
    if (dir) {
      setOutputDir(dir)
    }
  }

  return (
    <div className="flex flex-col gap-3 p-3">
      <Card>
        <CardHeader>
          <CardTitle>分辨率</CardTitle>
          <CardDescription>选择或添加可用的分辨率</CardDescription>
        </CardHeader>
        <CardContent>
          <SettingsContent type="size" placeholder="格式: 1920x1080" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>帧数</CardTitle>
          <CardDescription>选择或添加可用的帧数</CardDescription>
        </CardHeader>
        <CardContent>
          <SettingsContent type="frame" placeholder="格式: 60" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>输出目录</CardTitle>
          <CardDescription>默认为 Downloads 目录</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <InputGroup className="flex-1">
              <InputGroupAddon align="inline-start">
                <FolderIcon />
              </InputGroupAddon>
              <InputGroupInput disabled value={outputDir} placeholder="默认 Downloads 目录" />
            </InputGroup>
            <Button
              variant="outline"
              onClick={() => {
                void handleSelectDir()
              }}
            >
              <FolderOpenIcon data-icon="inline-start" />
              选择
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
