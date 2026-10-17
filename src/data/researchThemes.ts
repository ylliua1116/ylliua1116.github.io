export interface ResearchTheme {
  id: string;
  title: string;
  titleZh: string;
  description: string;
  descriptionZh: string;
  keywords: string[];
  keywordsZh: string[];
  nodes: string[];
}

/**
 * Broad, long-term research directions.
 * Not a one-to-one list of manuscripts.
 */

export const researchThemes: ResearchTheme[] = [
  {
    id: 'frontiers',
    title: 'Online Decisions & Optimization',
    titleZh: '在线决策与优化',
    description:
      'Understanding adaptive decisions in dynamic and resource-constrained systems.',
    descriptionZh:
      '研究动态与资源受限系统中的自适应决策及优化方法。',
    keywords: [
      'Online learning',
      'Optimization',
      'Networked systems'
    ],
    keywordsZh: [
      '在线学习',
      '优化方法',
      '网络系统'
    ],
    nodes: ['decide', 'adapt', 'sags']
  },

  {
    id: 'reliability',
    title: 'Causal Learning & Reliability',
    titleZh: '因果学习与可靠性',
    description:
      'Studying robust learning and decision-making with imperfect information.',
    descriptionZh:
      '研究不完备信息环境下的稳健因果学习与可靠决策。',
    keywords: [
      'Causal learning',
      'Uncertainty',
      'Reliability'
    ],
    keywordsZh: [
      '因果学习',
      '不确定性',
      '可靠性'
    ],
    nodes: ['identify', 'decide']
  },

  {
    id: 'adaptation',
    title: 'Adaptive Learning Systems',
    titleZh: '自适应学习系统',
    description:
      'Developing learning approaches for evolving data and changing environments.',
    descriptionZh:
      '探索面向动态数据与变化环境的持续学习和自适应方法。',
    keywords: [
      'Adaptive learning',
      'Dynamic environments',
      'Resource efficiency'
    ],
    keywordsZh: [
      '自适应学习',
      '动态环境',
      '资源效率'
    ],
    nodes: ['adapt', 'decide']
  },

  {
    id: 'selection',
    title: 'Intelligent Decision Support',
    titleZh: '智能决策支持',
    description:
      'Connecting predictive models with reliable decision-making in complex systems.',
    descriptionZh:
      '探索预测模型与可靠决策机制在复杂系统中的协同应用。',
    keywords: [
      'Predictive models',
      'Decision intelligence',
      'Complex systems'
    ],
    keywordsZh: [
      '预测模型',
      '决策智能',
      '复杂系统'
    ],
    nodes: ['agents', 'identify', 'decide']
  }
];

