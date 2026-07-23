import React from 'react';
import { Bell, Menu, User, ShieldAlert } from 'lucide-react';

interface TopBarProps {
  currentTab: string;
  onToggleSidebar?: () => void;
}

export default function TopBar({ currentTab, onToggleSidebar }: TopBarProps) {
  
  // Dynamic Title mapping based on selected Workspace Tab
  const getTitle = () => {
    switch (currentTab) {
      case 'overview':
        return 'Asset Registry';
      case 'tokenize':
        return 'Tokenization Engine';
      case 'analytics':
        return 'Market Intelligence';
      case 'portfolio':
        return 'Institutional Portfolio';
      default:
        return 'AssetVault Workstation';
    }
  };

  return (
    <header className="flex justify-between items-center px-6 md:px-10 py-5 w-full border-b border-white/10 bg-[#050505] sticky top-0 z-25">
      
      {/* Title block / Mobile Hamburger trigger */}
      <div className="flex items-center gap-4">
        {onToggleSidebar && (
          <button 
            onClick={onToggleSidebar}
            className="md:hidden text-white/60 p-1.5 rounded-lg hover:bg-white/5 active:scale-95 transition-all"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        
        {/* Dynamic Header Title */}
        <h2 className="serif text-xl md:text-2xl font-medium text-white tracking-widest uppercase">
          {getTitle()}
        </h2>
      </div>

      {/* Right Controls / Notification and profile */}
      <div className="flex items-center gap-6">
        
        {/* Live feed status indicator */}
        <div className="hidden lg:flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F27D26] animate-pulse"></span>
          <span className="font-mono text-[9px] font-bold text-white/50 uppercase tracking-widest">
            LIVE: NODE_ACTIVE_SECURE
          </span>
        </div>

        <div className="flex items-center gap-4">
          
          {/* Notification Trigger with custom alert dot */}
          <button className="p-2 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white rounded-lg transition-all border border-white/10 relative active:scale-95 cursor-pointer">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#F27D26] rounded-full ring-2 ring-[#050505]"></span>
          </button>

          {/* User headshot avatar */}
          <div className="w-8 h-8 rounded-lg overflow-hidden bg-white/5 border border-white/10 shadow-md flex items-center justify-center cursor-pointer hover:border-[#F27D26] transition-colors shrink-0">
            <img 
              className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-300" 
              alt="Manager Portrait" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUlyitpBlfWPr0BjjedNlANKOE_n1jPfDph9--1QrvaqzNsGseDIC6Y-rO59KwCGTjaHyu4bh4ldCjoDV_DJAUjZMJb_tN2Ct9nb9tEugKnP_LsWGbuVzN8jfd7dMq07L-wVZ1uoLTe2sEUeXoxmtKIb_Mtafu4MZ3B0tMut2ypcsnflTKn53MqWkfEutNhjVsALYUQTC6xhY4TIKLsDuQtuMZcI8XtbPeFac4BdrgTMcoG_yrs8DgtmmVvtEZY7y1ks3TRAR78rkO"
              referrerPolicy="no-referrer"
            />
          </div>

        </div>
      </div>

    </header>
  );
}
