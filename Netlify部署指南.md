# Netlify 部署指南

> 适用：Astro 4.x 静态站点 → Netlify 免费托管 + Decap CMS 后台
> 预计耗时：15～30 分钟（首次部署）

---

## 目录

1. [前置准备](#1-前置准备)
2. [第一步：修改 Astro 配置](#2-第一步修改-astro-配置)
3. [第二步：连接 GitHub 仓库到 Netlify](#3-第二步连接-github-仓库到-netlify)
4. [第三步：配置构建命令](#4-第三步配置构建命令)
5. [第四步：开启 Netlify Identity](#5-第四步开启-netlify-identity)
6. [第五步：部署成功并访问后台](#6-第五步部署成功并访问后台)
7. [日常更新流程](#7-日常更新流程)
8. [故障排查](#8-故障排查)

---

## 1. 前置准备

### 1.1 注册 Netlify 账号

1. 打开 https://www.netlify.com
2. 点击右上角 **Sign up**
3. 选择 **Sign up with GitHub**（推荐，后续集成更简单）
4. 授权 Netlify 访问你的 GitHub 仓库

### 1.2 确认代码已推送到 GitHub

确保你的网站代码已经推送到 GitHub 仓库。如果还没有，按照《GitHub部署手册.md》第 4 步操作。

---

## 2. 第一步：修改 Astro 配置

Netlify 支持自定义域名，不需要 `base` 路径。打开 `astro.config.mjs`，修改 `site` 字段：

```js
export default defineConfig({
  site: 'https://your-site-name.netlify.app',  // ← 后续会生成，先留空或用默认
  // 不需要 base
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

如果你有自定义域名（如 `www.yourcompany.com`），可以直接用：

```js
site: 'https://www.yourcompany.com',
```

---

## 3. 第二步：连接 GitHub 仓库到 Netlify

### 3.1 在 Netlify 创建新站点

1. 登录 Netlify 后台
2. 点击 **Add new site** → **Import an existing project**
3. 选择 **GitHub**（需要先授权 Netlify 访问你的 GitHub）
4. 在仓库列表中选择你的光纤跳线网站仓库

### 3.2 选择部署分支

选择 **main** 分支（或你的默认分支）

---

## 4. 第三步：配置构建命令

在 Netlify 的构建设置页面，填写以下信息：

| 字段 | 值 | 说明 |
|------|-----|------|
| **Build command** | `npm run build` | Astro 构建命令 |
| **Publish directory** | `dist` | 构建输出目录 |
| **Node version** | `20` | Node 版本（可选，默认 18 也可以） |

完成后点击 **Deploy site**

---

## 5. 第四步：开启 Netlify Identity

### 5.1 启用 Identity 功能

1. 站点部署后，进入站点后台
2. 左侧菜单点击 **Identity**
3. 点击 **Enable Identity**

### 5.2 启用 Git Gateway

1. 在 Identity 页面，点击 **Settings**
2. 找到 **Git Gateway**
3. 点击 **Enable Git Gateway**

**作用**：Git Gateway 允许 CMS 通过 Netlify Identity 直接向 GitHub 仓库提交内容变更。

### 5.3 邀请管理员（可选）

1. 在 Identity 页面，点击 **Invite users**
2. 填写邮箱地址
3. 设置用户权限为 **Administrator**
4. 发送邀请邮件

收到邀请的用户可以登录 CMS 后台管理内容。

---

## 6. 第五步：部署成功并访问后台

### 6.1 查看部署结果

等待约 1～2 分钟，Netlify 会自动构建并部署网站。

构建完成后：

- 站点地址：`https://你的站点名.netlify.app`
- 可以点击 **Open production deploy** 预览

### 6.2 访问 CMS 后台

打开浏览器访问：

```
https://你的站点名.netlify.app/admin
```

### 6.3 登录 CMS

1. 点击 **Login with Email**
2. 输入你的邮箱
3. 查收邮件，点击登录链接
4. 登录成功后进入 CMS 后台

**如果使用 GitHub 注册的 Netlify 账号**，点击 **Login with GitHub** 更方便。

---

## 7. 日常更新流程

### 7.1 通过 CMS 后台更新内容

1. 访问 `/admin` 登录
2. 选择内容类型（产品 / Banner / 设置）
3. 点击 **新增** 或编辑现有条目
4. 填写表单
5. 点击 **保存** → Netlify 自动部署 → 网站自动更新

### 7.2 通过代码更新

如果你想直接修改代码：

```powershell
cd "d:\360MoveData\Users\nikey\Desktop\光纤跳线网站"

# 修改文件后
git add .
git commit -m "更新首页 Hero 区域"
git push
```

Netlify 会自动检测 GitHub 推送，重新构建并部署。

---

## 8. 故障排查

### ❌ Identity 登录时报错

**问题**：点击登录后没有反应或报错

**解决**：
1. 检查 Netlify Identity 是否已启用
2. 检查 Git Gateway 是否已启用
3. 清除浏览器缓存后重试

---

### ❌ CMS 无法保存内容

**问题**：保存时报 "Commit failed"

**解决**：
1. 检查 Git Gateway 是否启用
2. 检查 GitHub 仓库权限（Netlify OAuth 需要有写权限）
3. 在 Netlify → Identity → Users 中确认用户已验证

---

### ❌ 部署后网站样式丢失

**问题**：页面能打开但样式不正常

**解决**：
1. 检查 `astro.config.mjs` 中是否有多余的 `base` 配置
2. Netlify 部署不需要 `base`，确保已移除
3. 检查构建日志是否有错误

---

### ❌ 404 Not Found

**问题**：访问某个页面报 404

**解决**：
1. 检查文件路径是否正确
2. 防止大小写问题（GitHub 不区分大小写，Netlify 区分）
3. 检查 `dist/` 目录是否正确生成

---

## Netlify 免费版限制

| 项目 | 限制 | 说明 |
|------|------|------|
| **带宽** | 100GB/月 | 超出后站点临时不可用 |
| **构建时间** | 300 分钟/月 | 超出后需要等待下个月或升级付费版 |
| **站点数量** | 无限制 | 可以创建多个站点 |
| **团队成员** | 无限制 | 可以邀请多人协作 |

**推荐**：对于中小型静态站点，免费版完全够用。

---

## 绑定自定义域名（可选）

### 步骤

1. Netlify 站点后台 → **Domain settings**
2. 点击 **Add custom domain**
3. 输入你的域名（如 `www.yourcompany.com`）
4. 按提示配置 DNS 解析记录

### DNS 配置

在你的域名注册商后台（阿里云/腾讯云等）添加：

| 记录类型 | 主机记录 | 记录值 |
|---------|---------|--------|
| CNAME | www | 你的站点名.netlify.app |

配置完成后，在 `astro.config.mjs` 中更新 `site` 字段：

```js
site: 'https://www.yourcompany.com',
```

---

## 下一步

部署成功后，你可以：

1. **添加真实产品内容**：在 CMS 后台批量上传产品
2. **替换占位图片**：上传实际产品图片
3. **配置 Formspree**：让联系表单真正工作
4. **开启 HTTPS**：Netlify 默认提供免费 SSL 证书

---

## Netlify vs GitHub Pages 对比

| 特性 | Netlify | GitHub Pages |
|------|--------|--------------|
| **免费带宽** | 100GB/月 | 100GB/月（软限制） |
| **构建时间** | 300 分钟/月 | 无限制 |
| **CMS 后台** | Decap CMS 原生支持 | 需要额外配置 GitHub OAuth |
| **自定义域名** | 支持，免费 SSL | 支持，免费 SSL |
| **表单处理** | 内置表单功能 | 需第三方服务（Formspree） |
| **配置难度** | 简单 | 中等 |

**推荐**：如果需要 CMS 后台，Netlify 更简单；如果不需要 CMS，GitHub Pages 更稳定。

---

> 如遇问题，查看 Netlify 部署日志或截图给我，我帮你排查。
