
"use client";

import Image from "next/image";
import Link from "next/link";

import { useLocaleStore } from "@/lib/stores/localeStore";
import {
  visibleResearchPapers,
  type ResearchPaper,
} from "@/data/researchPapers";
import { nodes } from "@/data/researchMap";

import {
  ExternalLink,
  FileImage,
  ChevronDown,
} from "lucide-react";

const statusLabel = (
  status: ResearchPaper["status"],
  zh: boolean
) =>
  ({
    published: zh ? "已发表" : "Published",
    accepted: zh ? "已录用" : "Accepted",
    preprint: zh ? "公开预印本" : "Public preprint",
    pending: zh ? "在投 / 审稿中" : "Pending decision",
  }[status]);

// Four ICLR 2027 manuscripts displayed separately
// in ResearchMap.tsx. They are not included in
// visibleResearchPapers.
//
// Remove this additional count if those manuscripts
// are later added to researchPapers.ts to avoid
// double-counting.
const additionalIclrPending = 4;

export default function ResearchFramework() {
  const locale = useLocaleStore((s) => s.locale);
  const zh = locale === "zh";

  const main = visibleResearchPapers.filter(
    (p) => !p.adjacent
  );

  const adjacent = visibleResearchPapers.filter(
    (p) => p.adjacent
  );

  const counts = {
    published: visibleResearchPapers.filter(
      (p) => p.status === "published"
    ).length,

    accepted: visibleResearchPapers.filter(
      (p) => p.status === "accepted"
    ).length,

    preprint: visibleResearchPapers.filter(
      (p) => p.status === "preprint"
    ).length,

    pending:
      visibleResearchPapers.filter(
        (p) => p.status === "pending"
      ).length + additionalIclrPending,
  };

  return (
    <section
      className="space-y-6"
      aria-label={
        zh
          ? "九节点科研路线与论文"
          : "Research agenda and manuscripts"
      }
    >
      {/* ============================= */}
      {/* Research trajectory heading   */}
      {/* ============================= */}

      <header>
        <p className="text-xs tracking-[.18em] text-violet-700 dark:text-violet-200 font-semibold uppercase">
          YULI LIU / RESEARCH TRAJECTORY
        </p>

        <h1 className="mt-3 text-3xl sm:text-4xl font-serif font-bold text-primary">
          {zh ? "科研主线" : "Research trajectory"}
        </h1>

        <p className="mt-3 max-w-3xl text-sm sm:text-base leading-7 text-neutral-600 dark:text-neutral-300">
          {zh
            ? "从因果决策、通信协作到异构网络，九个研究节点串联现有成果与持续探索的方向。"
            : "Nine connected questions, from causal decisions to network cooperation and heterogeneous systems. Explore how publications and ongoing work connect to each research theme."}
        </p>
      </header>

      {/* ============================= */}
      {/* Research framework diagram    */}
      {/* ============================= */}

      <figure className="overflow-hidden rounded-[24px] border border-violet-200 dark:border-violet-400/30 shadow-[0_18px_55px_-32px_rgba(93,57,139,.25)] bg-[#f8f4ff] dark:bg-[#392a50]">
        <div
          className={zh
            ? "overflow-auto max-h-[720px] scroll-smooth"
            : "overflow-x-auto scroll-smooth"
          }
          tabIndex={0}
          aria-label={
            zh
              ? "科研图可滚动查看"
              : "Scrollable research map"
          }
        >
        <Image
          src={
            zh
              ? "/research-overview-zh.svg"
              : "/research-trajectory-hd.webp"
            }
            alt={
              zh
                ? "九节点三阶段科研路线图"
                : "Research Trajectory — Nine Research Nodes Across Three Stages"
            }
            width={zh ? 1600 : 3780}
            height={zh ? 1510 : 1915}
            sizes="(max-width: 768px) 100vw, 1400px"
            unoptimized
            className="block min-w-[740px] w-full h-auto"
          />
        </div>

        <figcaption className="flex flex-wrap items-center justify-between gap-2 border-t border-violet-200 dark:border-violet-400/25 px-4 sm:px-6 py-3 text-xs text-violet-800 dark:text-violet-200">
          <span>
            {zh
              ? "九节点研究图 · 可滚动查看"
              : "Nine-node research map · scroll to explore"}
          </span>

          <a
            href={zh ? "下载研究图" : "Download HD Figure"}

            download
            className="inline-flex gap-1 items-center font-semibold hover:underline"
          >
            <FileImage size={14} />
            {zh ? "下载矢量图" : "Download SVG"}
          </a>
        </figcaption>
      </figure>

      {/* =================================== */}
      {/* Supporting papers accordion         */}
      {/* =================================== */}

      <details className="group/evidence rounded-2xl border border-violet-200 dark:border-violet-400/25 bg-white/70 dark:bg-[#302440]/85 p-4 sm:p-5">
        <summary
          className="cursor-pointer list-none flex flex-wrap items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-500 [&::-webkit-details-marker]:hidden"
        >
          {/* Original icon */}

          <span className="rounded-xl bg-violet-100 dark:bg-violet-500/20 px-3 py-2 text-violet-800 dark:text-violet-200">
            <FileImage size={18} />
          </span>

          {/* Title and paper counts */}

          <span className="min-w-0 flex-1">
            <span className="block text-lg font-serif font-semibold text-primary">
              {zh
                ? "查看论文与九节点证据"
                : "Explore supporting papers"}
            </span>

            {/* Keep the statistics inside this span.
                This preserves the original small font. */}

            <span className="block text-xs text-neutral-600 dark:text-neutral-300 mt-1">
              {zh
                ? `${counts.published} 已发表 · ${counts.accepted} 已录用 · ${counts.preprint} 预印本 · ${counts.pending} 在投/在审`
                : `${counts.published} published · ${counts.accepted} accepted · ${counts.preprint} preprint · ${counts.pending} pending`}
            </span>
          </span>

          {/* Expand/collapse arrow */}

          <ChevronDown
            className="w-5 h-5 text-violet-600 dark:text-violet-200 transition-transform duration-200 group-open/evidence:rotate-180"
            aria-hidden="true"
          />
        </summary>

        {/* =================================== */}
        {/* Expanded paper evidence             */}
        {/* =================================== */}

        <div className="mt-5 space-y-5 border-t border-violet-200/80 dark:border-violet-400/20 pt-5">
          {(
            [
              [main, false],
              [adjacent, true],
            ] as [ResearchPaper[], boolean][]
          ).map(([set, isAdjacent]) => (
            <section
              key={String(isAdjacent)}
              className="space-y-3"
            >
              <h3 className="text-[11px] tracking-[.14em] uppercase text-violet-700 dark:text-violet-200 font-semibold">
                {isAdjacent
                  ? zh
                    ? "相关应用"
                    : "Adjacent applications"
                  : zh
                    ? "核心研究成果"
                    : "Core research evidence"}
              </h3>

              {set.map((paper) => (
                <article
                  key={paper.id}
                  className="group/paper flex items-start gap-3 rounded-xl border border-violet-200/80 dark:border-violet-400/25 bg-[#fffaff] dark:bg-[#3b2c52] p-3.5 sm:p-4 transition-all duration-300 ease-out motion-safe:hover:-translate-y-1 motion-safe:hover:scale-[1.008] hover:border-violet-400 dark:hover:border-violet-300/65 hover:shadow-[0_17px_34px_-18px_rgba(88,41,160,.42)] focus-within:ring-2 focus-within:ring-violet-400"
                >
                  {/* Paper ID badge */}

                  <span className="shrink-0 rounded-lg border border-violet-300/60 dark:border-violet-300/25 bg-violet-100/80 dark:bg-violet-300/10 px-2 py-1 font-mono text-xs font-semibold text-violet-800 dark:text-violet-200 transition-colors group-hover/paper:bg-violet-200 dark:group-hover/paper:bg-violet-400/20">
                    {paper.id}
                  </span>

                  {/* Paper information */}

                  <div className="flex-1 min-w-0 space-y-1">
                    <Link
                      href={`/publications/#paper-${paper.bibkey}`}
                      className="block text-sm sm:text-base font-semibold text-primary hover:text-violet-700 dark:hover:text-violet-200 hover:underline underline-offset-4 focus-visible:outline-violet-500"
                    >
                      {paper.title}

                      <span
                        aria-hidden="true"
                        className="inline-block transition-transform group-hover/paper:translate-x-0.5"
                      >
                        {" "}↗
                      </span>
                    </Link>

                    <p className="text-xs text-neutral-600 dark:text-neutral-300">
                      {paper.venue} ·{" "}
                      <span className="font-bold text-violet-700 dark:text-violet-200">
                        {statusLabel(paper.status, zh)}
                      </span>
                    </p>

                    {!!paper.nodes.length && (
                      <p className="text-xs text-violet-700 dark:text-violet-200">
                        {zh ? "研究节点：" : "Nodes: "}

                        {paper.nodes
                          .map(
                            (id) =>
                              `N${String(
                                nodes.findIndex(
                                  (n) => n.id === id
                                ) + 1
                              ).padStart(2, "0")}`
                          )
                          .join(" · ")}
                      </p>
                    )}
                  </div>

                  {/* External paper link */}

                  {paper.url && (
                    <a
                      href={paper.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 text-violet-700 dark:text-violet-200 hover:opacity-65 focus-visible:outline-violet-500"
                      aria-label={`Open ${paper.id} external link`}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </article>
              ))}
            </section>
          ))}
        </div>
      </details>
    </section>
  );
}
