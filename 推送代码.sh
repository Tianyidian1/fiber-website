#!/bin/bash
# 推送代码到 GitHub 的脚本
# 请在 Git Bash 中运行此脚本

echo "开始推送代码到 GitHub..."
echo ""

# 配置 Git 身份信息
git config --global user.name "Tianyidian1"
git config --global user.email "tianyidian1@example.com"
echo "✓ Git 身份信息已配置"
echo ""

# 进入项目目录
cd "d:\360MoveData\Users\nikey\Desktop\光纤跳线网站" || exit 1

# 初始化 Git
if [ ! -d ".git" ]; then
    git init
    echo "✓ Git 仓库已初始化"
else
    echo "✓ Git 仓库已存在"
fi
echo ""

# 添加所有文件
git add .
echo "✓ 文件已添加到暂存区"
echo ""

# 提交代码
git commit -m "初始提交：光纤跳线网站"
echo "✓ 代码已提交"
echo ""

# 修改分支名为 main
git branch -M main
echo "✓ 分支已重命名为 main"
echo ""

# 关联远程仓库
git remote add origin https://github.com/Tianyidian1/fiber-website.git
echo "✓ 远程仓库已关联"
echo ""

# 推送代码
echo "正在推送代码到 GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✓ 代码推送成功！"
    echo "访问：https://github.com/Tianyidian1/fiber-website"
else
    echo ""
    echo "✗ 推送失败，请检查："
    echo "1. 仓库是否已在 GitHub 创建"
    echo "2. 是否使用了 Personal Access Token 而非密码"
    echo "3. 网络连接是否正常"
fi
