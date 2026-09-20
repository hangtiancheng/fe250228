<div align="center">

# fe250228

**A compact, always-on-top desktop video transcoder built with Electron.**
Drop videos in, pick a resolution and frame rate, and let FFmpeg do the rest.

[![License: MIT](https://img.shields.io/badge/License-MIT-f5a623.svg)](./LICENSE)
[![Electron](https://img.shields.io/badge/Electron-43-47848F?logo=electron&logoColor=white)](https://www.electronjs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-electron--vite-646CFF?logo=vite&logoColor=white)](https://vite.dev/)

</div>

---

## Overview

`fe250228` is a lightweight Electron desktop app that batch-transcodes videos into H.264/MP4 using a fully bundled FFmpeg toolchain. It renders as a small, always-on-top widget with a dark, amber-accented UI: add files by click or drag-and-drop, choose a resolution and frame-rate preset, hit start, and watch live progress stream in from the main process — one file after another through a serial queue.

> The in-app UI is localized in Simplified Chinese (`zh-CN`).

## Features

- **Serial batch queue** — pending videos convert one after another automatically; no manual re-start between files
- **Drag & drop or file picker** — multi-select supported, duplicate files are rejected
- **Resolution & frame-rate presets** — built-in options from `320x240` up to `2560x1440` and `24 / 30 / 60 fps`, plus custom presets with format validation
- **Live progress** — per-file percentage pushed from FFmpeg's `progress` event straight into the UI, rendered as an in-card fill bar
- **Full queue control** — stop a running conversion, clear the whole list, or reset everything back to pending
- **Output directory selection** — native OS dialog; falls back to the Downloads folder when unset
- **Zero setup** — FFmpeg and FFprobe binaries ship with the app via `@ffmpeg-installer` / `@ffprobe-installer`; no system installation required
- **Hardened renderer** — context isolation plus a strict Content-Security-Policy; only a minimal, typed API surface crosses the process boundary

## Getting Started

Prerequisites: **Node.js 20+** and **pnpm**.

```sh
pnpm install   # also runs electron-builder install-app-deps
pnpm dev       # start in development mode with HMR
```

### Scripts

| Command            | Description                                      |
| ------------------ | ------------------------------------------------ |
| `pnpm dev`         | Launch the app in development mode with HMR      |
| `pnpm start`       | Preview the production build                     |
| `pnpm build`       | Type-check and bundle all three Electron targets |
| `pnpm build:mac`   | Package for macOS (DMG)                          |
| `pnpm build:win`   | Package for Windows (NSIS installer)             |
| `pnpm build:linux` | Package for Linux (AppImage / snap / deb)        |
| `pnpm typecheck`   | Run `tsc --noEmit` for both node and web configs |
| `pnpm lint`        | Lint and auto-fix with ESLint                    |
| `pnpm format`      | Format the repo with Prettier                    |

Packaged artifacts land in `dist/`. Releases are published to GitHub Releases (see `publish` in `electron-builder.yml`), which powers auto-updates through `electron-updater`.

## Architecture

The app follows Electron's classic three-process model.

```
┌──────────────────────────────────────────────────────────────────┐
│ Main process (src/main)                                          │
│  window lifecycle · native dialogs · file IO · FFmpeg engine     │
└──────────────────────────────────────────────┬───────────────────┘
                ^ invoke / send                │ push (mainPublishChan)
┌───────────────┴──────────────────────────────V───────────────────┐
│ Preload (src/preload)                                            │
│  contextBridge → window.api                                      │
│  (convert · selectDir · getFilePath · subscribeMain · stop)      │
└──────────────────────────────────────────────┬───────────────────┘
                ^ window.api.*                 │ events
┌───────────────┴──────────────────────────────V───────────────────┐
│ Renderer (src/renderer)                                          │
│  React 18 SPA · Zustand stores · Ant Design dark theme           │
└──────────────────────────────────────────────────────────────────┘
```

### IPC channels

| Channel           | Direction       | Pattern         | Purpose                                    |
| ----------------- | --------------- | --------------- | ------------------------------------------ |
| `convertChan`     | Renderer → Main | `invoke/handle` | Start transcoding one video                |
| `selectDirChan`   | Renderer → Main | `invoke/handle` | Open the native directory-selection dialog |
| `stopChan`        | Renderer → Main | `send/on`       | Kill the running FFmpeg process            |
| `mainPublishChan` | Main → Renderer | `send/on`       | Push `convert` / `done` / `error` events   |

`mainPublishChan` payloads: `convert` carries the progress percent, `done` carries the finished file's path, and `error` carries `{ code }` — `0x0` for a missing output directory (auto-fallback to Downloads) and `0x1` for a user-initiated stop.

### Conversion flow

1. Files added via the picker or drag-and-drop are resolved to real paths with `webUtils.getPathForFile` and stored in the Zustand video store as `pending`.
2. `startConvert` picks the first pending video and invokes `convertChan` with the current settings.
3. The main process wraps the job in `FfmpegWrapper` (`src/main/fw.ts`): `libx264` encoding at the chosen size and fps, writing to `{outputDir}/{name}-{size}-{frame}-{timestamp}.mp4`.
4. FFmpeg `progress` events are forwarded to the renderer over `mainPublishChan` and patched into the list in real time.
5. On `end`, the renderer marks the file `done` and immediately pulls the next `pending` video — forming the serial queue. On `error`, the partial output file is cleaned up.

> **Packaging note:** the FFmpeg/FFprobe binaries are listed under `asarUnpack` in `electron-builder.yml`, and `fw.ts` rewrites `app.asar` paths to `app.asar.unpacked` at runtime so the executables remain directly spawnable.

## Project Structure

```
fe250228
├── src
│   ├── main/                  # Main process (Node.js)
│   │   ├── index.ts           # App lifecycle & window creation (350×650, always-on-top)
│   │   ├── ipc.ts             # IPC channel registration
│   │   ├── fw.ts              # FfmpegWrapper — the transcoding engine
│   │   ├── dir.ts             # Native directory-selection dialog
│   │   └── types.ts           # Shared types (IVideoItem, IConvertSettings, VideoState…)
│   ├── preload/
│   │   ├── index.ts           # contextBridge — selectively exposes window.api
│   │   └── index.d.ts         # Type declarations for window.api
│   └── renderer/src           # Renderer process (React SPA)
│       ├── main.tsx           # React root · antd dark theme & zh-CN locale
│       ├── App.tsx            # View switching (home / settings)
│       ├── views/             # ConvertHome · ConvertSettings
│       ├── components/        # Nav bar, video list, action buttons, settings cards…
│       ├── hooks/             # use-convert (serial queue) · use-video · use-settings
│       ├── store/             # Zustand stores (video list, settings)
│       ├── constants/         # Built-in resolution / frame-rate presets
│       └── feedback.ts        # antd message/modal bridge for non-component code
├── resources/                 # App icon
├── electron.vite.config.ts    # main / preload / renderer build config
├── electron-builder.yml       # Packaging, asarUnpack & publish config
└── package.json
```

## Tech Stack

| Layer   | Technology                                                               |
| ------- | ------------------------------------------------------------------------ |
| Shell   | Electron · electron-vite · electron-builder · electron-updater           |
| UI      | React 18 · Ant Design 5 (dark algorithm) · Tailwind CSS 4 · lucide-react |
| State   | Zustand 5                                                                |
| Media   | fluent-ffmpeg · bundled FFmpeg/FFprobe binaries                          |
| Tooling | TypeScript (strict, dual node/web tsconfigs) · ESLint · Prettier         |

## License

[MIT](./LICENSE) © hangtiancheng
