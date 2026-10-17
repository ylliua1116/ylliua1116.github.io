export type ResearchNode = {
 id: string; stage: string; title: string; title_zh: string;
 eyebrow: string; eyebrow_zh: string; detail: string; detail_zh: string;
 tags: string[]; tags_zh: string[]; paper?: string | null;
};
export const nodes: ResearchNode[] = [
  {
    "id": "identify",
    "stage": "upstream",
    "title": "Causal Identification",
    "title_zh": "因果识别",
    "eyebrow": "The evidence",
    "eyebrow_zh": "识别因果证据",
    "detail": "Distinguish the effect of an intervention from correlations in logged data, especially when one agent's action influences others.",
    "detail_zh": "从观测数据中辨别干预带来的真实影响，尤其关注一个智能体的行动会影响其他节点的网络干扰情形。",
    "tags": [
      "Network interference",
      "Counterfactuals",
      "OPE"
    ],
    "tags_zh": [
      "网络干扰",
      "反事实",
      "离线策略评估"
    ],
    "paper": "causal"
  },
  {
    "id": "agents",
    "stage": "upstream",
    "title": "Proposals & Causal Selection",
    "title_zh": "候选生成与因果选择",
    "eyebrow": "From proposals to evidence",
    "eyebrow_zh": "从候选到证据",
    "detail": "Study how candidate actions from predictive models, ranking systems or LLM agents can be selected reliably with limited causal evidence. Generation is not causal verification.",
    "detail_zh": "研究如何利用有限因果证据，从预测模型、排序系统或 LLM 智能体生成的候选行动中进行可靠选择。候选生成不等于因果验证。",
    "tags": [
      "Action proposals",
      "Causal critic",
      "Research vision"
    ],
    "tags_zh": [
      "候选行动",
      "因果校验",
      "未来研究"
    ],
    "paper": null
  },
  {
    "id": "decide",
    "stage": "upstream",
    "title": "Reliable Decisions",
    "title_zh": "可靠决策",
    "eyebrow": "Learn → decide",
    "eyebrow_zh": "从学习到决策",
    "detail": "Connect identification, uncertainty and counterfactual evaluation to online action selection, regret and reliable deployment.",
    "detail_zh": "将因果识别、不确定性和反事实评估连接到在线行动选择、遗憾界和可靠部署。",
    "tags": [
      "Online learning",
      "Regret",
      "Uncertainty"
    ],
    "tags_zh": [
      "在线学习",
      "遗憾界",
      "不确定性"
    ],
    "paper": "causal"
  },
  {
    "id": "cooperate",
    "stage": "midstream",
    "title": "Multi-Agent Coordination",
    "title_zh": "多智能体协作",
    "eyebrow": "Shared decisions",
    "eyebrow_zh": "协同行动",
    "detail": "Study how heterogeneous agents coordinate actions and share a changing environment instead of making decisions independently.",
    "detail_zh": "研究能力不同的智能体如何在共享且不断变化的环境中协同行动，而不是各自独立优化。",
    "tags": [
      "Heterogeneity",
      "Shared states",
      "Games"
    ],
    "tags_zh": [
      "异构性",
      "共享环境",
      "博弈"
    ],
    "paper": "offloading"
  },
  {
    "id": "communicate",
    "stage": "midstream",
    "title": "Decision-Relevant Communication",
    "title_zh": "决策相关通信",
    "eyebrow": "What matters to send",
    "eyebrow_zh": "优先传输什么",
    "detail": "Decide what to transmit, when to transmit it, and which semantic components deserve protection under limited bandwidth and latency budgets.",
    "detail_zh": "在带宽和时延受限的条件下，选择何时通信、传输什么信息，以及应该重点保护哪些语义数据。",
    "tags": [
      "Semantic HARQ",
      "Link adaptation",
      "Task value"
    ],
    "tags_zh": [
      "语义 HARQ",
      "链路自适应",
      "任务价值"
    ],
    "paper": "semantic"
  },
  {
    "id": "adapt",
    "stage": "midstream",
    "title": "Interference & Adaptation",
    "title_zh": "网络干扰与适应",
    "eyebrow": "Imperfect feedback",
    "eyebrow_zh": "不完备反馈",
    "detail": "Account for delayed feedback, interdependent actions and distribution shift as cooperative policies evolve after deployment.",
    "detail_zh": "面向协作策略部署后的延迟反馈、行动相互依赖和分布变化，探索持续适应机制。",
    "tags": [
      "Delay",
      "Drift",
      "Adaptation"
    ],
    "tags_zh": [
      "延迟",
      "漂移",
      "在线适应"
    ],
    "paper": "causal"
  },
  {
    "id": "ocean",
    "stage": "downstream",
    "title": "Robotics & Maritime Sensing",
    "title_zh": "机器人与海洋感知",
    "eyebrow": "Real-world setting",
    "eyebrow_zh": "真实场景",
    "detail": "Use robotics inspection as an adjacent application and maritime UAV–USV sensing, task offloading and edge intelligence as core resource-constrained testbeds.",
    "detail_zh": "以机器人检测作为相关应用，以海洋 UAV–USV 协同感知、任务卸载和边缘智能作为资源受限的主要验证场景。",
    "tags": [
      "UAV–USV",
      "Maritime IoT",
      "Edge computing"
    ],
    "tags_zh": [
      "无人机—无人艇",
      "海洋物联网",
      "边缘计算"
    ],
    "paper": "offloading"
  },
  {
    "id": "lowalt",
    "stage": "downstream",
    "title": "Low-Altitude Networks",
    "title_zh": "低空网络",
    "eyebrow": "Aerial coordination",
    "eyebrow_zh": "低空协同",
    "detail": "Airborne sensing and mobile edge devices motivate coordination under limited energy, unpredictable links and changing task demands.",
    "detail_zh": "空中感知与移动边缘设备需要应对有限能量、不稳定链路和不断变化的任务需求。",
    "tags": [
      "UAVs",
      "Wireless sensing",
      "Edge AI"
    ],
    "tags_zh": [
      "无人机",
      "无线感知",
      "边缘智能"
    ],
    "paper": "offloading"
  },
  {
    "id": "sags",
    "stage": "downstream",
    "title": "SAG-S Networks",
    "title_zh": "空天地海一体化网络",
    "eyebrow": "Longer-term vision",
    "eyebrow_zh": "长期研究愿景",
    "detail": "Extend causally reliable cooperative intelligence to links that span satellite, aerial, terrestrial and maritime domains. This is a proposed research direction, not a deployed system.",
    "detail_zh": "探索跨卫星、空中、地面和海上链路的因果可靠协同智能。这是未来研究愿景，并非已经部署的系统。",
    "tags": [
      "Cross-domain links",
      "Heterogeneous agents",
      "Vision"
    ],
    "tags_zh": [
      "跨域链路",
      "异构智能体",
      "未来方向"
    ],
    "paper": null
  }
] as ResearchNode[];
