'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  BookOpenText,
  BriefcaseBusiness,
  Download,
  FileText,
  GraduationCap,
  Mail,
  ScrollText,
  Cpu,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useLocaleStore } from '@/lib/stores/localeStore';

const PDF_PATH = '/Yuli_Liu_CV.pdf';

type CVSection = { title: string; body: string };

function splitSections(markdown: string): CVSection[] {
  const sections: CVSection[] = [];
  let current: CVSection | null = null;
  const preface: string[] = [];

  for (const line of markdown.replace(/\r\n/g, '\n').split('\n')) {
    const match = line.match(/^##\s+(.+?)\s*$/);
    if (match) {
      if (current) sections.push(current);
      current = { title: match[1], body: '' };
    } else if (current) {
      current.body += `${line}\n`;
    } else {
      preface.push(line);
    }
  }
  if (current) sections.push(current);
  const intro = preface.join('\n').trim();
  if (intro) sections.unshift({ title: '', body: intro });
  return sections.length ? sections : [{ title: '', body: markdown }];
}

function sectionKind(title: string): 'education' | 'experience' | 'publications' | 'competencies' | 'contact' | 'generic' {
  const lower = title.toLowerCase();
  if (lower.includes('educat') || /教育|学历/.test(title)) return 'education';
  if (lower.includes('experience') || /经历|工作/.test(title)) return 'experience';
  if (lower.includes('publication') || lower.includes('output') || /论文|研究成果|代表性成果|发表/.test(title)) return 'publications';
  if (lower.includes('competenc') || /技能|技术能力|专业能力/.test(title)) return 'competencies';
  if (lower.includes('contact') || /联系/.test(title)) return 'contact';
  return 'generic';
}

function SectionIcon({ kind }: { kind: ReturnType<typeof sectionKind> }) {
  const cls = 'h-[19px] w-[19px]';
  if (kind === 'education') return <GraduationCap className={cls} />;
  if (kind === 'experience') return <BriefcaseBusiness className={cls} />;
  if (kind === 'publications') return <BookOpenText className={cls} />;
  if (kind === 'competencies') return <Cpu className={cls} />;
  if (kind === 'contact') return <Mail className={cls} />;
  return <ScrollText className={cls} />;
}

function EntryMarkdown({ content }: { content: string }) {
  return (
    <ReactMarkdown components={{
      p: ({ children }) => <p className="text-[14px] sm:text-[15px] leading-7 text-neutral-600 dark:text-neutral-300">{children}</p>,
      strong: ({ children }) => <strong className="font-semibold text-[#342749] dark:text-violet-100">{children}</strong>,
      em: ({ children }) => <em className="not-italic text-xs sm:text-[13px] font-medium tracking-wide text-violet-600 dark:text-violet-300">{children}</em>,
      a: ({ children, href }) => <a href={href} target="_blank" rel="noopener noreferrer" className="text-violet-700 underline underline-offset-4 decoration-violet-300 hover:text-violet-900 dark:text-violet-300">{children}</a>,
    }}>{content}</ReactMarkdown>
  );
}

function GeneralMarkdown({ content }: { content: string }) {
  return (
    <ReactMarkdown components={{
      p: ({ children }) => <p className="mb-3 last:mb-0 text-[14px] sm:text-[15px] leading-7 text-neutral-600 dark:text-neutral-300">{children}</p>,
      ul: ({ children }) => <ul className="space-y-3 mb-4">{children}</ul>,
      ol: ({ children }) => <ol className="space-y-3 mb-4">{children}</ol>,
      li: ({ children }) => <li className="relative rounded-xl border border-violet-100/90 bg-violet-50/35 px-4 py-3.5 pl-7 text-[14px] leading-7 text-neutral-600 transition-colors hover:border-violet-200 hover:bg-violet-50/70 dark:border-violet-400/15 dark:bg-violet-400/5 dark:text-neutral-300 dark:hover:bg-violet-400/10"><span aria-hidden="true" className="absolute left-3.5 top-[24px] h-1.5 w-1.5 rounded-full bg-violet-500" />{children}</li>,
      strong: ({ children }) => <strong className="font-semibold text-[#342749] dark:text-violet-100">{children}</strong>,
      em: ({ children }) => <em className="italic text-neutral-500 dark:text-neutral-400">{children}</em>,
      a: ({ children, href }) => <a href={href} target="_blank" rel="noopener noreferrer" className="text-violet-700 underline underline-offset-4 decoration-violet-300 hover:text-violet-900 dark:text-violet-300">{children}</a>,
      h3: ({ children }) => <h3 className="font-semibold text-primary mt-5 mb-2">{children}</h3>,
    }}>{content}</ReactMarkdown>
  );
}

type CompetencyGroup = { title: string; tags: string[] };

// Markdown format: ### Group name, followed by - Skill lines.
// Only this CV section is rendered as a two-column tag grid.
function parseCompetencies(markdown: string): CompetencyGroup[] {
  const groups: CompetencyGroup[] = [];
  for (const line of markdown.replace(/\r\n/g, '\n').split('\n')) {
    const heading = line.match(/^###\s+(.+?)\s*$/);
    if (heading) {
      groups.push({ title: heading[1], tags: [] });
      continue;
    }
    const tag = line.match(/^\s*[-*]\s+(.+?)\s*$/);
    if (tag && groups.length > 0) groups[groups.length - 1].tags.push(tag[1]);
  }
  return groups;
}

function CompetenciesCard({ content }: { content: string }) {
  const groups = parseCompetencies(content);
  return (
    <div className="grid grid-cols-1 gap-x-10 gap-y-7 sm:grid-cols-2 sm:gap-y-8">
      {groups.map((group, index) => (
        <div
          key={`${group.title}-${index}`}
          className={index === groups.length - 1 && groups.length % 2 === 1 ? 'sm:col-span-2' : ''}
        >
          <h3 className="mb-3 text-[15px] font-semibold text-[#342749] dark:text-violet-100 sm:text-[16px]">
            {group.title}
          </h3>
          <div className="flex flex-wrap gap-2">
            {group.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-lg border border-violet-200/60 bg-[#f2ecfc] px-3 py-2 text-[12px] font-medium leading-5 text-[#74529e] transition-colors duration-200 hover:border-violet-300 hover:bg-[#e9ddfb] dark:border-violet-400/15 dark:bg-violet-400/10 dark:text-violet-200 dark:hover:bg-violet-400/20 sm:text-[13px]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function StructuredCV({ title, content, description }: {
  title: string;
  content: string;
  description?: string;
}) {
  const locale = useLocaleStore((state) => state.locale);
  const zh = locale === 'zh';
  const sections = useMemo(() => splitSections(content), [content]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      aria-label={title}
      className="mx-auto w-full max-w-[1080px] pb-14"
    >
      <header className="relative overflow-hidden rounded-[26px] border border-violet-200/80 bg-gradient-to-br from-white via-[#fcfaff] to-[#f2edff] px-5 py-7 shadow-[0_20px_70px_-45px_rgba(97,63,157,.35)] dark:border-violet-400/20 dark:from-[#302342] dark:via-[#362749] dark:to-[#42305a] sm:px-8 sm:py-9">
        <div aria-hidden="true" className="pointer-events-none absolute -right-12 -top-24 h-64 w-64 rounded-full border border-violet-200/80 bg-violet-200/20 blur-[1px] dark:border-violet-400/10 dark:bg-violet-500/10" />
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <div className="mb-3 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.24em] text-violet-700 dark:text-violet-200">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
              {zh ? '学术简历' : 'Academic Profile'}
            </div>
            <h1 className="font-serif text-[30px] font-bold leading-tight tracking-tight text-[#342749] dark:text-violet-50 sm:text-[38px]">
              {zh ? '学术简历' : 'Curriculum Vitae'}
            </h1>
            <p className="mt-2 text-[14px] text-neutral-600 dark:text-neutral-300">
              Yuli Liu
            </p>
            {description && <p className="mt-2 max-w-xl text-[13px] leading-6 text-neutral-500 dark:text-neutral-400">{description}</p>}
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-2">
            <a
              href={PDF_PATH}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-violet-200 bg-white/90 px-4 py-2 text-[13px] font-semibold text-violet-800 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 dark:border-violet-400/30 dark:bg-white/10 dark:text-violet-100"
            >
              <FileText className="h-4 w-4" />
              {zh ? '查看 PDF' : 'View PDF'}
              <ArrowUpRight className="h-3.5 w-3.5 opacity-65" />
            </a>
            <a
              href={PDF_PATH}
              download="Yuli_Liu_CV.pdf"
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-[#6c42bf] px-4 py-2 text-[13px] font-semibold text-white shadow-[0_8px_20px_-8px_rgba(108,66,191,.65)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#5d36a9] hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 dark:bg-violet-500 dark:hover:bg-violet-400"
            >
              <Download className="h-4 w-4" />
              {zh ? '下载 CV（PDF）' : 'Download PDF'}
            </a>
          </div>
        </div>
      </header>

      <nav aria-label={zh ? '简历栏目导航' : 'CV sections'} className="mt-5 flex flex-wrap gap-2">
        {sections.filter((s) => s.title).map((s, i) => (
          <a
            key={`${s.title}-${i}`}
            href={`#cv-section-${sections.indexOf(s)}`}
            className="rounded-full border border-violet-200/70 bg-white/70 px-3 py-1.5 text-[12px] font-medium text-violet-700 transition-all hover:border-violet-400 hover:bg-violet-100/80 dark:border-violet-400/20 dark:bg-violet-400/5 dark:text-violet-200 dark:hover:bg-violet-400/15"
          >
            {s.title}
          </a>
        ))}
      </nav>

      <div className="mt-7 space-y-5">
        {sections.map((section, index) => {
          const kind = sectionKind(section.title);
          const timeline = kind === 'education' || kind === 'experience';
          const entries = section.body.trim().split(/\n\s*\n/).filter(Boolean);
          return (
            <section
              key={`${section.title}-${index}`}
              id={`cv-section-${index}`}
              className="scroll-mt-24 rounded-[22px] border border-violet-200/70 bg-white/75 p-5 shadow-[0_8px_28px_-24px_rgba(65,41,112,.45)] transition-colors hover:border-violet-300/80 dark:border-violet-400/20 dark:bg-[#302440]/75 dark:hover:border-violet-400/35 sm:p-7"
            >
              {section.title && (
                <div className="mb-5 flex items-center gap-3 border-b border-violet-100/90 pb-4 dark:border-violet-400/15">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-100/80 text-violet-700 dark:bg-violet-400/15 dark:text-violet-200">
                    <SectionIcon kind={kind} />
                  </div>
                  <h2 className="font-serif text-[22px] font-bold text-[#342749] dark:text-violet-50 sm:text-[24px]">{section.title}</h2>
                  <span className="ml-auto text-[11px] font-semibold tracking-[.12em] text-violet-400/70 dark:text-violet-300/50">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
              )}
              {timeline ? (
                <div className="space-y-1.5">
                  {entries.map((entry, i) => (
                    <div key={i} className="group relative rounded-xl border border-transparent py-3 pl-5 pr-3 transition-all duration-200 hover:border-violet-100 hover:bg-violet-50/55 dark:hover:border-violet-400/15 dark:hover:bg-violet-400/5">
                      <span aria-hidden="true" className="absolute bottom-0 left-[3px] top-0 w-px bg-violet-200/90 dark:bg-violet-400/25" />
                      <span aria-hidden="true" className="absolute left-0 top-[21px] h-[7px] w-[7px] rounded-full border border-violet-500 bg-white dark:bg-[#302440]" />
                      <EntryMarkdown content={entry} />
                    </div>
                  ))}
                </div>
              ) : kind === 'competencies' ? (
                <CompetenciesCard content={section.body} />
              ) : <GeneralMarkdown content={section.body} />}
            </section>
          );
        })}
      </div>
      </motion.section>
  );
}

