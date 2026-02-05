# electron-vite-template

An Electron application with Vue and TypeScript

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Project Setup

### Install

```bash
$ npm install
```

### Development

```bash
$ npm run dev
```

### Build

```bash
# For windows
$ npm run build:win

# For macOS
$ npm run build:mac

# For Linux
$ npm run build:linux
```

```
# 1. 设置 Electron 镜像
$env:ELECTRON_MIRROR="https://artifacts.electronjs.org/mirrors/electron/"

$env:ELECTRON_BUILDER_BINARIES_MIRROR="https://npmmirror.com/mirrors/electron-builder-binaries/"

# 2. 强制跳过 TLS 证书验证 (解决您遇到的 x509 错误 )
$env:NODE_TLS_REJECT_UNAUTHORIZED="0"
```
