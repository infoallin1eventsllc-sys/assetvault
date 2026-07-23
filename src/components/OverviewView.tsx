import React, { useState } from 'react';
import { Search, SlidersHorizontal, Plus, ArrowUpRight, CheckCircle2, AlertCircle, Sparkles, Building2, Landmark, HelpCircle, X, Coins, ShieldCheck, Wallet } from 'lucide-react';
import { Asset, AssetType } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface OverviewViewProps {
  assets: Asset[];
  onNavigateToTokenize: () => void;
  onBuyTokens: (assetId: string, amount: number) => void;
}

export default function OverviewView({ assets, onNavigateToTokenize, onBuyTokens }: OverviewViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [buyAmount, setBuyAmount] = useState<string>('100');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Filter assets based on search query and type
  const filteredAssets = assets.filter((asset) => {
    const matchesSearch =
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'All' || asset.type === selectedType;
    return matchesSearch && matchesType;
  });

  // Calculate dynamic statistics based on current active assets
  const totalTVL = assets
    .filter((a) => a.status === 'ACTIVE')
    .reduce((sum, a) => sum + a.valuation, 0);

  const realEstateTVL = assets
    .filter((a) => a.type === 'Real Estate' && a.status === 'ACTIVE')
    .reduce((sum, a) => sum + a.valuation, 0);

  const privateEquityTVL = assets
    .filter((a) => a.type === 'Private Equity' && a.status === 'ACTIVE')
    .reduce((sum, a) => sum + a.valuation, 0);

  const commoditiesTVL = assets
    .filter((a) => a.type === 'Commodities' && a.status === 'ACTIVE')
    .reduce((sum, a) => sum + a.valuation, 0);

  const mmfTVL = assets
    .filter((a) => a.type === 'Money Market Fund' && a.status === 'ACTIVE')
    .reduce((sum, a) => sum + a.valuation, 0);

  // Formatting utilities
  const formatUSD = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const formatShortUSD = (val: number) => {
    if (val >= 1e9) return `$${(val / 1e9).toFixed(1)}B`;
    if (val >= 1e6) return `$${(val / 1e6).toFixed(1)}M`;
    return formatUSD(val);
  };

  const handleBuySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAsset) return;
    const tokens = parseFloat(buyAmount);
    if (isNaN(tokens) || tokens <= 0) return;

    onBuyTokens(selectedAsset.id, tokens);
    setSuccessMessage(`Successfully purchased ${tokens.toLocaleString()} tokens of ${selectedAsset.name}!`);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 4000);
  };

  return (
    <div className="space-y-6">
      {/* Dynamic Summary Bento Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Total TVL Banner Card */}
        <div className="lg:col-span-2 relative overflow-hidden glass-card rounded-xl p-6 flex flex-col justify-between group">
          
          {/* Subtle Background On-chain artwork image overlay */}
          <div className="absolute inset-0 z-0 opacity-10 grayscale mix-blend-screen pointer-events-none transition-transform duration-700 group-hover:scale-105">
            <img
              alt="Onchain Financial artwork"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8sTJM87zF5bYzlBa-_G8psIM2UJU9qBm7P8MIUdZ-6M2JpvdueyUSAdrYJF8Lhkwkt-pBU1d5nBXljH1NTPDT9OoaxPSJM62jxsEEZLWxqOADNxgifWGb4tldJXpUgQnHti01D0tRqg0RtJdRC_HqQ9dkuLiA0WG12X2WXT37--e7rGKntynHnwMlWbBm_6iJIp4is3nAVAIr44GXxB8qHBL7ztaqkvbyguGS87g00R77tBchAbDJRLW4YiZ5zaZiCnDRDeLj8tGM"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="relative z-10">
            <span className="micro-label">
              Total Tokenized Assets (TVL)
            </span>
            <div className="mt-3 flex items-baseline gap-4 flex-wrap">
              <h3 className="serif text-3xl md:text-5xl font-light text-white tracking-wide">
                {formatUSD(totalTVL)}
              </h3>
              <span className="text-[#F27D26] font-bold text-xs flex items-center bg-[#F27D26]/10 px-2.5 py-1 rounded border border-[#F27D26]/20 tracking-wider">
                <span className="mr-0.5 font-bold">▲</span> +12.4%
              </span>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10 border-t border-white/10 pt-5">
            <div>
              <p className="micro-label">Money Market Funds</p>
              <p className="serif text-lg md:text-xl font-light text-[#F27D26] mt-1">
                {formatShortUSD(mmfTVL)}
              </p>
            </div>
            <div>
              <p className="micro-label">Real Estate</p>
              <p className="serif text-lg md:text-xl font-light text-white mt-1">
                {formatShortUSD(realEstateTVL)}
              </p>
            </div>
            <div>
              <p className="micro-label">Private Equity</p>
              <p className="serif text-lg md:text-xl font-light text-white mt-1">
                {formatShortUSD(privateEquityTVL)}
              </p>
            </div>
            <div>
              <p className="micro-label">Commodities</p>
              <p className="serif text-lg md:text-xl font-light text-white mt-1">
                {formatShortUSD(commoditiesTVL)}
              </p>
            </div>
          </div>
        </div>

        {/* Tokenize Action Card */}
        <div 
          onClick={onNavigateToTokenize}
          className="glass-card glass-card-hover rounded-xl p-6 flex flex-col justify-center items-center text-center gap-4 group cursor-pointer transition-all duration-300 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#F27D26]/10 to-transparent blur-2xl pointer-events-none"></div>
          <div className="w-14 h-14 rounded-full bg-[#F27D26] flex items-center justify-center text-white group-hover:scale-105 transition-transform duration-300 shadow-lg">
            <Plus className="w-7 h-7" />
          </div>
          <div>
            <h4 className="serif text-lg tracking-wider text-white uppercase">Tokenize Asset</h4>
            <p className="text-xs text-white/40 mt-2 max-w-xs leading-relaxed">
              Convert physical, private equity, or commodity holdings into digital institutional-grade on-chain tokens.
            </p>
          </div>
          <button 
            className="mt-2 px-5 py-2.5 bg-[#F27D26] hover:bg-[#F27D26]/90 text-white font-semibold text-xs uppercase tracking-wider rounded-lg w-full active:scale-95 transition-all shadow-md cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onNavigateToTokenize();
            }}
          >
            Initiate Tokenization
          </button>
        </div>
      </section>

      {/* Asset Inventory Section */}
      <section className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h3 className="serif text-xl tracking-wider text-white uppercase">Asset Inventory</h3>
          
          <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
            {/* Classification Quick Filter Tags */}
            <div className="flex gap-1 bg-white/5 p-1 rounded-lg border border-white/10 overflow-x-auto max-w-full">
              {['All', 'Money Market Fund', 'Real Estate', 'Private Equity', 'Commodities'].map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-3 py-1 text-[10px] font-semibold uppercase tracking-wider rounded transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    selectedType === type
                      ? 'bg-[#F27D26] text-white'
                      : 'text-white/40 hover:text-white'
                  }`}
                >
                  {type === 'Money Market Fund' ? 'MMFs' : type}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10 w-full md:w-80 focus-within:border-[#F27D26] transition-colors">
              <Search className="w-4 h-4 text-white/40" />
              <input
                className="bg-transparent border-none text-xs text-[#d4e4fa] w-full placeholder:text-[#c6c6cd] focus:outline-none"
                placeholder="Search by Asset ID, Name or Type..."
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="text-xs text-[#c6c6cd] hover:text-[#d4e4fa]"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Desktop Table Inventory View */}
        <div className="hidden md:block bg-white/5 border border-white/10 rounded-xl overflow-hidden backdrop-blur-md">
          <table className="w-full text-left border-collapse">
            <thead className="bg-white/5 text-white/40 text-[10px] uppercase font-semibold tracking-widest">
              <tr>
                <th className="p-4 border-b border-white/10 pl-6">Asset Name</th>
                <th className="p-4 border-b border-white/10">Token ID</th>
                <th className="p-4 border-b border-white/10">Type</th>
                <th className="p-4 border-b border-white/10 text-right">Valuation</th>
                <th className="p-4 border-b border-white/10 text-center">Performance (5D)</th>
                <th className="p-4 border-b border-white/10">Status</th>
                <th className="p-4 border-b border-white/10 pr-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredAssets.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-white/40 text-xs uppercase tracking-wider">
                    No tokenized assets match the selected criteria.
                  </td>
                </tr>
              ) : (
                filteredAssets.map((asset) => (
                  <tr 
                    key={asset.id} 
                    onClick={() => setSelectedAsset(asset)}
                    className="hover:bg-white/5 transition-all duration-300 cursor-pointer group"
                  >
                    <td className="p-4 pl-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-white/10">
                          <img className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 transition-all duration-300" alt={asset.name} src={asset.image} referrerPolicy="no-referrer" />
                        </div>
                        <span className="font-semibold text-white group-hover:text-[#F27D26] transition-colors">{asset.name}</span>
                      </div>
                    </td>
                    <td className="p-4 font-mono text-xs text-white/40">{asset.id}</td>
                    <td className="p-4 text-xs text-white/60 uppercase tracking-wider">{asset.type}</td>
                    <td className="p-4 font-semibold text-white text-right font-mono">{formatUSD(asset.valuation)}</td>
                    <td className="p-4 text-center">
                      <div className="flex items-end justify-center gap-1 h-7">
                        {asset.performance.map((val, idx) => (
                          <div 
                            key={idx} 
                            style={{ height: `${(val / 100) * 100}%` }}
                            className={`w-1.5 rounded-t-sm ${asset.trend24h >= 0 ? 'bg-[#F27D26]' : 'bg-white/15'}`}
                          ></div>
                        ))}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider rounded-md border ${
                        asset.status === 'ACTIVE' 
                          ? 'bg-[#F27D26]/10 text-[#F27D26] border-[#F27D26]/20' 
                          : 'bg-white/5 text-white/40 border-white/10'
                      }`}>
                        {asset.status}
                      </span>
                    </td>
                    <td className="p-4 pr-6 text-right">
                      <button className="px-3 py-1 bg-white/5 group-hover:bg-[#F27D26] text-white/60 group-hover:text-white text-[10px] font-semibold uppercase tracking-wider rounded-md transition-colors border border-white/10 group-hover:border-[#F27D26] cursor-pointer">
                        View Engine
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Asset Cards (Responsive Layout) */}
        <div className="md:hidden space-y-4">
          {filteredAssets.length === 0 ? (
            <p className="p-6 text-center text-white/40 text-xs uppercase tracking-wider bg-white/5 rounded-xl">
              No matching assets found.
            </p>
          ) : (
            filteredAssets.map((asset) => (
              <div 
                key={asset.id} 
                onClick={() => setSelectedAsset(asset)}
                className="bg-[#050505] border border-white/10 p-4 rounded-xl space-y-3 hover:border-[#F27D26] cursor-pointer active:scale-[0.99] transition-all"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden border border-white/10 shrink-0">
                      <img className="w-full h-full object-cover grayscale brightness-90" alt={asset.name} src={asset.image} referrerPolicy="no-referrer" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-sm leading-tight">{asset.name}</h4>
                      <p className="text-[10px] font-mono text-white/40 mt-0.5">{asset.id}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 text-[9px] font-bold uppercase rounded border ${
                    asset.status === 'ACTIVE' 
                      ? 'bg-[#F27D26]/10 text-[#F27D26] border-[#F27D26]/20' 
                      : 'bg-white/5 text-white/40 border-white/10'
                  }`}>
                    {asset.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2.5 border-t border-white/10 text-xs">
                  <div>
                    <p className="text-[9px] text-white/40 uppercase tracking-wider">Valuation</p>
                    <p className="font-semibold text-white mt-0.5 font-mono">{formatUSD(asset.valuation)}</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-white/40 uppercase tracking-wider">Type</p>
                    <p className="text-white font-medium mt-0.5 text-[10px] uppercase">{asset.type}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

    </div>
  );
}
