import records from './researchPapers.json';
export type ResearchPaper = {
  id: string; bibkey: string; title: string; short: string; shortZh: string;
  author: string; year: number; venue: string;
  status: 'published' | 'accepted' | 'preprint' | 'pending'; nodes: string[];
  url?: string; doi?: string; adjacent?: boolean;
  selected?: boolean; preview?: string; summary?: string; summaryZh?: string;
  keywords?: string[]; keywordsZh?: string[]; abstract?: string;
  arxiv?: string; pdf?: string; code?: string; citationCount?: number | null; citationUrl?: string;
  figureVerified?: boolean;
};
// The data JSON is the editable master for manuscript labels and node associations.
export const researchPapers: ResearchPaper[] = records as ResearchPaper[];
// Public-facing list contains no identifiable double-blind submissions.
export const visibleResearchPapers = researchPapers;
export const papersForNode = (nodeId: string) => researchPapers.filter((p) => p.nodes.includes(nodeId));
