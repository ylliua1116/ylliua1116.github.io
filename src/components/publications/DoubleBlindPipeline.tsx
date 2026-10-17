'use client';

import Link from 'next/link';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';
import { useLocaleStore } from '@/lib/stores/localeStore';
import { researchThemes } from '@/data/researchThemes';

/**
 * Aggregate and opt-in disclosure only. Do NOT add exact submission titles,
 * anonymous OpenReview URLs, PDFs, submission IDs or per-paper author claims.
 * IMPORTANT: The aggregate count itself is an explicit public identity claim.
 * Confirm consent and conference policy before public GitHub Pages deployment.
 */
export const showIclrReviewAggregate = true;

export default function DoubleBlindPipeline() {
  const zh = useLocaleStore(s => s.locale) === 'zh';
  if (!showIclrReviewAggregate) return null;
  return (
    <section aria-label={zh ? '双盲审稿进展' : 'Double-blind review pipeline'} id="double-blind-pipeline" className="mt-10 space-y-5 scroll-mt-28">
      <div className="rounded-[24px] border border-violet-300/70 dark:border-violet-300/30 bg-[linear-gradient(135deg,#f4eaff,#fffaff)] dark:bg-[linear-gradient(135deg,#423055,#30223e)] p-5 sm:p-7 shadow-[0_16px_38px_-24px_rgba(111,56,163,.35)]">
        <div className="flex flex-wrap gap-3 items-start justify-between">
          <div className="space-y-2">
            <p className="text-[11px] font-bold tracking-[.18em] uppercase text-violet-700 dark:text-violet-200">RESEARCH PIPELINE / DOUBLE-BLIND REVIEW</p>
            <h2 className="font-serif font-bold text-primary text-xl sm:text-2xl">{zh ? 'ICLR 2027 · 审稿中' : 'ICLR 2027 · Under Review'}</h2>
            <p className="text-sm text-neutral-700 dark:text-neutral-200">{zh ? '四篇研究稿件 · ICLR 2027' : 'Four research manuscripts · ICLR 2027'}</p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-300/70 dark:border-violet-300/40 bg-white/70 dark:bg-violet-200/10 px-3 py-2 text-xs font-semibold text-violet-800 dark:text-violet-100"><ShieldCheck size={16}/>{zh ? '投稿中 · 尚未录用' : 'Submitted · Not accepted'}</span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {researchThemes.map((theme, index) => (
          <Link key={theme.id} href={`/research-map/#node=${theme.nodes[0]}`} className="group block rounded-2xl border border-violet-200/80 dark:border-violet-400/30 bg-white dark:bg-[#342847] p-4 sm:p-5 space-y-2 transition-all duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:scale-[1.008] hover:shadow-[0_18px_36px_-20px_rgba(97,52,148,.45)] hover:border-violet-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-500">
            <div className="text-[11px] uppercase tracking-[.13em] font-semibold text-violet-700 dark:text-violet-200 flex justify-between gap-2"><span>{zh ? '研究方向' : 'Research theme'} R{String(index+1).padStart(2,'0')}</span><ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"/></div>
            <h3 className="font-semibold text-primary text-base">{zh ? theme.titleZh : theme.title}</h3>
            <p className="text-xs leading-5 text-neutral-600 dark:text-neutral-300">{zh ? theme.descriptionZh : theme.description}</p>
            <div className="flex flex-wrap gap-1.5">{(zh ? theme.keywordsZh : theme.keywords).slice(0,3).map(k => <span key={k} className="text-[10px] rounded-md bg-violet-100 dark:bg-violet-400/15 text-violet-800 dark:text-violet-200 px-2 py-1">{k}</span>)}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
