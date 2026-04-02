import React from 'react';
import { Shield, ShieldAlert, Bell, Search, Hexagon } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';

export function Topbar() {
  const { role, toggleRole } = useFinance();

  return (
    <header className="h-20 border-b border-zinc-800/60 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between px-8">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-full max-w-sm hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search anything..." 
            className="w-full bg-zinc-900/50 border border-zinc-800 text-zinc-200 text-sm rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-zinc-500"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <button className="relative p-2 text-zinc-400 hover:text-zinc-100 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full ring-2 ring-zinc-950"></span>
        </button>
        
        <div className="h-6 w-px bg-zinc-800"></div>

        <button 
          onClick={toggleRole}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 transition-all group"
          title="Toggle Role"
        >
          {role === 'admin' ? (
            <Shield className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
          ) : (
            <ShieldAlert className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
          )}
          <span className="text-sm font-medium capitalize text-zinc-300">
            {role}
          </span>
        </button>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-emerald-600 flex items-center justify-center text-zinc-50 font-semibold shadow-lg shadow-emerald-900/20">
            U
          </div>
        </div>
      </div>
    </header>
  );
}
