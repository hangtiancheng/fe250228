import { Button, Input } from 'antd'
import SettingsCard from '../components/settings-card'
import SettingsContent from '../components/settings-content'
import { useSettingsStore } from '../store/use-settings-store'

export default function ConvertSettings(): JSX.Element {
  const outputDir = useSettingsStore((s) => s.outputDir)
  const setOutputDir = useSettingsStore((s) => s.setOutputDir)

  const handleSelectDir = async (): Promise<void> => {
    const dir = await window.api.selectDir()
    if (dir) setOutputDir(dir)
  }

  return (
    <div className="flex flex-col gap-3 p-3">
      <SettingsCard title="分辨率">
        <SettingsContent type="size" placeholder="格式: 1920x1080" />
      </SettingsCard>

      <SettingsCard title="帧数">
        <SettingsContent type="frame" placeholder="格式: 60" />
      </SettingsCard>

      <SettingsCard title="输出目录, 默认 Downloads 目录">
        <div className="flex gap-2">
          <Input disabled value={outputDir} placeholder="默认 Downloads 目录" />
          <Button type="primary" ghost onClick={handleSelectDir}>
            选择
          </Button>
        </div>
      </SettingsCard>
    </div>
  )
}
