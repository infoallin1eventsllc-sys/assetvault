import React, { useState, useEffect } from 'react';
import { Shield, Terminal, Gavel, ArrowRight, ArrowLeft, Check, CheckCircle2, Play, AlertTriangle, FileText, Cpu } from 'lucide-react';
import { Asset, AssetType } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface TokenizeViewProps {
  onTokenizeAsset: (newAsset: Asset) => void;
}

export default function TokenizeView({ onTokenizeAsset }: TokenizeViewProps) {
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form States
  const [assetName, setAssetName] = useState('');
  const [assetType, setAssetType] = useState<AssetType>('Real Estate');
  const [valuation, setValuation] = useState('');
  const [tokenSupply, setTokenSupply] = useState('10000000');
  const [description, setDescription] = useState('');

  // Generated Mock Token ID
  const [draftTokenId, setDraftTokenId] = useState('AV-RE-2026-X11');

  // Deployment Steps
  const [deploymentLog, setDeploymentLog] = useState<string[]>([]);
  const [deploying, setDeploying] = useState(false);
  const [deployProgress, setDeployProgress] = useState(0);

  // Update Draft Token ID when form variables change
  useEffect(() => {
    const typeAbbr = 
      assetType === 'Real Estate' ? 'RE' : 
      assetType === 'Private Equity' ? 'PE' : 
      assetType === 'Commodities' ? 'CM' : 'IP';
    const num = Math.floor(100 + Math.random() * 900);
    setDraftTokenId(`AV-${typeAbbr}-2026-${num}`);
  }, [assetType]);

  // Handle Init - advance to step 2 (Compliance)
  const handleInitialize = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assetName.trim()) {
      alert('Please provide an Asset Legal Name.');
      return;
    }
    const valFloat = parseFloat(valuation);
    if (isNaN(valFloat) || valFloat <= 0) {
      alert('Please enter a valid estimated valuation.');
      return;
    }
    setCurrentStep(2);
  };

  // Run deployment simulation (Step 3)
  const startDeploymentSim = () => {
    setDeploying(true);
    setDeployProgress(0);
    setDeploymentLog([]);

    const logs = [
      '🚀 Initiating institutional token deployment protocol...',
      '🔐 Validating custody credentials under SOC2 compliance standard...',
      '📝 Formulating audited OpenZeppelin ERC-3643 smart contract template...',
      '🛠️ Compiling Solidity source code with optimization factor 200...',
      '🔍 Executing local EVM bytecode security audits...',
      '⛓️ Estimating network gas costs (Current base fee: 18 Gwei)...',
      '✍️ Appending legal metadata and regulatory bridge document links on-chain...',
      '💫 Broadasting signed smart contract transaction block height 195411...',
      '✨ Tokenization successfully completed. On-chain asset ledger deployed!'
    ];

    let index = 0;
    const interval = setInterval(() => {
      if (index < logs.length) {
        setDeploymentLog(prev => [...prev, logs[index]]);
        setDeployProgress(Math.min(100, Math.floor(((index + 1) / logs.length) * 100)));
        index++;
      } else {
        clearInterval(interval);
        setDeploying(false);

        // Deployment done, trigger callback to create the actual asset!
        const generatedAsset: Asset = {
          id: draftTokenId,
          name: assetName,
          type: assetType,
          valuation: parseFloat(valuation) || 10000000,
          supply: parseInt(tokenSupply) || 10000000,
          status: 'ACTIVE',
          image: 
            assetType === 'Real Estate'
              ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuCIE6s9B1qxcDEGWtD2D3eqonPtVwqi232O1-efXV1fun1ZbWAYlPMqQ-2OUaE0abwLa4dyfSipxsKiGAJe5FS55Ce9aRprFi3GRXkD_Dfg60iRAx0YM85twtm9bsXk0S5wPH500glpVo0CvhxmG0WW4VXf8G2HatTDn0YjyrXSey8s-m0CDs9W7w1w_T7AbBZLnPF29uF5UG_zRMe2peXPkgJxOI4oFuBhjZDTsmMUP0C3Zy-NyQGfu4_Lqz9EqV1LDlS-wLAcFS49'
              : 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3fDL5ewxBDoAIpC4XUgdz-rfx_fU5N7r6doSyNWZVqgLiNiB5gwq-w5RVpOigRlbdh6gGPxSVkfJApaals43K8Dqgv_Pqz7SKGJYcWQ7IOHQ6IBPlX4pZ9eCPtbbVSbRHcB8fpwgKNJbsSNcpRDw7v4J95nc6XrMXtYj37c59w5DZpvxVzgzYS2Ulu2f2muInjj5wIl8--osfz_E4C_AA8UZLTkiuY8Zg6QhYipklMfQyFNr6yMnHsUSP9hfLsp5u9W-jIGC7UKRe',
          performance: [10, 20, 30, 45, 60],
          description: description || `An institutional token representing ownership shares of ${assetName}. Fully vetted and secure.`,
          trend24h: 1.0,
          blockHeight: 195411,
        };

        onTokenizeAsset(generatedAsset);
      }
    }, 1100);
  };

  const resetForm = () => {
    setAssetName('');
    setAssetType('Real Estate');
    setValuation('');
    setTokenSupply('10000000');
    setDescription('');
    setDeploymentLog([]);
    setDeployProgress(0);
    setCurrentStep(1);
  };

  return (
    <div className="space-y-6">
      {/* Step Progress Indicator Header */}
      <div className="glass-card rounded-xl p-5 backdrop-blur-sm">
        <div className="flex items-center justify-between relative z-10 max-w-2xl mx-auto">
          
          {/* Step 1 */}
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={() => currentStep > 1 && !deploying && setCurrentStep(1)}
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-200 font-mono text-xs font-bold ${
                currentStep >= 1
                  ? 'border-[#F27D26] bg-[#F27D26] text-white shadow-lg shadow-[#F27D26]/20'
                  : 'border-white/10 bg-[#050505] text-white/40'
              }`}
            >
              01
            </button>
            <span className={`text-[10px] font-mono uppercase tracking-widest ${currentStep >= 1 ? 'text-[#F27D26] font-semibold' : 'text-white/40'}`}>
              Asset Details
            </span>
          </div>

          <div className={`flex-1 h-[1px] mx-4 -mt-5 transition-colors duration-300 ${currentStep >= 2 ? 'bg-[#F27D26]' : 'bg-white/10'}`}></div>

          {/* Step 2 */}
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={() => currentStep > 2 && !deploying && setCurrentStep(2)}
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-200 font-mono text-xs font-bold ${
                currentStep >= 2
                  ? 'border-[#F27D26] bg-[#F27D26] text-white shadow-lg shadow-[#F27D26]/20'
                  : 'border-white/10 bg-[#050505] text-white/40'
              }`}
            >
              02
            </button>
            <span className={`text-[10px] font-mono uppercase tracking-widest ${currentStep >= 2 ? 'text-[#F27D26] font-semibold' : 'text-white/40'}`}>
              Compliance
            </span>
          </div>

          <div className={`flex-1 h-[1px] mx-4 -mt-5 transition-colors duration-300 ${currentStep >= 3 ? 'bg-[#F27D26]' : 'bg-white/10'}`}></div>

          {/* Step 3 */}
          <div className="flex flex-col items-center gap-2">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-200 font-mono text-xs font-bold ${
                currentStep >= 3
                  ? 'border-[#F27D26] bg-[#F27D26] text-white shadow-lg shadow-[#F27D26]/20'
                  : 'border-white/10 bg-[#050505] text-white/40'
              }`}
            >
              03
            </div>
            <span className={`text-[10px] font-mono uppercase tracking-widest ${currentStep >= 3 ? 'text-[#F27D26] font-semibold' : 'text-white/40'}`}>
              Deployment
            </span>
          </div>

        </div>
      </div>

      {/* Main Multi-Step Form Layout */}
      <AnimatePresence mode="wait">
        
        {/* PHASE 1: ASSET IDENTIFICATION FORM */}
        {currentStep === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="glass-card rounded-xl p-6 relative overflow-hidden shadow-xl animate-fade-in">
              <h3 className="serif text-2xl font-light text-white tracking-wide mb-2">
                Phase I: Asset Identification
              </h3>
              <p className="text-xs text-white/50 mb-8 leading-relaxed max-w-3xl">
                Define the underlying physical or digital asset for tokenization. Accuracy here is critical for generating compliant smart contract models.
              </p>

              <form onSubmit={handleInitialize} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Legal Name */}
                <div className="flex flex-col gap-2">
                  <label className="micro-label">
                    Asset Legal Name
                  </label>
                  <input
                    type="text"
                    required
                    value={assetName}
                    onChange={(e) => setAssetName(e.target.value)}
                    placeholder="e.g. Skyline Plaza Real Estate"
                    className="bg-white/5 border-b-2 border-white/10 focus:border-[#F27D26] focus:ring-0 p-4 text-white text-sm font-semibold rounded-lg outline-none transition-colors"
                  />
                </div>

                {/* Classification dropdown */}
                <div className="flex flex-col gap-2">
                  <label className="micro-label">
                    Asset Classification
                  </label>
                  <select
                    value={assetType}
                    onChange={(e) => setAssetType(e.target.value as AssetType)}
                    className="bg-white/5 border-b-2 border-white/10 focus:border-[#F27D26] p-4 text-white text-sm font-semibold rounded-lg outline-none transition-colors"
                  >
                    <option value="Real Estate">Real Estate</option>
                    <option value="Commodities">Commodities</option>
                    <option value="Private Equity">Private Equity</option>
                    <option value="Intellectual Property">Intellectual Property</option>
                  </select>
                </div>

                {/* Valuation */}
                <div className="flex flex-col gap-2">
                  <label className="micro-label">
                    Estimated Valuation (USD)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-4 text-white/40 font-mono text-sm">$</span>
                    <input
                      type="number"
                      required
                      min="10000"
                      value={valuation}
                      onChange={(e) => setValuation(e.target.value)}
                      placeholder="e.g. 52000000"
                      className="w-full bg-white/5 border-b-2 border-white/10 focus:border-[#F27D26] p-4 pl-8 text-white text-sm font-mono rounded-lg outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Token supply limit */}
                <div className="flex flex-col gap-2">
                  <label className="micro-label">
                    Planned Token Supply
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      required
                      value={tokenSupply}
                      onChange={(e) => setTokenSupply(e.target.value)}
                      placeholder="e.g. 10000000"
                      className="w-full bg-white/5 border-b-2 border-white/10 focus:border-[#F27D26] p-4 text-white text-sm font-mono rounded-lg outline-none transition-colors"
                    />
                    <span className="absolute right-4 top-4 text-white/40 font-mono text-[10px] tracking-widest uppercase">
                      Tokens
                    </span>
                  </div>
                </div>

                {/* Asset Description */}
                <div className="col-span-1 md:col-span-2 flex flex-col gap-2">
                  <label className="micro-label">
                    Asset Legal Description
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide details about the physical custody, location, legal holding entity, and tax classification..."
                    className="bg-white/5 border border-white/10 focus:border-[#F27D26] p-4 text-white text-sm rounded-lg outline-none transition-all"
                  ></textarea>
                </div>

                {/* Submit Trigger */}
                <div className="col-span-1 md:col-span-2 flex justify-end pt-4">
                  <button
                    type="submit"
                    className="bg-[#F27D26] hover:bg-[#F27D26]/90 text-white font-semibold text-xs uppercase tracking-wider px-8 py-4 rounded-lg active:scale-95 transition-all flex items-center gap-3 shadow-lg cursor-pointer"
                  >
                    <span>Initialize Protocol</span>
                    <ArrowRight className="w-4.5 h-4.5" />
                  </button>
                </div>

              </form>

              {/* Dynamic Form Preview Card */}
              <div className="mt-12 p-6 border border-white/10 bg-white/5 rounded-xl flex flex-col md:flex-row gap-6 items-center">
                <div className="w-24 h-24 bg-white/5 rounded-lg flex items-center justify-center shrink-0 border border-white/10 overflow-hidden shadow-inner">
                  <img
                    className="w-full h-full object-cover grayscale opacity-60"
                    alt="Futuristic Real Estate"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIE6s9B1qxcDEGWtD2D3eqonPtVwqi232O1-efXV1fun1ZbWAYlPMqQ-2OUaE0abwLa4dyfSipxsKiGAJe5FS55Ce9aRprFi3GRXkD_Dfg60iRAx0YM85twtm9bsXk0S5wPH500glpVo0CvhxmG0WW4VXf8G2HatTDn0YjyrXSey8s-m0CDs9W7w1w_T7AbBZLnPF29uF5UG_zRMe2peXPkgJxOI4oFuBhjZDTsmMUP0C3Zy-NyQGfu4_Lqz9EqV1LDlS-wLAcFS49"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex-1 space-y-2.5 w-full">
                  <div className="flex justify-between items-center">
                    <span className="micro-label !text-[#F27D26]">
                      Drafting Token ID
                    </span>
                    <span className="font-mono text-xs text-white/50">
                      {draftTokenId}
                    </span>
                  </div>
                  <h4 className="serif text-xl tracking-wide text-white font-light truncate">
                    {assetName || 'Skyline Plaza Real Estate'}
                  </h4>
                  <div className="flex gap-4 text-xs text-white/50 flex-wrap">
                    <div className="flex items-center gap-1.5">
                      <Cpu className="w-4 h-4 text-white/40" />
                      <span>{parseFloat(tokenSupply).toLocaleString()} Supply</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Shield className="w-4 h-4 text-[#F27D26]" />
                      <span className="uppercase text-[10px] tracking-wider">Tier-1 Institutional Class</span>
                    </div>
                    {valuation && (
                      <div className="flex items-center gap-1.5 font-semibold text-white">
                        <span>Price per Token: ${(parseFloat(valuation) / parseFloat(tokenSupply)).toFixed(2)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* PHASE 2: COMPLIANCE ANALYSIS */}
        {currentStep === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="glass-card rounded-xl p-6 shadow-xl animate-fade-in">
              <h3 className="serif text-xl font-light text-white tracking-wide mb-2 flex items-center gap-2.5">
                <Gavel className="w-5 h-5 text-[#F27D26]" />
                Phase II: Compliance & Securities Verification
              </h3>
              <p className="text-xs text-white/50 mb-6">
                Institutional protocol mandates automated auditing before publishing deployment bytecodes.
              </p>

              {/* Checklist Items */}
              <div className="space-y-4 max-w-xl mx-auto py-4">
                
                <div className="flex gap-4 p-4 bg-white/5 border border-white/10 rounded-lg">
                  <div className="w-6 h-6 rounded-full bg-[#F27D26]/10 text-[#F27D26] border border-[#F27D26]/20 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="serif text-sm font-medium text-white tracking-wide">Securities Act Regulatory Vetting</h4>
                    <p className="text-[11px] text-white/40 mt-1">Asset classification aligns with standard SEC Howey limits for digital fractional asset products.</p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-white/5 border border-white/10 rounded-lg">
                  <div className="w-6 h-6 rounded-full bg-[#F27D26]/10 text-[#F27D26] border border-[#F27D26]/20 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="serif text-sm font-medium text-white tracking-wide">KYC/AML Oracle Validation</h4>
                    <p className="text-[11px] text-white/40 mt-1">Custodial bridge enforces continuous verify checks for institutional participants.</p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-white/5 border border-white/10 rounded-lg">
                  <div className="w-6 h-6 rounded-full bg-[#F27D26]/10 text-[#F27D26] border border-[#F27D26]/20 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="serif text-sm font-medium text-white tracking-wide">Legal Entity Title Verification</h4>
                    <p className="text-[11px] text-white/40 mt-1">Tax entity validation is mapped directly onto IPFS metadata references.</p>
                  </div>
                </div>

              </div>

              {/* Actions */}
              <div className="flex justify-between items-center pt-6 border-t border-white/10">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="px-5 py-2.5 bg-white/10 text-white/80 text-[11px] uppercase tracking-wider font-semibold rounded-lg hover:bg-white/15 flex items-center gap-2 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Details</span>
                </button>

                <button
                  onClick={() => setCurrentStep(3)}
                  className="px-6 py-2.5 bg-[#F27D26] text-white text-[11px] uppercase tracking-wider font-semibold rounded-lg hover:bg-[#F27D26]/90 flex items-center gap-2 cursor-pointer"
                >
                  <span>Approve & Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </motion.div>
        )}

        {/* PHASE 3: CONTRACT DEPLOYMENT TERMINAL */}
        {currentStep === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="glass-card rounded-xl p-6 shadow-xl animate-fade-in">
              <h3 className="serif text-xl font-light text-white tracking-wide mb-2 flex items-center gap-2.5">
                <Terminal className="w-5 h-5 text-[#F27D26]" />
                Phase III: Smart Contract Compiler & Onchain Deployment
              </h3>
              <p className="text-xs text-white/50 mb-6">
                Deploying verified token standard ERC-3643 onto the EVM ledger.
              </p>

              {/* Progress and Actions */}
              {!deploying && deploymentLog.length === 0 ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto text-[#F27D26] border border-white/10 animate-pulse">
                    <Terminal className="w-8 h-8" />
                  </div>
                  <div className="max-w-md mx-auto">
                    <h4 className="serif text-base font-light text-white tracking-wide">Ready for Deployment</h4>
                    <p className="text-xs text-white/40 mt-2 leading-relaxed">
                      Deploying <strong>{assetName}</strong> on-chain under ID <code className="text-[#F27D26]">{draftTokenId}</code>. This requires signing using standard node consensus keys.
                    </p>
                  </div>
                  <button
                    onClick={startDeploymentSim}
                    className="px-8 py-3.5 bg-[#F27D26] hover:bg-[#F27D26]/90 text-white font-semibold text-xs uppercase tracking-wider rounded-lg flex items-center gap-2 mx-auto shadow-md cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>Begin On-Chain Deployment</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Progress bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-white/40 uppercase tracking-wider text-[10px]">EVM Deployment Status</span>
                      <span className="text-[#F27D26] font-bold">{deployProgress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#F27D26] to-[#F27D26]/60 transition-all duration-300"
                        style={{ width: `${deployProgress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Terminal Log Console */}
                  <div className="bg-[#050505] border border-white/10 rounded-lg p-4 font-mono text-[11px] text-[#F27D26] space-y-2 h-64 overflow-y-auto shadow-inner">
                    {deploymentLog.map((log, idx) => (
                      <div key={idx} className="flex gap-2">
                        <span className="text-white/30 shrink-0">&gt;</span>
                        <p className="text-white/80">{log}</p>
                      </div>
                    ))}
                    {deploying && (
                      <div className="flex items-center gap-1.5 mt-2 text-white/40">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#F27D26] animate-ping"></span>
                        <span>Compiling bytecodes...</span>
                      </div>
                    )}
                  </div>

                  {/* Deployment Complete Success Banner */}
                  {deployProgress === 100 && (
                    <div className="p-4 bg-[#F27D26]/10 border border-[#F27D26]/20 rounded-lg text-white/90 flex items-center gap-3">
                      <CheckCircle2 className="w-6 h-6 text-[#F27D26] shrink-0" />
                      <div>
                        <h4 className="text-xs font-bold text-[#F27D26] uppercase tracking-widest">Ledger Deployed</h4>
                        <p className="text-[11px] text-white/50 mt-1 leading-relaxed">
                          Verification successfully finalized. The newly generated RWA fractional asset has been minted into physical institutional escrow and appended to the Asset inventory.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Complete button */}
                  {deployProgress === 100 && (
                    <div className="flex justify-end pt-4">
                      <button
                        onClick={resetForm}
                        className="px-6 py-2.5 bg-white/10 text-white/80 font-semibold text-xs uppercase tracking-wider rounded-lg hover:bg-white/15 transition-colors cursor-pointer"
                      >
                        Reset Engine & Create Another
                      </button>
                    </div>
                  )}

                </div>
              )}

            </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Network Architecture Diagram Section */}
      <div className="glass-card rounded-xl p-6 relative overflow-hidden shadow-xl animate-fade-in">
        <h3 className="serif text-xl font-light text-white tracking-wide mb-2">
          Network Architecture
        </h3>
        <p className="text-xs text-white/50 mb-6 leading-relaxed max-w-2xl">
          Detailed fund-flow bridge representing decentralized USD, USDC minting mechanisms, and USYC on-chain yields registered via Oracle feeds.
        </p>
        <div className="bg-[#050505] rounded-xl p-4 border border-white/10 overflow-hidden shadow-inner flex justify-center">
          <img
            alt="Network Architecture Fund Flow Diagram"
            className="w-full max-w-3xl h-auto rounded-lg object-contain bg-[#050505] grayscale brightness-95"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZkST3ep2e09ioQrBHz1pzN0Fr9cxx4l1POM292-vZfjM1Xo23DCbdT1t4jy_hhOwdKKG2DpIJP3rVFfJdkZFiAdwPEJudavjtjhHMck8O8J_U85YEIXsw1jFfKHeVRD_SMqKssSoDUH5lh7FKHE0okhEQA4DNwLa-BSnEuqS37Funra859nEBsn9j_EqwP3crWphs7o88pHI3BlajbhvTxHsuBcE052MY29WLzzrdTDwTDm7RG-7w_HGpfimB9gV_wifb084x0wcB"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Side Info Panel Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="glass-card p-6 rounded-xl flex flex-col gap-3 backdrop-blur-sm">
          <Shield className="w-8 h-8 text-[#F27D26]" />
          <h5 className="serif text-sm font-medium text-white tracking-wide">Institutional Custody</h5>
          <p className="text-xs text-white/50 leading-relaxed">
            All physical title holdings and commodity reserve bars undergo institutional verification through SOC2 compliant, cryptographically protected vaults.
          </p>
        </div>

        <div className="glass-card p-6 rounded-xl flex flex-col gap-3 backdrop-blur-sm">
          <Cpu className="w-8 h-8 text-[#F27D26]" />
          <h5 className="serif text-sm font-medium text-white tracking-wide">Smart Deployment</h5>
          <p className="text-xs text-white/50 leading-relaxed">
            Automatic ERC-3643 bytecodes generation using rigorously audited OpenZeppelin standard libraries, protecting micro-issuances against vector vulnerabilities.
          </p>
        </div>

        <div className="glass-card p-6 rounded-xl flex flex-col gap-3 backdrop-blur-sm">
          <Gavel className="w-8 h-8 text-[#F27D26]" />
          <h5 className="serif text-sm font-medium text-white tracking-wide">Regulatory Bridge</h5>
          <p className="text-xs text-white/50 leading-relaxed">
            Directly link verifiable tax assets and SEC disclosure filing documents to immutable metadata headers, ensuring end-to-end audit compliance.
          </p>
        </div>

      </div>

    </div>
  );
}
