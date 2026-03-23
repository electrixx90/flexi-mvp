import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, CreditCard, Tag, ShoppingBag, Zap, Clock, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { memberships, marketplaceListings, transactions, categoryIcons } from "@/data/mockData";
import { MembershipCard } from "@/components/membership/MembershipCard";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
};

export default function Dashboard() {
  const activeMemberships = memberships.filter(m => m.status === 'active' || m.status === 'partially-used');
  const totalResidual = memberships.reduce((s, m) => s + m.residualValue, 0);
  const resellable = memberships.filter(m => m.resellEligible).length;

  const stats = [
    { label: "Active Memberships", value: activeMemberships.length, icon: CreditCard, color: "text-primary" },
    { label: "Residual Value", value: `€${totalResidual.toLocaleString()}`, icon: TrendingUp, color: "text-accent" },
    { label: "Resellable", value: resellable, icon: Tag, color: "text-primary" },
    { label: "Marketplace Deals", value: marketplaceListings.length, icon: ShoppingBag, color: "text-accent" },
  ];

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8 max-w-7xl mx-auto">
      {/* Hero */}
      <motion.div variants={item} className="relative overflow-hidden rounded-2xl gradient-hero p-6 lg:p-8">
        <div className="relative z-10">
          <p className="text-primary-foreground/80 text-sm font-medium mb-1">Welcome back, Alex 👋</p>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-primary-foreground mb-2">
            Your Memberships Are Working for You
          </h1>
          <p className="text-primary-foreground/70 text-sm lg:text-base max-w-lg mb-5">
            You have <span className="font-bold text-primary-foreground">€{totalResidual}</span> in recoverable value across {activeMemberships.length} active memberships.
          </p>
          <div className="flex gap-3 flex-wrap">
            <Button variant="secondary" size="lg" asChild>
              <Link to="/client/sell">
                <Tag className="h-4 w-4" /> Sell Unused Time
              </Link>
            </Button>
            <Button variant="ghost" size="lg" className="text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <Link to="/client/marketplace">
                Browse Marketplace <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
        {/* Decorative */}
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary-foreground/10 blur-3xl" />
        <div className="absolute -left-10 -bottom-10 h-48 w-48 rounded-full bg-accent/20 blur-2xl" />
      </motion.div>

      {/* Stats */}
      {/*<motion.div variants={item} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl bg-card p-5 shadow-card hover:shadow-elevated transition-shadow group">
            <div className={`h-10 w-10 rounded-xl bg-muted/50 flex items-center justify-center mb-3 ${stat.color} group-hover:scale-105 transition-transform`}>
              <stat.icon className="h-5 w-5" />
            </div>
            <p className="text-2xl font-extrabold font-display text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
          </div>
        ))}
      </motion.div>*/}

      {/* My Memberships */}
      <motion.div variants={item}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold font-display text-foreground">Your Memberships</h2>
          <Link to="/client/memberships" className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
            View all <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {memberships.slice(0, 3).map((m) => (
            <MembershipCard key={m.id} membership={m} />
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={item}>
        <h2 className="text-lg font-bold font-display text-foreground mb-4">Recommended Actions</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { icon: Tag, title: "Sell Unused Time", desc: "List your Iron Temple membership", link: "/client/sell", gradient: "gradient-hero" },
            { icon: ShoppingBag, title: "Grab a Deal", desc: "BJJ class pack at 45% off", link: "/client/marketplace", gradient: "gradient-mint" },
            { icon: Zap, title: "Complete Listing", desc: "Zen Wellness Spa awaits", link: "/client/sell", gradient: "from-amber-400 to-orange-500" },
          ].map((action) => (
            <Link key={action.title} to={action.link} className="group">
              <div className="rounded-2xl bg-card p-5 shadow-card hover:shadow-elevated transition-all hover:-translate-y-0.5">
                <div className={`h-10 w-10 rounded-xl ${action.gradient} flex items-center justify-center mb-3 text-primary-foreground group-hover:scale-110 transition-transform`}>
                  <action.icon className="h-5 w-5" />
                </div>
                <p className="font-bold font-display text-foreground text-sm">{action.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{action.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Marketplace preview */}
      <motion.div variants={item}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold font-display text-foreground">Marketplace Highlights</h2>
          <Link to="/client/marketplace" className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
            Explore <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {marketplaceListings.slice(0, 3).map((listing) => (
            <div key={listing.id} className="rounded-2xl bg-card p-5 shadow-card hover:shadow-elevated transition-all hover:-translate-y-0.5 group cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <span className="text-2xl">{categoryIcons[listing.category] || '🎯'}</span>
                {listing.urgent && (
                  <span className="text-xs font-bold bg-destructive/10 text-destructive px-2 py-0.5 rounded-full">Ending soon</span>
                )}
              </div>
              <p className="font-bold font-display text-sm text-foreground">{listing.venue}</p>
              <p className="text-xs text-muted-foreground">{listing.type} · {listing.location}</p>
              <div className="flex items-end gap-2 mt-3">
                <span className="text-lg font-extrabold font-display text-primary">€{listing.resalePrice}</span>
                <span className="text-xs text-muted-foreground line-through">€{listing.originalPrice}</span>
                <span className="text-xs font-bold text-accent ml-auto">You save €{listing.savings}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div variants={item}>
        <h2 className="text-lg font-bold font-display text-foreground mb-4">Recent Activity</h2>
        <div className="rounded-2xl bg-card shadow-card divide-y divide-border">
          {transactions.slice(0, 4).map((tx) => (
            <div key={tx.id} className="flex items-center justify-between px-5 py-3.5">
              <div className="flex items-center gap-3">
                <div className={`h-8 w-8 rounded-lg flex items-center justify-center text-xs ${tx.amount > 0 ? 'bg-accent/10 text-accent' : 'bg-muted/50 text-muted-foreground'}`}>
                  {tx.type === 'purchase' ? '🛒' : tx.type === 'sale' ? '💰' : tx.type === 'payout' ? '🏦' : '🏷️'}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{tx.description}</p>
                  <p className="text-xs text-muted-foreground">{tx.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-bold font-display ${tx.amount > 0 ? 'text-accent' : 'text-foreground'}`}>
                  {tx.amount > 0 ? '+' : ''}€{Math.abs(tx.amount).toFixed(2)}
                </p>
                <p className={`text-xs font-medium ${tx.status === 'completed' ? 'text-accent' : tx.status === 'pending' ? 'text-amber-500' : 'text-muted-foreground'}`}>
                  {tx.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
