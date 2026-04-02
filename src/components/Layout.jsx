import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { Dashboard } from './Dashboard';
import { Transactions } from './Transactions';
import { Insights } from './Insights';
import { LayoutDashboard, Receipt, LineChart } from 'lucide-react';
import { cn } from '../lib/utils';

export function Layout() {
  const [currentTab, setCurrentTab] = useState('dashboard');

  const navItems = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'transactions', label: 'Transactions', icon: Receipt },
    { id: 'insights', label: 'Insights', icon: LineChart },
  ];

  const renderContent = () => {
    switch (currentTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'transactions':
        return <Transactions />;
      case 'insights':
        return <Insights />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-zinc-950 text-zinc-50 selection:bg-primary/30">
      <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <div className="flex-1 flex flex-col min-w-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/20 via-zinc-950 to-zinc-950 relative">
        <Topbar />
        <main className="flex-1 p-4 sm:p-6 lg:p-10 overflow-x-hidden overflow-y-auto w-full pb-24 md:pb-10">
          <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {renderContent()}
          </div>
        </main>
        
        <nav className="md:hidden fixed bottom-4 left-4 right-4 bg-zinc-900/90 backdrop-blur-xl border border-zinc-700/50 rounded-2xl flex justify-around p-2 shadow-2xl z-50">
          {navItems.map(item => (
            <button
               key={item.id}
               onClick={() => setCurrentTab(item.id)}
               className={cn(
                 "flex flex-col items-center p-2 px-4 rounded-xl text-xs font-semibold transition-all",
                 currentTab === item.id 
                   ? "text-primary bg-primary/10" 
                   : "text-zinc-500 hover:text-zinc-300"
               )}
            >
               <item.icon size={20} className="mb-1" />
               {item.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
