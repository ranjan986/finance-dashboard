import React, { useState, useMemo } from 'react';
import { useFinance } from '../context/FinanceContext';
import { formatCurrency, cn } from '../lib/utils';
import { Search, Filter, Plus, ArrowUpRight, ArrowDownRight, Trash2 } from 'lucide-react';
import { TransactionForm } from './TransactionForm';

export function Transactions() {
  const { transactions, role, deleteTransaction } = useFinance();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // all, income, expense
  const [isFormOpen, setIsFormOpen] = useState(false);

  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
      const matchesSearch = 
        t.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = filterType === 'all' || t.type === filterType;

      return matchesSearch && matchesType;
    });
  }, [transactions, searchTerm, filterType]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-3xl font-semibold tracking-tight">Transactions</h1>
        
        {role === 'admin' && (
          <button 
            onClick={() => setIsFormOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-emerald-400 hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-95"
          >
            <Plus size={18} />
            New Transaction
          </button>
        )}
      </div>

      <div className="bg-zinc-900/40 p-1 rounded-2xl border border-zinc-800/60 backdrop-blur-xl shadow-2xl">
        <div className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 justify-between border-b border-zinc-800/60 bg-zinc-900/40 rounded-t-2xl">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search by description or category..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 focus:border-primary text-zinc-100 placeholder:text-zinc-600 text-sm rounded-xl pl-10 pr-4 py-2.5 transition-all outline-none focus:ring-1 focus:ring-primary shadow-inner"
            />
          </div>
          
          <div className="flex bg-zinc-950 rounded-xl p-1 border border-zinc-800 shadow-inner overflow-x-auto">
            {['all', 'income', 'expense'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={cn(
                  "px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition-all",
                  filterType === type 
                    ? "bg-zinc-800 text-zinc-50 shadow-sm" 
                    : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50"
                )}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto pb-4">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-zinc-500 text-xs uppercase tracking-wider border-b border-zinc-800/60 bg-zinc-900/20">
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Description</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                {role === 'admin' && <th className="px-6 py-4 font-medium text-right">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/40">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={role === 'admin' ? 5 : 4} className="px-6 py-12 text-center text-zinc-500">
                     <div className="flex flex-col items-center justify-center space-y-3">
                       <Filter className="w-8 h-8 opacity-20" />
                       <p>No transactions match your criteria.</p>
                     </div>
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((t) => (
                  <tr key={t.id} className="hover:bg-zinc-800/20 transition-colors group">
                    <td className="px-6 py-4 text-sm text-zinc-400 whitespace-nowrap">
                      {new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 text-sm text-zinc-200">
                      <div className="font-medium">{t.description || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-zinc-800 text-zinc-300 border border-zinc-700/50">
                        {t.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={cn(
                        "flex items-center gap-1.5 font-semibold",
                        t.type === 'income' ? 'text-emerald-400' : 'text-zinc-200'
                      )}>
                        {t.type === 'income' ? <ArrowUpRight size={14} className="text-emerald-500/70" /> : <ArrowDownRight size={14} className="text-rose-500/70" />}
                        {formatCurrency(t.amount)}
                      </div>
                    </td>
                    {role === 'admin' && (
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => deleteTransaction(t.id)}
                          className="p-2 text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all"
                          title="Delete Transaction"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isFormOpen && <TransactionForm onClose={() => setIsFormOpen(false)} />}
    </div>
  );
}
