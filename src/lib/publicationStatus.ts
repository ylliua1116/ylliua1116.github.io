import type { Publication } from '@/types/publication';

export function publicationStatus(status: Publication['status'], zh: boolean) {
  const labels: Record<Publication['status'], [string,string]> = {
    'published': ['Published', '已发表'],
    'preprint': ['Public preprint', '公开预印本'],
    'pending': ['Under review / pending', '在投 / 审稿中'],
    'accepted': ['Accepted', '已接收'],
    'submitted': ['Submitted', '已投稿'],
    'under-review': ['Under Review', '审稿中'],
    'in-preparation': ['In Preparation', '撰写中'],
    'draft': ['Draft', '草稿']
  };
  return labels[status]?.[zh ? 1 : 0] || status;
}
