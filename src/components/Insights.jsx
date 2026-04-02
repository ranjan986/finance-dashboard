import React, { useMemo } from 'react';
import { useFinance } from '../context/FinanceContext';
import { formatCurrency } from '../lib/utils';
import { TrendingUp, AlertTriangle, Trophy, Target } from 'lucide-react';

export function Insights() {
  const { transactions } = useFinance();

  const insights = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense');
    const income = transactions.filter(t => t.type === 'income');

    // Total spending
    const totalExpenses = expenses.reduce((acc, t) => acc + t.amount, 0);
    const totalIncome = income.reduce((acc, t) => acc + t.amount, 0);

    // Group expenses by category
    const categoryTotals = expenses.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

    // Highest spending category
    let highestCategory = { name: 'None', amount: 0 };
    Object.entries(categoryTotals).forEach(([name, amount]) => {
      if (amount > highestCategory.amount) {
        highestCategory = { name, amount };
      }
    });

    // Savings rate
    const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;

    // Largest single expense
    let largestExpense = { description: 'None', amount: 0 };
    expenses.forEach(t => {
      if (t.amount > largestExpense.amount) {
        largestExpense = { description: t.description, amount: t.amount };
      }
    });

    return { totalExpenses, highestCategory, savingsRate, largestExpense };
  }, [transactions]);

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold tracking-tight">Financial Insights</h1>
        <p className="text-zinc-400 mt-2">AI-driven observations based on your current spending habits.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-zinc-900/40 p-8 rounded-3xl border border-zinc-800/60 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-2xl bg-rose-500/10 text-rose-500 border border-rose-500/20 shadow-inner">
              <AlertTriangle size={24} />
            </div>
            <h3 className="text-xl font-semibold text-zinc-100">Top Expenditure Area</h3>
          </div>
          <p className="text-zinc-400 mb-2">Your highest spending category is <strong className="text-zinc-200">{insights.highestCategory.name}</strong>.</p>
          <div className="text-4xl font-bold tracking-tight text-white mb-4">
            {formatCurrency(insights.highestCategory.amount)}
          </div>
          <p className="text-sm text-zinc-500">
            Consider setting a budget for this category to improve your overall savings.
          </p>
        </div>

        <div className="bg-zinc-900/40 p-8 rounded-3xl border border-zinc-800/60 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 shadow-inner">
              <Trophy size={24} />
            </div>
            <h3 className="text-xl font-semibold text-zinc-100">Savings Rate</h3>
          </div>
          <p className="text-zinc-400 mb-2">You are currently saving</p>
          <div className="flex items-end gap-2 mb-4">
            <div className="text-4xl font-bold tracking-tight text-emerald-400">
              { insights.savingsRate > 0 ? insights.savingsRate.toFixed(1) : 0 }%
            </div>
            <span className="text-zinc-500 mb-1 font-medium">of your income</span>
          </div>
          <p className="text-sm text-zinc-500">
            {insights.savingsRate >= 20 ? "Great job! You're saving at a healthy rate above 20%." : "Try to aim for a 20% savings rate for long-term financial security."}
          </p>
        </div>

        <div className="bg-zinc-900/40 p-8 rounded-3xl border border-zinc-800/60 backdrop-blur-xl shadow-2xl relative overflow-hidden group md:col-span-2 flex flex-col md:flex-row items-center gap-8 justify-between">
           <div className="flex-1">
             <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-inner">
                  <Target size={24} />
                </div>
                <h3 className="text-xl font-semibold text-zinc-100">Largest Single Expense</h3>
             </div>
             <p className="text-zinc-400">Your most expensive purchase on record was for <strong className="text-zinc-200">{insights.largestExpense.description || "N/A"}</strong> costing <strong className="text-zinc-200">{formatCurrency(insights.largestExpense.amount)}</strong>.</p>
           </div>
           
           <div className="w-full md:w-auto p-6 bg-zinc-950/80 rounded-2xl border border-zinc-800 shadow-inner">
             <div className="flex items-center gap-3 mb-2 text-zinc-300">
                <TrendingUp size={18} className="text-primary"/> 
                <span className="font-semibold">Trend Analysis</span>
             </div>
             <p className="text-sm text-zinc-500 max-w-xs">{insights.totalExpenses > 0 ? "You have an active spending profile. Monitor your recurring subscriptions." : "No significant spending data recorded yet."}</p>
           </div>
        </div>
      </div>
    </div>
  );
}
