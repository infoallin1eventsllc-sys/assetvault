export type AssetType = 'Real Estate' | 'Private Equity' | 'Commodities' | 'Intellectual Property' | 'Money Market Fund';

export interface Asset {
  id: string;
  name: string;
  type: AssetType;
  valuation: number;
  supply: number;
  status: 'ACTIVE' | 'PENDING' | 'LIQUIDATED';
  image: string;
  performance: number[];
  description: string;
  trend24h: number;
  blockHeight?: number;
}

export interface NewsItem {
  id: string;
  category: 'Real Estate' | 'Private Equity' | 'Commodities' | 'Risk Alert' | 'Infrastructure';
  time: string;
  title: string;
  source: string;
  sentiment: 'positive' | 'negative' | 'neutral';
}

export interface PortfolioItem {
  assetId: string;
  ownedTokens: number;
  avgPurchasePrice: number;
  timestamp: string;
}
