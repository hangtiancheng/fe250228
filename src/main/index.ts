// main.ts 主进程
import { app, shell, BrowserWindow } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.svg?asset'
import './ipc' //! 副作用导入, 仅执行模块的全局代码, 不导入任何值

function createWindow(): void {
  // 创建浏览器 app 窗口
  const mainWindow = new BrowserWindow({
    width: 350,
    height: 650,
    x: 1300,
    y: 10,
    show: false,
    // frame: false 设置无边框窗口, 隐式设置窗口不可拖拽
    // 禁止窗口缩放
    resizable: false,
    // 窗口始终位于其他窗口上方
    alwaysOnTop: true,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })
  is.dev ?? mainWindow.webContents.openDevTools()
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })
  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })
  // 基于 electron-vite cli 的渲染器 HMR, Hot Module Replacement
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  //! IPC 测试
  // mainWindow.webContents.on('did-finish-load', () => {
  //   mainWindow.webContents.send(
  //     'desktop-path',
  //     app.getPath('desktop') /** path.join(os.homedir(), 'Desktop') */
  //   )
  // })
}

// whenReady: electron 初始化完成, 准备创建浏览器窗口时，将调用 onfulfilled
// 某些 API 只能在 whenReady 后使用
app.whenReady().then(
  () => {
    electronApp.setAppUserModelId('com.electron')
    // 开发环境下, 按 F12 打开或关闭 DevTools
    // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
    app.on('browser-window-created', (_, window) => {
      optimizer.watchWindowShortcuts(window)
    })
    createWindow()
    app.on('activate', function () {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
      }
    })
  } /** onfulfilled */
)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
