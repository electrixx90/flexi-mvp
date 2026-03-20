import { useMemo } from "react";
import {
  Users, CreditCard, TrendingUp, Repeat, ShoppingBag, Clock,
  ArrowUpRight, ArrowDownRight, CheckCircle2, AlertCircle, Router, ArrowRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  venueKPIs, dailyMetrics, venueSales, accessEvents, venueMemberships,
} from "@/data/venueData";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { useTurnstile } from "@/contexts/TurnstileContext";

const kpiCards = [
  { label: "Today's Check-ins", value: venueKPIs.todayCheckIns, icon: Users, trend: "+12%", up: true },
  { label: "Today's Sales", value: venueKPIs.todaySales, icon: ShoppingBag, trend: "+3", up: true },
  { label: "Active Memberships", value: venueKPIs.activeMemberships, icon: CreditCard, trend: "+8%", up: true },
  { label: "Active Resales", value: venueKPIs.activeResales, icon: Repeat, trend: "2 new", up: true },
  { label: "Resale Royalties", value: `€${venueKPIs.totalRoyalties.toLocaleString()}`, icon: TrendingUp, trend: "+15%", up: true },
  { label: "Pending Validations", value: venueKPIs.pendingValidations, icon: AlertCircle, trend: "", up: false },
];

export default function VenueDashboard() {
  const { turnstileActive, requestTurnstile } = useTurnstile();

  const chartData = useMemo(() => dailyMetrics.slice(-14).map(d => ({
    ...d,
    dateLabel: new Date(d.date).toLocaleDateString('it-IT', { day: '2-digit', month: 'short' }),
  })), []);

  const recentSales = venueSales.slice(0, 5);
  const recentAccess = accessEvents.slice(0, 5);
  const topMemberships = [...venueMemberships]
    .filter(m => m.status === 'active')
    .sort((a, b) => b.soldCount - a.soldCount)
    .slice(0, 4);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Turnstile activation banner */}
      {!turnstileActive && (
        <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-primary/5 p-5 lg:p-6">
          <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <Router className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold font-display text-foreground">Attiva il controllo accessi</h3>
              <p className="text-sm text-muted-foreground mt-0.5">
                Richiedi il tornello Flexi per validare automaticamente gli ingressi dei tuoi membri tramite QR code.
              </p>
            </div>
            <Button size="sm" className="gap-1.5 shrink-0" onClick={requestTurnstile}>
              Richiedi tornello <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      )}

      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold font-display text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Business overview for Iron Temple Gym</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
        {kpiCards.map((kpi) => (
          <div key={kpi.label} className="rounded-xl bg-card border border-border/50 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
              {kpi.trend && (
                <span className={`text-[11px] font-semibold flex items-center gap-0.5 ${kpi.up ? 'text-accent' : 'text-destructive'}`}>
                  {kpi.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {kpi.trend}
                </span>
              )}
            </div>
            <p className="text-2xl font-extrabold font-display text-foreground">{kpi.value}</p>
            <p className="text-xs text-muted-foreground font-medium">{kpi.label}</p>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Check-ins chart */}
        <div className="rounded-xl bg-card border border-border/50 p-5">
          <h3 className="text-sm font-bold font-display text-foreground mb-4">Daily Check-ins</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="checkInGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(239 84% 67%)" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="hsl(239 84% 67%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 32% 91%)" />
              <XAxis dataKey="dateLabel" tick={{ fontSize: 11 }} stroke="hsl(215 16% 47%)" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(215 16% 47%)" />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Area type="monotone" dataKey="checkIns" stroke="hsl(239 84% 67%)" fill="url(#checkInGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Resale royalties chart */}
        <div className="rounded-xl bg-card border border-border/50 p-5">
          <h3 className="text-sm font-bold font-display text-foreground mb-4">Resale Royalties</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 32% 91%)" />
              <XAxis dataKey="dateLabel" tick={{ fontSize: 11 }} stroke="hsl(215 16% 47%)" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(215 16% 47%)" />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Bar dataKey="royalties" fill="hsl(239 84% 67%)" radius={[3, 3, 0, 0]} name="Royalties" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Memberships sold chart */}
      <div className="rounded-xl bg-card border border-border/50 p-5">
        <h3 className="text-sm font-bold font-display text-foreground mb-4">Memberships Sold Over Time</h3>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 32% 91%)" />
            <XAxis dataKey="dateLabel" tick={{ fontSize: 11 }} stroke="hsl(215 16% 47%)" />
            <YAxis tick={{ fontSize: 11 }} stroke="hsl(215 16% 47%)" />
            <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
            <Line type="monotone" dataKey="membershipsSold" stroke="hsl(239 84% 67%)" strokeWidth={2} dot={{ r: 2 }} name="Sold" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom row */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Top selling */}
        <div className="rounded-xl bg-card border border-border/50 p-5">
          <h3 className="text-sm font-bold font-display text-foreground mb-3">Top Memberships</h3>
          <div className="space-y-3">
            {topMemberships.map((m, i) => (
              <div key={m.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-bold text-muted-foreground w-4">{i + 1}</span>
                  <div>
                    <p className="text-sm font-medium text-foreground">{m.title}</p>
                    <p className="text-xs text-muted-foreground">{m.soldCount} sold · {m.activeCustomers} active</p>
                  </div>
                </div>
                <span className="text-sm font-bold text-foreground">€{m.totalRevenue.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent sales */}
        <div className="rounded-xl bg-card border border-border/50 p-5">
          <h3 className="text-sm font-bold font-display text-foreground mb-3">Recent Transactions</h3>
          <div className="space-y-2.5">
            {recentSales.map((s) => (
              <div key={s.id} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">{s.customerName}</p>
                  <p className="text-xs text-muted-foreground">{s.membershipTitle} · {s.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-foreground">€{s.amount}</p>
                  <Badge variant={s.type === 'resale' ? 'secondary' : 'outline'} className="text-[11px] px-1.5 py-0">
                    {s.type}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent access */}
        <div className="rounded-xl bg-card border border-border/50 p-5">
          <h3 className="text-sm font-bold font-display text-foreground mb-3">Recent Check-ins</h3>
          <div className="space-y-2.5">
            {recentAccess.map((a) => (
              <div key={a.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className={`h-3.5 w-3.5 ${a.result === 'valid' ? 'text-accent' : 'text-destructive'}`} />
                  <div>
                    <p className="text-sm font-medium text-foreground">{a.memberName}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(a.timestamp).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })} · {a.method}
                    </p>
                  </div>
                </div>
                <Badge
                  variant={a.result === 'valid' ? 'outline' : 'destructive'}
                  className={`text-[11px] px-1.5 py-0 ${a.result === 'valid' ? 'text-accent border-accent/30' : ''}`}
                >
                  {a.result}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}