import React, { useState, lazy, Suspense } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import OverviewView from './components/OverviewView';
const TokenizeView = lazy(() => import('./components/TokenizeView'));
const AnalyticsView = lazy(() => import('./components/AnalyticsView'));
const PortfolioView = lazy(() => import('./components/PortfolioView'));
const MirroredModelView = lazy(() => import('./components/MirroredModelView'));
const TreasuryView = lazy(() => import('./components/TreasuryView'));
import { INITIAL_ASSETS, INITIAL_NEWS, INITIAL_PORTFOLIO } from './mockData';
import { Asset, NewsItem, PortfolioItem } from './types';
import { LayoutGrid, Coins, TrendingUp, Briefcase, X, ShieldAlert, ShieldCheck, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentTab, setTab] = useState<string>('overview');
  const [assets, setAssets] = useState<Asset[]>(INITIAL_ASSETS);
  const [news, setNews] = useState<NewsItem[]>(INITIAL_NEWS);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(INITIAL_PORTFOLIO);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Dynamic asset addition callback (mints new real-world asset)
  const handleTokenizeAsset = (newAsset: Asset) => {
    setAssets(prev => [newAsset, ...prev]);

    // Push live dynamic news event onto the sentiment intel board
    const newNewsItem: NewsItem = {
      id: `news-dyn-${Date.now()}`,
      category: newAsset.type === 'Real Estate' ? 'Real Estate' : 'Infrastructure',
      time: 'Just now',
      title: `Consensus finalized: ${newAsset.name} fractional ledger deployed successfully.`,
      source: 'Consensus Oracle Node',
      sentiment: 'positive',
    };
    setNews(prev => [newNewsItem, ...prev]);

    // Automatically navigate back to Overview to view the new asset
    setTimeout(() => {
      setTab('overview');
    }, 1200);
  };

  // Buy fractional tokens callback (updates holdings and escrow)
  const handleBuyTokens = (assetId: string, amount: number) => {
    // 1. Update Portfolio Holdings
    setPortfolio(prev => {
      const existing = prev.find(item => item.assetId === assetId);
      const asset = assets.find(a => a.id === assetId);
      const currentPrice = asset ? (asset.valuation / asset.supply) : 10;
      
      if (existing) {
        return prev.map(item => 
          item.assetId === assetId 
            ? { 
                ...item, 
                ownedTokens: item.ownedTokens + amount,
                avgPurchasePrice: ((item.ownedTokens * item.avgPurchasePrice) + (amount * currentPrice)) / (item.ownedTokens + amount)
              }
            : item
        );
      } else {
        return [
          ...prev,
          {
            assetId,
            ownedTokens: amount,
            avgPurchasePrice: currentPrice,
            timestamp: new Date().toISOString()
          }
        ];
      }
    });

    // 2. Push dynamic news warning about investment execution
    const asset = assets.find(a => a.id === assetId);
    if (asset) {
      const buyNewsItem: NewsItem = {
        id: `news-buy-${Date.now()}`,
        category: 'Infrastructure',
        time: '1s ago',
        title: `Asset escrow settlement executed: fractional purchase of ${amount.toLocaleString()} TKN in ${asset.name}.`,
        source: 'Vesting Oracle',
        sentiment: 'positive',
      };
      setNews(prev => [buyNewsItem, ...prev]);
    }
  };

  // Render current tab view securely
  const renderTabContent = () => {
    switch (currentTab) {
      case 'overview':
        return (
          <OverviewView 
            assets={assets} 
            onNavigateToTokenize={() => setTab('tokenize')}
            onBuyTokens={handleBuyTokens}
          />
        );
      case 'mirrored-model':
        return <MirroredModelView />;
      case 'tokenize':
        return <TokenizeView onTokenizeAsset={handleTokenizeAsset} />;
      case 'treasury':
        return <TreasuryView />;
      case 'analytics':
        return <AnalyticsView news={news} />;
      case 'portfolio':
        return <PortfolioView portfolio={portfolio} assets={assets} />;
      default:
        return <OverviewView assets={assets} onNavigateToTokenize={() => setTab('tokenize')} onBuyTokens={handleBuyTokens} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#050505] text-white/90 font-sans antialiased overflow-x-hidden selection:bg-[#F27D26] selection:text-white">
      
      {/* Desktop Navigation Drawer (Fixed left side panel) */}
      <Sidebar currentTab={currentTab} setTab={setTab} />

      {/* Main Interactive Workstation Area */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen pb-24 md:pb-10">
        
        {/* Dynamic Header */}
        <TopBar 
          currentTab={currentTab} 
          onToggleSidebar={() => setMobileMenuOpen(!mobileMenuOpen)} 
        />

        {/* Dynamic canvas wrapper with entry fade animation */}
        <main className="p-4 md:p-8 max-w-7xl mx-auto w-full flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
            >
              <Suspense fallback={<div className="text-white/40 text-xs uppercase tracking-widest p-8">Loading module…</div>}>
                {renderTabContent()}
              </Suspense>
            </motion.div>
          </AnimatePresence>
        </main>

      </div>

      {/* Mobile Drawer Navigation (Bottom Nav layout) */}
      <nav className="fixed bottom-0 left-0 right-0 w-full z-40 flex justify-around items-center px-4 py-2 bg-[#050505]/95 border-t border-white/10 md:hidden shadow-lg backdrop-blur-md">
        
        <button 
          onClick={() => setTab('overview')}
          className={`flex flex-col items-center justify-center p-1.5 rounded-xl transition-all duration-200 cursor-pointer ${
            currentTab === 'overview' ? 'text-[#F27D26] bg-white/5' : 'text-white/40'
          }`}
        >
          <LayoutGrid className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-1">Overview</span>
        </button>

        <button 
          onClick={() => setTab('mirrored-model')}
          className={`flex flex-col items-center justify-center p-1.5 rounded-xl transition-all duration-200 cursor-pointer ${
            currentTab === 'mirrored-model' ? 'text-[#F27D26] bg-white/5' : 'text-white/40'
          }`}
        >
          <Layers className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-1">Model</span>
        </button>

        <button 
          onClick={() => setTab('tokenize')}
          className={`flex flex-col items-center justify-center p-1.5 rounded-xl transition-all duration-200 cursor-pointer ${
            currentTab === 'tokenize' ? 'text-[#F27D26] bg-white/5' : 'text-white/40'
          }`}
        >
          <Coins className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-1">Tokenize</span>
        </button>

        <button 
          onClick={() => setTab('treasury')}
          className={`flex flex-col items-center justify-center p-1.5 rounded-xl transition-all duration-200 cursor-pointer ${
            currentTab === 'treasury' ? 'text-[#F27D26] bg-white/5' : 'text-white/40'
          }`}
        >
          <ShieldCheck className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-1">Treasury</span>
        </button>

        <button 
          onClick={() => setTab('analytics')}
          className={`flex flex-col items-center justify-center p-1.5 rounded-xl transition-all duration-200 cursor-pointer ${
            currentTab === 'analytics' ? 'text-[#F27D26] bg-white/5' : 'text-white/40'
          }`}
        >
          <TrendingUp className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-1">Analytics</span>
        </button>

        <button 
          onClick={() => setTab('portfolio')}
          className={`flex flex-col items-center justify-center p-1.5 rounded-xl transition-all duration-200 cursor-pointer ${
            currentTab === 'portfolio' ? 'text-[#F27D26] bg-white/5' : 'text-white/40'
          }`}
        >
          <Briefcase className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-1">Portfolio</span>
        </button>

      </nav>

      {/* Overlay Hamburger Panel (Mobile) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            ></motion.div>

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-72 bg-[#050505] border-l border-white/10 h-full p-6 shadow-2xl flex flex-col gap-6"
            >
              <div className="flex justify-between items-center">
                <span className="serif text-lg tracking-wider text-[#F27D26] uppercase">AssetVault</span>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-white/60 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Verified Badge */}
              <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-white/5 border border-white/10">
                    <img 
                      className="w-full h-full object-cover grayscale brightness-90" 
                      alt="Avatar Portrait" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUlyitpBlfWPr0BjjedNlANKOE_n1jPfDph9--1QrvaqzNsGseDIC6Y-rO59KwCGTjaHyu4bh4ldCjoDV_DJAUjZMJb_tN2Ct9nb9tEugKnP_LsWGbuVzN8jfd7dMq07L-wVZ1uoLTe2sEUeXoxmtKIb_Mtafu4MZ3B0tMut2ypcsnflTKn53MqWkfEutNhjVsALYUQTC6xhY4TIKLsDuQtuMZcI8XtbPeFac4BdrgTMcoG_yrs8DgtmmVvtEZY7y1ks3TRAR78rkO"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">Institutional User</h4>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest">Asset Manager</p>
                  </div>
                </div>
                <div className="py-1 px-3 bg-[#F27D26]/10 border border-[#F27D26]/20 rounded-lg text-[#F27D26] text-[10px] font-bold uppercase tracking-wider w-fit">
                  Verified Escrow Node
                </div>
              </div>

              {/* Institutional Stats inside mobile panel */}
              <div className="space-y-4 flex-1">
                <h4 className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Escrow Escutcheon</h4>
                <div className="space-y-3.5">
                  <div className="bg-white/5 p-3 rounded-lg border border-white/10 text-xs">
                    <p className="text-white/40 uppercase text-[9px] tracking-widest">Node Identity Hash</p>
                    <p className="font-mono mt-1 text-white/80 truncate">0x9f182cba11cda32049bfbc199ea83d</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-lg border border-white/10 text-xs">
                    <p className="text-white/40 uppercase text-[9px] tracking-widest">Available Settlement Credit</p>
                    <p className="font-mono mt-1 font-bold text-[#F27D26]">$1,240,500 USDC</p>
                  </div>
                </div>
              </div>

              <div className="text-[10px] text-white/40 font-mono text-center mt-auto tracking-widest">
                SEC COMPLIANT • BLOCKCHAIN WORKSTATION
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
