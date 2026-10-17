# Yuli Liu · Academic Homepage V6.6

## 首页 / Research / 论文卡片

- 导航：About / Research / Publications / Experience / Awards / CV。旧 `/projects` 不在导航中。
- 首页左侧人像、研究兴趣，右侧研究文字与可交互九节点，桌面双栏独立滚动保留。
- Research 内九节点图 + 论文关联图 + 4 个概括性的研究主题。**不逐篇披露 ICLR 匿名稿件**。
- Publications 按 Published / Accepted / Public Preprints / Manuscripts · Decision Pending 分组。
- 论文卡片支持一行贡献、2–4 关键词、Figure 1 替换槽位、摘要概述折叠、BibTeX 折叠与复制、存在才显示的 DOI/arXiv/PDF/Code 链接、节点交叉链接。
- 未核实的 citation 数据**不显示数字**；Google Scholar 的真实个人主页作为来源入口。
- Experience = Research Appointments + Research Collaborations + Selected Early Technical Research Training。保留两项本科技术训练而不夸大。

## macOS + VS Code

```bash
npm ci
npm run dev
# http://localhost:3000
```

正式部署前检查：`npm run build`，确认所有公共链接、署名、合作经历和审稿状态，确保公开源码不包含匿名投稿文件或唯一标识。

## 如何替换每篇 Figure 1

在 `src/data/researchPapers.json` 里找到 `P1` ... `M4`：

- 当前 `preview` 是 `/papers/P1-figure1-placeholder.svg` 这类占位图，并非真实论文插图。
- 将获得许可的原论文图片放进 `public/papers/`，例如 `P1-figure1.png`。
- 把 `preview` 修改为 `/papers/P1-figure1.png`，再运行 `python3 scripts/sync_publications.py`。

同一 JSON 也管理 `keywords`、`summary`、`nodes`、`url`、`doi`、`arxiv`、`pdf`、`code`、`citationCount`、`citationUrl`。真实 URL 才填写，空值自动隐藏按钮。真实引用量必须同时填写 `citationCount` 和对应 `citationUrl`，别用主页的总引用冒充单篇引用。

## 双盲审稿保护

本源码包不包含四篇 ICLR 2027 的真实标题、投稿编号、作者署名或 PDF；只显示泛化科研主题 R01–R04。即使泛化表述，也建议与合作者核查公开展示风险。不要把私人论文列表放进公开 Git 提交历史里——删除文件本身也不会自动清除旧版本历史。

## 来源

PRISM by xyjoey: https://github.com/xyjoey/PRISM （上游 MIT LICENSE 保留）。
