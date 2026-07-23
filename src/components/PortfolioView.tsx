import React from 'react';
import { Wallet, ArrowDownLeft, ArrowUpRight, ShieldCheck, History, Landmark, Coins } from 'lucide-react';
import { Asset, PortfolioItem } from '../types';

interface PortfolioViewProps {
  portfolio: PortfolioItem[];
  assets: Asset[];
}

export default function PortfolioView({ portfolio, assets }: PortfolioViewProps) {
  
  // Calculate dynamic statistics based on user's portfolio and current asset valuations
  const getAssetDetails = (assetId: string) => {
    return assets.find(a => a.id === assetId);
  };

  const totalHoldingValue = portfolio.reduce((sum, item) => {
    const asset = getAssetDetails(item.assetId);
    if (!asset) return sum;
    const currentTokenPrice = asset.valuation / asset.supply;
    return sum + (item.ownedTokens * currentTokenPrice);
  }, 0);

  const totalSpent = portfolio.reduce((sum, item) => {
    return sum + (item.ownedTokens * item.avgPurchasePrice);
  }, 0);

  const totalProfitLoss = totalHoldingValue - totalSpent;
  const profitLossPercent = totalSpent > 0 ? (totalProfitLoss / totalSpent) * 100 : 0;

  // Format currency
  const formatUSD = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="space-y-6">
      
      {/* Portfolio Financial Summary cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Wallet Balance Summary Card */}
        <div className="glass-card p-6 rounded-xl relative overflow-hidden shadow-xl animate-fade-in">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#F27D26]/5 to-transparent blur-2xl pointer-events-none"></div>
          <span className="micro-label">Total Portfolio Value</span>
          <h3 className="serif text-3xl font-light text-white tracking-wide mt-2">
            {formatUSD(totalHoldingValue)}
          </h3>
          <div className="flex items-center gap-2 mt-4 text-[11px]">
            <span className={`font-bold flex items-center ${totalProfitLoss >= 0 ? 'text-[#F27D26]' : 'text-white/40'}`}>
              {totalProfitLoss >= 0 ? '▲' : '▼'} {totalProfitLoss >= 0 ? '+' : ''}{formatUSD(totalProfitLoss)} ({profitLossPercent.toFixed(2)}%)
            </span>
            <span className="text-white/40 font-mono">Since custody init</span>
          </div>
        </div>

        {/* Available USDC Escrow Cash Balance */}
        <div className="glass-card p-6 rounded-xl relative overflow-hidden shadow-xl animate-fade-in">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#F27D26]/5 to-transparent blur-2xl pointer-events-none"></div>
          <span className="micro-label">Escrow USDC Balance</span>
          <h3 className="serif text-3xl font-light text-white tracking-wide mt-2">
            $1,240,500
          </h3>
          <p className="text-[11px] text-white/50 mt-4 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#F27D26]" />
            <span className="font-mono tracking-wide">SOC2 Escrow account verified</span>
          </p>
        </div>

        {/* Smart Asset Allocation summary */}
        <div className="glass-card p-6 rounded-xl relative overflow-hidden shadow-xl animate-fade-in">
          <span className="micro-label">Asset Classes Held</span>
          <h3 className="serif text-3xl font-light text-white tracking-wide mt-2">
            {portfolio.length} Sectors
          </h3>
          <div className="flex items-center gap-3 mt-4">
            <div className="flex -space-x-1.5 font-mono">
              <span className="w-5 h-5 rounded-full bg-[#F27D26] border border-[#050505] text-[8px] flex items-center justify-center font-bold text-white">RE</span>
              <span className="w-5 h-5 rounded-full bg-white/30 border border-[#050505] text-[8px] flex items-center justify-center font-bold text-white">CM</span>
              <span className="w-5 h-5 rounded-full bg-white/10 border border-[#050505] text-[8px] flex items-center justify-center font-bold text-white/80">PE</span>
            </div>
            <span className="text-[11px] text-white/40 font-mono">Balanced distribution</span>
          </div>
        </div>

      </section>

      {/* Your Custodial Holdings Grid */}
      <section className="space-y-4">
        <h3 className="serif text-lg font-light text-white tracking-wider uppercase">
          Active Escrow Holdings
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolio.map((item) => {
            const asset = getAssetDetails(item.assetId);
            if (!asset) return null;
            
            const currentPrice = asset.valuation / asset.supply;
            const holdingVal = item.ownedTokens * currentPrice;
            const investmentCost = item.ownedTokens * item.avgPurchasePrice;
            const gainLoss = holdingVal - investmentCost;
            
            return (
              <div 
                key={item.assetId}
                className="glass-card rounded-xl overflow-hidden flex flex-col justify-between hover:border-[#F27D26]/30 transition-colors duration-300 group shadow-md"
              >
                {/* Header Image */}
                <div className="h-28 relative">
                  <img src={asset.image} alt={asset.name} className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/30 to-transparent"></div>
                  <span className="absolute bottom-2 left-4 px-2 py-0.5 bg-black/85 border border-white/10 rounded text-[9px] font-mono text-white/80 uppercase tracking-widest">
                    {asset.type}
                  </span>
                </div>

                {/* Content info */}
                <div className="p-4 space-y-4 flex-1">
                  <div>
                    <h4 className="serif text-sm font-light text-white tracking-wide group-hover:text-[#F27D26] transition-colors">
                      {asset.name}
                    </h4>
                    <p className="text-[10px] font-mono text-white/40 mt-1">
                      SEC ID: {asset.id}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/5 text-xs">
                    <div>
                      <span className="text-[9px] text-white/40 uppercase tracking-widest font-mono">Held Balance</span>
                      <p className="font-mono font-bold text-white mt-1">
                        {item.ownedTokens.toLocaleString()} TKN
                      </p>
                    </div>
                    <div>
                      <span className="text-[9px] text-white/40 uppercase tracking-widest font-mono">Holding Value</span>
                      <p className="font-mono font-bold text-[#F27D26] mt-1">
                        {formatUSD(holdingVal)}
                      </p>
                    </div>
                    <div>
                      <span className="text-[9px] text-white/40 uppercase tracking-widest font-mono">Avg Buy Price</span>
                      <p className="font-mono text-white/60 mt-1">
                        ${item.avgPurchasePrice.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <span className="text-[9px] text-white/40 uppercase tracking-widest font-mono">Net Return</span>
                      <p className={`font-mono font-bold mt-1 ${gainLoss >= 0 ? 'text-[#F27D26]' : 'text-white/40'}`}>
                        {gainLoss >= 0 ? '+' : ''}{formatUSD(gainLoss)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card footer verification */}
                <div className="px-4 py-2.5 bg-white/5 border-t border-white/10 flex justify-between items-center text-[10px] font-mono text-white/40">
                  <span>Oracle Escrow Registered</span>
                  <span className="text-[#F27D26] font-bold uppercase tracking-wider text-[9px]">Active Verified</span>
                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* Custodial Ledger Audited History */}
      <section className="glass-card rounded-xl overflow-hidden shadow-xl animate-fade-in">
        <div className="p-4 border-b border-white/10 flex items-center gap-2.5 bg-white/5">
          <History className="w-4 h-4 text-[#F27D26]" />
          <h3 className="serif text-sm font-light text-white tracking-widest uppercase">
            Custodial Ledger Audited History
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead className="bg-white/5 text-white/40 font-mono uppercase tracking-widest text-[9px]">
              <tr>
                <th className="px-6 py-3 pl-6">Block Height</th>
                <th className="px-6 py-3">Transaction ID (TxHash)</th>
                <th className="px-6 py-3">Asset</th>
                <th className="px-6 py-3">Action Type</th>
                <th className="px-6 py-3 text-right">Units</th>
                <th className="px-6 py-3 text-right">Escrow Settlement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono text-xs">
              
              <tr className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-3 pl-6 text-[#F27D26] font-bold">#184511</td>
                <td className="px-6 py-3 text-white/40">0x5f9b...a1d4</td>
                <td className="px-6 py-3 font-sans text-white/80 font-medium">Global Plaza One</td>
                <td className="px-6 py-3 text-[#F27D26] font-bold">TOKEN_MINT_SECURE</td>
                <td className="px-6 py-3 text-right text-white/90">12,500 TKN</td>
                <td className="px-6 py-3 text-right text-[#F27D26] font-bold">-$156,750 USDC</td>
              </tr>

              <tr className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-3 pl-6 text-[#F27D26] font-bold">#181932</td>
                <td className="px-6 py-3 text-white/40">0xbc71...f92a</td>
                <td className="px-6 py-3 font-sans text-white/80 font-medium">Bullion Reserve Tier 1</td>
                <td className="px-6 py-3 text-[#F27D26] font-bold">TOKEN_MINT_SECURE</td>
                <td className="px-6 py-3 text-right text-white/90">25,000 TKN</td>
                <td className="px-6 py-3 text-right text-[#F27D26] font-bold">-$354,000 USDC</td>
              </tr>

              <tr className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-3 pl-6 text-[#F27D26] font-bold">#179832</td>
                <td className="px-6 py-3 text-white/40">0x83e2...419c</td>
                <td className="px-6 py-3 font-sans text-white/80 font-medium">Alpha Growth Fund II</td>
                <td className="px-6 py-3 text-[#F27D26] font-bold">TOKEN_MINT_SECURE</td>
                <td className="px-6 py-3 text-right text-white/90">8,000 TKN</td>
                <td className="px-6 py-3 text-right text-[#F27D26] font-bold">-$134,400 USDC</td>
              </tr>

              <tr className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-3 pl-6 text-white/40">#175412</td>
                <td className="px-6 py-3 text-white/40">0x192a...bcde</td>
                <td className="px-6 py-3 font-sans text-white/40">USDC Reserve</td>
                <td className="px-6 py-3 text-white/60 font-bold">USD_FIAT_DEPOSIT</td>
                <td className="px-6 py-3 text-right text-white/30">--</td>
                <td className="px-6 py-3 text-right text-white/60 font-bold">+$1,885,650 USDC</td>
              </tr>

            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
}
