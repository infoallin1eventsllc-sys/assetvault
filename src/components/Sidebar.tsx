import React from 'react';
import { LayoutGrid, Coins, TrendingUp, Briefcase, ShieldCheck, Layers } from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  setTab: (tab: string) => void;
}

export default function Sidebar({ currentTab, setTab }: SidebarProps) {
  const menuItems = [
    { id: 'overview', label: 'Asset Overview', icon: LayoutGrid },
    { id: 'mirrored-model', label: 'Mirrored Model', icon: Layers },
    { id: 'tokenize', label: 'Token Engine', icon: Coins },
    { id: 'treasury', label: 'Treasury Suite', icon: ShieldCheck },
    { id: 'analytics', label: 'Market Analytics', icon: TrendingUp },
    { id: 'portfolio', label: 'My Portfolio', icon: Briefcase },
  ];

  return (
    <aside className="hidden md:flex flex-col h-screen p-6 gap-6 bg-[#050505] border-r border-white/10 w-64 fixed left-0 top-0 z-30">
      {/* Brand Header */}
      <div className="flex items-center gap-3 px-1 mb-8 mt-2 cursor-pointer" onClick={() => setTab('overview')}>
        <img
          alt="AssetVault Logo"
          className="w-8 h-8 object-contain brightness-110 filter hue-rotate-[20deg]"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_yKFAFbg6eaEND0imxNEyRPiCcqut7uE3asPGeauIEueM5XhBJkXJ4v33uyPpOR5Msga6FF5rGgUruYHHOkYEhoZYByRf8fy7ZK8GGqME4hP876VLZyNwSirpF_HmtEHnF0o9QJW_jZR2mn3egQIidPHKhT7Y6IdLHDpDTZ-5usWnkUyF5HVFKWn1vNt1CFt7dg7X30XRuripnn1gN6cPHj515b2wKZ94ia1_g1z9tsIbJpMLoH2FBSwq5P_yiOgSEhapnKOd9jUJ"
        />
        <span className="serif text-xl tracking-widest text-[#F27D26] uppercase font-medium">
          ASSETVAULT
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-1.5 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`flex items-center gap-3 w-full px-4 py-3 text-xs font-medium uppercase tracking-wider rounded-lg transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'text-white bg-white/5 border-l-2 border-[#F27D26] shadow-sm'
                  : 'text-white/40 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-[#F27D26]' : 'text-white/40'}`} />
              <span className="font-sans">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Verified Manager Badge & User Card */}
      <div className="mt-auto p-4 bg-white/5 border border-white/10 rounded-xl flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-white/5 border border-white/10 shrink-0">
            <img
              className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-300"
              alt="Manager Avatar"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUlyitpBlfWPr0BjjedNlANKOE_n1jPfDph9--1QrvaqzNsGseDIC6Y-rO59KwCGTjaHyu4bh4ldCjoDV_DJAUjZMJb_tN2Ct9nb9tEugKnP_LsWGbuVzN8jfd7dMq07L-wVZ1uoLTe2sEUeXoxmtKIb_Mtafu4MZ3B0tMut2ypcsnflTKn53MqWkfEutNhjVsALYUQTC6xhY4TIKLsDuQtuMZcI8XtbPeFac4BdrgTMcoG_yrs8DgtmmVvtEZY7y1ks3TRAR78rkO"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-white uppercase tracking-wider truncate">Institutional User</p>
            <p className="text-[10px] text-white/40 uppercase tracking-widest truncate">Asset Manager</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#F27D26]/10 text-[#F27D26] text-[9px] font-bold tracking-widest uppercase rounded border border-[#F27D26]/20">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Verified Node</span>
        </div>
      </div>
    </aside>
  );
}
