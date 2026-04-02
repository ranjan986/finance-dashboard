import React from 'react';
import { LayoutDashboard, Receipt, LineChart, Wallet } from 'lucide-react';
import { cn } from '../lib/utils';

export function Sidebar({ currentTab, setCurrentTab }) {
  const navItems = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'transactions', label: 'Transactions', icon: Receipt },
    { id: 'insights', label: 'Insights', icon: LineChart },
  ];

  return (
    <div className="w-64 border-r border-zinc-800 bg-zinc-950/50 backdrop-blur-xl hidden md:flex flex-col h-screen sticky top-0">
      <div className="p-6 flex items-center gap-3 border-b border-zinc-800">
        <div className="bg-primary/20 p-2 rounded-xl text-primary">
          <Wallet size={24} />
        </div>
        <span className="text-xl font-bold bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">FinDash</span>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentTab(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium",
              currentTab === item.id 
                ? "bg-zinc-800/80 text-zinc-100 shadow-sm" 
                : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50"
            )}
          >
            <item.icon size={18} className={currentTab === item.id ? "text-primary" : ""} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-zinc-800">
        <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-xl p-4 text-center border border-zinc-700/50 shadow-lg">
          <p className="text-xs text-zinc-400 mb-2">Pro Plan</p>
          <button 
            onClick={() => window.alert('Upgrade to Pro features coming soon! This is a frontend demonstration.')}
            className="w-full py-2 bg-zinc-100 text-zinc-950 text-xs font-semibold rounded-lg hover:bg-white transition-colors"
          >
            Upgrade
          </button>
        </div>
      </div>
    </div>
  );
}
