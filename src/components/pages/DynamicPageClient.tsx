'use client';

import PublicationsList from '@/components/publications/PublicationsList';
import TextPage from '@/components/pages/TextPage';
import StructuredCV from '@/components/cv/StructuredCV';
import ResearchFramework from '@/components/custom/ResearchFramework';
import ResearchThemes from '@/components/custom/ResearchThemes';
import CardPage from '@/components/pages/CardPage';
import { Publication } from '@/types/publication';
import {
  PublicationPageConfig,
  TextPageConfig,
  CardPageConfig,
} from '@/types/page';
import { useLocaleStore } from '@/lib/stores/localeStore';

export type DynamicPageLocaleData =
  | { type: 'publication'; config: PublicationPageConfig; publications: Publication[] }
  | { type: 'text'; config: TextPageConfig; content: string }
  | { type: 'card'; config: CardPageConfig };

interface DynamicPageClientProps {
  dataByLocale: Record<string, DynamicPageLocaleData>;
  defaultLocale: string;
}

export default function DynamicPageClient({ dataByLocale, defaultLocale }: DynamicPageClientProps) {
  const locale = useLocaleStore((state) => state.locale);
  const fallback = dataByLocale[defaultLocale] || Object.values(dataByLocale)[0];
  const pageData = dataByLocale[locale] || fallback;

  if (!pageData) {
    return null;
  }

  return (
    <div className={`${pageData.type === 'text' && pageData.config.source === 'research.md' ? 'max-w-6xl' : 'max-w-4xl'} mx-auto px-4 sm:px-6 lg:px-8 py-12`}>
      {pageData.type === 'publication' && (
        <PublicationsList config={pageData.config} publications={pageData.publications} />
      )}
      {pageData.type === 'text' && (
        pageData.config.source === 'research.md'
          ? <div className="space-y-10"><ResearchFramework /><ResearchThemes /><details className="group/research rounded-2xl border border-violet-200 dark:border-violet-400/25 bg-white/70 dark:bg-[#302440]/85 p-5 sm:p-6"><summary className="cursor-pointer list-none text-lg font-serif font-semibold text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-500 [&::-webkit-details-marker]:hidden">{locale === 'zh' ? '展开研究方法与方向说明' : 'Read methodological background'} <span className="text-violet-700 dark:text-violet-200 ml-2">＋</span></summary><div className="border-t border-violet-200/70 dark:border-violet-400/20 mt-4 pt-5"><TextPage config={pageData.config} content={pageData.content} embedded hideTitle /></div></details></div>
          : pageData.config.source === 'cv.md'
            ? <StructuredCV title={pageData.config.title} description={pageData.config.description} content={pageData.content} />
            : <TextPage config={pageData.config} content={pageData.content} />
      )}
      {pageData.type === 'card' && (
        <CardPage config={pageData.config} />
      )}
    </div>
  );
}
