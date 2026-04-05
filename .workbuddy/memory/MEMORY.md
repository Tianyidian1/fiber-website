# 光纤跳线网站 - 项目记忆

## 项目概述
**项目名称**: FiberLink 光纤跳线产品展示官网
**技术栈**: Astro 4.x + React 18 + Tailwind CSS + Decap CMS
**目标**: 零服务器成本、高性能、SEO 友好的静态站点，支持中英文双语

## 核心架构

### 前端框架
- **Astro 4.16.19**: 静态站点生成器，极速加载，SEO 优化
- **React 18.3.1**: 用于交互组件（轮播图、询盘弹窗、表单）
- **Tailwind CSS 3.4.19**: 快速 UI 开发，自定义品牌色（brand-blue: #0066CC）

### 多语言系统
- **自定义 i18n** (`src/i18n/index.ts`): 
  - 中英文翻译对象（~70 UI key）
  - `useTranslations(lang)` 函数获取对应语言文本
  - `getLangFromUrl(url)` 从 URL 解析当前语言
  - `getLocalizedPath(lang, path)` 构建本地化路径

### 内容管理
- **Decap CMS** (原 Netlify CMS): 基于文件系统的无头 CMS
  - 配置文件: `public/admin/config.yml`
  - 管理界面: `/admin`
  - 内容集合:
    - `products`: 产品管理（zh/en，~20 字段）
    - `banners`: Banner 轮播管理
    - `settings`: 全局配置（联系信息、SEO）

## 项目结构

### 页面路由
```
/                       # 中文首页
/en/                    # 英文首页
/about/                 # 关于我们
/en/about/              # 关于我们（英文）
/contact/               # 联系我们
/en/contact/            # 联系我们（英文）
/products/pm-patch-cord/        # 保偏跳线
/products/high-density/         # 高密度连接组件
/products/test-solutions/        # 测试方案
/products/specialty/            # 特种线缆
/en/products/*                  # 英文版产品页
```

### 组件架构
- `src/layouts/Layout.astro`: 基础布局（SEO meta, Header/Footer, 询盘弹窗）
- `src/components/ui/Header.astro`: 顶部导航（下拉菜单、语言切换、搜索）
- `src/components/ui/Footer.astro`: 页脚（4 列布局）
- `src/components/ui/InquiryModal.tsx`: 询盘弹窗（React，CustomEvent 触发）
- `src/components/ui/ContactForm.tsx`: 联系表单（React，Formspree 集成）
- `src/components/home/HeroBanner.tsx`: 首页轮播图（React，5s 自动播放）

## 已修复的技术问题

### 1. `@apply group` 错误
**问题**: Tailwind CSS `@apply` 不支持 `group` 变体
**解决**: 从 `src/styles/global.css` 的 `.product-card` 类中移除 `group`

### 2. Astro re-export 错误
**问题**: `export { default } from '../index.astro'` 导致重复导出
**解决**: 所有英文页面写为完整独立页，不使用 re-export

### 3. 英文产品详情页 `getStaticPaths` 作用域问题
**问题**: frontmatter 中 `t()` 函数在 `getStaticPaths` 执行前未定义
**解决**: 在 `getStaticPaths` 中直接使用硬编码英文字符串，`t()` 仅用于模板渲染

### 4. Sitemap 插件与 i18n 冲突
**问题**: `@astrojs/sitemap` 与 Astro i18n 路由配置存在兼容性问题（`Cannot read properties of undefined (reading 'reduce')`）
**状态**: 临时禁用 sitemap 插件，主构建功能正常

### 5. 路径目录名混淆
**问题**: 桌面存在两个相似目录名（`光纫跳线网站` vs `光纫跳线网站`）
**解决**: 确认项目在 `光纤跳线网站` 目录（有 package.json）

## 构建状态

### 成功构建（2026-04-04）
- **页面总数**: 23
- **构建时间**: 2.58s
- **输出目录**: `dist/`
- **生成文件**:
  - 中文首页、产品页、关于、联系
  - 英文首页、产品页、关于、联系
  - 中文产品详情页（4 个）
  - 英文产品详情页（4 个）
  - 404 页面

### 开发服务器
- **端口**: 4321
- **命令**: `npm run dev`
- **访问**: http://localhost:4321/

## 部署配置

### Cloudflare Pages
- 配置文件: `wrangler.toml`
- 部署命令: `npm run build` → 输出 `dist/`
- 环境变量: 无需（纯静态站点）

### Netlify
- 配置文件: `netlify.toml`
- 构建命令: `npm run build`
- 发布目录: `dist`

## 待办事项

### 高优先级
1. [ ] 解决 Sitemap 插件与 i18n 兼容问题
2. [ ] 修复 tsconfig 警告（`allowJs: true` 用于 CMS 配置自动完成）

### 中优先级
1. [ ] 添加实际产品图片（当前使用 emoji 占位）
2. [ ] 配置 Formspree 并验证询盘表单功能
3. [ ] 完善 CMS 内容（添加更多产品数据）
4. [ ] SEO 优化（添加 sitemap 替代方案）

### 低优先级
1. [ ] 性能优化（图片懒加载、代码分割）
2. [ ] 响应式细节调整（移动端菜单优化）
3. [ ] 单元测试覆盖

## 关键文件路径

| 文件 | 用途 |
|------|------|
| `astro.config.mjs` | Astro 配置（i18n、集成） |
| `tailwind.config.mjs` | Tailwind 配置（自定义颜色） |
| `src/i18n/index.ts` | 多语言系统 |
| `src/styles/global.css` | 全局样式 |
| `public/admin/config.yml` | Decap CMS 配置 |
| `package.json` | 项目依赖 |

---

**最后更新**: 2026-04-04
**状态**: 开发完成，构建成功，可部署
