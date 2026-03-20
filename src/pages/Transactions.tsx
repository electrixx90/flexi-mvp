import { motion } from "framer-motion";
import { transactions } from "@/data/mockData";
import { ArrowDownLeft, ArrowUpRight, Building, Tag, Receipt } from "lucide-react";

const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

const typeConfig: Record<string, { icon: typeof ArrowDownLeft; color: string; bg: string }> = {
  purchase: { icon: ArrowDownLeft, color: "text-foreground", bg: "bg-muted/50" },
  sale: { icon: ArrowUpRight, color: "text-accent", bg: "bg-accent/10" },
  payout: { icon: Building, color: "text-primary", bg: "bg-primary/10" },
  royalty: { icon: Tag, color: "text-amber-600", bg: "bg-amber-50" },
};

export default function Transactions() {
  const totals = {
    earned: transactions.filter(t => t.amount > 0).reduce((s, t) => s + t.amount, 0),
    spent: transactions.filter(t => t.amount < 0).reduce((s, t) => s + Math.abs(t.amount), 0),
  };

  return (
    <motion.div initial="hidden" animate="show" variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } }} className="space-y-6 max-w-4xl mx-auto">
      <motion.div variants={item}>
        <h1 className="text-2xl font-extrabold font-display text-foreground">Transactions</h1>
        <p className="text-sm text-muted-foreground mt-1">Track all your purchases, sales, and payouts.</p>
      </motion.div>

      {/* Summary */}
      <motion.div variants={item} className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-2xl bg-card shadow-card p-5">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Total Earned</p>
          <p className="text-2xl font-extrabold font-display text-accent mt-1">+€{totals.earned.toFixed(2)}</p>
        </div>
        <div className="rounded-2xl bg-card shadow-card p-5">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Total Spent</p>
          <p className="text-2xl font-extrabold font-display text-foreground mt-1">€{totals.spent.toFixed(2)}</p>
        </div>
      </motion.div>

      {/* List */}
      <motion.div variants={item} className="rounded-2xl bg-card shadow-card divide-y divide-border overflow-hidden">
        {transactions.map((tx) => {
          const config = typeConfig[tx.type];
          return (
            <div key={tx.id} className="flex items-center gap-4 px-5 py-4 hover:bg-muted/20 transition-colors">
              <div className={`h-10 w-10 rounded-xl ${config.bg} flex items-center justify-center shrink-0`}>
                <config.icon className={`h-5 w-5 ${config.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{tx.description}</p>
                <p className="text-xs text-muted-foreground">{tx.date} · <span className="capitalize">{tx.type === 'royalty' ? 'fee' : tx.type}</span></p>
              </div>
              <div className="text-right shrink-0">
                <p className={`text-sm font-bold font-display ${tx.amount > 0 ? 'text-accent' : 'text-foreground'}`}>
                  {tx.amount > 0 ? '+' : ''}€{Math.abs(tx.amount).toFixed(2)}
                </p>
                <span className={`text-xs font-medium ${tx.status === 'completed' ? 'text-accent' : tx.status === 'pending' ? 'text-amber-500' : 'text-muted-foreground'}`}>
                  {tx.status}
                </span>
              </div>
            </div>
          );
        })}
      </motion.div>

      {transactions.length === 0 && (
        <motion.div variants={item} className="flex flex-col items-center py-16 text-center">
          <div className="h-16 w-16 rounded-2xl bg-muted/50 flex items-center justify-center mb-4">
            <Receipt className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="font-bold font-display text-foreground">No Transactions Yet</h3>
          <p className="text-sm text-muted-foreground mt-1">Your purchase and sales history will appear here.</p>
        </motion.div>
      )}
    </motion.div>
  );
}
