# GitHub Pages + Decap CMS 后台配置指南

> 场景：将 Decap CMS 部署到 GitHub Pages，实现可视化内容管理
> 预计耗时：20～30 分钟（首次配置）

---

## 目录

1. [原理说明](#1-原理说明)
2. [第一步：创建 GitHub OAuth 应用](#2-第一步创建-github-oauth-应用)
3. [第二步：获取 Client ID 和 Secret](#3-第二步获取-client-id-和-secret)
4. [第三步：修改 CMS 配置文件](#4-第三步修改-cms-配置文件)
5. [第四步：部署到 GitHub Pages](#5-第四步部署到-github-pages)
6. [第五步：访问后台并登录](#6-第五步访问后台并登录)
7. [日常使用](#7-日常使用)
8. [故障排查](#8-故障排查)

---

## 1. 原理说明

### 工作流程

```
用户浏览器 → GitHub Pages 网站 → Decap CMS 界面
                                        ↓
                            GitHub OAuth 登录验证
                                        ↓
                            通过 GitHub API 读写仓库文件
```

### 关键点

- **GitHub OAuth**：使用 GitHub 账号登录 CMS
- **GitHub API**：CMS 通过 API 向仓库提交内容变更
- **自动部署**：内容变更后触发 GitHub Actions，自动重建网站

---

## 2. 第一步：创建 GitHub OAuth 应用

### 2.1 打开开发者设置

1. 登录 GitHub
2. 点击右上角头像 → **Settings**
3. 左侧菜单最底部 → **Developer settings**
4. 左侧点击 **OAuth Apps**
5. 点击 **New OAuth App**

### 2.2 填写应用信息

| 字段 | 填写内容 | 说明 |
|------|---------|------|
| **Application name** | `FiberLink CMS` | 随便填，方便识别 |
| **Homepage URL** | `https://你的用户名.github.io/仓库名/` | 你的 GitHub Pages 网站地址 |
| **Application description** | `Decap CMS for FiberLink Website` | 随便填 |
| **Authorization callback URL** | `https://你的用户名.github.io/仓库名/admin/` | 必须精确匹配，末尾有 `/admin/` |

**示例**（用户名 `fiberlink`，仓库名 `fiber-website`）：

```
Homepage URL: https://fiberlink.github.io/fiber-website/
Authorization callback URL: https://fiberlink.github.io/fiber-website/admin/
```

### 2.3 创建后记录信息

创建成功后会显示：

- **Client ID**（公开，用于 config.yml）
- **Generate a new client secret** → 点击生成 **Client Secret**（保密，只显示一次）

> ⚠️ **重要**：Client Secret 只显示一次，立即复制保存！

---

## 3. 第二步：获取 Client ID 和 Secret

将以下信息记录下来（稍后修改配置文件需要）：

| 信息 | 示例 | 用途 |
|------|------|------|
| **GitHub 用户名** | `fiberlink` | config.yml 中 repo 字段 |
| **仓库名** | `fiber-website` | config.yml 中 repo 字段 |
| **OAuth Client ID** | `Iv1.3a9f...` | config.yml 中 client_id 字段 |
| **OAuth Client Secret** | `ghp_xxxxxxxxxxxx` | GitHub Settings → Secrets 中配置 |
| **GitHub Pages 域名** | `https://fiberlink.github.io/fiber-website/` | OAuth callback URL |

---

## 4. 第三步：修改 CMS 配置文件

打开 `public/admin/config.yml`，修改 backend 部分：

```yaml
backend:
  name: github
  branch: main
  repo: 你的GitHub用户名/你的仓库名   # ← 改成你的，例：fiberlink/fiber-website
  site_url: https://你的用户名.github.io/仓库名  # ← 你的 GitHub Pages 域名
  base_url: https://api.github.com    # GitHub API 地址
  auth_endpoint: https://github.com/login/oauth/authorize
  token_endpoint: https://github.com/login/oauth/access_token
  auth_type: pkce    # 使用 PKCE 认证（更安全）

site_url: https://你的用户名.github.io/仓库名   # ← 你的网站域名

# 媒体文件存储路径
media_folder: "public/images/uploads"
public_folder: "/images/uploads"
```

---

## 5. 第四步：部署到 GitHub Pages

按照《GitHub部署手册.md》执行以下步骤：

1. 提交并推送代码到 GitHub
2. 在仓库 Settings → Pages 开启 GitHub Actions
3. 等待构建完成（约 2～3 分钟）

---

## 6. 第五步：访问后台并登录

### 6.1 访问后台地址

```
https://你的用户名.github.io/仓库名/admin/
```

### 6.2 登录流程

1. 点击 **Login with GitHub**
2. 授权页面点击 **Authorize FiberLink CMS**
3. 授权成功后进入 CMS 后台

### 6.3 后台功能

- **产品管理**：新增/编辑/删除产品
- **Banner 管理**：管理首页轮播图
- **基础设置**：联系信息、SEO 配置

每次保存内容后，CMS 会自动：

1. 通过 GitHub API 提交代码到仓库
2. 触发 GitHub Actions 自动构建
3. 2～3 分钟后网站自动更新

---

## 7. 日常使用

### 添加新产品

1. 访问 `/admin` 登录
2. 点击「产品管理」→ **新增产品**
3. 填写表单（中英双语）
4. 点击 **保存** → 自动提交到仓库 → 自动构建

### 修改联系信息

1. 后台 → **基础设置** → **联系信息**
2. 修改电话、邮箱、地址
3. 保存即可

### 上传图片

在产品编辑器中点击「选择图片」，CMS 会自动上传到 `public/images/uploads/` 目录。

---

## 8. 故障排查

### ❌ 登录时报 "Authorization callback URI mismatch"

**原因**：OAuth App 的 callback URL 填写错误

**解决**：
1. 回到 GitHub → Settings → Developer settings → OAuth Apps
2. 找到你创建的应用 → Edit
3. 检查 **Authorization callback URL** 是否为：
   ```
   https://你的用户名.github.io/仓库名/admin/
   ```
   注意末尾有 `/admin/`

---

### ❌ 登录时报 "Repo not found"

**原因**：config.yml 中 `repo` 字段填写错误

**解决**：确保格式为 `用户名/仓库名`，例：`fiberlink/fiber-website`

---

### ❌ 保存内容时报 "Commit failed"

**原因**：仓库权限不足或分支名错误

**解决**：
1. 确认 OAuth App 有仓库写权限
2. 检查 `backend.branch` 是否为 `main`
3. 如果你的仓库默认分支是 `master`，改为 `branch: master`

---

### ❌ 保存后网站没更新

**原因**：GitHub Actions 未触发或构建失败

**解决**：
1. 仓库 → **Actions** 选项卡
2. 查看最新构建日志
3. 常见错误：`npm ci` 失败 → 重新运行 `npm install` 并提交

---

## 安全提示

⚠️ **不要将 Client Secret 提交到代码仓库**

- Client Secret 不要写在 `config.yml` 中
- 只需要将 **Client ID** 写入 `config.yml`
- 如果使用 GitHub Actions 部署，可以将 Secret 存储在 GitHub Secrets 中

---

## 下一步

完成配置后，你可以：

1. **添加真实产品内容**：在 CMS 后台批量上传产品
2. **替换占位图片**：上传实际产品图片
3. **配置 Formspree**：让联系表单真正工作
4. **绑定自定义域名**：将 `yourdomain.com` 指向 GitHub Pages

---

> 如遇问题，查看 GitHub Actions 日志或截图给我，我帮你排查。
