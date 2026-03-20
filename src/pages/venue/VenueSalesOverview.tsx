import { useState } from "react";
import { Search, TrendingUp, CreditCard, Users, Repeat, X, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { venueMemberships, venueSales, type VenueMembership } from "@/data/venueData";

const statusColors: Record<string, string> = {
  active: "text-accent border-accent/30 bg-accent/5",
  draft: "text-muted-foreground border-border",
  inactive: "text-destructive border-destructive/30 bg-destructive/5",
};

const saleStatusColors: Record<string, string> = {
  completed: "text-accent border-accent/30 bg-accent/5",
  pending: "text-yellow-600 border-yellow-500/30 bg-yellow-500/5",
  refunded: "text-destructive border-destructive/30 bg-destructive/5",
};

function MembershipDetail({ membership, onBack }: { membership: VenueMembership; onBack: () => void }) {
  const sales = venueSales.filter(s => s.membershipTitle === membership.title);
  const primarySales = sales.filter(s => s.type === 'primary');
  const resales = sales.filter(s => s.type === 'resale');
  const primaryRevenue = primarySales.reduce((a, s) => a + s.amount, 0);
  const resaleRevenue = resales.reduce((a, s) => a + s.amount, 0);
  const royalties = resales.reduce((a, s) => a + s.venueFee, 0);

  const detailKpis = [
    { label: "Total Sold", value: membership.soldCount, icon: CreditCard },
    { label: "Active Customers", value: membership.activeCustomers, icon: Users },
    { label: "Primary Revenue", value: `€${membership.totalRevenue.toLocaleString()}`, icon: TrendingUp },
    { label: "Resale Count", value: membership.resaleCount, icon: Repeat },
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold font-display text-foreground">{membership.title}</h2>
            <Badge variant="outline" className={`text-[11px] px-2 py-0.5 ${statusColors[membership.status]}`}>{membership.status}</Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-0.5">{membership.description} · {membership.type === 'time-based' ? membership.durationLabel : `${membership.totalEntries} entries`} · €{membership.price}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {detailKpis.map((k) => (
          <div key={k.label} className="rounded-xl bg-card border border-border/50 p-4">
            <k.icon className="h-4 w-4 text-muted-foreground mb-2" />
            <p className="text-2xl font-extrabold font-display text-foreground">{k.value}</p>
            <p className="text-xs text-muted-foreground font-medium">{k.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-3">
        <div className="rounded-xl bg-card border border-border/50 p-4">
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Primary Revenue</p>
          <p className="text-xl font-extrabold font-display text-foreground">€{primaryRevenue.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">{primarySales.length} transactions</p>
        </div>
        <div className="rounded-xl bg-card border border-border/50 p-4">
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Resale Volume</p>
          <p className="text-xl font-extrabold font-display text-foreground">€{resaleRevenue.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">{resales.length} resales</p>
        </div>
        <div className="rounded-xl bg-card border border-border/50 p-4">
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Venue Royalties</p>
          <p className="text-xl font-extrabold font-display text-secondary">€{royalties.toFixed(2)}</p>
          <p className="text-xs text-muted-foreground">from {resales.length} resales</p>
        </div>
      </div>

      <div className="rounded-xl bg-card border border-border/50 overflow-hidden">
        <div className="px-4 py-3 border-b border-border/50">
          <p className="text-sm font-bold font-display text-foreground">Transaction History</p>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-[13px] font-semibold">Customer</TableHead>
              <TableHead className="text-[13px] font-semibold">Type</TableHead>
              <TableHead className="text-[13px] font-semibold text-right">Amount</TableHead>
              <TableHead className="text-[13px] font-semibold text-right">Venue Fee</TableHead>
              <TableHead className="text-[13px] font-semibold">Date</TableHead>
              <TableHead className="text-[13px] font-semibold">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sales.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-sm text-muted-foreground py-8">No transactions yet</TableCell>
              </TableRow>
            ) : (
              sales.map((s) => (
                <TableRow key={s.id}>
                  <TableCell>
                    <p className="text-sm font-medium text-foreground">{s.customerName}</p>
                    {s.type === 'resale' && s.sellerName && (
                      <p className="text-xs text-muted-foreground">from {s.sellerName}</p>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={s.type === 'resale' ? 'secondary' : 'outline'} className="text-[11px] px-2 py-0.5">
                      {s.type === 'primary' ? 'Primary' : 'Resale'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-sm font-bold text-foreground">€{s.amount}</TableCell>
                  <TableCell className="text-right text-sm text-muted-foreground">{s.venueFee > 0 ? `€${s.venueFee.toFixed(2)}` : '—'}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{s.date}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`text-[11px] px-2 py-0.5 ${saleStatusColors[s.status]}`}>{s.status}</Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default function VenueSalesOverview() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selected, setSelected] = useState<VenueMembership | null>(null);

  const filtered = venueMemberships.filter((m) => {
    const matchSearch = m.title.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || m.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totals = venueMemberships.reduce(
    (acc, m) => ({ sold: acc.sold + m.soldCount, active: acc.active + m.activeCustomers, revenue: acc.revenue + m.totalRevenue, resales: acc.resales + m.resaleCount }),
    { sold: 0, active: 0, revenue: 0, resales: 0 }
  );

  const kpis = [
    { label: "Total Sold", value: totals.sold, icon: CreditCard },
    { label: "Active Customers", value: totals.active, icon: Users },
    { label: "Total Revenue", value: `€${totals.revenue.toLocaleString()}`, icon: TrendingUp },
    { label: "Resale Transactions", value: totals.resales, icon: Repeat },
  ];

  if (selected) {
    return (
      <div className="space-y-5 max-w-7xl mx-auto">
        <MembershipDetail membership={selected} onBack={() => setSelected(null)} />
      </div>
    );
  }

  return (
    <div className="space-y-5 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold font-display text-foreground">Sales Overview</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Performance analytics for your memberships</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {kpis.map((k) => (
          <div key={k.label} className="rounded-xl bg-card border border-border/50 p-4">
            <k.icon className="h-4 w-4 text-muted-foreground mb-2" />
            <p className="text-2xl font-extrabold font-display text-foreground">{k.value}</p>
            <p className="text-xs text-muted-foreground font-medium">{k.label}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." className="pl-9 h-9 w-64 bg-muted/20 border-border/50 text-sm" />
        </div>
        <Tabs value={statusFilter} onValueChange={setStatusFilter}>
          <TabsList className="bg-muted/40 border border-border/50 p-0.5 h-9">
            <TabsTrigger value="all" className="text-xs h-7 rounded-md px-3">All</TabsTrigger>
            <TabsTrigger value="active" className="text-xs h-7 rounded-md px-3">Active</TabsTrigger>
            <TabsTrigger value="inactive" className="text-xs h-7 rounded-md px-3">Inactive</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="rounded-xl bg-card border border-border/50 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-[13px] font-semibold">Membership</TableHead>
              <TableHead className="text-[13px] font-semibold text-right">Sold</TableHead>
              <TableHead className="text-[13px] font-semibold text-right">Active</TableHead>
              <TableHead className="text-[13px] font-semibold text-right">Revenue</TableHead>
              <TableHead className="text-[13px] font-semibold text-right">Resales</TableHead>
              <TableHead className="text-[13px] font-semibold">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((m) => (
              <TableRow key={m.id} className="cursor-pointer" onClick={() => setSelected(m)}>
                <TableCell>
                  <p className="text-sm font-medium text-foreground">{m.title}</p>
                  <p className="text-xs text-muted-foreground">{m.type === 'time-based' ? m.durationLabel : `${m.totalEntries} entries`} · €{m.price}</p>
                </TableCell>
                <TableCell className="text-right text-sm font-bold text-foreground">{m.soldCount}</TableCell>
                <TableCell className="text-right text-sm text-foreground">{m.activeCustomers}</TableCell>
                <TableCell className="text-right text-sm font-bold text-foreground">€{m.totalRevenue.toLocaleString()}</TableCell>
                <TableCell className="text-right text-sm text-muted-foreground">{m.resaleCount}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={`text-[11px] px-2 py-0.5 ${statusColors[m.status]}`}>
                    {m.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}