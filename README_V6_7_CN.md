# V6.7 PhD Homepage Refinement · 使用说明

## 本版修改

- Research 页面标题精简为 Research trajectory / 科研主线；九节点 SVG 图保持一张，长篇论文证据改成默认收起，打开后卡片具有 hover/focus 的浮动、阴影和紫色描边。
- 4 张 Research theme 卡片整张可点击，鼠标悬停有视觉反馈；长篇方法论文字移入可展开模块，避免 Research 重复和拥挤。
- Publications 新增独立的 ICLR 2027 · Under Review / ICLR 2027 · 审稿中 区块，4 篇只显示**总数**和宽泛研究主题，不展示可识别的匿名稿件标题、投稿编号、作者关联和 PDF。
- `public/academic-mark.svg` 是新的紫色学术字母图标，`public/favicon.svg` 同步替换；双语 config.toml 都已经指向 `/academic-mark.svg`，部署到 GitHub Pages 后仍然显示。
- 原有 8 篇可公开署名的 Publications、九节点与论文映射、邮箱等数据均保留，不添加虚构引用次数或论文链接。

## 特别提醒：ICLR 双盲匿名

ICLR 2027 官方允许一定的预印本公开，但实行双盲评审。实名主页披露“4 manuscripts under review at ICLR 2027”本身是一项作者身份公开声明；这不等于论文已被录用，也无法保证完全没有匿名风险。**正式公开前，请先与全部合作者核实投稿身份和披露政策。**

如决定不在公开 GitHub Pages 上展示这项聚合声明，改 `src/components/publications/DoubleBlindPipeline.tsx` 中：

```tsx
export const showIclrReviewAggregate = false;
```

完整匿名稿件切勿复制到公共前端源码或构建产物；仅修改界面隐藏不是保密手段。

## 在 Mac 本地使用

- 解压完整源码，用 VS Code 打开根目录（含 `package.json`）
- 首次运行 `npm ci`，然后 `npm run dev`
- 打开 `http://localhost:3000/research/` 和 `/publications/`
- 构建检查 `npm run typecheck` 和 `npm run build`
- 浏览器图标可能缓存；强制刷新、重新开无痕窗口，或清除该站点 favicon 缓存。当前配置的新文件路径是 `/academic-mark.svg`

## 主要可编辑文件

- `src/components/custom/ResearchFramework.tsx` — Research 图与可折叠论文证据
- `src/components/custom/ResearchThemes.tsx` — 4 张可点击主题卡片
- `src/components/pages/DynamicPageClient.tsx` — Research 页面层次
- `src/components/publications/DoubleBlindPipeline.tsx` — ICLR 2027 聚合显示开关和内容
- `src/components/publications/PublicationsList.tsx` — Publications 布局
- `public/academic-mark.svg` — 新网站图标
- `content/config.toml`, `content_zh/config.toml` — favicon 路径与个人数据

## 上传 GitHub 的技术说明

本版仍基于原 PRISM 的 MIT 许可证，保留 `LICENSE`。修改的只是网站页脚署名显示，不应删除源码许可文件。
