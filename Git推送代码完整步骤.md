# Git 安装完成后 - 推送代码步骤

## 检查 Git 是否正常工作

安装 Git 后，你需要**关闭当前 PowerShell，重新打开一个新的 PowerShell** 才能使用 git 命令。

**验证方法**：
```powershell
git --version
```

如果看到版本号（如 `git version 2.x.x`），说明安装成功。

---

## 方式一：使用 Git Bash（推荐）

Git 安装后，会在开始菜单添加 **Git Bash**：

1. 按 `Win` 键，搜索 "Git Bash"
2. 打开 **Git Bash**
3. 复制粘贴以下命令：

```bash
# 进入项目目录
cd "d:\360MoveData\Users\nikey\Desktop\光纤跳线网站"

# 配置 Git 身份信息
git config --global user.name "Tianyidian1"
git config --global user.email "你的邮箱@example.com"  ← 改成你的真实邮箱

# 初始化 Git
git init

# 添加所有文件
git add .

# 提交代码
git commit -m "初始提交：光纤跳线网站"

# 修改分支名
git branch -M main

# 关联远程仓库
git remote add origin https://github.com/Tianyidian1/fiber-website.git

# 推送代码
git push -u origin main
```

---

## 方式二：使用 PowerShell

**重要**：安装 Git 后必须重新打开 PowerShell。

1. 关闭当前的 PowerShell 窗口
2. 打开新的 PowerShell（Win + X → Windows PowerShell）
3. 输入以下命令：

```powershell
# 验证 Git
git --version

# 进入项目目录
cd "d:\360MoveData\Users\nikey\Desktop\光纤跳线网站"

# 配置 Git 身份信息
git config --global user.name "Tianyidian1"
git config --global user.email "你的邮箱@example.com"  ← 改成你的真实邮箱

# 初始化 Git
git init

# 添加所有文件
git add .

# 提交代码
git commit -m "初始提交：光纤跳线网站"

# 修改分支名
git branch -M main

# 关联远程仓库
git remote add origin https://github.com/Tianyidian1/fiber-website.git

# 推送代码
git push -u origin main
```

---

## 推送时的认证问题

### 如果提示输入用户名和密码：

**用户名**：`Tianyidian1`

**密码**：不填 GitHub 账号密码，需要使用 **Personal Access Token**

### 获取 Personal Access Token：

1. 登录 GitHub：https://github.com
2. 右上角头像 → **Settings**
3. 左侧最底部 → **Developer settings**
4. **Personal access tokens** → **Tokens (classic)**
5. **Generate new token** → **Generate new token (classic)**
6. Note 填 `git push`
7. Expiration 选 `No expiration` 或较长时间
8. **勾选 `repo` 权限**
9. 点击 **Generate token**
10. **复制这个 Token**（只显示一次）

推送时密码处粘贴这个 Token。

---

## 验证推送成功

推送完成后，访问：
https://github.com/Tianyidian1/fiber-website

应该能看到你的所有代码文件。

---

## 下一步：连接到 Netlify

代码推送成功后：

1. 访问 https://app.netlify.com/start
2. 点击 **Import an existing project**
3. 选择 **GitHub**
4. 找到 `fiber-website` 仓库 → **Import**
5. 配置构建命令：`npm run build`
6. 发布目录：`dist`
7. 点击 **Deploy site**

---

## 遇到错误？

把错误信息截图发给我。
