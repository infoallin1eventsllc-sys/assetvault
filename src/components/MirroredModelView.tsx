import React, { useState, useEffect } from 'react';
import { 
  Landmark, 
  ShieldCheck, 
  Cpu, 
  Coins, 
  ArrowRightLeft, 
  Play, 
  CheckCircle2, 
  Zap, 
  Sparkles, 
  Clock, 
  Settings, 
  Layers, 
  Globe, 
  Users, 
  BookOpen, 
  HeartHandshake,
  RotateCcw,
  Check,
  ChevronRight,
  TrendingUp,
  Sliders,
  ArrowRight,
  X,
  HelpCircle,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function MirroredModelView() {
  const [activeTab, setActiveTab] = useState<'opportunity' | 'architecture' | 'propositions' | 'gvl'>('opportunity');
  
  // Tab 1: Opportunity State (Interactive Diagram node selection)
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  // Tab 2: Architecture State
  const [selectedStep, setSelectedStep] = useState<number>(0);
  const [animatingStep, setAnimatingStep] = useState<boolean>(false);

  // Tab 3: Value Props Simulation States
  const [automatedMarginState, setAutomatedMarginState] = useState<'idle' | 'monitoring' | 'triggering' | 'executed'>('idle');
  const [collateralValue, setCollateralValue] = useState<number>(100000);
  const [marginThreshold, setMarginThreshold] = useState<number>(85000);
  const [oraclePrice, setOraclePrice] = useState<number>(1.00);

  // Step information for the Mirrored Model (Tab 2)
  const steps = [
    {
      title: "1. Subscription",
      subtitle: "KYC Whitelist & Inception",
      description: "Client subscribes through BNY Mellon's LiquidityDirect platform as usual. The institutional participant must undergo KYC validation to be whitelisted for the permissioned private ledger network.",
      actor: "BNY Mellon (LiquidityDirect)",
      status: "Verified",
      icon: Users
    },
    {
      title: "2. Dual-Record Creation",
      subtitle: "Golden Record Update",
      description: "BNY Mellon updates its official off-chain ledger (which acts as the legally binding golden record) and automatically triggers the minting of a corresponding mirror token on Goldman Sachs' GS DAP® private blockchain, acting as tokenization manager.",
      actor: "BNY Mellon (Tokenization Manager)",
      status: "Triggering",
      icon: Landmark
    },
    {
      title: "3. Digital Twin Issuance",
      subtitle: "GS DAP Private Ledger Mirror",
      description: "The mirror token is minted on the private GS DAP® network. The token itself is not the legal share; it is a digital twin representing the exact economic and balance properties of the off-chain record. Accessible only to whitelisted participants.",
      actor: "GS DAP® Blockchain Network",
      status: "Active Mirror",
      icon: Cpu
    },
    {
      title: "4. On-Chain Utility",
      subtitle: "Improved Transferability",
      description: "Approved participants can transfer or pledge the mirror token on-chain instantly (e.g., as collateral) with 24/7 availability. Underlying shares keep accruing yield; cash settlement movements still utilize standard institutional banking rails.",
      actor: "Decentralized Escrow System",
      status: "Collateral Ready",
      icon: Coins
    },
    {
      title: "5. Redemption Workflow",
      subtitle: "Synchronous Burning & Payout",
      description: "The client submits a redemption request in LiquidityDirect. The mirror token is burned on GS DAP, and BNY Mellon executes the official off-chain redemption and cash payout, keeping both ledgers in synchronous alignment.",
      actor: "Synchronizer System",
      status: "Settlement Synchronized",
      icon: ArrowRightLeft
    }
  ];

  // Price tracking simulation for Automation demo (Tab 3)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (automatedMarginState === 'monitoring') {
      interval = setInterval(() => {
        setOraclePrice(prev => {
          const next = Number((prev - 0.03).toFixed(2));
          if (next * 100000 <= marginThreshold) {
            setAutomatedMarginState('triggering');
            clearInterval(interval);
          }
          return next;
        });
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [automatedMarginState, marginThreshold]);

  useEffect(() => {
    if (automatedMarginState === 'triggering') {
      const timer = setTimeout(() => {
        setAutomatedMarginState('executed');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [automatedMarginState]);

  const resetMarginSimulation = () => {
    setOraclePrice(1.00);
    setAutomatedMarginState('idle');
  };

  const currentStepInfo = steps[selectedStep];

  return (
    <div className="space-y-6">
      
      {/* Brand Header */}
      <div className="glass-card p-6 rounded-xl relative overflow-hidden shadow-xl animate-fade-in">
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-[#F27D26]/5 to-transparent blur-3xl pointer-events-none"></div>
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-[#F27D26] animate-pulse"></span>
              <span className="micro-label">Goldman Sachs & BNY Mellon Tokenization Project</span>
            </div>
            <h2 className="serif text-2xl md:text-3xl font-light text-white tracking-wide mt-2">
              The “Mirrored Tokenization” Model
            </h2>
            <p className="text-xs text-white/50 mt-1 max-w-3xl leading-relaxed">
              Splitting legal finality (off-chain) from on-chain utility. Issuing digital twins on Goldman Sachs' GS DAP® blockchain to enable 24/7 collateral efficiency within existing securities-law frameworks.
            </p>
          </div>
          
          {/* Tabs Selector */}
          <div className="flex gap-1 bg-white/5 p-1 rounded-lg border border-white/10 shrink-0 w-full xl:w-auto overflow-x-auto">
            <button
              onClick={() => setActiveTab('opportunity')}
              className={`px-3.5 py-2 text-[10px] font-bold uppercase tracking-wider rounded transition-all duration-300 whitespace-nowrap cursor-pointer ${
                activeTab === 'opportunity' ? 'bg-[#F27D26] text-white' : 'text-white/40 hover:text-white'
              }`}
            >
              $7T Opportunity
            </button>
            <button
              onClick={() => setActiveTab('architecture')}
              className={`px-3.5 py-2 text-[10px] font-bold uppercase tracking-wider rounded transition-all duration-300 whitespace-nowrap cursor-pointer ${
                activeTab === 'architecture' ? 'bg-[#F27D26] text-white' : 'text-white/40 hover:text-white'
              }`}
            >
              How It Works
            </button>
            <button
              onClick={() => setActiveTab('propositions')}
              className={`px-3.5 py-2 text-[10px] font-bold uppercase tracking-wider rounded transition-all duration-300 whitespace-nowrap cursor-pointer ${
                activeTab === 'propositions' ? 'bg-[#F27D26] text-white' : 'text-white/40 hover:text-white'
              }`}
            >
              Values & Comparison
            </button>
            <button
              onClick={() => setActiveTab('gvl')}
              className={`px-3.5 py-2 text-[10px] font-bold uppercase tracking-wider rounded transition-all duration-300 whitespace-nowrap cursor-pointer ${
                activeTab === 'gvl' ? 'bg-[#F27D26] text-white' : 'text-white/40 hover:text-white'
              }`}
            >
              The Bigger Picture
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        
        {/* TAB 1: THE $7 TRILLION OPPORTUNITY */}
        {activeTab === 'opportunity' && (
          <motion.div
            key="opportunity-tab"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {/* Context Bento Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Introduction Column */}
              <div className="lg:col-span-7 glass-card p-6 rounded-xl flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#F27D26]/5 to-transparent blur-2xl pointer-events-none"></div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-[#F27D26]" />
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#F27D26] font-bold">Market Revolution</span>
                  </div>
                  
                  <h3 className="serif text-xl md:text-2xl font-light text-white leading-snug">
                    Section 1. Goldman & BNY Mellon Tokenize MMF on Chain
                  </h3>
                  
                  <p className="text-xs text-white/70 leading-relaxed font-light">
                    On July 23, 2025, Goldman Sachs and BNY Mellon announced a partnership to tokenize money market fund shares. The project uses a private blockchain to create digital representations of these shares and includes participation from asset managers such as BlackRock and Fidelity, as shown in the diagram below.
                  </p>
                  
                  <p className="text-xs text-white/70 leading-relaxed font-light">
                    This initiative will alter the infrastructure of the <strong>$7 Trillion</strong> money market fund industry. By utilizing GS DAP® permissioned technology, institutions gain instant movement speeds without needing to change traditional legal finality frameworks.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/5">
                  <div className="bg-[#050505] p-4 rounded-lg border border-white/5">
                    <h4 className="font-bold text-xs text-white uppercase tracking-wide flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5 text-[#F27D26]" />
                      Near-Instant Settlements
                    </h4>
                    <p className="text-[11px] text-white/50 font-light mt-1.5 leading-relaxed">
                      Transaction settlement times are reduced from multiple days to nearly instantaneous, lowering administrative friction, operational delay, and risk.
                    </p>
                  </div>
                  <div className="bg-[#050505] p-4 rounded-lg border border-white/5">
                    <h4 className="font-bold text-xs text-white uppercase tracking-wide flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#F27D26]" />
                      24/7 Programmable Collateral
                    </h4>
                    <p className="text-[11px] text-white/50 font-light mt-1.5 leading-relaxed">
                      MMFs convert from static holdings into mobile, programmable collateral available 24/7 for managing liquidity, margins, and counterparty requirements.
                    </p>
                  </div>
                </div>
              </div>

              {/* Stat callouts column */}
              <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="glass-card p-6 rounded-xl flex flex-col justify-between relative overflow-hidden">
                  <span className="micro-label">MMF Market Size</span>
                  <div className="mt-4">
                    <p className="serif text-4xl font-light text-white">$7.0T</p>
                    <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest mt-1">Total Industry Value</p>
                  </div>
                </div>

                <div className="glass-card p-6 rounded-xl flex flex-col justify-between relative overflow-hidden">
                  <span className="micro-label">Announcement Date</span>
                  <div className="mt-4">
                    <p className="serif text-3xl font-light text-[#F27D26]">July 23, 2025</p>
                    <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest mt-1">Partnership Genesis</p>
                  </div>
                </div>

                <div className="glass-card p-6 rounded-xl flex flex-col justify-between relative overflow-hidden">
                  <span className="micro-label">Blockchain Engine</span>
                  <div className="mt-4">
                    <p className="serif text-3xl font-light text-white">GS DAP®</p>
                    <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest mt-1">Goldman Sachs network</p>
                  </div>
                </div>

                <div className="glass-card p-6 rounded-xl flex flex-col justify-between relative overflow-hidden">
                  <span className="micro-label">Prime Participants</span>
                  <div className="mt-4 flex items-center gap-1.5 flex-wrap">
                    <span className="px-2 py-1 bg-white/5 border border-white/10 text-[9px] font-mono text-white uppercase tracking-wider rounded">BlackRock</span>
                    <span className="px-2 py-1 bg-white/5 border border-white/10 text-[9px] font-mono text-white uppercase tracking-wider rounded">Fidelity</span>
                    <span className="px-2 py-1 bg-white/5 border border-white/10 text-[9px] font-mono text-[#F27D26] uppercase tracking-wider rounded font-bold">BNY Mellon</span>
                  </div>
                </div>

              </div>

            </div>

            {/* Interactive Architecture Network Node Diagram */}
            <div className="glass-card p-6 rounded-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-[#F27D26]/5 to-transparent blur-3xl pointer-events-none"></div>
              
              <div className="border-b border-white/10 pb-4 mb-6">
                <h3 className="serif text-lg font-light text-white tracking-wide">
                  Goldman Sachs & BNY Mellon Tokenization Network Topology
                </h3>
                <p className="text-xs text-white/40 mt-1">
                  Click any node or participant to reveal how they interact on the permissioned GS DAP® system.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* SVG/CSS Topology Diagram */}
                <div className="lg:col-span-8 bg-[#050505] rounded-xl border border-white/5 p-6 min-h-[300px] flex items-center justify-center relative overflow-hidden shadow-inner">
                  
                  {/* Subtle Grid Pattern Overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:16px_16px] opacity-30"></div>
                  
                  {/* Network Nodes */}
                  <div className="relative z-10 w-full max-w-lg flex flex-col gap-10">
                    
                    {/* Top Tier: Legal Off-chain Record */}
                    <div className="flex justify-between items-center px-4">
                      <button 
                        onClick={() => setSelectedNode('bnymellon')}
                        className={`px-4 py-2.5 rounded-lg border transition-all duration-300 flex items-center gap-2.5 cursor-pointer hover:scale-105 active:scale-95 ${
                          selectedNode === 'bnymellon' 
                            ? 'bg-[#F27D26]/10 border-[#F27D26] text-white shadow-[0_0_15px_rgba(242,125,38,0.2)]' 
                            : 'bg-black/80 border-white/10 text-white/80 hover:border-white/20'
                        }`}
                      >
                        <Landmark className="w-4 h-4 text-[#F27D26]" />
                        <div className="text-left">
                          <p className="text-[10px] font-bold uppercase tracking-wider">BNY Mellon</p>
                          <p className="text-[8px] font-mono text-white/40 uppercase tracking-widest">Golden Record Keeper</p>
                        </div>
                      </button>

                      <div className="h-0.5 flex-1 bg-gradient-to-r from-white/10 to-white/10 border-t border-dashed border-white/20 mx-2 relative">
                        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-1.5 py-0.5 bg-black/80 border border-white/10 text-[7px] font-mono text-white/40 uppercase rounded tracking-widest">
                          1:1 Sync
                        </span>
                      </div>

                      <button 
                        onClick={() => setSelectedNode('gsdap')}
                        className={`px-4 py-2.5 rounded-lg border transition-all duration-300 flex items-center gap-2.5 cursor-pointer hover:scale-105 active:scale-95 ${
                          selectedNode === 'gsdap' 
                            ? 'bg-[#F27D26]/10 border-[#F27D26] text-white shadow-[0_0_15px_rgba(242,125,38,0.2)]' 
                            : 'bg-black/80 border-white/10 text-white/80 hover:border-white/20'
                        }`}
                      >
                        <Cpu className="w-4 h-4 text-[#F27D26]" />
                        <div className="text-left">
                          <p className="text-[10px] font-bold uppercase tracking-wider">GS DAP®</p>
                          <p className="text-[8px] font-mono text-white/40 uppercase tracking-widest">Permissioned Blockchain</p>
                        </div>
                      </button>
                    </div>

                    {/* Mid Tier: Asset Managers & Whitelist */}
                    <div className="flex justify-center">
                      <div className="w-1.5 h-12 bg-gradient-to-b from-[#F27D26]/30 to-[#F27D26]/5 relative">
                        <div className="absolute top-0 w-2 h-2 bg-[#F27D26] rounded-full left-1/2 -translate-x-1/2 animate-ping"></div>
                      </div>
                    </div>

                    {/* Bottom Tier: Participants */}
                    <div className="flex justify-around items-center">
                      <button 
                        onClick={() => setSelectedNode('managers')}
                        className={`px-4 py-2.5 rounded-lg border transition-all duration-300 flex items-center gap-2.5 cursor-pointer hover:scale-105 active:scale-95 ${
                          selectedNode === 'managers' 
                            ? 'bg-[#F27D26]/10 border-[#F27D26] text-white shadow-[0_0_15px_rgba(242,125,38,0.2)]' 
                            : 'bg-black/80 border-white/10 text-white/80 hover:border-white/20'
                        }`}
                      >
                        <Globe className="w-4 h-4 text-[#F27D26]" />
                        <div className="text-left">
                          <p className="text-[10px] font-bold uppercase tracking-wider">BlackRock & Fidelity</p>
                          <p className="text-[8px] font-mono text-white/40 uppercase tracking-widest">Asset Managers</p>
                        </div>
                      </button>

                      <button 
                        onClick={() => setSelectedNode('client')}
                        className={`px-4 py-2.5 rounded-lg border transition-all duration-300 flex items-center gap-2.5 cursor-pointer hover:scale-105 active:scale-95 ${
                          selectedNode === 'client' 
                            ? 'bg-[#F27D26]/10 border-[#F27D26] text-white shadow-[0_0_15px_rgba(242,125,38,0.2)]' 
                            : 'bg-black/80 border-white/10 text-white/80 hover:border-white/20'
                        }`}
                      >
                        <Users className="w-4 h-4 text-[#F27D26]" />
                        <div className="text-left">
                          <p className="text-[10px] font-bold uppercase tracking-wider">Institutional Clients</p>
                          <p className="text-[8px] font-mono text-white/40 uppercase tracking-widest">KYC Whitelisted</p>
                        </div>
                      </button>
                    </div>

                  </div>
                </div>

                {/* Explanatory Sidebar Panel */}
                <div className="lg:col-span-4 space-y-4">
                  <h4 className="serif text-xs font-semibold uppercase tracking-widest text-white/40">
                    Node Metadata Inspector
                  </h4>
                  
                  <AnimatePresence mode="wait">
                    {!selectedNode ? (
                      <motion.div
                        key="no-node"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="bg-white/2 border border-white/5 rounded-lg p-4 text-center py-10"
                      >
                        <HelpCircle className="w-8 h-8 text-white/20 mx-auto mb-2" />
                        <p className="text-xs text-white/40 font-light leading-relaxed">
                          Click on BNY Mellon, GS DAP®, Asset Managers, or Whitelisted Clients to inspect their roles in the tokenized ecosystem.
                        </p>
                      </motion.div>
                    ) : selectedNode === 'bnymellon' ? (
                      <motion.div
                        key="bnymellon-node"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-[#050505] border border-white/10 rounded-lg p-5 space-y-3.5 relative"
                      >
                        <button 
                          onClick={() => setSelectedNode(null)}
                          className="absolute top-3 right-3 text-white/40 hover:text-white cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <div className="flex items-center gap-2">
                          <Landmark className="w-4 h-4 text-[#F27D26]" />
                          <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-[#F27D26]">Golden Record Custodian</span>
                        </div>
                        <h4 className="serif text-sm font-light text-white">BNY Mellon LiquidityDirect®</h4>
                        <p className="text-[11px] text-white/60 font-light leading-relaxed">
                          Keeps the legally binding shareholder record entirely off-chain, securing compliance with known securities-law frameworks. Undergoes traditional KYC checks and triggers token twin minting on Goldman's blockchain.
                        </p>
                      </motion.div>
                    ) : selectedNode === 'gsdap' ? (
                      <motion.div
                        key="gsdap-node"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-[#050505] border border-white/10 rounded-lg p-5 space-y-3.5 relative"
                      >
                        <button 
                          onClick={() => setSelectedNode(null)}
                          className="absolute top-3 right-3 text-white/40 hover:text-white cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <div className="flex items-center gap-2">
                          <Cpu className="w-4 h-4 text-[#F27D26]" />
                          <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-[#F27D26]">Permissioned Blockchain</span>
                        </div>
                        <h4 className="serif text-sm font-light text-white">Goldman Sachs GS DAP®</h4>
                        <p className="text-[11px] text-white/60 font-light leading-relaxed">
                          Goldman's private network hosting the 1:1 digital mirror token. Houses smart contracts for rapid collateral lockup, on-chain pledges, and near real-time settlement without direct cash settlement overhead.
                        </p>
                      </motion.div>
                    ) : selectedNode === 'managers' ? (
                      <motion.div
                        key="managers-node"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-[#050505] border border-white/10 rounded-lg p-5 space-y-3.5 relative"
                      >
                        <button 
                          onClick={() => setSelectedNode(null)}
                          className="absolute top-3 right-3 text-white/40 hover:text-white cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4 text-[#F27D26]" />
                          <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-[#F27D26]">Asset Administrators</span>
                        </div>
                        <h4 className="serif text-sm font-light text-white">BlackRock & Fidelity</h4>
                        <p className="text-[11px] text-white/60 font-light leading-relaxed">
                          Participating as premier institutional asset managers who supply the underlying yields and asset models, bringing deep liquidity pools and traditional MMF portfolios into parallel blockchain structures.
                        </p>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="client-node"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-[#050505] border border-white/10 rounded-lg p-5 space-y-3.5 relative"
                      >
                        <button 
                          onClick={() => setSelectedNode(null)}
                          className="absolute top-3 right-3 text-white/40 hover:text-white cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-[#F27D26]" />
                          <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-[#F27D26]">Institutional Investors</span>
                        </div>
                        <h4 className="serif text-sm font-light text-white">Whitelisted Corporations</h4>
                        <p className="text-[11px] text-white/60 font-light leading-relaxed">
                          KYC-cleared corporate treasuries, banking institutions, and hedge funds who utilize the system to post collateral in seconds, optimize cash efficiency, and bypass the legacy multi-day cash-redemption delay.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>

            </div>
          </motion.div>
        )}

        {/* TAB 2: HOW MIRRORED TOKENIZED MMFs WORK */}
        {activeTab === 'architecture' && (
          <motion.div
            key="architecture-tab"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6"
          >
            {/* Interactive Flow Stepper Navigation */}
            <div className="lg:col-span-4 space-y-3">
              <h3 className="serif text-sm font-medium tracking-wider text-white uppercase mb-1">
                Decentralized Lifecycle Steps
              </h3>
              <div className="flex flex-col gap-2">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const isSelected = selectedStep === index;
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        setAnimatingStep(true);
                        setSelectedStep(index);
                        setTimeout(() => setAnimatingStep(false), 200);
                      }}
                      className={`text-left p-4 rounded-lg border transition-all duration-300 flex items-start gap-4 cursor-pointer relative overflow-hidden group ${
                        isSelected 
                          ? 'bg-white/5 border-[#F27D26]/50 shadow'
                          : 'bg-white/2 border-white/5 hover:border-white/20'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#F27D26]"></div>
                      )}
                      <div className={`p-2 rounded-md ${isSelected ? 'bg-[#F27D26]/10 text-[#F27D26]' : 'bg-white/5 text-white/40'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="overflow-hidden">
                        <p className={`text-xs font-bold uppercase tracking-wide transition-colors ${isSelected ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>
                          {step.title}
                        </p>
                        <p className="text-[10px] text-white/40 uppercase tracking-widest truncate mt-0.5">
                          {step.subtitle}
                        </p>
                      </div>
                      <ChevronRight className={`w-4 h-4 ml-auto self-center transition-transform duration-300 ${isSelected ? 'text-[#F27D26] translate-x-0' : 'text-white/20 group-hover:translate-x-1'}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Visualizer Stage */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              
              {/* Detailed Explanation Panel */}
              <div className="glass-card p-6 rounded-xl flex-1 flex flex-col justify-between relative overflow-hidden min-h-[300px]">
                <div className="absolute top-0 right-0 p-4 font-mono text-[9px] text-[#F27D26] bg-[#F27D26]/5 border-l border-b border-white/10 tracking-widest uppercase">
                  Active Lifecycle Visualizer
                </div>
                
                <div className="space-y-4 max-w-xl">
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 bg-white/5 border border-white/10 text-[9px] font-mono uppercase tracking-widest text-white/60 rounded">
                      Step {selectedStep + 1} of 5
                    </span>
                    <span className="text-[#F27D26] text-[10px] uppercase font-bold tracking-widest flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      {currentStepInfo.actor}
                    </span>
                  </div>

                  <div className={`transition-all duration-300 ${animatingStep ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
                    <h4 className="serif text-xl font-light text-white tracking-wide">
                      {currentStepInfo.title} — {currentStepInfo.subtitle}
                    </h4>
                    <p className="text-xs text-white/60 font-light mt-3 leading-relaxed">
                      {currentStepInfo.description}
                    </p>
                  </div>
                </div>

                {/* Ledger Mirror Synchronizer Simulation Artwork */}
                <div className="mt-8 border-t border-white/5 pt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#050505] p-4 rounded-lg border border-white/5 flex flex-col justify-between relative">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">BNY Mellon Golden Record</span>
                      <Landmark className="w-4 h-4 text-white/40" />
                    </div>
                    <div>
                      <p className="font-mono text-xs text-white/80">Ledger Index: #493012</p>
                      <p className="font-mono text-[9px] text-white/30 uppercase mt-1">OFF-CHAIN / LEGAL FINALITY</p>
                    </div>
                    {selectedStep >= 1 ? (
                      <div className="absolute inset-0 bg-emerald-950/20 border border-emerald-500/30 rounded-lg flex items-center justify-center backdrop-blur-[1px] animate-fade-in">
                        <div className="text-center p-2 bg-[#050505] border border-emerald-500/20 rounded-md">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                          <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest">Official Record Saved</span>
                        </div>
                      </div>
                    ) : selectedStep === 0 ? (
                      <div className="absolute inset-0 bg-[#F27D26]/10 border border-[#F27D26]/30 rounded-lg flex items-center justify-center backdrop-blur-[1px]">
                        <div className="text-center p-2 bg-[#050505] border border-[#F27D26]/20 rounded-md">
                          <Clock className="w-4 h-4 text-[#F27D26] mx-auto mb-1 animate-spin" />
                          <span className="text-[9px] font-mono text-[#F27D26] uppercase tracking-widest">Subscription Whitelist</span>
                        </div>
                      </div>
                    ) : null}
                  </div>

                  <div className="bg-[#050505] p-4 rounded-lg border border-white/5 flex flex-col justify-between relative">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">GS DAP® Token Twin</span>
                      <Cpu className="w-4 h-4 text-[#F27D26]" />
                    </div>
                    <div>
                      <p className="font-mono text-xs text-[#F27D26]">Mirror Address: 0x8a91...3fd2</p>
                      <p className="font-mono text-[9px] text-[#F27D26]/40 uppercase mt-1">ON-CHAIN / UTILITY & TRANSFER</p>
                    </div>
                    {selectedStep >= 2 && selectedStep < 4 ? (
                      <div className="absolute inset-0 bg-[#F27D26]/10 border border-[#F27D26]/30 rounded-lg flex items-center justify-center backdrop-blur-[1px] animate-fade-in">
                        <div className="text-center p-2 bg-[#050505] border border-[#F27D26]/20 rounded-md">
                          <CheckCircle2 className="w-4 h-4 text-[#F27D26] mx-auto mb-1" />
                          <span className="text-[9px] font-mono text-[#F27D26] uppercase tracking-widest">1:1 Digital Mirror Live</span>
                        </div>
                      </div>
                    ) : selectedStep === 4 ? (
                      <div className="absolute inset-0 bg-red-950/20 border border-red-500/30 rounded-lg flex items-center justify-center backdrop-blur-[1px] animate-fade-in">
                        <div className="text-center p-2 bg-[#050505] border border-red-500/20 rounded-md">
                          <Zap className="w-4 h-4 text-red-400 mx-auto mb-1" />
                          <span className="text-[9px] font-mono text-red-400 uppercase tracking-widest">Token Burned / Redeemed</span>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/10">
                  <button
                    disabled={selectedStep === 0}
                    onClick={() => {
                      setAnimatingStep(true);
                      setSelectedStep(prev => Math.max(0, prev - 1));
                      setTimeout(() => setAnimatingStep(false), 200);
                    }}
                    className="px-4 py-2 bg-white/5 text-white/70 hover:text-white rounded text-[10px] font-bold uppercase tracking-wider transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                  >
                    Previous Phase
                  </button>
                  <button
                    disabled={selectedStep === steps.length - 1}
                    onClick={() => {
                      setAnimatingStep(true);
                      setSelectedStep(prev => Math.min(steps.length - 1, prev + 1));
                      setTimeout(() => setAnimatingStep(false), 200);
                    }}
                    className="px-4 py-2 bg-[#F27D26] hover:bg-[#F27D26]/90 text-white rounded text-[10px] font-bold uppercase tracking-wider transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer animate-pulse"
                  >
                    Next Phase
                  </button>
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* TAB 3: VALUES OF TOKENIZATION & COMPARISON */}
        {activeTab === 'propositions' && (
          <motion.div
            key="propositions-tab"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6 animate-fade-in"
          >
            {/* Header Description */}
            <div className="glass-card p-6 rounded-xl relative overflow-hidden shadow">
              <h3 className="serif text-lg font-light text-white tracking-wide">
                Values of Tokenization — Three Pillars of Institutional Efficiency
              </h3>
              <p className="text-xs text-white/50 mt-1 max-w-4xl font-light">
                This initiative provides three main benefits for institutional clients. It makes MMFs better for use as collateral, moves the industry closer to real-time settlement, and automates complex financial tasks.
              </p>
            </div>

            {/* Value Props Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Card 1: Better Collateral */}
              <div className="glass-card p-6 rounded-xl flex flex-col justify-between hover:border-[#F27D26]/20 transition-all duration-300">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-[#F27D26]/10 flex items-center justify-center text-[#F27D26]">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h4 className="serif text-base font-light text-white tracking-wide">
                    1. Making MMFs Better Collateral
                  </h4>
                  <p className="text-xs text-white/50 leading-relaxed font-light">
                    The project enables on-chain pledging of MMF positions between approved parties without cash redemption, so collateral can move in seconds while the underlying shares keep accruing yield (cash legs still use banking rails).
                  </p>
                </div>
                
                {/* Traditional vs Tokenized comparison */}
                <div className="mt-6 pt-4 border-t border-white/10 space-y-3 text-[11px]">
                  <div className="bg-white/2 p-2.5 rounded border border-white/5">
                    <p className="font-bold text-white/30 uppercase tracking-widest text-[8px]">Traditional</p>
                    <p className="text-white/60 font-light mt-1">To post MMFs as collateral, firms redeem shares to cash (T+0 if before cut-off; otherwise T+1) and then post cash via banking rails.</p>
                  </div>
                  <div className="bg-[#F27D26]/5 p-2.5 rounded border border-[#F27D26]/20">
                    <p className="font-bold text-[#F27D26] uppercase tracking-widest text-[8px]">Tokenized Mirror</p>
                    <p className="text-white/80 font-light mt-1">The MMF position is pledged by transferring/locking its mirror token between whitelisted wallets on a permissioned chain (GS DAP®) in seconds 24/7 without redeeming.</p>
                  </div>
                </div>
              </div>

              {/* Card 2: Real-Time Settlement */}
              <div className="glass-card p-6 rounded-xl flex flex-col justify-between hover:border-[#F27D26]/20 transition-all duration-300">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-[#F27D26]/10 flex items-center justify-center text-[#F27D26]">
                    <Clock className="w-5 h-5" />
                  </div>
                  <h4 className="serif text-base font-light text-white tracking-wide">
                    2. Moving Toward Real-Time Settlement
                  </h4>
                  <p className="text-xs text-white/50 leading-relaxed font-light">
                    By using a blockchain, the platform enables atomic delivery-versus-payment (DvP) when both legs of a trade are on chain (e.g., tokenized cash and tokenized MMF positions), reducing settlement risk.
                  </p>
                </div>

                {/* Traditional vs Tokenized comparison */}
                <div className="mt-6 pt-4 border-t border-white/10 space-y-3 text-[11px]">
                  <div className="bg-white/2 p-2.5 rounded border border-white/5">
                    <p className="font-bold text-white/30 uppercase tracking-widest text-[8px]">Traditional</p>
                    <p className="text-white/60 font-light mt-1">Firms experience a delay between transaction agreement and finalization, creating settlement (counterparty) risk. Fixed operating hours limit global agility.</p>
                  </div>
                  <div className="bg-[#F27D26]/5 p-2.5 rounded border border-[#F27D26]/20">
                    <p className="font-bold text-[#F27D26] uppercase tracking-widest text-[8px]">Tokenized Mirror</p>
                    <p className="text-white/80 font-light mt-1">The token leg can be confirmed in seconds and operate 24/7, reducing counterparty risk. Full end-to-end atomic swap supports global timezones.</p>
                  </div>
                </div>
              </div>

              {/* Card 3: Task Automation */}
              <div className="glass-card p-6 rounded-xl flex flex-col justify-between hover:border-[#F27D26]/20 transition-all duration-300">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-[#F27D26]/10 flex items-center justify-center text-[#F27D26]">
                    <Settings className="w-5 h-5" />
                  </div>
                  <h4 className="serif text-base font-light text-white tracking-wide">
                    3. Automating Financial Tasks
                  </h4>
                  <p className="text-xs text-white/50 leading-relaxed font-light">
                    Smart contracts can automate these tasks when supported by price/valuation oracles and pre-agreed collateral terms. Lock or transfer precise amounts of MMF collateral based on real-time triggers.
                  </p>
                </div>

                {/* Traditional vs Tokenized comparison */}
                <div className="mt-6 pt-4 border-t border-white/10 space-y-3 text-[11px]">
                  <div className="bg-white/2 p-2.5 rounded border border-white/5">
                    <p className="font-bold text-white/30 uppercase tracking-widest text-[8px]">Traditional</p>
                    <p className="text-white/60 font-light mt-1">Processes like managing collateral for derivatives require constant manual monitoring, intervention, and administration. Highly prone to human errors.</p>
                  </div>
                  <div className="bg-[#F27D26]/5 p-2.5 rounded border border-[#F27D26]/20">
                    <p className="font-bold text-[#F27D26] uppercase tracking-widest text-[8px]">Tokenized Mirror</p>
                    <p className="text-white/80 font-light mt-1">Smart contracts automate margin calls. Lock or transfer a precise amount of MMF collateral autonomously when threshold is breached, reducing risk.</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Traditional vs. Tokenized Dense Side-by-Side Comparison Matrix */}
            <div className="glass-card rounded-xl overflow-hidden shadow-xl animate-fade-in">
              <div className="p-4 border-b border-white/10 bg-white/5 flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#F27D26]" />
                <h3 className="serif text-sm font-light text-white tracking-widest uppercase">
                  Traditional MMF custody vs. Blockchain Mirrored Tokenization Matrix
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead className="bg-white/5 text-white/40 font-mono uppercase tracking-widest text-[9px]">
                    <tr>
                      <th className="px-6 py-4">Financial Property</th>
                      <th className="px-6 py-4">Traditional Legacy Model</th>
                      <th className="px-6 py-4 text-[#F27D26]">Tokenized Blockchain Mirror</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-light text-white/80">
                    <tr className="hover:bg-white/2 transition-colors">
                      <td className="px-6 py-3.5 font-bold uppercase tracking-wider text-[10px] text-white/95">Collateral Posting Speed</td>
                      <td className="px-6 py-3.5 text-white/50">Hours or Days (Requires cash redemption first)</td>
                      <td className="px-6 py-3.5 text-emerald-400 font-medium flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Seconds (24/7 on-chain wallet locks)</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-white/2 transition-colors">
                      <td className="px-6 py-3.5 font-bold uppercase tracking-wider text-[10px] text-white/95">Yield Loss During Pledge</td>
                      <td className="px-6 py-3.5 text-white/50">High (Forfeited yield during cash conversion)</td>
                      <td className="px-6 py-3.5 text-emerald-400 font-medium flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Zero (Underlying asset accrues yield continuously)</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-white/2 transition-colors">
                      <td className="px-6 py-3.5 font-bold uppercase tracking-wider text-[10px] text-white/95">Operational Hours</td>
                      <td className="px-6 py-3.5 text-white/50">Strict banking cut-off times (standard business days)</td>
                      <td className="px-6 py-3.5 text-emerald-400 font-medium flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>24/7/365 continuous network availability</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-white/2 transition-colors">
                      <td className="px-6 py-3.5 font-bold uppercase tracking-wider text-[10px] text-white/95">Counterparty Risk</td>
                      <td className="px-6 py-3.5 text-white/50">Elevated (Due to delayed settlements and hours gaps)</td>
                      <td className="px-6 py-3.5 text-emerald-400 font-medium flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Minimized (Atomic swaps, instant transfers)</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-white/2 transition-colors">
                      <td className="px-6 py-3.5 font-bold uppercase tracking-wider text-[10px] text-white/95">Margin Call Operations</td>
                      <td className="px-6 py-3.5 text-white/50">Manual monitoring, phone/email verification, human steps</td>
                      <td className="px-6 py-3.5 text-emerald-400 font-medium flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Fully automated via on-chain smart contracts</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Smart Margin Call Simulator Section */}
            <div className="glass-card p-6 rounded-xl relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-br from-[#F27D26]/5 to-transparent blur-2xl pointer-events-none"></div>
              <div className="border-b border-white/10 pb-4 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="serif text-lg font-light text-white tracking-wide flex items-center gap-2">
                    <Sliders className="w-5 h-5 text-[#F27D26]" />
                    Smart Contract Task Automation Simulator
                  </h3>
                  <p className="text-xs text-white/50 mt-1">
                    Simulate how smart contract automated margin calls execute under the mirrored tokenization collateral system.
                  </p>
                </div>
                <button
                  onClick={resetMarginSimulation}
                  className="px-3.5 py-1.5 bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-wider rounded-lg flex items-center gap-1.5 text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Simulator Controls & Stats */}
                <div className="lg:col-span-4 space-y-4">
                  <div className="bg-[#050505] p-4 rounded-lg border border-white/5 space-y-3.5">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-white/40">Initial Collateral Value</span>
                        <span className="font-mono text-white">${collateralValue.toLocaleString()} USDC</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-white/50 w-full"></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-white/40">Margin Threshold</span>
                        <span className="font-mono text-[#F27D26]">${marginThreshold.toLocaleString()} USDC</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-[#F27D26] w-[85%]"></div>
                      </div>
                    </div>

                    <div className="pt-2 flex justify-between items-center">
                      <span className="text-xs text-white/40">Oracle Price Index</span>
                      <span className="font-mono text-sm font-bold text-white bg-white/5 px-2 py-0.5 rounded border border-white/10">
                        ${oraclePrice.toFixed(2)}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-white/5 flex justify-between items-center text-xs">
                      <span className="text-white/40">Current Net Collateral</span>
                      <span className={`font-mono font-bold ${oraclePrice * collateralValue <= marginThreshold ? 'text-red-400' : 'text-emerald-400'}`}>
                        ${(oraclePrice * collateralValue).toLocaleString()} USDC
                      </span>
                    </div>
                  </div>

                  {automatedMarginState === 'idle' ? (
                    <button
                      onClick={() => setAutomatedMarginState('monitoring')}
                      className="w-full py-3 bg-[#F27D26] hover:bg-[#F27D26]/90 text-white font-semibold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 shadow-md cursor-pointer"
                    >
                      <Play className="w-4 h-4 fill-current animate-pulse" />
                      <span>Start Price Feed Simulation</span>
                    </button>
                  ) : automatedMarginState === 'monitoring' ? (
                    <div className="w-full py-3 bg-[#F27D26]/10 border border-[#F27D26]/20 text-[#F27D26] font-semibold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#F27D26] animate-ping"></span>
                      <span>Monitoring Price Index Feed...</span>
                    </div>
                  ) : automatedMarginState === 'triggering' ? (
                    <div className="w-full py-3 bg-red-950/20 border border-red-500/30 text-red-400 font-semibold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-red-500 animate-bounce"></span>
                      <span>COLLATERAL BREACH: TRIGGERING MARGIN...</span>
                    </div>
                  ) : (
                    <div className="w-full py-3 bg-emerald-950/20 border border-emerald-500/30 text-emerald-400 font-semibold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>AUTOMATED DISPATCH EXECUTED</span>
                    </div>
                  )}
                </div>

                {/* Simulated Terminal / Smart Contract execution log */}
                <div className="lg:col-span-8 bg-[#050505] border border-white/10 rounded-lg p-4 font-mono text-[11px] h-60 flex flex-col justify-between overflow-hidden shadow-inner">
                  <div className="space-y-1.5 overflow-y-auto max-h-[180px] custom-scrollbar text-white/80 pr-2">
                    <p className="text-white/30">&gt; Initializing Smart Margin Contract (ID: 0x98f2ba1)...</p>
                    <p className="text-white/30">&gt; Locked whitelisted collateral: 100,000 GS DAP BNY Mellon Mirrored Tokens.</p>
                    <p className="text-white/30">&gt; Setup margin ratio trigger at 85% of asset par valuation.</p>
                    {automatedMarginState !== 'idle' && (
                      <p className="text-white/60 animate-fade-in">&gt; Price index feed active: receiving standard oracle price points...</p>
                    )}
                    {automatedMarginState === 'monitoring' && (
                      <p className="text-[#F27D26] animate-pulse">&gt; Price update: MMF share index is ${oraclePrice.toFixed(2)} (Net Collateral: ${(oraclePrice * collateralValue).toLocaleString()})</p>
                    )}
                    {(automatedMarginState === 'triggering' || automatedMarginState === 'executed') && (
                      <>
                        <p className="text-[#F27D26]">&gt; Price update: MMF share index is ${oraclePrice.toFixed(2)} (Net Collateral: ${(oraclePrice * collateralValue).toLocaleString()})</p>
                        <p className="text-red-400 font-bold bg-red-950/30 px-1 py-0.5 rounded border border-red-900/30 w-fit">&gt; WARNING: Net collateral value of ${(oraclePrice * collateralValue).toLocaleString()} breached margin limit of $85,000!</p>
                        <p className="text-white/60">&gt; Initiating automatic on-chain lockup protocol; calling GS DAP whitelisted pool lock...</p>
                      </>
                    )}
                    {automatedMarginState === 'executed' && (
                      <>
                        <p className="text-emerald-400 font-bold bg-emerald-950/30 px-1 py-0.5 rounded border border-emerald-900/30 w-fit">&gt; EXECUTED: Transferred 15,000 Mirrored MMF tokens to counterparty escrow (0x92f9a1).</p>
                        <p className="text-[#F27D26] font-bold">&gt; LEDGER STATE SYNCHRONIZED PERFECTLY: 24/7 AUTOMATED DVP SECURE</p>
                      </>
                    )}
                  </div>
                  
                  <div className="pt-2 border-t border-white/10 text-[9px] text-white/40 flex justify-between items-center uppercase tracking-widest">
                    <span>Smart Contract Status: {automatedMarginState.toUpperCase()}</span>
                    <span>Consensus Verifier: ACTIVE</span>
                  </div>
                </div>

              </div>
            </div>

          </motion.div>
        )}

        {/* TAB 4: THE BIGGER PICTURE & GVL */}
        {activeTab === 'gvl' && (
          <motion.div
            key="gvl-tab"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6 animate-fade-in"
          >
            {/* The Bigger Picture */}
            <div className="glass-card p-6 rounded-xl relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-br from-[#F27D26]/5 to-transparent blur-2xl pointer-events-none"></div>
              <h3 className="serif text-xl font-light text-white tracking-wide mb-3 flex items-center gap-2">
                <Globe className="w-5 h-5 text-[#F27D26]" />
                The Bigger Picture
              </h3>
              <p className="text-xs text-white/80 leading-relaxed font-light max-w-4xl">
                This initiative lays the groundwork for a more efficient, programmable, and globally connected financial system. Rather than creating isolated networks, Goldman Sachs and BNY Mellon are building crucial bridges to connect on-chain mobility directly with robust legal realities.
              </p>
            </div>

            {/* Future of Finance Essay */}
            <div className="glass-card p-6 rounded-xl relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-br from-[#F27D26]/5 to-transparent blur-2xl pointer-events-none"></div>
              <h3 className="serif text-lg font-light text-white tracking-wide mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#F27D26]" />
                Section 5. Future of Finance is Immense
              </h3>
              <div className="text-xs text-white/70 space-y-4 font-light leading-relaxed max-w-4xl">
                <p>
                  This initiative is not merely about new technology; it’s about building a bridge to the future of finance. Goldman Sachs and BNY Mellon have demonstrated that the path forward is not one of disruptive upheaval, but of thoughtful evolution.
                </p>
                <p>
                  By connecting the trusted world of traditional finance with the vast potential of digital assets, they have opened a gateway to a new era of capital efficiency and market innovation. The plumbing of the financial world is being rebuilt, and this project marks the moment the future began to flow through it.
                </p>
                <p className="text-[10px] text-white/40 italic pt-2 border-t border-white/5">
                  Disclaimer: This analysis is based on publicly available information. The information provided is for educational and informational purposes only and should not be construed as financial, legal, or investment advice.
                </p>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
