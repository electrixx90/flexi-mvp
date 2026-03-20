import { motion, AnimatePresence } from "framer-motion";
import { walletData, transactions } from "@/data/mockData";
import {
  Wallet as WalletIcon,
  ArrowUpRight,
  ArrowDownLeft,
  Shield,
  Check,
  ExternalLink,
  Zap,
  Globe,
  Lock,
  TrendingUp,
  CircleDot,
  Hexagon,
  Activity,
  CheckCircle2,
  Loader2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";

const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

const statusColors: Record<string, string> = {
  completed: "bg-accent/15 text-accent border-accent/20",
  pending: "bg-amber-500/15 text-amber-600 border-amber-500/20",
  processing: "bg-primary/15 text-primary border-primary/20",
};

const statusLabels: Record<string, string> = {
  completed: "Confirmed",
  pending: "Pending",
  processing: "Processing",
};

const typeIcons: Record<string, React.ReactNode> = {
  purchase: <ArrowDownLeft className="h-4 w-4" />,
  sale: <ArrowUpRight className="h-4 w-4" />,
  payout: <ArrowUpRight className="h-4 w-4" />,
  royalty: <Hexagon className="h-4 w-4" />,
};

const typeLabels: Record<string, string> = {
  purchase: "Membership Acquired",
  sale: "Membership Resale",
  payout: "Withdrawal Processed",
  royalty: "Venue Commission",
};

const typeColors: Record<string, string> = {
  purchase: "bg-primary/10 text-primary",
  sale: "bg-accent/10 text-accent",
  payout: "bg-accent/10 text-accent",
  royalty: "bg-muted text-muted-foreground",
};

type WithdrawStep = "form" | "confirming" | "processing" | "success";

export default function Wallet() {
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [withdrawStep, setWithdrawStep] = useState<WithdrawStep>("form");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [balance, setBalance] = useState(walletData.balance);
  const [activityFeed, setActivityFeed] = useState(transactions);
  const { toast } = useToast();

  const maxWithdraw = balance;

  const resetWithdraw = useCallback(() => {
    setWithdrawStep("form");
    setWithdrawAmount("");
  }, []);

  const handleOpenChange = (open: boolean) => {
    if (!open && withdrawStep === "processing") return; // prevent closing mid-processing
    setWithdrawOpen(open);
    if (!open) setTimeout(resetWithdraw, 300);
  };

  const handleConfirm = () => {
    const amt = parseFloat(withdrawAmount);
    if (isNaN(amt) || amt <= 0 || amt > maxWithdraw) return;
    setWithdrawStep("confirming");
  };

  const handleProcess = () => {
    setWithdrawStep("processing");
    const amt = parseFloat(withdrawAmount);

    setTimeout(() => {
      setBalance((prev) => Math.max(0, prev - amt));
      setActivityFeed((prev) => [
        {
          id: `sim-${Date.now()}`,
          type: "payout" as const,
          description: `Withdrawal to ${walletData.paymentMethod}`,
          amount: amt,
          date: new Date().toISOString().split("T")[0],
          status: "pending" as const,
        },
        ...prev,
      ]);
      setWithdrawStep("success");
    }, 2400);
  };

  const handleDone = () => {
    setWithdrawOpen(false);
    setTimeout(resetWithdraw, 300);
    toast({
      title: "Withdrawal initiated",
      description: `€${parseFloat(withdrawAmount).toFixed(2)} will settle in 1–2 business days.`,
    });
  };

  const amtNum = parseFloat(withdrawAmount);
  const isValidAmount = !isNaN(amtNum) && amtNum > 0 && amtNum <= maxWithdraw;

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.07 } },
      }}
      className="space-y-6 max-w-5xl mx-auto"
    >
      {/* Page header */}
      <motion.div variants={item} className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl gradient-hero flex items-center justify-center shadow-glow-indigo">
          <WalletIcon className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold font-display text-foreground">Flexi Balance</h1>
          <p className="text-xs text-muted-foreground">Credits, payouts, and marketplace earnings</p>
        </div>
      </motion.div>

      {/* ── Hero Wallet Section ── */}
      <motion.div variants={item} className="relative rounded-2xl overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_20%_80%,hsl(172_66%_50%/0.25),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_20%,hsl(239_84%_67%/0.3),transparent)]" />

        <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          <line x1="60" y1="20" x2="180" y2="100" stroke="white" strokeWidth="0.5" />
          <line x1="180" y1="100" x2="340" y2="60" stroke="white" strokeWidth="0.5" />
          <line x1="340" y1="60" x2="500" y2="140" stroke="white" strokeWidth="0.5" />
          <line x1="500" y1="140" x2="660" y2="80" stroke="white" strokeWidth="0.5" />
        </svg>

        <div className="relative z-10 p-6 lg:p-10">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-6 w-6 rounded-md bg-primary-foreground/15 backdrop-blur-sm flex items-center justify-center">
              <CircleDot className="h-3.5 w-3.5 text-primary-foreground" />
            </div>
            <span className="text-xs font-semibold text-primary-foreground/70 uppercase tracking-widest">Balance Overview</span>
            <Badge className="ml-auto bg-primary-foreground/15 text-primary-foreground border-primary-foreground/20 text-xs backdrop-blur-sm">
              <Zap className="h-3 w-3 mr-1" /> Live
            </Badge>
          </div>

          <p className="text-primary-foreground/60 text-sm font-medium">Available Balance</p>
          <p className="text-5xl lg:text-6xl font-extrabold font-display text-primary-foreground mt-1 tracking-tight">
            €{balance.toFixed(2)}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8">
            <MetricBlock label="Pending Settlement" value={`€${walletData.pendingPayout.toFixed(2)}`} icon={<Activity className="h-3.5 w-3.5" />} />
            <MetricBlock label="Total Earned" value={`€${walletData.totalEarned.toFixed(2)}`} icon={<TrendingUp className="h-3.5 w-3.5" />} />
            <MetricBlock label="Total Spent" value={`€${walletData.totalSpent.toFixed(2)}`} icon={<ArrowDownLeft className="h-3.5 w-3.5" />} className="hidden sm:block" />
          </div>

          <Button
            variant="secondary"
            size="lg"
            className="mt-8 bg-primary-foreground/15 hover:bg-primary-foreground/25 text-primary-foreground border-primary-foreground/10 backdrop-blur-sm"
            onClick={() => setWithdrawOpen(true)}
          >
            <ArrowUpRight className="h-4 w-4" /> Withdraw Funds
          </Button>
        </div>
      </motion.div>

      {/* ── Two-column grid ── */}
      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div variants={item} className="rounded-2xl bg-card/80 backdrop-blur-xl shadow-card border border-border/50 p-6">
          <h3 className="font-bold font-display text-foreground mb-4 flex items-center gap-2 text-sm">
            <Globe className="h-4 w-4 text-primary" /> Payout Destination
          </h3>
          <div className="rounded-xl border border-border/60 bg-muted/20 p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl gradient-hero flex items-center justify-center shadow-glow-indigo shrink-0">
              <span className="text-primary-foreground font-bold text-sm">VISA</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">{walletData.paymentMethod}</p>
              <p className="text-xs text-muted-foreground">Primary payout method · Auto-payout enabled</p>
            </div>
            <Button variant="ghost" size="sm" className="shrink-0 text-xs">
              <ExternalLink className="h-3.5 w-3.5 mr-1" /> Manage
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1.5">
            <Lock className="h-3 w-3" /> Payouts settle within 1–2 business days via secured transfer
          </p>
        </motion.div>

        <motion.div variants={item} className="rounded-2xl bg-card/80 backdrop-blur-xl shadow-card border border-border/50 p-6">
          <h3 className="font-bold font-display text-foreground mb-4 flex items-center gap-2 text-sm">
            <Shield className="h-4 w-4 text-accent" /> Security & Transfers
          </h3>
          <div className="space-y-3">
            {[
              { label: "Account Ready", sub: "Ready for purchases and payouts", badge: "Active" },
              { label: "Payout Method Connected", sub: "Your payout method is active", badge: "Connected" },
              { label: "Transfer Protection Active", sub: "Protected transfer flow enabled", badge: "Protected" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-3 rounded-xl border border-border/50 bg-muted/15 px-4 py-3">
                <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <Check className="h-4 w-4 text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{s.label}</p>
                  <p className="text-xs text-muted-foreground">{s.sub}</p>
                </div>
                <Badge variant="outline" className="text-xs text-accent border-accent/20 bg-accent/5 shrink-0 hidden sm:flex">
                  {s.badge}
                </Badge>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Wallet Activity Feed ── */}
      <motion.div variants={item}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold font-display text-foreground flex items-center gap-2 text-sm">
            <Activity className="h-4 w-4 text-primary" /> Recent Activity
          </h3>
          <Badge variant="outline" className="text-xs text-muted-foreground">
            {activityFeed.length} events
          </Badge>
        </div>

        <div className="rounded-2xl bg-card/80 backdrop-blur-xl shadow-card border border-border/50 overflow-hidden">
          {activityFeed.map((tx, i) => (
            <div
              key={tx.id}
              className={`flex items-center gap-4 px-5 py-4 ${i < activityFeed.length - 1 ? "border-b border-border/40" : ""} hover:bg-muted/10 transition-colors`}
            >
              <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${typeColors[tx.type]}`}>
                {typeIcons[tx.type]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-foreground truncate">{typeLabels[tx.type]}</p>
                  <Badge variant="outline" className={`text-xs border ${statusColors[tx.status]} shrink-0`}>
                    {statusLabels[tx.status]}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 truncate">{tx.description}</p>
              </div>
              <div className="text-right shrink-0">
                <p className={`text-sm font-bold font-display ${tx.amount > 0 ? "text-accent" : "text-foreground"}`}>
                  {tx.amount > 0 ? "+" : ""}€{Math.abs(tx.amount).toFixed(2)}
                </p>
                <p className="text-xs text-muted-foreground">{tx.date}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Withdraw Dialog ── */}
      <Dialog open={withdrawOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-md border-border/50 bg-card/95 backdrop-blur-2xl p-0 overflow-hidden">
          <AnimatePresence mode="wait">
            {/* Step 1: Form */}
            {withdrawStep === "form" && (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="p-6 space-y-5"
              >
                <DialogHeader>
                  <DialogTitle className="font-display text-lg flex items-center gap-2">
                    <ArrowUpRight className="h-5 w-5 text-primary" /> Withdraw Funds
                  </DialogTitle>
                  <p className="text-xs text-muted-foreground">Transfer from your Flexi Balance to your payout destination.</p>
                </DialogHeader>

                {/* Destination preview */}
                <div className="rounded-xl border border-border/60 bg-muted/20 p-3 flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg gradient-hero flex items-center justify-center shrink-0">
                    <span className="text-primary-foreground font-bold text-xs">VISA</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{walletData.paymentMethod}</p>
                    <p className="text-xs text-muted-foreground">Payout destination</p>
                  </div>
                </div>

                {/* Amount input */}
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Amount (EUR)</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold text-sm">€</span>
                    <Input
                      type="number"
                      step="0.01"
                      min="0.01"
                      max={maxWithdraw}
                      placeholder="0.00"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      className="pl-8 bg-muted/20 border-border/50 text-lg font-bold font-display h-12"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">Available: €{maxWithdraw.toFixed(2)}</p>
                    <button
                      onClick={() => setWithdrawAmount(maxWithdraw.toFixed(2))}
                      className="text-xs font-semibold text-primary hover:underline"
                    >
                      Withdraw max
                    </button>
                  </div>
                  {/* Quick amount chips */}
                  <div className="flex gap-2 pt-1">
                    {[25, 50, 100].filter(v => v <= maxWithdraw).map((v) => (
                      <button
                        key={v}
                        onClick={() => setWithdrawAmount(v.toFixed(2))}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-muted/30 border border-border/50 text-foreground hover:bg-muted/50 transition-colors"
                      >
                        €{v}
                      </button>
                    ))}
                  </div>
                </div>

                <Button onClick={handleConfirm} disabled={!isValidAmount} className="w-full" size="lg">
                  Continue
                </Button>
              </motion.div>
            )}

            {/* Step 2: Confirm */}
            {withdrawStep === "confirming" && (
              <motion.div
                key="confirm"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="p-6 space-y-5"
              >
                <DialogHeader>
                  <DialogTitle className="font-display text-lg">Confirm Withdrawal</DialogTitle>
                </DialogHeader>

                <div className="rounded-xl border border-border/50 bg-muted/10 p-5 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Amount</span>
                    <span className="text-2xl font-extrabold font-display text-foreground">€{parseFloat(withdrawAmount).toFixed(2)}</span>
                  </div>
                  <div className="h-px bg-border/40" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Destination</span>
                    <span className="text-sm font-medium text-foreground">{walletData.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Settlement</span>
                    <span className="text-sm text-muted-foreground">1–2 business days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Fee</span>
                    <span className="text-sm font-medium text-accent">Free</span>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <Lock className="h-3 w-3" /> Your withdrawal is protected by Flexi
                </p>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setWithdrawStep("form")} className="flex-1">
                    Back
                  </Button>
                  <Button onClick={handleProcess} className="flex-1" variant="hero" size="lg">
                    Confirm & Withdraw
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Processing */}
            {withdrawStep === "processing" && (
              <motion.div
                key="processing"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-10 flex flex-col items-center justify-center text-center space-y-4"
              >
                <div className="h-16 w-16 rounded-2xl gradient-hero flex items-center justify-center shadow-glow-indigo">
                  <Loader2 className="h-7 w-7 text-primary-foreground animate-spin" />
                </div>
                <p className="text-lg font-bold font-display text-foreground">Processing withdrawal…</p>
                <p className="text-xs text-muted-foreground max-w-[260px]">
                  Verifying your details and initiating settlement to your payout destination.
                </p>
              </motion.div>
            )}

            {/* Step 4: Success */}
            {withdrawStep === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-10 flex flex-col items-center justify-center text-center space-y-4"
              >
                <div className="h-16 w-16 rounded-2xl bg-accent/15 flex items-center justify-center">
                  <CheckCircle2 className="h-8 w-8 text-accent" />
                </div>
                <p className="text-lg font-bold font-display text-foreground">Withdrawal Initiated</p>
                <p className="text-3xl font-extrabold font-display text-foreground">€{parseFloat(withdrawAmount).toFixed(2)}</p>
                <div className="space-y-1">
                  <Badge variant="outline" className="text-xs text-accent border-accent/20 bg-accent/5">
                    Settlement pending
                  </Badge>
                  <p className="text-xs text-muted-foreground">
                    Funds will arrive in 1–2 business days to {walletData.paymentMethod}.
                  </p>
                </div>
                <Button onClick={handleDone} className="mt-2" size="lg">
                  Done
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}

function MetricBlock({ label, value, icon, className = "" }: { label: string; value: string; icon: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/10 p-4 ${className}`}>
      <p className="text-xs text-primary-foreground/55 flex items-center gap-1.5 font-medium">{icon} {label}</p>
      <p className="text-xl font-bold font-display text-primary-foreground mt-1">{value}</p>
    </div>
  );
}
