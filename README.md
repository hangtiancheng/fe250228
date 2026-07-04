# fe250228

## Quick Start

### Create

```bash
npm create @quick-start/electron

npm add @ffmpeg-installer/ffmpeg @ffprobe-installer/ffprobe fluent-ffmpeg
npm add @types/fluent-ffmpeg -D
```

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
# For Windows
npm run build:win
# For MacOS
npm run build:mac
# For Linux
npm run build:linux
```

## 架构

- main 主进程, 负责创建和管理浏览器窗口, 与操作系统通信, 文件 IO, 网络 IO
- preload
  - 预加载脚本包含在渲染器进程中执行的代码，该代码在页面加载前执行
  - 预加载脚本虽然在渲染器进程中执行，但可以访问 Node.js API
  - 实现了主进程和渲染器进程间的隔离, 在渲染器进程中, 选择性暴露主进程 API
- renderer 渲染器进程, 负责渲染 HTML, CSS, JavaScript、渲染页面、处理用户交互

## 技术栈

- [electron](https://www.electronjs.org/zh/docs/latest/tutorial/quick-start)
- [electron-vite](https://cn.electron-vite.org/guide/)
- [element-plus](https://element-plus.org/zh-CN/guide/quickstart.html)
- [tailwindcss](https://www.tailwindcss.cn/docs/guides/vite#vue)
- [pinia](https://pinia.vuejs.org/zh/getting-started.html)
- [vite](https://cn.vite.dev/guide/)
- [vue3](https://cn.vuejs.org/guide/introduction.html)
- [vue-router](https://router.vuejs.org/zh/guide/)
