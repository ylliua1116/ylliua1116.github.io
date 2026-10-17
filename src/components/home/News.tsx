
'use client';

import { motion } from 'framer-motion';
import { useMessages } from '@/lib/i18n/useMessages';

export interface NewsItem {
  date: string;
  content: string;
  links?: {
    label: string;
    url: string;
  }[];
}

interface NewsProps {
  items: NewsItem[];
  title?: string;
}

export default function News({ items, title }: NewsProps) {
  const messages = useMessages();
  const resolvedTitle = title || messages.home.news;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      <h2 className="text-2xl font-serif font-bold text-primary mb-4">
        {resolvedTitle}
      </h2>

      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={`${item.date}-${index}`}
            className="flex items-start space-x-3"
          >
            <span className="text-xs text-neutral-500 mt-1 w-16 flex-shrink-0">
              {item.date}
            </span>

            <div className="min-w-0 flex-1">
              <p className="text-sm text-neutral-700 dark:text-neutral-300">
                {item.content}
              </p>

              {item.links && item.links.length > 0 && (
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
                  {item.links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-xs font-semibold text-violet-700 dark:text-violet-300 hover:underline underline-offset-4 transition-colors"
                    >
                      {link.label}
                      <span className="ml-1" aria-hidden="true">
                        ↗
                      </span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
