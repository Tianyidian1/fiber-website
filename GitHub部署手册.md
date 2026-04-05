# 光纤跳线网站 — GitHub Pages 部署手册

> 适用：Astro 4.x 静态站点 → GitHub Pages 免费托管
> 预计耗时：30～60 分钟（首次部署）

---

## 目录

1. [前置准备](#1-前置准备)
2. [第一步：修改 Astro 配置](#2-第一步修改-astro-配置)
3. [第二步：创建 GitHub Actions 工作流](#3-第二步创建-github-actions-工作流)
4. [第三步：推送代码到 GitHub](#4-第三步推送代码到-github)
5. [第四步：开启 GitHub Pages](#5-第四步开启-github-pages)
6. [第五步：绑定自定义域名（可选）](#6-第五步绑定自定义域名可选)
7. [日常更新流程](#7-日常更新流程)
8. [常见问题排查](#8-常见问题排查)

---

## 1. 前置准备

### 1.1 安装 Git

1. 打开 https://git-scm.com/download/win
2. 下载安装（一路默认即可）
3. 安装完成后打开 PowerShell，输入以下命令验证：
   ```powershell
   git --version
   ```
   看到类似 `git version 2.x.x` 说明安装成功。

### 1.2 注册 GitHub 账号

1. 打开 https://github.com
2. 点击右上角 **Sign up** 注册
3. 记住你的**用户名**（后续会用到）

### 1.3 配置 Git 身份信息

打开 PowerShell，执行（替换为你的信息）：

```powershell
git config --global user.name "你的GitHub用户名"
git config --global user.email "你的邮箱@example.com"
```

---

## 2. 第一步：修改 Astro 配置

### 情况 A：使用 GitHub Pages 默认域名（免费）

默认访问地址格式为：`https://你的用户名.github.io/仓库名/`

打开 `astro.config.mjs`，修改 `site` 和添加 `base`：

```js
export default defineConfig({
  site: 'https://你的用户名.github.io',  // ← 改成你的GitHub用户名
  base: '/仓库名',                        // ← 改成你创建的仓库名
  integrations: [
    react(),
    tailwind(),
  ],
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
```

**示例**（用户名是 `fiberlink`，仓库名是 `fiber-website`）：
```js
site: 'https://fiberlink.github.io',
base: '/fiber-website',
```

---

### 情况 B：使用自定义域名（如 www.yourcompany.com）

如果你有自己的域名，`base` 不需要设置，只改 `site`：

```js
export default defineConfig({
  site: 'https://www.yourcompany.com',  // ← 你的真实域名
  // 不需要 base
  integrations: [
    react(),
    tailwind(),
  ],
  // ...
});
```

> ⚠️ 自定义域名还需要额外的 DNS 配置，详见第 6 步。

---

## 3. 第二步：创建 GitHub Actions 工作流

这个文件会让 GitHub 在你每次提交代码后**自动构建并发布**网站，无需手动操作。

**在项目根目录**创建以下文件夹和文件：

文件路径：`d:\360MoveData\Users\nikey\Desktop\光纤跳线网站\.github\workflows\deploy.yml`

文件内容：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main   # 每次推送到 main 分支时触发

  workflow_dispatch:  # 也支持手动触发

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

**创建方法（PowerShell）**：

```powershell
# 进入项目目录
cd "d:\360MoveData\Users\nikey\Desktop\光纤跳线网站"

# 创建目录
mkdir .github\workflows

# 用记事本创建文件（也可以用 VS Code 创建）
notepad .github\workflows\deploy.yml
```

把上面的 YAML 内容粘贴进去，保存。

---

## 4. 第三步：推送代码到 GitHub

### 4.1 在 GitHub 创建新仓库

1. 登录 GitHub，点击右上角 **+** → **New repository**
2. 填写仓库名（英文，如 `fiber-website`）
3. 选择 **Public**（GitHub Pages 免费版只支持公开仓库）
4. **不要**勾选 "Add a README file"
5. 点击 **Create repository**

### 4.2 初始化本地 Git 仓库并推送

打开 PowerShell，执行以下命令：

```powershell
# 1. 进入项目目录
cd "d:\360MoveData\Users\nikey\Desktop\光纤跳线网站"

# 2. 初始化 Git
git init

# 3. 添加 .gitignore 文件（避免上传 node_modules）
echo "node_modules/" >> .gitignore
echo "dist/" >> .gitignore
echo ".env" >> .gitignore

# 4. 添加所有文件
git add .

# 5. 提交
git commit -m "初始提交：光纤跳线网站"

# 6. 改分支名为 main
git branch -M main

# 7. 关联远程仓库（替换为你的用户名和仓库名）
git remote add origin https://github.com/你的用户名/仓库名.git

# 8. 推送代码
git push -u origin main
```

> 推送时会弹出 GitHub 登录窗口，输入账号密码或 Token 授权即可。

### 4.3 关于 GitHub Token 认证

如果推送时提示密码验证失败，需要使用 Personal Access Token：

1. 登录 GitHub → 右上角头像 → **Settings**
2. 左侧最底部 → **Developer settings**
3. **Personal access tokens** → **Tokens (classic)** → **Generate new token**
4. 勾选 `repo` 权限，生成 token
5. 推送时"密码"处填入这个 token（不是你的账号密码）

---

## 5. 第四步：开启 GitHub Pages

1. 进入你的 GitHub 仓库页面
2. 点击顶部 **Settings** 选项卡
3. 左侧菜单找到 **Pages**
4. 在 **Source** 部分，选择 **GitHub Actions**
5. 保存

之后每次推送到 `main` 分支，GitHub 会自动构建并发布。

**查看部署进度**：

仓库页面 → 顶部 **Actions** 选项卡 → 可以看到构建日志

构建完成后（约 2～3 分钟），访问：
```
https://你的用户名.github.io/仓库名/
```

---

## 6. 第五步：绑定自定义域名（可选）

如果你有自己的域名（如通过阿里云、腾讯云购买），可以绑定到 GitHub Pages。

### 6.1 在项目中添加 CNAME 文件

在 `public/` 目录下创建文件 `CNAME`（无后缀），内容为你的域名：

```
www.yourcompany.com
```

### 6.2 DNS 解析设置

登录你的域名注册商后台（阿里云/腾讯云等），添加以下 DNS 解析记录：

| 记录类型 | 主机记录 | 记录值 |
|---------|---------|--------|
| CNAME | www | 你的用户名.github.io |

或者使用 A 记录（指向 GitHub 的 IP）：

| 记录类型 | 主机记录 | 记录值 |
|---------|---------|--------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

### 6.3 在 GitHub 配置自定义域名

仓库 → **Settings** → **Pages** → **Custom domain** 填入你的域名 → Save

勾选 **Enforce HTTPS**（等 DNS 生效后才能勾选，约需 10 分钟～24 小时）

### 6.4 修改 astro.config.mjs

如第 2 步情况 B 所示，将 `site` 改为你的自定义域名，移除 `base`。

---

## 7. 日常更新流程

网站上线后，每次修改内容只需：

```powershell
cd "d:\360MoveData\Users\nikey\Desktop\光纤跳线网站"

# 添加修改的文件
git add .

# 提交（描述本次改动）
git commit -m "更新产品页内容"

# 推送到 GitHub（自动触发构建）
git push
```

推送后约 **2～3 分钟**，网站自动更新。

---

## 8. 常见问题排查

### ❌ 页面打开是空白 / 样式丢失

**原因**：`base` 配置不对，资源路径错误。

**解决**：检查 `astro.config.mjs` 中 `base` 是否与仓库名完全一致（区分大小写）。

---

### ❌ 404 页面找不到

**原因**：直接访问子页面时，GitHub Pages 不支持 SPA 路由。

**解决**：Astro 静态站点默认生成 `.html` 文件，直接访问路径即可，无需特殊处理。

---

### ❌ GitHub Actions 构建失败

**查看方法**：仓库 → **Actions** → 点击失败的构建 → 查看错误日志

**常见原因**：
- `npm ci` 失败：通常是 `package-lock.json` 缺失，本地先运行 `npm install` 再提交
- Node 版本不兼容：在 `deploy.yml` 中把 `node-version: 20` 改为 `18`

---

### ❌ 推送时报 "Permission denied"

**解决**：使用 Personal Access Token 替代密码，见第 4.3 节。

---

### ❌ 中文路径问题

**现象**：git 显示文件名乱码。

**解决**：
```powershell
git config --global core.quotepath false
```

---

## 部署成功后的检查清单

- [ ] 首页正常显示（中文）
- [ ] 英文版 `/en/` 路径正常
- [ ] 产品页 `/products/pm-patch-cord/` 正常
- [ ] FAQ 折叠展开正常
- [ ] 询盘弹窗可以打开
- [ ] 移动端显示正常（手机浏览器测试）
- [ ] 在 Google 搜索 `site:你的域名` 验证收录（上线后约 1 周）

---

## 附录：配置 CMS 后台管理（可选）

如果需要可视化后台管理网站内容，参考 `CMS后台配置指南.md`：

1. 创建 GitHub OAuth App
2. 修改 `public/admin/config.yml` 中的 `repo` 和 `site_url`
3. 部署后访问 `/admin` 即可登录管理内容

---

> 如遇问题，将 GitHub Actions 的错误日志截图发给我，我帮你排查。
