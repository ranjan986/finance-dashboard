import React, { useMemo } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { ArrowUpRight, ArrowDownRight, Wallet, Activity } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import { formatCurrency, cn } from '../lib/utils';

function SummaryCard({ title, amount, icon: Icon, trend, type }) {
  return (
    <div className="bg-zinc-900/40 p-6 rounded-2xl border border-zinc-800/50 hover:bg-zinc-900/60 transition-colors group relative overflow-hidden backdrop-blur-xl">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <p className="text-zinc-400 text-sm font-medium">{title}</p>
          <div className={cn(
            "p-2.5 rounded-xl",
            type === 'balance' ? 'bg-primary/20 text-primary' : 
            type === 'income' ? 'bg-emerald-500/20 text-emerald-400' :
            'bg-rose-500/20 text-rose-400'
          )}>
            <Icon size={20} />
          </div>
        </div>
        <div className="flex items-end gap-4">
          <h3 className="text-3xl font-bold tracking-tight text-zinc-50">{formatCurrency(amount)}</h3>
        </div>
      </div>
    </div>
  );
}

export function Dashboard() {
  const { transactions, stats, role } = useFinance();

  const trendData = useMemo(() => {
    const dataByDate = {};
    const sorted = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));
    let runningBalance = 0;
    
    sorted.forEach(t => {
      if (t.type === 'income') runningBalance += t.amount;
      else runningBalance -= t.amount;
      
      dataByDate[t.date] = { date: t.date, balance: runningBalance };
    });
    
    return Object.values(dataByDate);
  }, [transactions]);

  const categoryData = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense');
    const categories = {};
    
    expenses.forEach(t => {
      categories[t.category] = (categories[t.category] || 0) + t.amount;
    });

    return Object.entries(categories)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f43f5e', '#f59e0b', '#06b6d4'];

  const handleExportCSV = () => {
    const headers = ['ID', 'Date', 'Description', 'Amount', 'Category', 'Type'];
    const csvRows = transactions.map(t => `${t.id},${t.date},"${t.description || ''}",${t.amount},${t.category},${t.type}`);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...csvRows].join("\\n");
      
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "finance_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-semibold tracking-tight">Overview</h1>
        {role === 'admin' && (
          <button onClick={handleExportCSV} className="flex items-center gap-2 px-4 py-2 bg-white text-zinc-950 font-medium rounded-xl hover:bg-zinc-200 transition-colors shadow-lg shadow-white/10 active:scale-95">
            <Activity size={18} />
            Download Report
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard 
          title="Total Balance" 
          amount={stats.totalBalance} 
          icon={Wallet} 
          type="balance" 
        />
        <SummaryCard 
          title="Total Income" 
          amount={stats.totalIncome} 
          icon={ArrowUpRight} 
          type="income" 
        />
        <SummaryCard 
          title="Total Expenses" 
          amount={stats.totalExpenses} 
          icon={ArrowDownRight} 
          type="expense" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-zinc-900/30 p-6 rounded-3xl border border-zinc-800/40 backdrop-blur-md shadow-2xl">
          <h3 className="text-lg font-medium mb-6 flex items-center gap-2 text-zinc-200">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            Balance Trend
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <defs>
                  <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  stroke="#71717a" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="#71717a" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(val) => '$' + val}
                />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '12px' }}
                  itemStyle={{ color: '#f4f4f5' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="balance" 
                  stroke="#10b981" 
                  strokeWidth={3} 
                  dot={false}
                  activeDot={{ r: 8, fill: '#10b981', stroke: '#09090b', strokeWidth: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-zinc-900/30 p-6 rounded-3xl border border-zinc-800/40 backdrop-blur-md shadow-2xl">
          <h3 className="text-lg font-medium mb-6 flex items-center gap-2 text-zinc-200">
            <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
            Top Expenses
          </h3>
          <div className="h-[300px] w-full flex items-center justify-center">
            {categoryData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={'cell-' + index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                     contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '12px' }}
                     itemStyle={{ color: '#f4f4f5' }}
                     formatter={(value) => formatCurrency(value)}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-zinc-500">No expenses recorded yet.</p>
            )}
          </div>
          <div className="mt-4 space-y-3">
            {categoryData.slice(0, 3).map((item, index) => (
              <div key={item.name} className="flex items-center justify-between text-sm group">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full shadow-md" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                  <span className="text-zinc-300 group-hover:text-zinc-50 transition-colors">{item.name}</span>
                </div>
                <span className="font-semibold text-zinc-300 group-hover:text-white transition-colors">{formatCurrency(item.value)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
