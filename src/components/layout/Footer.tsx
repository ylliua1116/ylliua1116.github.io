'use client';

import { useLocaleStore } from '@/lib/stores/localeStore';
import SiteStats from './SiteStats';

interface FooterProps {
  lastUpdated?: string;
  lastUpdatedByLocale?: Record<string, string | undefined>;
  defaultLocale?: string;
}

export default function Footer({
  lastUpdated,
  lastUpdatedByLocale,
  defaultLocale = 'en',
}: FooterProps) {
  const locale = useLocaleStore((state) => state.locale);

  const resolvedLastUpdated =
    lastUpdatedByLocale?.[locale] ||
    lastUpdatedByLocale?.[defaultLocale] ||
    lastUpdated ||
    '';

  return (
    <footer className="w-full shrink-0 bg-background">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-3">
        <SiteStats
          small
          lastUpdated={resolvedLastUpdated}
        />
      </div>
    </footer>
  );
}
