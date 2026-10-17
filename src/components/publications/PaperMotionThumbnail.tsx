'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './PaperMotionThumbnail.module.css';

type PaperCode = 'P1' | 'P2' | 'P3' | 'P4';

type Props = {
  paperId: string;
  /** 'publications' lets you replace the full publication-page figure without changing the home animation. */
  context?: 'home' | 'publications';
  /** Explicit per-instance image override, useful for a paper's real Figure 1 later. */
  imageSrc?: string;
  /** Use only outside an existing clickable card, to avoid nesting anchors. */
  href?: string;
};

/**
 * OPTIONAL: replace the image on Publications page ONLY.
 * 1. Copy a permitted image to public/papers/custom/.
 * 2. Set the path below for its ID.
 * 3. Ensure PublicationsList renders <PaperMotionThumbnail ... context="publications" />.
 * Leave a value undefined to keep the looping research diagram.
 */
const publicationImageOverrides: Partial<Record<PaperCode, string>> = {
  // P1: '/papers/custom/P1-figure.png',
  // P2: '/papers/custom/P2-figure.png',
  // P3: '/papers/custom/P3-figure.png',
  // P4: '/papers/custom/P4-figure.png',
};

const paperDescriptions: Record<PaperCode, string> = {
  P1: 'Animated conceptual diagram of UAV–USV maritime edge offloading',
  P2: 'Animated conceptual diagram of robotic line-scanner coverage planning',
  P3: 'Animated conceptual diagram of semantic packet dependencies and HARQ retransmission',
  P4: 'Animated conceptual diagram of interference-aware causal network decisions',
};

function isPaperCode(id: string): id is PaperCode {
  return id === 'P1' || id === 'P2' || id === 'P3' || id === 'P4';
}

export default function PaperMotionThumbnail({
  paperId,
  context = 'home',
  imageSrc,
  href,
}: Props) {
  const code = isPaperCode(paperId) ? paperId : 'P1';
  const replacement = context === 'publications' ? publicationImageOverrides[code] : undefined;
  const src = imageSrc || replacement || `/papers/motion/${code}.svg`;
  const description = imageSrc || replacement
    ? `Paper ${code} illustration`
    : paperDescriptions[code];

  const artwork = (
    <Image
      src={src}
      alt={description}
      fill
      sizes="(max-width: 640px) 100vw, 220px"
      unoptimized
      priority={false}
      className={styles.art}
      draggable={false}
    />
  );

  // HomePage's SelectedPublications already wraps each WHOLE card in a Link.
  // Do not pass href there; nested links are invalid.
  if (href) {
    return <Link href={href} className={styles.shell} aria-label={description}>{artwork}</Link>;
  }
  return <div className={styles.shell}>{artwork}</div>;
}
