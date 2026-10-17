'use client';

import Profile from '@/components/home/Profile';
import ResearchMap from '../custom/ResearchMap';
import About from '@/components/home/About';
import SelectedPublications from '@/components/home/SelectedPublications';
import News, { NewsItem } from '@/components/home/News';
import PublicationsList from '@/components/publications/PublicationsList';
import TextPage from '@/components/pages/TextPage';
import CardPage from '@/components/pages/CardPage';
import type { SiteConfig } from '@/lib/config';
import { Publication } from '@/types/publication';
import { CardPageConfig, PublicationPageConfig, TextPageConfig } from '@/types/page';
import { useLocaleStore } from '@/lib/stores/localeStore';

interface SectionConfig {
  id: string;
  type: 'markdown' | 'publications' | 'list';
  title?: string;
  source?: string;
  filter?: string;
  limit?: number;
  content?: string;
  publications?: Publication[];
  items?: NewsItem[];
}

type PageData =
  | { type: 'about'; id: string; sections: SectionConfig[] }
  | { type: 'publication'; id: string; config: PublicationPageConfig; publications: Publication[] }
  | { type: 'text'; id: string; config: TextPageConfig; content: string }
  | { type: 'card'; id: string; config: CardPageConfig };

export interface HomePageLocaleData {
  author: SiteConfig['author'];
  social: SiteConfig['social'];
  features: SiteConfig['features'];
  enableOnePageMode?: boolean;
  researchInterests?: string[];
  pagesToShow: PageData[];
}

interface HomePageClientProps {
  dataByLocale: Record<string, HomePageLocaleData>;
  defaultLocale: string;
}

export default function HomePageClient({ dataByLocale, defaultLocale }: HomePageClientProps) {
  const locale = useLocaleStore((state) => state.locale);
  const fallback = dataByLocale[defaultLocale] || Object.values(dataByLocale)[0];
  const data = dataByLocale[locale] || fallback;

  // Footer reveal is coordinated globally by FooterRevealController.

  if (!data) {
    return null;
  }

  // Desktop: the Profile and the academic content are two *independent*
  // native scroll containers. Mobile keeps ordinary document scrolling.
  // Keep the 9-node map INSIDE the right column, between About and Papers.
  if (!data.enableOnePageMode) {
    const aboutPage = data.pagesToShow.find((page) => page.type === 'about');
    const aboutSections = aboutPage && aboutPage.type === 'about' ? aboutPage.sections : [];

    return (
      <div className="home-split-scroll mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="home-split-grid grid min-w-0 grid-cols-1 gap-8 lg:grid-cols-[minmax(270px,320px)_minmax(0,1fr)] lg:gap-9">
          <aside
            className="home-profile-pane min-w-0 px-1 pt-8 pb-8 lg:pt-7 lg:pr-4"
            aria-label={locale === 'zh' ? '个人信息（独立滚动）' : 'Profile (independent scrolling)'}
            tabIndex={0}
          >
            <Profile
              author={data.author}
              social={data.social}
              features={data.features}
              researchInterests={data.researchInterests}
            />
          </aside>

          <div
            className="home-content-pane min-w-0 space-y-9 pt-8 pb-12 lg:pt-7 lg:pr-3"
            role="region"
            aria-label={locale === 'zh' ? '研究介绍（独立滚动）' : 'Academic content (independent scrolling)'}
            tabIndex={0}
          >
            {aboutSections.filter((section) => section.type === 'markdown').map((section) => (
              <About key={section.id} content={section.content || ''} title={section.title} />
            ))}

            {/* This stays in the RIGHT scroll pane, not a full-width row. */}
            <ResearchMap embedded />

            {aboutSections.filter((section) => section.type !== 'markdown').map((section) => {
              if (section.type === 'publications') {
                return <SelectedPublications key={section.id} publications={section.publications || []} title={section.title} enableOnePageMode={false} />;
              }
              if (section.type === 'list') {
                return <News key={section.id} items={section.items || []} title={section.title} />;
              }
              return null;
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-background min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1">
          <Profile
            author={data.author}
            social={data.social}
            features={data.features}
            researchInterests={data.researchInterests}
          />
        </div>

        <div className="lg:col-span-2 space-y-8">
          {data.pagesToShow.map((page) => (
            <section key={page.id} id={page.id} className="scroll-mt-24 space-y-8">
              {page.type === 'about' && page.sections.map((section: SectionConfig) => {
                switch (section.type) {
                  case 'markdown':
                    return (
                      <About
                        key={section.id}
                        content={section.content || ''}
                        title={section.title}
                      />
                    );
                  case 'publications':
                    return (
                      <SelectedPublications
                        key={section.id}
                        publications={section.publications || []}
                        title={section.title}
                        enableOnePageMode={data.enableOnePageMode}
                      />
                    );
                  case 'list':
                    return (
                      <News
                        key={section.id}
                        items={section.items || []}
                        title={section.title}
                      />
                    );
                  default:
                    return null;
                }
              })}
              {page.type === 'publication' && (
                <PublicationsList
                  config={page.config}
                  publications={page.publications}
                  embedded={true}
                />
              )}
              {page.type === 'text' && (
                <TextPage
                  config={page.config}
                  content={page.content}
                  embedded={true}
                />
              )}
              {page.type === 'card' && (
                <CardPage
                  config={page.config}
                  embedded={true}
                />
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
