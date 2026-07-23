import { Asset, NewsItem, PortfolioItem } from './types';

export const INITIAL_ASSETS: Asset[] = [
  {
    id: 'GS-DAP-BNY-001',
    name: 'GS DAP® BNY Mellon Mirrored MMF',
    type: 'Money Market Fund',
    valuation: 450000000,
    supply: 450000000,
    status: 'ACTIVE',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZkST3ep2e09ioQrBHz1pzN0Fr9cxx4l1POM292-vZfjM1Xo23DCbdT1t4jy_hhOwdKKG2DpIJP3rVFfJdkZFiAdwPEJudavjtjhHMck8O8J_U85YEIXsw1jFfKHeVRD_SMqKssSoDUH5lh7FKHE0okhEQA4DNwLa-BSnEuqS37Funra859nEBsn9j_EqwP3crWphs7o88pHI3BlajbhvTxHsuBcE052MY29WLzzrdTDwTDm7RG-7w_HGpfimB9gV_wifb084x0wcB',
    performance: [50, 55, 60, 65, 75],
    description: '1:1 digital twin mirror of BNY Mellon LiquidityDirect Money Market Fund, issued on Goldman Sachs private GS DAP® network. Represents yield-bearing institutional cash reserves.',
    trend24h: 5.15,
    blockHeight: 195420,
  },
  {
    id: 'AV-RE-2024-001',
    name: 'Global Plaza One',
    type: 'Real Estate',
    valuation: 125400000,
    supply: 10000000,
    status: 'ACTIVE',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCaxsvsoOFeeKJYjGzm_TgrpLCnGGB2CxcxhLFDlOHKBMaik5oKJcyDVykabSoTfh7KhJ_qEBa0Sdwsw_ybaocRl_i_WXqUYOLMDnhBo9LKvjMDAJJSDF0di3t0ZCzjjlhC29MMzkEE3ZF0N-y_Tt7_zARmlg8-L9QFCSt23MPrskRrafU_XqV29Avxwihh229lb530TWXLGzvT_hpd0bC3RqrYfx42FT1DVXwJohP6_Vb6Cyt9DUBte2mkk4nWbUmpKf8CL4DhGxx',
    performance: [20, 40, 35, 60, 80],
    description: 'A high-end glass skyscraper in a metropolitan financial district. Features reflective windows, high occupancy, and an institutional ESG rating.',
    trend24h: 1.45,
    blockHeight: 182931,
  },
  {
    id: 'AV-PE-2024-012',
    name: 'Alpha Growth Fund II',
    type: 'Private Equity',
    valuation: 84000000,
    supply: 5000000,
    status: 'PENDING',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3fDL5ewxBDoAIpC4XUgdz-rfx_fU5N7r6doSyNWZVqgLiNiB5gwq-w5RVpOigRlbdh6gGPxSVkfJApaals43K8Dqgv_Pqz7SKGJYcWQ7IOHQ6IBPlX4pZ9eCPtbbVSbRHcB8fpwgKNJbsSNcpRDw7v4J95nc6XrMXtYj37c59w5DZpvxVzgzYS2Ulu2f2muInjj5wIl8--osfz_E4C_AA8UZLTkiuY8Zg6QhYipklMfQyFNr6yMnHsUSP9hfLsp5u9W-jIGC7UKRe',
    performance: [30, 25, 45, 40, 35],
    description: 'A tech-focused venture capital fund targeting high-growth private enterprise shares and decentralized computational network infrastructures.',
    trend24h: 0.82,
    blockHeight: 184520,
  },
  {
    id: 'AV-CM-2023-088',
    name: 'Bullion Reserve Tier 1',
    type: 'Commodities',
    valuation: 212500000,
    supply: 15000000,
    status: 'ACTIVE',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsu3Y4gy142IF5LfdBCf-y9gQhrzYATnvE8wqqSPqcJRpq3aDZVuk_dEU_Isdu5K2qevjlHgpQoTdbOB_2yFnLhC_JaUjno-9SpvoGu5k0iJz3SGc77Be9RQW1Bc9msCF6XMTv3lhRnUAu1JBsXAet55xwfQmTluM7Q_x142_OSBouuitJ_ZeDBe6fQpzYPyxu08FatX4uTsd1SpBUfPwsoVkwHLF5_Mc8lDbetS8prqNRuFpLXmX8-h4jEvjMjcqt0ZFKyjAEU3YS',
    performance: [60, 55, 40, 45, 42],
    description: 'Physical bullion reserves securely allocated in standard SOC2-compliant vaults, featuring direct, cryptographic ledger audits of weight and purity.',
    trend24h: -2.14,
    blockHeight: 179211,
  },
  {
    id: 'AV-RE-2024-004',
    name: 'RE-Prime Manhattan Fund',
    type: 'Real Estate',
    valuation: 318000000,
    supply: 22000000,
    status: 'ACTIVE',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCIE6s9B1qxcDEGWtD2D3eqonPtVwqi232O1-efXV1fun1ZbWAYlPMqQ-2OUaE0abwLa4dyfSipxsKiGAJe5FS55Ce9aRprFi3GRXkD_Dfg60iRAx0YM85twtm9bsXk0S5wPH500glpVo0CvhxmG0WW4VXf8G2HatTDn0YjyrXSey8s-m0CDs9W7w1w_T7AbBZLnPF29uF5UG_zRMe2peXPkgJxOI4oFuBhjZDTsmMUP0C3Zy-NyQGfu4_Lqz9EqV1LDlS-wLAcFS49',
    performance: [35, 33, 34, 30, 28, 31, 25, 24, 20, 21, 18, 16],
    description: 'Manhattan premium core commercial real estate fund tokenized to offer low-friction secondary trading and micro-dividends directly to wallets.',
    trend24h: 1.24,
    blockHeight: 194322,
  }
];

export const INITIAL_NEWS: NewsItem[] = [
  {
    id: 'news-bny-gs',
    category: 'Commodities',
    time: '1m ago',
    title: 'BNY Mellon and Goldman Sachs launch GS DAP® 1:1 Mirrored Tokenization Model.',
    source: 'Financial Times',
    sentiment: 'positive',
  },
  {
    id: 'news-1',
    category: 'Real Estate',
    time: '2m ago',
    title: 'SEC approves new tokenization framework for commercial REITs.',
    source: 'Institutional Ledger',
    sentiment: 'positive',
  },
  {
    id: 'news-2',
    category: 'Commodities',
    time: '15m ago',
    title: 'Gold-backed digital assets see 40% volume spike in APAC markets.',
    source: 'Global Finance Desk',
    sentiment: 'positive',
  },
  {
    id: 'news-3',
    category: 'Infrastructure',
    time: '42m ago',
    title: 'Major European bank integrates Token-Engine for cross-border settlements.',
    source: 'Tech-Finance Weekly',
    sentiment: 'positive',
  },
  {
    id: 'news-4',
    category: 'Risk Alert',
    time: '1h ago',
    title: 'Liquidity alert on mid-cap debt tokens following treasury adjustment.',
    source: 'RiskMatrix',
    sentiment: 'negative',
  }
];

export const INITIAL_PORTFOLIO: PortfolioItem[] = [
  {
    assetId: 'GS-DAP-BNY-001',
    ownedTokens: 150000,
    avgPurchasePrice: 1.00,
    timestamp: '2026-07-15T08:00:00Z',
  },
  {
    assetId: 'AV-RE-2024-001',
    ownedTokens: 12500,
    avgPurchasePrice: 12.54,
    timestamp: '2026-04-12T14:32:00Z',
  },
  {
    assetId: 'AV-PE-2024-012',
    ownedTokens: 8000,
    avgPurchasePrice: 16.80,
    timestamp: '2026-06-01T09:15:00Z',
  },
  {
    assetId: 'AV-CM-2023-088',
    ownedTokens: 25000,
    avgPurchasePrice: 14.16,
    timestamp: '2026-05-18T11:00:00Z',
  }
];
