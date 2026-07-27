// Electron main process entry
import { app, shell, BrowserWindow } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.svg?asset'
import './ipc' //! Side-effect import: executes module-level code only, imports no values

function createWindow(): void {
  // Create the browser window
  const mainWindow = new BrowserWindow({
    width: 350,
    height: 650,
    x: 1300,
    y: 10,
    show: false,
    // frame: false would create a frameless window, implicitly making it non-draggable
    // Disable window resizing
    resizable: false,
    // Keep the window above all others
    alwaysOnTop: true,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(import.meta.dirname, '../preload/index.mjs'),
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
  // Renderer HMR (Hot Module Replacement) powered by the electron-vite CLI
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(import.meta.dirname, '../renderer/index.html'))
  }

  //! IPC test
  // mainWindow.webContents.on('did-finish-load', () => {
  //   mainWindow.webContents.send(
  //     'desktop-path',
  //     app.getPath('desktop') /** path.join(os.homedir(), 'Desktop') */
  //   )
  // })
}

// whenReady resolves once Electron has finished initializing and is ready to create windows
// Some APIs are only available after whenReady
app.whenReady().then(
  () => {
    electronApp.setAppUserModelId('com.electron')
    // In development, F12 toggles DevTools
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
