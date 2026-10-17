"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ArrowRight, ChevronLeft, ChevronRight, GitBranch, X } from "lucide-react";
import { useLocaleStore } from "@/lib/stores/localeStore";
import { nodes } from "@/data/researchMap";
import { papersForNode } from "@/data/researchPapers";
import { researchThemes } from "@/data/researchThemes";

type Stage = "upstream" | "midstream" | "downstream";
const stages: Stage[] = ["upstream", "midstream", "downstream"];

const stageLabels: Record<Stage, {
  en: string;
  zh: string;
  tagline: string;
  taglineZh: string;
}> = {
  upstream: {
    en: "CAUSAL + LLM",
    zh: "因果决策与大模型",
    tagline: "UPSTREAM / UNDERSTAND",
    taglineZh: "上游 · 理解与决策",
  },
  midstream: {
    en: "COOPERATIVE INTELLIGENCE",
    zh: "协同智能",
    tagline: "MIDSTREAM / COORDINATE",
    taglineZh: "中游 · 通信与协同",
  },
  downstream: {
    en: "NETWORKED SYSTEMS",
    zh: "异构网络系统",
    tagline: "DOWNSTREAM / DEPLOY",
    taglineZh: "下游 · 网络与部署",
  },
};

// Public-safe display labels for four ICLR 2027 manuscripts.
// These are broad research descriptors, NOT the anonymous paper titles.
// Keep this mapping consistent with the actual four submissions.
const iclrInReview = [
  {
    key: "iclr-proposals",
    node: "agents",
    en: "Evidence-aware decision selection",
    zh: "证据感知的决策选择",
  },
  {
    key: "iclr-reliability",
    node: "decide",
    en: "Reliable causal decision-making",
    zh: "可靠因果决策",
  },
  {
    key: "iclr-adaptation",
    node: "adapt",
    en: "Learning with imperfect feedback",
    zh: "不完备反馈下的学习",
  },
  {
    key: "iclr-routing",
    node: "sags",
    en: "Online optimization in dynamic networks",
    zh: "动态网络中的在线优化",
  },
] as const;

const iclrForNode = (nodeId: string) =>
  iclrInReview.filter((work) => work.node === nodeId);

export default function ResearchMap({ embedded = false }: { embedded?: boolean }) {
  const locale = useLocaleStore((state) => state.locale);
  const zh = locale === "zh";
  // Start collapsed. An explicit #node=... URL can still open a node.
  const [selected, setSelected] = useState<number | null>(null);
  const reducedMotion = useReducedMotion();
  const detailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fromHash = () => {
      if (!window.location.hash.startsWith("#node=")) return;
      const value = decodeURIComponent(window.location.hash.slice("#node=".length));
      const index = nodes.findIndex((node) => node.id === value);
      if (index >= 0) setSelected(index);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  useEffect(() => {
    if (selected === null) return;
    const frame = window.requestAnimationFrame(() => {
      detailRef.current?.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "nearest",
      });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [selected, reducedMotion]);

  const updateNodeHash = (index: number | null) => {
    const destination = index === null
      ? `${window.location.pathname}${window.location.search}`
      : `#node=${encodeURIComponent(nodes[index].id)}`;
    window.history.replaceState(null, "", destination);
  };

  const selectNode = (index: number) => {
    const next = selected === index ? null : index;
    setSelected(next);
    updateNodeHash(next);
  };

  const closeDetails = () => {
    setSelected(null);
    if (window.location.hash.startsWith("#node=")) updateNodeHash(null);
  };

  const active = nodes[selected ?? 0];
  const currentPapers = papersForNode(active.id);
  const currentIclr = iclrForNode(active.id);
  const name = (node: typeof active) => zh ? node.title_zh : node.title;
  const change = (delta: number) => {
    if (selected === null) return;
    const next = (selected + delta + nodes.length) % nodes.length;
    setSelected(next);
    updateNodeHash(next);
  };

  return (
    <section data-embedded={embedded ? "true" : undefined} id="research-constellation" aria-label={zh ? "九节点交互科研地图" : "Nine-node interactive research map"}
      className="relative isolate overflow-hidden rounded-[30px] border border-violet-200/70 dark:border-violet-500/25 bg-[#f8f4ff] dark:bg-[#33254b] shadow-[0_30px_80px_-42px_rgba(57,25,103,.38)]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-80"
        style={{ background: "radial-gradient(ellipse at 95% 1%, rgba(183,151,230,.20), transparent 35%), radial-gradient(ellipse at 0% 96%, rgba(130,99,188,.12), transparent 38%)" }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[.2] dark:opacity-[.1]"
        style={{ backgroundImage: "radial-gradient(#9a7ec9 .8px, transparent .8px)", backgroundSize: "20px 20px" }} />
      <div className="relative z-10 px-4 sm:px-5 lg:px-6 pt-7 sm:pt-8 pb-6">
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold tracking-[0.17em] uppercase text-violet-700 dark:text-violet-200">
          <GitBranch className="h-4 w-4" aria-hidden="true" />
          <span>{zh ? '研究主线 · RESEARCH FRAMEWORK' : 'RESEARCH FRAMEWORK'}</span>
          <span className="ml-auto rounded-full border border-violet-300/60 bg-white/50 dark:bg-violet-300/10 dark:border-violet-300/20 px-3 py-1.5 tracking-[0.12em]">09 NODES · 03 STAGES</span>
        </div>
        <div className="flex flex-wrap items-end justify-between gap-5 mt-4">
          <div className="max-w-3xl">
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-[#2c1a4b] dark:text-white">
              {zh ? "从因果决策到可信网络智能" : "From causal decisions to networked intelligence"}
            </h2>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-violet-950/70 dark:text-violet-100/75">
              {zh ? "点击研究节点，探索方法、主题与相关论文。"
                : "Select a node to explore its methods, research themes, and related papers."}
            </p>
            <p className="mt-3 text-[11px] font-semibold tracking-wide text-violet-700 dark:text-violet-200">
              {zh ? "ICLR 2027 · 4 篇论文在审（以概括性研究方向显示）" : "ICLR 2027 · 4 manuscripts under review (broad research labels)"}
            </p>
          </div>

        </div>
        <div className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {stages.map((stage, stageIndex) => (
            <div key={stage} className="relative rounded-[22px] border border-white/90 dark:border-violet-500/20 bg-white/80 dark:bg-[#392b54]/95 shadow-[0_6px_26px_rgba(77,46,121,.07)] p-3 sm:p-3.5 backdrop-blur-sm">
              <div className="pb-3 mb-3 border-b border-violet-100 dark:border-white/10">
                <div className="flex items-start gap-2">
                  <span className="shrink-0 flex items-center justify-center h-10 w-10 rounded-full border border-violet-300/70 dark:border-violet-300/40 bg-violet-100/80 dark:bg-violet-400/15 text-violet-800 dark:text-violet-100 font-serif text-lg font-bold">0{stageIndex + 1}</span>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] uppercase tracking-[.12em] text-violet-500 dark:text-violet-300">{zh ? stageLabels[stage].taglineZh : stageLabels[stage].tagline}</div>
                    <h3 className="mt-0.5 text-sm sm:text-base font-semibold leading-snug text-[#2c1a4b] dark:text-white">{zh ? stageLabels[stage].zh : stageLabels[stage].en}</h3>
                  </div>
                </div>
              </div>
              <div className="space-y-2.5">
                {nodes.map((node, index) => node.stage === stage && (
                  <motion.button type="button" key={node.id} onClick={() => selectNode(index)}
                    whileHover={reducedMotion ? {} : { y: -3 }} whileTap={reducedMotion ? {} : { scale: .985 }}
                    aria-pressed={selected === index} aria-expanded={selected === index}
                    aria-controls={selected === index ? "research-node-detail" : undefined}
                    className={`relative w-full text-left rounded-2xl border px-3 py-3 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 ${selected === index
                      ? "border-violet-500 bg-gradient-to-r from-violet-100 via-white to-fuchsia-50 dark:from-violet-900/65 dark:via-[#523669] dark:to-[#59376e] shadow-[0_12px_30px_rgba(124,58,237,.16)]"
                      : "border-violet-100 dark:border-violet-600/25 bg-[#fcfbff] dark:bg-[#45345e] hover:border-violet-400 hover:bg-violet-50 dark:hover:bg-[#3b2a53]"}`}
                  >
                    <span className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[11px] tracking-wider text-violet-600 dark:text-violet-300">N{String(index + 1).padStart(2, "0")}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-violet-500" aria-hidden="true" />
                    </span>
                    <span className="mt-1.5 block min-h-[38px] text-sm font-semibold leading-snug text-[#382454] dark:text-white">{name(node)}</span>
                    <span className="mt-2 flex flex-wrap items-center gap-1.5">
                      {researchThemes.filter(topic => topic.nodes.includes(node.id)).slice(0, 2).map(topic => <span key={topic.id} title={zh ? topic.titleZh : topic.title} className="rounded-md border border-violet-300/40 dark:border-violet-300/20 bg-white/70 dark:bg-violet-200/15 px-1.5 py-0.5 text-[10px] font-semibold text-violet-700 dark:text-violet-200">{zh ? "研究" : "Theme"} · {topic.id === "selection" ? "R04" : `R${String(researchThemes.indexOf(topic)+1).padStart(2,"0")}`}</span>)}
                      {papersForNode(node.id).slice(0, 3).map((paper) => <span key={paper.id} title={`${paper.id} · ${paper.venue}`} className="rounded-md border border-violet-300/40 dark:border-violet-300/20 bg-violet-100/75 dark:bg-violet-200/15 px-1.5 py-0.5 text-[10px] font-semibold text-violet-700 dark:text-violet-100">{paper.id}</span>)}
                      {papersForNode(node.id).length > 3 && <span className="text-[10px] text-violet-600 dark:text-violet-200">+{papersForNode(node.id).length - 3}</span>}
                      {iclrForNode(node.id).map(work => (
                        <span key={work.key} title={zh ? work.zh : work.en}
                          className="rounded-md border border-violet-400/45 bg-violet-100/80 dark:bg-violet-400/20 px-1.5 py-0.5 text-[10px] font-semibold text-violet-800 dark:text-violet-100">
                          ICLR &apos;27
                        </span>
                      ))}
                      {!papersForNode(node.id).length && !iclrForNode(node.id).length && <span className="text-[10px] text-violet-400 dark:text-violet-300/60">{zh ? "探索方向" : "Exploratory"}</span>}
                    </span>
                  </motion.button>
                ))}
              </div>
              {stageIndex !== 2 && <div aria-hidden="true" className="hidden sm:flex absolute -right-[17px] z-20 top-1/2 h-8 w-8 items-center justify-center rounded-full border border-violet-200 bg-white text-violet-700 shadow-md"><ArrowRight className="h-4 w-4" /></div>}
            </div>
          ))}
        </div>
        <AnimatePresence initial={false}>
          {selected !== null && (
            <motion.div
              key="research-node-detail"
              ref={detailRef}
              id="research-node-detail"
              aria-live="polite"
              initial={reducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="relative mt-5 rounded-[22px] border border-violet-200/80 dark:border-violet-400/25 bg-white/95 dark:bg-[#443056] p-5 sm:p-7 shadow-[0_12px_35px_-22px_rgba(83,49,130,.4)]"
            >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-[11px] font-bold tracking-[.16em] text-violet-700 dark:text-violet-200 uppercase">{zh ? "当前聚焦的研究节点" : "CURRENTLY EXPLORING"}</span>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-violet-500">{String(selected + 1).padStart(2, "0")} / 09</span>
              <button type="button" onClick={closeDetails}
                aria-label={zh ? "收起研究详情" : "Close research details"}
                className="rounded-full border border-violet-200 dark:border-violet-500/40 p-1.5 hover:bg-violet-100 dark:hover:bg-violet-800">
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={active.id} initial={reducedMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={reducedMotion ? undefined : { opacity: 0, y: -6 }} transition={{ duration: .2 }}>
              <div className="mt-3 text-xs text-violet-500 dark:text-violet-300">{zh ? active.eyebrow_zh : active.eyebrow}</div>
              <h3 className="mt-1 font-serif text-xl sm:text-2xl font-semibold text-[#2c1a4b] dark:text-white">{name(active)}</h3>
              <p className="mt-2 max-w-4xl text-sm sm:text-base leading-7 text-[#594b6c] dark:text-violet-100/80">{zh ? active.detail_zh : active.detail}</p>
              <div className="mt-4 flex flex-wrap gap-2">{(zh ? active.tags_zh : active.tags).map((tag) => <span key={tag} className="rounded-full border border-violet-200 dark:border-violet-500/30 bg-violet-50 dark:bg-violet-500/10 px-3 py-1 text-xs text-violet-700 dark:text-violet-200">{tag}</span>)}</div>
              <div className="mt-5 border-t border-violet-100 dark:border-white/10 pt-4">
                <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-semibold text-violet-700 dark:text-violet-200"><span>{zh ? "相关成果与在投稿件" : "RELATED WORK & MANUSCRIPTS"}</span><span className="rounded-full border border-violet-300/40 px-2 py-0.5 text-[10px]">{currentPapers.length + currentIclr.length}</span></div>
                {currentPapers.length ? <div className="flex flex-col gap-2">{currentPapers.map(paper => <div key={paper.id} className="flex items-start gap-2 rounded-xl bg-violet-50/80 dark:bg-violet-300/10 border border-violet-200/40 dark:border-violet-300/15 px-2.5 py-2">
                  <span className="shrink-0 rounded-md border border-violet-300/60 dark:border-violet-300/25 px-1.5 py-0.5 font-mono text-[11px] text-violet-700 dark:text-violet-200">{paper.id}</span>
                  <div className="min-w-0 flex-1"><Link href={`/publications/#paper-${paper.bibkey}`} className="text-xs sm:text-sm font-medium text-[#453060] dark:text-violet-100 hover:underline">{zh ? paper.shortZh : paper.short} ↗</Link><div className="mt-0.5 text-[11px] text-violet-700/70 dark:text-violet-200/70">{paper.venue} · {({published:zh ? "已发表":"Published", accepted:zh ? "已录用":"Accepted", preprint:zh ? "公开预印本":"Public preprint", pending:zh ? "在投 / 审稿中":"Pending decision"} as Record<string,string>)[paper.status]}</div></div>
                  {paper.url && <a href={paper.url} target="_blank" rel="noopener noreferrer" aria-label={`${paper.short} external publication link`} className="shrink-0 p-1.5 text-violet-700 dark:text-violet-200 hover:opacity-75"><ArrowUpRight className="w-4 h-4" /></a>}
                </div>)}</div>
                  : currentIclr.length ? null : <p className="text-sm text-[#756985] dark:text-violet-300/80">{zh ? "关联研究主题" : "Research themes"}</p>}
                {currentIclr.length > 0 && (
                  <div className="mt-3 flex flex-col gap-2">
                    {currentIclr.map(work => (
                      <div key={work.key} className="flex items-start gap-2 rounded-xl border border-violet-300/50 bg-violet-50/80 dark:bg-violet-300/10 px-2.5 py-2">
                        <span className="shrink-0 rounded-md border border-violet-300/60 px-1.5 py-0.5 font-mono text-[11px] text-violet-700 dark:text-violet-200">ICLR &apos;27</span>
                        <div className="min-w-0 flex-1">
                          <div className="text-xs sm:text-sm font-medium text-[#453060] dark:text-violet-100">{zh ? work.zh : work.en}</div>
                          <div className="mt-0.5 text-[11px] text-violet-700/70 dark:text-violet-200/70">{zh ? "ICLR 2027 · 在审 · 仅展示宽泛主题" : "ICLR 2027 · Under review · Broad research descriptor"}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {researchThemes.some(topic => topic.nodes.includes(active.id)) && (
                <div className="mt-4 rounded-xl border border-dashed border-violet-300/70 dark:border-violet-400/40 bg-violet-50/55 dark:bg-violet-400/5 p-3">
                  <p className="text-[10px] font-bold tracking-[.13em] text-violet-700 dark:text-violet-200 uppercase mb-2">{zh ? "关联研究方向" : "RESEARCH TOPICS"}</p>
                  <div className="flex flex-wrap gap-2">
                    {researchThemes.filter(topic => topic.nodes.includes(active.id)).map(topic => (
                      <span key={topic.id} className="text-xs rounded-md border border-violet-200 dark:border-violet-400/20 px-2.5 py-1.5 text-[#664887] dark:text-violet-100">{zh ? topic.titleZh : topic.title}</span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
          <div className="mt-5 flex gap-2 justify-end">
            <button type="button" onClick={() => change(-1)} aria-label={zh ? "上一节点" : "Previous node"} className="rounded-full border border-violet-200 dark:border-violet-500/40 p-2.5 hover:bg-violet-100 dark:hover:bg-violet-800"><ChevronLeft className="h-4 w-4" /></button>
            <button type="button" onClick={() => change(1)} aria-label={zh ? "下一节点" : "Next node"} className="rounded-full border border-violet-200 dark:border-violet-500/40 p-2.5 hover:bg-violet-100 dark:hover:bg-violet-800"><ChevronRight className="h-4 w-4" /></button>
          </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="mt-5 flex flex-wrap justify-between items-center gap-3 text-xs text-violet-600 dark:text-violet-200/80">
          <span>{zh ? "" : ""}</span>
          <Link href="/research/" className="inline-flex items-center gap-1 font-semibold hover:underline">{zh ? "完整研究框架与论文 →" : "Full research framework & papers"}<ArrowUpRight className="w-3.5 h-3.5" /></Link>
        </div>
      </div>
    </section>
  );
}
