import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Users, Search, FileText, CheckCircle2, XCircle, 
  ArrowRight, Lock, RefreshCw, Sliders, Database, Check, 
  Activity, Building2, ExternalLink, ShieldAlert, Cpu
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MultiSigTx {
  id: string;
  type: 'MINT' | 'TRANSFER' | 'WHITELIST' | 'BURN';
  target: string;
  amount?: string;
  requiredSigs: number;
  currentSigs: string[];
  status: 'PENDING' | 'EXECUTED' | 'FAILED';
  date: string;
}

const INITIAL_MULTISIG_TXS: MultiSigTx[] = [
  {
    id: 'TX-MS-8812',
    type: 'MINT',
    target: 'GS DAP® BNY Mellon Mirrored MMF',
    amount: '$15,000,000.00 MMF-TKN',
    requiredSigs: 3,
    currentSigs: ['CFO Key (0x92f1...)', 'Auditor Key (0xe5c3...)'],
    status: 'PENDING',
    date: 'July 18, 2026 15:42'
  },
  {
    id: 'TX-MS-8810',
    type: 'WHITELIST',
    target: 'J.P. Morgan Custody Hub (0x3fa1...c10b)',
    requiredSigs: 2,
    currentSigs: ['Compliance Key (0xa391...)', 'AML Oracle (0x59b2...)'],
    status: 'EXECUTED',
    date: 'July 18, 2026 12:15'
  },
  {
    id: 'TX-MS-8814',
    type: 'TRANSFER',
    target: 'Goldman Sachs DAP Treasury (0xee71...ab89)',
    amount: '$45,000,000.00 MMF-TKN',
    requiredSigs: 3,
    currentSigs: [],
    status: 'PENDING',
    date: 'July 18, 2026 21:05'
  }
];

export default function TreasuryView() {
  const [activeTab, setActiveTab] = useState<'multisig' | 'kyc' | 'por' | 'sweep'>('multisig');
  const [txs, setTxs] = useState<MultiSigTx[]>(INITIAL_MULTISIG_TXS);
  
  // KYC / AML States
  const [kycAddress, setKycAddress] = useState('');
  const [kycLoading, setKycLoading] = useState(false);
  const [kycAlertMessage, setKycAlertMessage] = useState<string | null>(null);
  const [kycResult, setKycResult] = useState<{
    status: 'APPROVED' | 'REJECTED' | 'NONE';
    score: number;
    entity?: string;
    reason?: string;
    details?: string[];
  }>({ status: 'NONE', score: 0 });

  // Proof of Reserves States
  const [porVerifying, setPorVerifying] = useState(false);
  const [porRoot, setPorRoot] = useState<string | null>(null);
  const [porTimestamp, setPorTimestamp] = useState<string | null>(null);

  // Sweep States
  const [sweepThreshold, setSweepThreshold] = useState<number>(1000000);
  const [sweepActive, setSweepActive] = useState<boolean>(true);
  const [operatingCash, setOperatingCash] = useState<number>(1450000);
  const [sweepLogs, setSweepLogs] = useState<string[]>([
    'System initialized with 5% target yield.',
    'Threshold parameter configured for $1,000,000 USD maximum oper cash.'
  ]);

  // Terminal Console Logs for Multi-Sig
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    '🔒 Treasury Vault Node initialized successfully.',
    '📡 Syncing multi-signature queue state with EVM cluster...'
  ]);

  // Handle Multi-sig sign action
  const handleSign = (txId: string, role: string) => {
    setTxs(prev => prev.map(tx => {
      if (tx.id === txId) {
        const signature = `${role} Key (${Math.random().toString(16).substr(2, 6)})`;
        const updatedSigs = [...tx.currentSigs, signature];
        const updatedStatus = updatedSigs.length >= tx.requiredSigs ? 'EXECUTED' : 'PENDING';
        
        // Log transaction progress
        setConsoleLogs(prevLogs => [
          ...prevLogs,
          `✍️ Signed Tx ${txId} using authorized ${role} credentials.`,
          ...(updatedStatus === 'EXECUTED' 
            ? [`🚀 Tx ${txId} reached consensus (${updatedSigs.length}/${tx.requiredSigs}). Broadasting state mutation...`, `✅ Transaction executed. Block Height: #195425`] 
            : [])
        ]);

        return {
          ...tx,
          currentSigs: updatedSigs,
          status: updatedStatus
        };
      }
      return tx;
    }));
  };

  // Run KYC screening simulator
  const runScreening = (e: React.FormEvent) => {
    e.preventDefault();
    if (!kycAddress.trim()) return;

    setKycLoading(true);
    setKycAlertMessage(null);
    setKycResult({ status: 'NONE', score: 0 });

    setTimeout(() => {
      const isOfacSanctioned = 
        kycAddress.toLowerCase().includes('ofac') || 
        kycAddress.toLowerCase().includes('0x666') ||
        kycAddress.trim() === '0x3fa1c28f96e41b99a38ef2fca9b63c8123abc666';

      const isKnownPartner = 
        kycAddress.toLowerCase().includes('jpm') || 
        kycAddress.toLowerCase().includes('citi') || 
        kycAddress.toLowerCase().includes('goldman') || 
        kycAddress.toLowerCase().includes('0x3f');

      if (isOfacSanctioned) {
        setKycResult({
          status: 'REJECTED',
          score: 98,
          entity: 'SDN LIST / OFAC CRITICAL MATCH',
          reason: 'Sanctioned Address (Associated with blocked geographic location or money laundering entity).',
          details: [
            'OFAC SDN Listing reference check: MATCH FOUND',
            'Transaction tracing: HIGH INTERCONNECTION TO BLOCKED PROTOCOLS',
            'KYC verification status: REVOKED'
          ]
        });
      } else if (isKnownPartner) {
        setKycResult({
          status: 'APPROVED',
          score: 2,
          entity: 'J.P. MORGAN CUSTODIAL HUB',
          reason: 'Verified Tier-1 Institutional counterparty with active SOC2 attestation.',
          details: [
            'Oracle certificate: VALID_UNTIL_2027',
            'Compliance flag: REGULATED_FINANCIAL_INSTITUTION',
            'Risk profiling: ZERO SANCTIONS LINKED'
          ]
        });
      } else {
        // Random standard EVM whitelist audit
        const randomScore = Math.floor(Math.random() * 15) + 3;
        setKycResult({
          status: 'APPROVED',
          score: randomScore,
          entity: 'Verified Retail/Institutional Participant',
          reason: 'No sanctions database match found. Address clear for compliant trade activities.',
          details: [
            'Address risk level audit completed',
            'OFAC & SDN database check: NO CONSTRAINTS FOUND',
            'Compliance registration threshold: WHIPPED_SUCCESSFULLY'
          ]
        });
      }
      setKycLoading(false);
    }, 1500);
  };

  // Generate proof of reserves
  const runMerkleProof = () => {
    setPorVerifying(true);
    setTimeout(() => {
      const root = '0x' + Math.random().toString(16).substr(2, 40);
      setPorRoot(root);
      setPorTimestamp(new Date().toUTCString());
      setPorVerifying(false);
    }, 2000);
  };

  // Sweep Simulator Trigger
  const triggerSweepTest = () => {
    const surplus = operatingCash - sweepThreshold;
    if (surplus <= 0) {
      setSweepLogs(prev => [
        ...prev,
        `⚠️ Sweep bypassed: Operating cash ($${operatingCash.toLocaleString()}) does not exceed configured threshold ($${sweepThreshold.toLocaleString()}).`
      ]);
      return;
    }

    setSweepLogs(prev => [
      ...prev,
      `🔄 Initiating automated cash sweep protocol...`,
      `💵 Moving surplus operational funds ($${surplus.toLocaleString()} USD)...`,
      `⚡ Interfacing with GS DAP® BNY Mellon Mirrored MMF gateway...`,
      `✓ Swept $${surplus.toLocaleString()} operational cash successfully. Minted equal yield-bearing MMF Tokens.`,
      `📈 Accruing yield at current target rate (5.15% APY).`
    ]);

    setOperatingCash(sweepThreshold);
  };

  return (
    <div className="space-y-6">
      
      {/* View Header */}
      <div className="glass-card rounded-xl p-6 relative overflow-hidden shadow-xl animate-fade-in">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#F27D26]/15 to-transparent blur-3xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="micro-label !text-[#F27D26]">Enterprise Compliance Workspace</span>
            <h2 className="serif text-3xl font-light text-white tracking-wide mt-2">
              Institutional Treasury Suite
            </h2>
            <p className="text-xs text-white/50 mt-1 max-w-3xl leading-relaxed">
              Equipping Fortune 500 treasurers with dual-authorized multi-signature controls, 
              automated operating sweeps, real-time sanctions whitelisting, and continuous cryptographic reserve audits.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2.5 rounded-lg shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F27D26] animate-pulse"></span>
            <span className="text-[10px] font-mono tracking-widest uppercase text-white/80">SEC COMPLIANT NODE</span>
          </div>
        </div>
      </div>

      {/* Primary Navigation Tabs */}
      <div className="flex bg-white/5 border border-white/10 p-1.5 rounded-xl gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('multisig')}
          className={`flex-1 min-w-[150px] px-4 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2.5 ${
            activeTab === 'multisig' ? 'bg-[#F27D26] text-white shadow-md' : 'text-white/40 hover:text-white hover:bg-white/5'
          }`}
        >
          <Users className="w-4.5 h-4.5" />
          <span>Multi-Sig Controls</span>
        </button>

        <button
          onClick={() => setActiveTab('kyc')}
          className={`flex-1 min-w-[150px] px-4 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2.5 ${
            activeTab === 'kyc' ? 'bg-[#F27D26] text-white shadow-md' : 'text-white/40 hover:text-white hover:bg-white/5'
          }`}
        >
          <ShieldCheck className="w-4.5 h-4.5" />
          <span>Sanctions Oracle</span>
        </button>

        <button
          onClick={() => setActiveTab('por')}
          className={`flex-1 min-w-[150px] px-4 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2.5 ${
            activeTab === 'por' ? 'bg-[#F27D26] text-white shadow-md' : 'text-white/40 hover:text-white hover:bg-white/5'
          }`}
        >
          <Database className="w-4.5 h-4.5" />
          <span>Proof of Reserves</span>
        </button>

        <button
          onClick={() => setActiveTab('sweep')}
          className={`flex-1 min-w-[150px] px-4 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2.5 ${
            activeTab === 'sweep' ? 'bg-[#F27D26] text-white shadow-md' : 'text-white/40 hover:text-white hover:bg-white/5'
          }`}
        >
          <Activity className="w-4.5 h-4.5" />
          <span>Treasury Sweeps</span>
        </button>
      </div>

      {/* Tabs Content Router */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          
          {/* TAB 1: MULTI-SIG CONTROLS */}
          {activeTab === 'multisig' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Active Multi-Sig Queue */}
              <div className="lg:col-span-2 glass-card rounded-xl p-6 space-y-6">
                <div>
                  <h3 className="serif text-xl font-light text-white tracking-wide">
                    Pending Treasury Operations Queue
                  </h3>
                  <p className="text-xs text-white/50 mt-1">
                    Multi-party authorization workflow required before ledger mutation deployment.
                  </p>
                </div>

                <div className="space-y-4">
                  {txs.map((tx) => (
                    <div 
                      key={tx.id}
                      className={`p-5 rounded-xl border bg-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:border-white/15 ${
                        tx.status === 'EXECUTED' ? 'border-emerald-500/10' : 'border-white/10'
                      }`}
                    >
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs font-bold text-[#F27D26] bg-[#F27D26]/10 px-2 py-0.5 rounded border border-[#F27D26]/20">
                            {tx.type}
                          </span>
                          <span className="font-mono text-xs text-white/40">{tx.id}</span>
                          <span className="text-[10px] text-white/30">{tx.date}</span>
                        </div>
                        <h4 className="serif text-sm text-white tracking-wide">{tx.target}</h4>
                        {tx.amount && (
                          <p className="font-mono text-xs text-white/70">
                            Volume: <span className="text-[#F27D26] font-bold">{tx.amount}</span>
                          </p>
                        )}
                        
                        {/* Signature Progress Pill */}
                        <div className="pt-2">
                          <div className="flex justify-between text-[10px] font-mono text-white/40 mb-1">
                            <span>Sigs Gathered ({tx.currentSigs.length}/{tx.requiredSigs})</span>
                            <span className="uppercase text-[#F27D26] font-bold">Consensus Needed</span>
                          </div>
                          <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden flex gap-1">
                            {Array.from({ length: tx.requiredSigs }).map((_, i) => (
                              <div 
                                key={i}
                                className={`h-full flex-1 rounded-sm ${
                                  i < tx.currentSigs.length ? 'bg-[#F27D26]' : 'bg-white/10'
                                }`}
                              ></div>
                            ))}
                          </div>
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {tx.currentSigs.map((sig, i) => (
                              <span key={i} className="text-[9px] font-mono bg-white/5 border border-white/10 px-2 py-0.5 rounded text-white/60">
                                ✓ {sig}
                              </span>
                            ))}
                            {tx.currentSigs.length === 0 && (
                              <span className="text-[9px] font-mono text-white/30 italic">No signatures provided yet.</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Signature controls */}
                      <div className="shrink-0 flex md:flex-col gap-2 justify-end">
                        {tx.status === 'PENDING' ? (
                          <>
                            {!tx.currentSigs.some(s => s.startsWith('CFO')) && (
                              <button
                                onClick={() => handleSign(tx.id, 'CFO')}
                                className="px-3.5 py-1.5 bg-white/5 hover:bg-[#F27D26] text-white hover:text-white transition-all text-[10px] font-mono font-bold uppercase tracking-wider rounded-lg border border-white/10 hover:border-[#F27D26] cursor-pointer"
                              >
                                Sign as CFO
                              </button>
                            )}
                            {!tx.currentSigs.some(s => s.startsWith('Legal')) && (
                              <button
                                onClick={() => handleSign(tx.id, 'Legal')}
                                className="px-3.5 py-1.5 bg-white/5 hover:bg-[#F27D26] text-white hover:text-white transition-all text-[10px] font-mono font-bold uppercase tracking-wider rounded-lg border border-white/10 hover:border-[#F27D26] cursor-pointer"
                              >
                                Sign as Legal
                              </button>
                            )}
                          </>
                        ) : (
                          <div className="px-3.5 py-1.5 bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-bold uppercase tracking-wider rounded-lg border border-emerald-500/20 flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Executed</span>
                          </div>
                        )}
                      </div>

                    </div>
                  ))}
                </div>
              </div>

              {/* Console node log panel */}
              <div className="glass-card rounded-xl p-6 flex flex-col justify-between h-fit">
                <div className="space-y-4">
                  <h3 className="serif text-base font-light text-white tracking-widest uppercase flex items-center gap-2">
                    <Lock className="w-4 h-4 text-[#F27D26]" />
                    Node Consensus Log
                  </h3>
                  <div className="bg-black/90 p-4 border border-white/10 rounded-lg font-mono text-[10px] text-[#F27D26]/90 space-y-2 h-[320px] overflow-y-auto shadow-inner custom-scrollbar">
                    {consoleLogs.map((log, i) => (
                      <div key={i} className="flex gap-2 leading-relaxed">
                        <span className="text-white/30 shrink-0">&gt;</span>
                        <p>{log}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pt-4 border-t border-white/5 text-[10px] text-white/40 leading-relaxed mt-4">
                  Multi-Sig nodes operate under independent corporate proxy credentials meeting SOC2 criteria.
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: SANCTIONS ORACLE */}
          {activeTab === 'kyc' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              
              {/* Lookup and Validator form */}
              <div className="lg:col-span-5 glass-card rounded-xl p-6 flex flex-col justify-between space-y-6">
                <div className="space-y-2">
                  <h3 className="serif text-xl font-light text-white tracking-wide">
                    AML/OFAC Realtime Whitelist Oracle
                  </h3>
                  <p className="text-xs text-white/50 leading-relaxed">
                    Corporate on-chain assets are restricted to verified, non-sanctioned wallet nodes. Verify counterparty standing below.
                  </p>
                </div>

                <form onSubmit={runScreening} className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <label className="micro-label">Counterparty EVM Wallet Address</label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          required
                          value={kycAddress}
                          onChange={(e) => setKycAddress(e.target.value)}
                          placeholder="Enter address e.g. 0x71C3... or search shortcuts"
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white outline-none focus:border-[#F27D26]"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={kycLoading}
                        className="bg-[#F27D26] hover:bg-[#F27D26]/90 text-white font-semibold text-xs uppercase tracking-wider px-4 py-2.5 rounded-lg active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                      >
                        {kycLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
                        <span>Audit</span>
                      </button>
                    </div>
                  </div>

                  {/* Preset Shortcuts */}
                  <div className="space-y-2 pt-2">
                    <span className="micro-label">Quick Partner Templates</span>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => setKycAddress('JPM Custody Hub (0x3fa1c28f96e41b99a38ef2fca9b63c812c10b)')}
                        className="text-[9px] font-mono bg-white/5 hover:bg-[#F27D26]/15 hover:text-white border border-white/10 rounded px-2.5 py-1 text-white/60 transition-colors"
                      >
                        JPM Custody
                      </button>
                      <button
                        type="button"
                        onClick={() => setKycAddress('Citi Liquidity (0x7f10b28f96e41b99a38ef2fca9b63c812c3f8e91)')}
                        className="text-[9px] font-mono bg-white/5 hover:bg-[#F27D26]/15 hover:text-white border border-white/10 rounded px-2.5 py-1 text-white/60 transition-colors"
                      >
                        Citi Bank
                      </button>
                      <button
                        type="button"
                        onClick={() => setKycAddress('OFAC Blocklist (0x3fa1c28f96e41b99a38ef2fca9b63c8123abc666)')}
                        className="text-[9px] font-mono bg-red-500/5 hover:bg-red-500/15 text-red-400 border border-red-500/20 rounded px-2.5 py-1 transition-colors"
                      >
                        OFAC Blocklist
                      </button>
                    </div>
                  </div>
                </form>

                <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-[11px] text-white/50 leading-relaxed">
                  Screening connects to <strong>Chainlink Decentralized Oracle Networks</strong> query feeds that mirror the US Department of Treasury SDN (Specially Designated Nationals) updates in real-time.
                </div>
              </div>

              {/* Verification Results Panel */}
              <div className="lg:col-span-7 glass-card rounded-xl p-6 flex flex-col justify-between">
                <div>
                  <h3 className="serif text-lg font-light text-white tracking-wide mb-4">
                    Audit Attestation Report
                  </h3>

                  <AnimatePresence mode="wait">
                    {kycLoading ? (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="py-12 flex flex-col items-center gap-3 text-center"
                      >
                        <RefreshCw className="w-8 h-8 text-[#F27D26] animate-spin" />
                        <p className="font-mono text-xs text-white/40 uppercase tracking-widest animate-pulse">Running sanctions screening trace...</p>
                      </motion.div>
                    ) : kycResult.status !== 'NONE' ? (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                      >
                        {/* Status Header Badge */}
                        <div className={`p-4 rounded-lg flex items-center justify-between gap-4 border ${
                          kycResult.status === 'APPROVED' 
                            ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400' 
                            : 'bg-red-500/5 border-red-500/20 text-red-400'
                        }`}>
                          <div className="flex items-center gap-3">
                            {kycResult.status === 'APPROVED' ? (
                              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                            ) : (
                              <ShieldAlert className="w-6 h-6 text-red-400" />
                            )}
                            <div>
                              <h4 className="text-xs font-bold uppercase tracking-wider">{kycResult.entity}</h4>
                              <p className="text-[10px] text-white/50 mt-0.5">{kycResult.reason}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-[10px] font-mono uppercase text-white/40 block">Risk Score</span>
                            <span className="font-mono text-lg font-bold">{kycResult.score}/100</span>
                          </div>
                        </div>

                        {/* Audit Details */}
                        <div className="space-y-2">
                          <span className="micro-label">Detailed Compliance Vitals</span>
                          <div className="bg-black/40 border border-white/5 rounded-lg p-3.5 space-y-2 font-mono text-[11px] text-white/70">
                            {kycResult.details?.map((detail, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#F27D26]"></span>
                                <span>{detail}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="py-12 text-center text-white/30 text-xs italic">
                        Input a wallet address and trigger audit to fetch sanctions and risk screening report.
                      </div>
                    )}
                  </AnimatePresence>
                </div>

                {kycResult.status === 'APPROVED' && (
                  <div className="mt-6 pt-4 border-t border-white/5 space-y-3">
                    {kycAlertMessage && (
                      <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono rounded-lg flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        <span>{kycAlertMessage}</span>
                      </div>
                    )}
                    <div className="flex justify-end">
                      <button
                        onClick={() => {
                          setConsoleLogs(prev => [
                            ...prev,
                            `✓ whitelisted counterparty: ${kycAddress.substring(0, 15)}...`,
                            `🛰️ Broadcast whitelist rule to security oracle controllers.`
                          ]);
                          setKycAlertMessage('Address successfully whitelisted inside ERC-3643 Securities Rules.');
                        }}
                        className="px-5 py-2 bg-[#F27D26] hover:bg-[#F27D26]/90 text-white font-semibold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                      >
                        Update Compliance Whitelist
                      </button>
                    </div>
                  </div>
                )}

              </div>

            </div>
          )}

          {/* TAB 3: PROOF OF RESERVES */}
          {activeTab === 'por' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Asset Backing Verification */}
              <div className="md:col-span-2 glass-card rounded-xl p-6 space-y-6">
                <div className="flex justify-between items-start flex-wrap gap-2">
                  <div>
                    <h3 className="serif text-xl font-light text-white tracking-wide">
                      Real-time Cryptographic Asset Attestation
                    </h3>
                    <p className="text-xs text-white/50 mt-1">
                      Proof of Reserves (PoR) establishes that circulating onchain tokens are fully backed 1:1 by traditional assets in secure custody.
                    </p>
                  </div>
                  <button
                    onClick={runMerkleProof}
                    disabled={porVerifying}
                    className="bg-[#F27D26] hover:bg-[#F27D26]/90 text-white font-semibold text-xs uppercase tracking-wider px-5 py-2.5 rounded-lg active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    {porVerifying ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Cpu className="w-3.5 h-3.5" />}
                    <span>{porVerifying ? 'Verifying...' : 'Audit reserves root'}</span>
                  </button>
                </div>

                {/* Backing Ratio Chart visual */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-xl text-center space-y-1">
                    <span className="micro-label">Total Outstanding Debt</span>
                    <p className="serif text-lg font-light text-white">$1,120,400,000</p>
                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">Total Token Supply</span>
                  </div>
                  
                  <div className="bg-white/5 border border-white/10 p-4 rounded-xl text-center space-y-1">
                    <span className="micro-label">Custodied Asset Value</span>
                    <p className="serif text-lg font-light text-[#F27D26] font-semibold">$1,121,950,000</p>
                    <span className="text-[10px] font-mono text-[#F27D26] uppercase tracking-widest block font-bold">1:1 Backed</span>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-4 rounded-xl text-center space-y-1">
                    <span className="micro-label">Collateralization Ratio</span>
                    <p className="serif text-lg font-light text-emerald-400 font-semibold">100.14%</p>
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block font-bold">Overcollateralized</span>
                  </div>
                </div>

                {/* Attestation details report */}
                <AnimatePresence mode="wait">
                  {porRoot && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-5 bg-emerald-500/5 border border-emerald-500/20 rounded-xl space-y-3.5"
                    >
                      <div className="flex justify-between items-center">
                        <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 shrink-0" />
                          Onchain Merkle Tree Attestation Verified
                        </h4>
                        <span className="text-[9px] font-mono text-white/40">{porTimestamp}</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-[10px] text-white/70">
                        <div className="space-y-1">
                          <span className="text-white/40 uppercase tracking-wider block">Cryptographic Merkle Root Hash</span>
                          <p className="text-white bg-black/40 p-2 rounded truncate border border-white/5 text-xs text-[#F27D26] font-bold">
                            {porRoot}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <span className="text-white/40 uppercase tracking-wider block">Independent Audit Certificate ID</span>
                          <p className="text-white bg-black/40 p-2 rounded border border-white/5 text-xs text-white/80">
                            EY-POR-VAL-2026-9921
                          </p>
                        </div>
                      </div>
                      <p className="text-[10px] text-white/40 leading-relaxed italic">
                        The Merkle Root is recursively computed based on individual client wallet balance leaves. Re-verifying proves that the asset custodian (BNY Mellon) possesses the required backing assets matching the circulating token ledger exactly.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>

              {/* Custodian Partners Card */}
              <div className="glass-card rounded-xl p-6 flex flex-col justify-between h-fit">
                <div className="space-y-4">
                  <h3 className="serif text-base font-light text-white tracking-widest uppercase flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-[#F27D26]" />
                    Audit Custodians
                  </h3>
                  <div className="space-y-3">
                    
                    <div className="p-3 bg-white/5 border border-white/10 rounded-lg flex items-center justify-between">
                      <div>
                        <h5 className="font-bold text-xs uppercase tracking-wide text-white">BNY Mellon Custody</h5>
                        <p className="text-[10px] text-white/40 mt-0.5">MMF Cash & Treasuries</p>
                      </div>
                      <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 font-bold uppercase tracking-widest">
                        verified
                      </span>
                    </div>

                    <div className="p-3 bg-white/5 border border-white/10 rounded-lg flex items-center justify-between">
                      <div>
                        <h5 className="font-bold text-xs uppercase tracking-wide text-white">Brinks Vaults Co.</h5>
                        <p className="text-[10px] text-white/40 mt-0.5">Physical Gold Bullion</p>
                      </div>
                      <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 font-bold uppercase tracking-widest">
                        verified
                      </span>
                    </div>

                    <div className="p-3 bg-white/5 border border-white/10 rounded-lg flex items-center justify-between">
                      <div>
                        <h5 className="font-bold text-xs uppercase tracking-wide text-white">Ernst & Young LL.P.</h5>
                        <p className="text-[10px] text-white/40 mt-0.5">Attestation Assurances</p>
                      </div>
                      <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 font-bold uppercase tracking-widest">
                        attested
                      </span>
                    </div>

                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 mt-6 text-[10px] text-white/40 font-mono tracking-widest uppercase flex items-center gap-1">
                  <Database className="w-3.5 h-3.5 text-[#F27D26]" />
                  <span>Oracle Attestation Live</span>
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: TREASURY CASH SWEEPS */}
          {activeTab === 'sweep' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Cash Sweep Rule Configurator */}
              <div className="lg:col-span-2 glass-card rounded-xl p-6 space-y-6">
                <div>
                  <h3 className="serif text-xl font-light text-white tracking-wide">
                    Automated Corporate MMF Sweep Rules
                  </h3>
                  <p className="text-xs text-white/50 mt-1">
                    Sweep idle operational operational cash above your target threshold limit into yield-accruing mirrored Money Market Funds (MMFs).
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Balance details */}
                  <div className="space-y-4">
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-1">
                      <span className="micro-label">Operational Cash Account Balance</span>
                      <p className="serif text-2xl font-light text-white">${operatingCash.toLocaleString()} USD</p>
                      <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">Bank Accounts Sweep Target</span>
                    </div>

                    <div className="flex justify-between items-center p-3.5 bg-white/5 border border-white/10 rounded-xl text-xs">
                      <span className="text-white/60 uppercase tracking-wider text-[10px] font-bold">Auto Sweep Engine</span>
                      <button 
                        onClick={() => setSweepActive(!sweepActive)}
                        className={`px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest rounded-lg cursor-pointer transition-colors ${
                          sweepActive ? 'bg-[#F27D26] text-white' : 'bg-white/10 text-white/40'
                        }`}
                      >
                        {sweepActive ? 'ACTIVE' : 'INACTIVE'}
                      </button>
                    </div>
                  </div>

                  {/* Threshold Parameter Slider */}
                  <div className="space-y-4 bg-white/5 p-4 rounded-xl border border-white/10 flex flex-col justify-between">
                    <div className="space-y-1">
                      <span className="micro-label">Max Operational Cash Limit</span>
                      <p className="serif text-2xl font-light text-[#F27D26] font-semibold">${sweepThreshold.toLocaleString()} USD</p>
                      <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest block">Amounts above are automatically swept</span>
                    </div>

                    <div className="pt-2">
                      <input 
                        type="range"
                        min="500000"
                        max="2000000"
                        step="100000"
                        value={sweepThreshold}
                        onChange={(e) => setSweepThreshold(parseInt(e.target.value))}
                        className="w-full accent-[#F27D26] cursor-pointer"
                      />
                      <div className="flex justify-between text-[9px] font-mono text-white/40 mt-1">
                        <span>$500k USD</span>
                        <span>$2M USD</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Sweep Actions */}
                <div className="pt-4 border-t border-white/10 flex justify-between items-center flex-wrap gap-2">
                  <div className="text-[11px] text-white/40 leading-relaxed italic">
                    Configured with <strong>GS DAP® BNY Mellon Mirrored MMF (GS-DAP-BNY-001)</strong> paying <strong>5.15% APY</strong>.
                  </div>
                  <button
                    onClick={triggerSweepTest}
                    className="bg-[#F27D26] hover:bg-[#F27D26]/90 text-white font-semibold text-xs uppercase tracking-wider px-6 py-2.5 rounded-lg active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <Activity className="w-4 h-4" />
                    <span>Run Automated Sweep Test</span>
                  </button>
                </div>

              </div>

              {/* Sweep Logs console */}
              <div className="glass-card rounded-xl p-6 flex flex-col justify-between h-fit">
                <div className="space-y-4">
                  <h3 className="serif text-base font-light text-white tracking-widest uppercase flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-[#F27D26]" />
                    MMF Sweep Node Console
                  </h3>
                  <div className="bg-black/90 p-4 border border-white/10 rounded-lg font-mono text-[10px] text-white/70 space-y-2 h-[220px] overflow-y-auto shadow-inner custom-scrollbar">
                    {sweepLogs.map((log, i) => (
                      <div key={i} className="flex gap-2 leading-relaxed">
                        <span className="text-[#F27D26] shrink-0">&gt;</span>
                        <p className="text-white/80">{log}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 mt-4 text-[10px] text-white/40 leading-relaxed">
                  Daily sweeps occur at 16:00 EST close of BNY Mellon ledger. Verified node settlement credits accrual occurs.
                </div>
              </div>

            </div>
          )}

        </motion.div>
      </AnimatePresence>

    </div>
  );
}
