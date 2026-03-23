import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { memberships, categoryIcons, categoryLabels, transactions } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Tag, Send, Clock, MapPin, Calendar, TrendingUp, Zap, QrCode } from "lucide-react";
import { MembershipPassDialog } from "@/components/membership/MembershipPassDialog";

const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

export default function MembershipDetail() {
  const { id } = useParams();
  const m = memberships.find((mem) => mem.id === id) || memberships[0];
  const [passOpen, setPassOpen] = useState(false);

  const usagePercent = m.totalEntries
    ? ((m.totalEntries - (m.remainingEntries || 0)) / m.totalEntries) * 100
    : ((m.totalDays - m.remainingDays) / m.totalDays) * 100;

  const relatedTx = transactions.filter(t => t.venue === m.venue);

  return (
    <motion.div initial="hidden" animate="show" variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } }} className="space-y-6 max-w-4xl mx-auto">
      <motion.div variants={item}>
        <Link to="/client/memberships" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 mb-4">
          <ArrowLeft className="h-4 w-4" /> Back to Memberships
        </Link>
      </motion.div>

      {/* Header Card */}
      <motion.div variants={item} className="rounded-2xl overflow-hidden shadow-elevated">
        <div className={`h-3 bg-gradient-to-r ${m.imageGradient}`} />
        <div className="bg-card p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row sm:items-start gap-4">
            <div className="h-16 w-16 rounded-2xl gradient-hero flex items-center justify-center text-3xl shrink-0">
              {categoryIcons[m.category]}
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between flex-wrap gap-2">
                <div>
                  <h1 className="text-xl lg:text-2xl font-extrabold font-display text-foreground">{m.venue}</h1>
                  <p className="text-sm text-muted-foreground mt-0.5">{m.type} · {categoryLabels[m.category]}</p>
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${m.status === 'active' ? 'bg-accent/15 text-accent' : m.status === 'listed' ? 'bg-primary/10 text-primary' : 'bg-amber-100 text-amber-700'}`}>
                  {m.status.replace('-', ' ')}
                </span>
              </div>
              <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {m.location}</span>
                <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {m.startDate} → {m.endDate}</span>
                <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {m.remainingDays}d remaining</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Value & Progress */}
      <div className="grid sm:grid-cols-2 gap-4">
        <motion.div variants={item} className="rounded-2xl bg-card shadow-card p-6">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Residual Value</p>
          <p className="text-3xl font-extrabold font-display text-accent">€{m.residualValue}</p>
          <p className="text-sm text-muted-foreground mt-1">of €{m.originalPrice} original</p>
          <div className="mt-4 h-2 rounded-full bg-border overflow-hidden">
            <div className="h-full rounded-full gradient-value" style={{ width: `${100 - usagePercent}%` }} />
          </div>
          <p className="text-xs text-muted-foreground mt-1">{Math.round(100 - usagePercent)}% value remaining</p>
        </motion.div>

        <motion.div variants={item} className="rounded-2xl bg-card shadow-card p-6">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Usage</p>
          {m.remainingEntries !== undefined ? (
            <>
              <p className="text-3xl font-extrabold font-display text-foreground">{m.remainingEntries}<span className="text-lg text-muted-foreground">/{m.totalEntries}</span></p>
              <p className="text-sm text-muted-foreground mt-1">entries remaining</p>
            </>
          ) : (
            <>
              <p className="text-3xl font-extrabold font-display text-foreground">{m.remainingDays}<span className="text-lg text-muted-foreground">/{m.totalDays}</span></p>
              <p className="text-sm text-muted-foreground mt-1">days remaining</p>
            </>
          )}
          <div className="mt-4 flex gap-2 flex-wrap">
            <span className="text-xs bg-muted/50 text-muted-foreground px-2.5 py-1 rounded-full">{Math.round(usagePercent)}% used</span>
            {m.resellEligible && <span className="text-xs bg-accent/10 text-accent px-2.5 py-1 rounded-full font-medium">Eligible for resale</span>}
          </div>
        </motion.div>
      </div>

      {/* Resale Info */}
      {m.resellEligible && (
        <motion.div variants={item} className="rounded-2xl gradient-card border border-primary/10 p-6">
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold font-display text-foreground">Resale Opportunity</h3>
              <p className="text-sm text-muted-foreground mt-0.5">
                Based on remaining value and market demand, you could list this for up to <span className="font-bold text-accent">€{Math.round(m.residualValue * 0.9)}</span>.
              </p>
              <Button variant="mint" size="sm" className="mt-3" asChild>
                <Link to={`/client/sell?id=${m.id}`}>
                  <Tag className="h-3.5 w-3.5" /> Create Listing
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Transaction History */}
      <motion.div variants={item}>
        <h2 className="text-lg font-bold font-display text-foreground mb-3">Transaction History</h2>
        {relatedTx.length > 0 ? (
          <div className="rounded-2xl bg-card shadow-card divide-y divide-border">
            {relatedTx.map(tx => (
              <div key={tx.id} className="flex items-center justify-between px-5 py-3.5">
                <div>
                  <p className="text-sm font-medium text-foreground">{tx.description}</p>
                  <p className="text-xs text-muted-foreground">{tx.date}</p>
                </div>
                <p className={`text-sm font-bold font-display ${tx.amount > 0 ? 'text-accent' : 'text-foreground'}`}>
                  {tx.amount > 0 ? '+' : ''}€{Math.abs(tx.amount).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground bg-card rounded-2xl shadow-card p-5">No transactions for this membership yet.</p>
        )}
      </motion.div>

      {/* Actions */}
      <motion.div variants={item} className="flex gap-3 flex-wrap">
        <Button variant="default" size="lg" onClick={() => setPassOpen(true)}>
          <QrCode className="h-4 w-4" /> Show Pass
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link to={`/client/sell?id=${m.id}`}><Tag className="h-4 w-4" /> Sell This Membership</Link>
        </Button>
      </motion.div>

      <MembershipPassDialog membership={m} open={passOpen} onOpenChange={setPassOpen} />
    </motion.div>
  );
}
