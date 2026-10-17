# V6.8 · 个人学术主页使用说明

## 直接运行（Mac / VS Code）

1. 解压完整 ZIP，用 VS Code 打开含有 `package.json` 的最内层文件夹。
2. 在 Terminal 运行 `npm ci`，然后运行 `npm run dev`。
3. 浏览器访问 `http://localhost:3000`；第一次启动可能需要编译。
4. 正式发布前运行 `npm run typecheck`、`npm run build`。

## 你下一步上传 `profile.jpg` 的方法

* 已经将英语与中文的 `avatar` 同步设置为 `/profile.jpg`。
* 当前 `public/profile.jpg` 是一张临时照片；把你的正式照片命名为 `profile.jpg`，直接覆盖这个文件即可，无须修改 config.toml。
* 建议 4:5 人像裁切（例如 800×1000 JPG），清晰、正规即可。浏览器若显示旧图，请强制刷新。
* 导航栏使用 `public/portrait-mark.png`，浏览器 tab 图标 `public/favicon.png`，两者独立于主页照片。

## News 新闻如何修改

* 英文：`content/news.toml`；中文：`content_zh/news.toml`。
* 追加 `[[news]]`，带上 `date = "Oct 2026"`、`content = "..."`。

## 九节点和研究路线图

* 首页真正可点击的 9 节点：`src/components/custom/ResearchMap.tsx`。
* N01–N09 名称、描述：`src/data/researchMap.ts`。
* 宽泛研究主题（包含 N02 的候选生成 / 因果选择主题 R04）：`src/data/researchThemes.ts`。
* Research 页英文高清矢量主图：`public/research-overview.svg`。
* Research 页中文高清矢量主图：`public/research-overview-zh.svg`。
* 你可以以后用 Inkscape / Illustrator / Figma 绘制新的 SVG，保持文件名不变直接覆盖；也可以改 `src/components/custom/ResearchFramework.tsx` 中的图片路径。
* SVG 图上的 P、M 是可公开署名论文/稿件编号；R 是研究主题，不等于审稿结果。
* N02 关联 R04 Evidence-Aware Candidate Selection，原来没有具名公开论文，不再显示为毫无关联的空节点。

## 页面底部浏览统计（完全真实）

* 代码已经实现。桌面首页右侧内容滑动至底部会淡入一张紫色小卡，其他页面位于真实页脚。
* 未接统计服务时只显示姓名和版权，不显示虚构的浏览量。
* 如要显示真实数字，访问 https://www.goatcounter.com/ 创建账户和网站，打开 **Allow adding visitor counts on your website**，获取你自己的站点 code。
* 在项目根目录新建 `.env.local`，加入（将 YOUR_CODE 换成你的站点代码）：
  `NEXT_PUBLIC_GOATCOUNTER_CODE=YOUR_CODE`
* **不要**填真实邮箱、密码或 API secret 到 `.env.local`。代码只需要公开的站点 code。
* 重新运行 `npm run dev`；本地 localhost 默认不会计入线上访问量。GitHub Pages 正式部署时需要在 GitHub Actions 构建步骤中传入该公开环境变量。
* GoatCounter 计数有缓存，且统计权限在控制台默认关闭；刚配置完成后不一定立刻显示数字。

## 双盲研究

Publications 依照 V6.7 的选择保留 `ICLR 2027 · Under Review` 聚合模块。这个聚合声明本身仍会在实名网页上公开审稿关联，应根据会议政策和合作者意见决定是否公开。需要隐藏时，在 `src/components/publications/DoubleBlindPipeline.tsx` 把 `showIclrReviewAggregate = true` 改为 `false`。

## 关于完整项目

本项目仍沿用 PRISM（MIT 许可）的源码和组件，保留 LICENSE 与上游说明。公开发布不会由本文件包自动完成。
