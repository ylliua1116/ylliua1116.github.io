
"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLocaleStore } from "@/lib/stores/localeStore";
import { researchThemes } from "@/data/researchThemes";

const themeDetails: Record<
  string,
  { en: string; zh: string }
> = {
  frontiers: {
    en: "Connecting online learning with constrained optimization across changing network conditions.",
    zh: "将在线学习与约束优化相结合，探索动态网络环境中的可靠决策。",
  },
  reliability: {
    en: "Building reliable foundations for learning and decision-making with incomplete observations.",
    zh: "研究不完整观测条件下的可靠学习与决策基础。",
  },
  adaptation: {
    en: "Bridging adaptive learning with resource-aware operation in evolving systems.",
    zh: "探索自适应学习与动态系统资源高效运行之间的联系。",
  },
  selection: {
    en: "Connecting predictive intelligence with practical decision-making in complex networked environments.",
    zh: "研究预测智能与复杂网络环境中实际决策之间的联系。",
  },
};

export default function ResearchThemes() {
  const zh = useLocaleStore((s) => s.locale) === "zh";

  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section className="space-y-4" id="ongoing-themes">

      <header>
        <p className="text-[11px] tracking-[.2em] text-violet-700 dark:text-violet-200 font-bold">
          {zh
            ? "长期研究方向"
            : "LONG-TERM RESEARCH INTERESTS"}
        </p>

        <h2 className="mt-2 text-2xl font-serif font-bold text-primary">
          {zh
            ? "长期研究方向"
            : "Research interests & open questions"}
        </h2>

        <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-2 leading-6">
          {zh
            ? "从因果决策与自适应学习，到通信协同与网络智能。"
            : "From causal decisions and adaptive learning to communication-aware networked intelligence."}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {researchThemes.map((t, i) => {
          const isExpanded = expanded === t.id;
          const detail = themeDetails[t.id];

          return (
            <button
              key={t.id}
              type="button"
              aria-expanded={isExpanded}
              onClick={() =>
                setExpanded(isExpanded ? null : t.id)
              }
              className={`
                group block w-full h-full text-left
                rounded-2xl border
                p-5 space-y-3

                transition-all duration-300 ease-out

                motion-safe:hover:-translate-y-1
                motion-safe:hover:scale-[1.012]

                hover:border-violet-400
                dark:hover:border-violet-300/60

                hover:shadow-[0_20px_45px_-20px_rgba(109,53,170,.42)]

                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-violet-500

                ${
                  isExpanded
                    ? "border-violet-400 bg-violet-50/80 dark:bg-[#483260] shadow-[0_14px_36px_-18px_rgba(109,53,170,.35)]"
                    : "border-violet-200 dark:border-violet-400/25 bg-[#fffcff] dark:bg-[#352749]"
                }
              `}
            >
              <div className="flex justify-between items-center gap-3 text-xs font-mono text-violet-700 dark:text-violet-200">

                <span>
                  R{String(i + 1).padStart(2, "0")} /{" "}
                  {zh ? "研究主题" : "Research theme"}
                </span>

                <ChevronDown
                  className={`
                    h-5 w-5
                    transition-transform duration-300
                    ${isExpanded ? "rotate-180" : ""}
                  `}
                />
              </div>

              <h3 className="font-semibold text-lg text-primary group-hover:text-violet-700 dark:group-hover:text-violet-100 transition-colors">
                {zh ? t.titleZh : t.title}
              </h3>

              <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-6">
                {zh ? t.descriptionZh : t.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {(zh ? t.keywordsZh : t.keywords).map((k) => (
                  <span
                    key={k}
                    className="rounded-md bg-violet-100/70 dark:bg-violet-400/10 px-2 py-1 text-[11px] text-violet-800 dark:text-violet-200"
                  >
                    {k}
                  </span>
                ))}
              </div>

              <div className="text-xs font-semibold text-violet-700 dark:text-violet-200">
                {isExpanded
                  ? zh
                    ? "收起研究介绍 ↑"
                    : "Hide research focus ↑"
                  : zh
                    ? "展开研究介绍 ↓"
                    : "Explore research focus ↓"}
              </div>

              {isExpanded && detail && (
                <div className="border-t border-violet-200/70 dark:border-violet-400/20 pt-3">
                  <p className="text-sm leading-6 text-neutral-600 dark:text-neutral-300">
                    {zh ? detail.zh : detail.en}
                  </p>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
