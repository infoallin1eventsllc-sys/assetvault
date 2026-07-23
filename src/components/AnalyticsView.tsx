import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Globe, BarChart3, BrainCircuit, Layers, Newspaper, Filter, ArrowUpRight, TrendingUp, TrendingDown, Eye, AlertCircle } from 'lucide-react';
import { NewsItem } from '../types';

interface AnalyticsViewProps {
  news: NewsItem[];
}

// Generate sample time series datasets for the chart toggles
const CHART_DATASETS = {
  '1D': [
    { time: '08:00', price: 1410 },
    { time: '10:00', price: 1415 },
    { time: '12:00', price: 1408 },
    { time: '14:00', price: 1422 },
    { time: '16:00', price: 1419 },
    { time: '18:00', price: 1425.32 },
  ],
  '1W': [
    { time: 'Mon', price: 1395 },
    { time: 'Tue', price: 1412 },
    { time: 'Wed', price: 1405 },
    { time: 'Thu', price: 1420 },
    { time: 'Fri', price: 1414 },
    { time: 'Sat', price: 1423 },
    { time: 'Sun', price: 1425.32 },
  ],
  '1M': [
    { time: 'Week 1', price: 1350 },
    { time: 'Week 2', price: 1380 },
    { time: 'Week 3', price: 1410 },
    { time: 'Week 4', price: 1425.32 },
  ],
  'ALL': [
    { time: 'Q1', price: 1120 },
    { time: 'Q2', price: 1250 },
    { time: 'Q3', price: 1340 },
    { time: 'Q4', price: 1425.32 },
  ]
};

export default function AnalyticsView({ news }: AnalyticsViewProps) {
  const [activeRange, setActiveRange] = useState<'1D' | '1W' | '1M' | 'ALL'>('1D');
  const [hoveredPrice, setHoveredPrice] = useState<number | null>(null);
  const [hoveredTime, setHoveredTime] = useState<string | null>(null);
  
  const activeData = CHART_DATASETS[activeRange];
  const latestPrice = activeData[activeData.length - 1].price;

  // Custom tooltips inside Recharts
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const point = payload[0].payload;
      // Triggers interactive update of the overlay legend card
      setTimeout(() => {
        setHoveredPrice(point.price);
        setHoveredTime(point.time);
      }, 0);
      return null;
    }
    return null;
  };

  const handleMouseLeave = () => {
    setHoveredPrice(null);
    setHoveredTime(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Key Metrics Bento Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Global Market Cap */}
        <div className="glass-card p-5 rounded-xl flex flex-col justify-between group hover:border-[#F27D26]/30 transition-colors">
          <div className="flex justify-between items-start mb-3">
            <span className="micro-label">Global Market Cap</span>
            <Globe className="w-5 h-5 text-[#F27D26] transition-transform group-hover:scale-110" />
          </div>
          <div className="flex items-baseline gap-2">
            <p className="serif text-2xl font-light text-white tracking-wide">$4.28T</p>
            <p className="font-mono text-xs text-[#F27D26] font-semibold">+2.4%</p>
          </div>
          <div className="mt-4 h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-[#F27D26] w-3/4 animate-pulse"></div>
          </div>
        </div>

        {/* 24h Volume */}
        <div className="glass-card p-5 rounded-xl flex flex-col justify-between group hover:border-[#F27D26]/30 transition-colors">
          <div className="flex justify-between items-start mb-3">
            <span className="micro-label">24h Volume</span>
            <BarChart3 className="w-5 h-5 text-[#F27D26] transition-transform group-hover:scale-110" />
          </div>
          <div className="flex items-baseline gap-2">
            <p className="serif text-2xl font-light text-white tracking-wide">$84.2B</p>
            <p className="font-mono text-xs text-[#F27D26] font-semibold">+12.8%</p>
          </div>
          <div className="mt-4 h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-[#F27D26]/80 w-1/2"></div>
          </div>
        </div>

        {/* Sentiment Index */}
        <div className="glass-card p-5 rounded-xl flex flex-col justify-between group hover:border-[#F27D26]/30 transition-colors">
          <div className="flex justify-between items-start mb-3">
            <span className="micro-label">Sentiment Index</span>
            <BrainCircuit className="w-5 h-5 text-[#F27D26] transition-transform group-hover:scale-110" />
          </div>
          <div className="flex items-baseline gap-2">
            <p className="serif text-2xl font-light text-white tracking-wide">78/100</p>
            <p className="font-mono text-[10px] uppercase tracking-widest text-[#F27D26] font-semibold">Bullish</p>
          </div>
          <div className="mt-4 flex gap-1">
            <div className="h-[2px] flex-1 bg-[#F27D26]"></div>
            <div className="h-[2px] flex-1 bg-[#F27D26]"></div>
            <div className="h-[2px] flex-1 bg-[#F27D26]"></div>
            <div className="h-[2px] flex-1 bg-white/10"></div>
          </div>
        </div>

        {/* Tokenized TVL */}
        <div className="glass-card p-5 rounded-xl flex flex-col justify-between group hover:border-[#F27D26]/30 transition-colors">
          <div className="flex justify-between items-start mb-3">
            <span className="micro-label">Tokenized TVL</span>
            <Layers className="w-5 h-5 text-[#F27D26] transition-transform group-hover:scale-110" />
          </div>
          <div className="flex items-baseline gap-2">
            <p className="serif text-2xl font-light text-white tracking-wide">$1.12T</p>
            <p className="font-mono text-xs text-white/40">Stable</p>
          </div>
          <div className="mt-4 h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-white/40 w-[83%]"></div>
          </div>
        </div>

      </section>

      {/* Main Analytics: Interactive Chart and Sentiment Side Column */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Price Chart Container */}
        <div className="lg:col-span-2 glass-card rounded-xl overflow-hidden flex flex-col h-[520px] shadow-xl animate-fade-in">
          
          {/* Chart Header details */}
          <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5 flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h3 className="serif text-lg font-light text-white tracking-wide">
                  RE-Prime Manhattan Fund
                </h3>
                <span className="font-mono text-[9px] uppercase tracking-wider text-white/60 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                  TKN: NY-PMF-04
                </span>
              </div>
              <p className="font-mono text-xs text-[#F27D26] mt-1.5 flex items-center gap-1.5">
                <span>▲ $1,425.32 (+1.24%)</span>
                <span className="text-white/40 text-[9px] tracking-widest uppercase">Real-time Institutional Feed</span>
              </p>
            </div>

            {/* Timeframe Toggles */}
            <div className="flex gap-1 bg-white/5 p-1 rounded-lg border border-white/10">
              {(['1D', '1W', '1M', 'ALL'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setActiveRange(range)}
                  className={`px-3 py-1 font-mono text-[10px] font-bold rounded transition-colors cursor-pointer ${
                    activeRange === range
                      ? 'bg-[#F27D26] text-white shadow shadow-[#F27D26]/25'
                      : 'text-white/40 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Recharts Canvas wrapper */}
          <div className="flex-1 relative bg-[#050505] p-4 pt-10">
            <ResponsiveContainer width="100%" height="90%">
              <AreaChart 
                data={activeData}
                onMouseLeave={handleMouseLeave}
              >
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F27D26" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#F27D26" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="time" 
                  stroke="rgba(255,255,255,0.1)" 
                  tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontFamily: 'monospace' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  hide={true} 
                  domain={['dataMin - 10', 'dataMax + 10']}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#F27D26" 
                  strokeWidth={1.5}
                  fillOpacity={1} 
                  fill="url(#chartGradient)" 
                />
              </AreaChart>
            </ResponsiveContainer>

            {/* Legend Overlay Card - Updates dynamically on Hover */}
            <div className="absolute top-4 left-6 bg-black/85 border border-white/10 p-3.5 rounded-lg flex flex-col gap-1 shadow-xl backdrop-blur-sm pointer-events-none">
              <p className="micro-label">
                {hoveredTime ? `Price at ${hoveredTime}` : 'Current Transaction'}
              </p>
              <p className="serif text-xl font-light text-white">
                ${(hoveredPrice || latestPrice).toFixed(2)}
              </p>
              <p className="font-mono text-[9px] text-[#F27D26] tracking-widest uppercase font-semibold">
                BLOCK HEIGHT: 194322 • SECURE
              </p>
            </div>
          </div>

          {/* Chart Footer Statistics Grid */}
          <div className="p-4 border-t border-white/10 grid grid-cols-3 gap-4 bg-white/5 text-center text-xs">
            <div>
              <p className="font-mono text-[9px] text-white/40 uppercase tracking-widest">24h Low</p>
              <p className="serif font-light text-white text-sm mt-1">$1,392.10</p>
            </div>
            <div className="border-x border-white/10">
              <p className="font-mono text-[9px] text-white/40 uppercase tracking-widest">24h High</p>
              <p className="serif font-light text-white text-sm mt-1">$1,465.40</p>
            </div>
            <div>
              <p className="font-mono text-[9px] text-white/40 uppercase tracking-widest">Average Volume</p>
              <p className="serif font-light text-white text-sm mt-1">2.4M TKN</p>
            </div>
          </div>

        </div>

        {/* Sidebar sentiment & feed Column */}
        <div className="flex flex-col gap-6 h-[520px]">
          
          {/* Sentiment Heatmap Mood */}
          <div className="glass-card p-5 rounded-xl shadow-xl flex-none">
            <h3 className="serif text-sm font-light text-white tracking-widest uppercase mb-4 flex items-center gap-2.5">
              <BrainCircuit className="w-4 h-4 text-[#F27D26]" />
              <span>Market Mood Sentiment</span>
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-white/60">Institutional Buy/Sell</span>
                <span className="text-[#F27D26] text-[10px] font-bold uppercase tracking-widest">Strong Buy</span>
              </div>
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden flex">
                <div className="h-full bg-[#F27D26] w-3/4"></div>
                <div className="h-full bg-white/15 w-1/4"></div>
              </div>
              <div className="flex justify-between text-[10px] font-mono text-white/40">
                <span>74% Buy Escrow</span>
                <span>26% Sell Liquidity</span>
              </div>
            </div>
          </div>

          {/* Global Intel Live News Feed Scroll */}
          <div className="glass-card rounded-xl shadow-xl flex-1 flex flex-col overflow-hidden">
            
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
              <h3 className="serif text-sm font-light text-white tracking-widest uppercase flex items-center gap-2.5">
                <Newspaper className="w-4 h-4 text-[#F27D26]" />
                <span>Global Intel Alerts</span>
              </h3>
              <span className="w-2 h-2 rounded-full bg-[#F27D26] animate-pulse shrink-0"></span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {news.map((item) => (
                <div 
                  key={item.id} 
                  className={`p-3 border-l-2 bg-white/5 rounded-r-lg hover:bg-white/10 transition-all duration-300 cursor-pointer group ${
                    item.category === 'Real Estate' ? 'border-[#F27D26]' :
                    item.category === 'Commodities' ? 'border-white/40' :
                    item.category === 'Risk Alert' ? 'border-red-500' : 'border-white/10'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1 text-[9px] font-mono uppercase tracking-widest">
                    <span className={
                      item.category === 'Risk Alert' ? 'text-red-400 font-bold' : 'text-white/40'
                    }>{item.category}</span>
                    <span className="text-white/30">{item.time}</span>
                  </div>
                  <h4 className="text-xs font-light text-white/90 leading-normal group-hover:text-[#F27D26] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[9px] text-white/40 font-mono mt-1.5 uppercase tracking-wider">
                    Source: {item.source}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>

      {/* Sector Performance Table */}
      <div className="glass-card rounded-xl overflow-hidden shadow-xl animate-fade-in">
        <div className="p-5 border-b border-white/10 flex justify-between items-center flex-wrap gap-2 bg-white/5">
          <h3 className="serif text-base font-light text-white tracking-wider uppercase">
            Sector Asset Class Performance
          </h3>
          <button className="flex items-center gap-1.5 px-3.5 py-1.5 border border-white/10 rounded-lg hover:bg-white/5 hover:text-white transition-colors text-white/60 font-mono text-[9px] uppercase tracking-widest cursor-pointer">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter Markets</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 text-white/40 text-[10px] font-semibold uppercase tracking-widest">
                <th className="px-6 py-4">Asset Class</th>
                <th className="px-6 py-4 text-right">Price (Avg)</th>
                <th className="px-6 py-4 text-right">24h Change</th>
                <th className="px-6 py-4 text-center">Market Trend</th>
                <th className="px-6 py-4 text-right">Volume (24h)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs">
              
              <tr className="hover:bg-white/5 transition-colors cursor-pointer group">
                <td className="px-6 py-4 font-semibold text-white group-hover:text-[#F27D26] transition-colors">Commercial Real Estate</td>
                <td className="px-6 py-4 text-right font-mono text-white/80">$1,242.00</td>
                <td className="px-6 py-4 text-right font-mono text-[#F27D26] font-semibold">+1.45%</td>
                <td className="px-6 py-4">
                  <div className="h-6 w-24 mx-auto">
                    <svg className="h-full w-full" viewBox="0 0 100 40">
                      <path d="M0,35 Q20,30 40,32 T80,10 T100,5" fill="none" stroke="#F27D26" strokeWidth="1.5"></path>
                    </svg>
                  </div>
                </td>
                <td className="px-6 py-4 text-right font-mono text-white/40">$1.2B</td>
              </tr>

              <tr className="hover:bg-white/5 transition-colors cursor-pointer group">
                <td className="px-6 py-4 font-semibold text-white group-hover:text-[#F27D26] transition-colors">Precious Metals (Gold)</td>
                <td className="px-6 py-4 text-right font-mono text-white/80">$2,342.12</td>
                <td className="px-6 py-4 text-right font-mono text-[#F27D26] font-semibold">+0.82%</td>
                <td className="px-6 py-4">
                  <div className="h-6 w-24 mx-auto">
                    <svg className="h-full w-full" viewBox="0 0 100 40">
                      <path d="M0,20 Q30,20 50,15 T100,10" fill="none" stroke="#F27D26" strokeWidth="1.5"></path>
                    </svg>
                  </div>
                </td>
                <td className="px-6 py-4 text-right font-mono text-white/40">$654M</td>
              </tr>

              <tr className="hover:bg-white/5 transition-colors cursor-pointer group">
                <td className="px-6 py-4 font-semibold text-white group-hover:text-[#F27D26] transition-colors">Shipping & Logistics</td>
                <td className="px-6 py-4 text-right font-mono text-white/80">$412.50</td>
                <td className="px-6 py-4 text-right font-mono text-white/40">-2.14%</td>
                <td className="px-6 py-4">
                  <div className="h-6 w-24 mx-auto opacity-40">
                    <svg className="h-full w-full" viewBox="0 0 100 40">
                      <path d="M0,5 Q20,15 40,12 T80,30 T100,38" fill="none" stroke="white" strokeWidth="1.5"></path>
                    </svg>
                  </div>
                </td>
                <td className="px-6 py-4 text-right font-mono text-white/40">$241M</td>
              </tr>

              <tr className="hover:bg-white/5 transition-colors cursor-pointer group">
                <td className="px-6 py-4 font-semibold text-white group-hover:text-[#F27D26] transition-colors">Renewable Energy</td>
                <td className="px-6 py-4 text-right font-mono text-white/80">$89.20</td>
                <td className="px-6 py-4 text-right font-mono text-[#F27D26] font-semibold">+4.51%</td>
                <td className="px-6 py-4">
                  <div className="h-6 w-24 mx-auto">
                    <svg className="h-full w-full" viewBox="0 0 100 40">
                      <path d="M0,38 L20,32 L40,25 L60,20 L80,10 L100,2" fill="none" stroke="#F27D26" strokeWidth="1.5"></path>
                    </svg>
                  </div>
                </td>
                <td className="px-6 py-4 text-right font-mono text-white/40">$18M</td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
