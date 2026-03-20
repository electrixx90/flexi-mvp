import { useState } from "react";
import { format } from "date-fns";
import {
  Search, TrendingUp, Repeat, DollarSign, ArrowUpRight,
  ArrowLeft, ArrowRight, Mail, Phone, MapPin, Calendar as CalendarIcon2, ShieldCheck, X, CalendarIcon,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { venueSales, venueKPIs, type VenueSale } from "@/data/venueData";

const statusColors: Record<string, string> = {
  completed: "text-accent border-accent/30 bg-accent/5",
  pending: "text-amber-600 border-amber-300 bg-amber-50",
  refunded: "text-destructive border-destructive/30 bg-destructive/5",
};

const mockProfiles: Record<string, { name: string; email: string; phone: string; location: string; joinedAt: string; memberships: number; resales: number; verified: boolean }> = {
  "Anna Neri": { name: "Anna Neri", email: "anna.neri@email.com", phone: "+39 347 123 4567", location: "Milano, Porta Venezia", joinedAt: "2024-03-15", memberships: 4, resales: 2, verified: true },
  "Luca Verdi": { name: "Luca Verdi", email: "luca.verdi@email.com", phone: "+39 338 987 6543", location: "Milano, Navigli", joinedAt: "2024-06-01", memberships: 2, resales: 0, verified: true },
  "Elena Rizzo": { name: "Elena Rizzo", email: "elena.rizzo@email.com", phone: "+39 349 555 1234", location: "Milano, Isola", joinedAt: "2025-01-10", memberships: 3, resales: 1, verified: true },
  "Paolo Conti": { name: "Paolo Conti", email: "paolo.conti@email.com", phone: "+39 340 222 3344", location: "Monza", joinedAt: "2025-02-20", memberships: 1, resales: 0, verified: false },
  "Chiara Galli": { name: "Chiara Galli", email: "chiara.galli@email.com", phone: "+39 351 444 5566", location: "Milano, Città Studi", joinedAt: "2024-09-05", memberships: 5, resales: 3, verified: true },
  "Davide Moretti": { name: "Davide Moretti", email: "davide.moretti@email.com", phone: "+39 342 666 7788", location: "Sesto San Giovanni", joinedAt: "2025-03-01", memberships: 1, resales: 0, verified: false },
  "Marco Rossi": { name: "Marco Rossi", email: "marco.rossi@email.com", phone: "+39 333 111 2233", location: "Milano, Sempione", joinedAt: "2024-01-20", memberships: 6, resales: 2, verified: true },
  "Francesca Russo": { name: "Francesca Russo", email: "francesca.russo@email.com", phone: "+39 345 888 9900", location: "Bergamo", joinedAt: "2025-01-15", memberships: 2, resales: 0, verified: true },
  "Giulia Bianchi": { name: "Giulia Bianchi", email: "giulia.bianchi@email.com", phone: "+39 346 333 4455", location: "Milano, Brera", joinedAt: "2024-07-10", memberships: 3, resales: 1, verified: true },
  "Tommaso Greco": { name: "Tommaso Greco", email: "tommaso.greco@email.com", phone: "+39 348 777 8899", location: "Pavia", joinedAt: "2025-02-01", memberships: 1, resales: 0, verified: false },
};

const getProfile = (name: string) => mockProfiles[name] || { name, email: `${name.toLowerCase().replace(' ', '.')}@email.com`, phone: "+39 3XX XXX XXXX", location: "Milano", joinedAt: "2025-01-01", memberships: 1, resales: 0, verified: false };
const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase();

function UserProfileDialog({ name, open, onClose }: { name: string | null; open: boolean; onClose: () => void }) {
  if (!name) return null;
  const p = getProfile(name);
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="font-display">User Profile</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-3 py-4">
          <Avatar className="h-20 w-20 border-2 border-border">
            <AvatarFallback className="text-2xl font-bold bg-secondary/10 text-secondary">{getInitials(p.name)}</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <p className="text-base font-extrabold font-display text-foreground flex items-center gap-1.5 justify-center">
              {p.name}
              {p.verified && <ShieldCheck className="h-4 w-4 text-accent" />}
            </p>
          </div>
        </div>
        <div className="space-y-2.5 text-sm">
          <div className="flex items-center gap-2.5 text-muted-foreground">
            <Mail className="h-3.5 w-3.5" /> <span>{p.email}</span>
          </div>
          <div className="flex items-center gap-2.5 text-muted-foreground">
            <Phone className="h-3.5 w-3.5" /> <span>{p.phone}</span>
          </div>
          <div className="flex items-center gap-2.5 text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" /> <span>{p.location}</span>
          </div>
          <div className="flex items-center gap-2.5 text-muted-foreground">
            <CalendarIcon2 className="h-3.5 w-3.5" /> <span>Member since {p.joinedAt}</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-3">
          <div className="rounded-lg bg-muted/30 border border-border/50 p-3 text-center">
            <p className="text-lg font-extrabold font-display text-foreground">{p.memberships}</p>
            <p className="text-xs text-muted-foreground">Memberships</p>
          </div>
          <div className="rounded-lg bg-muted/30 border border-border/50 p-3 text-center">
            <p className="text-lg font-extrabold font-display text-foreground">{p.resales}</p>
            <p className="text-xs text-muted-foreground">Resales</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ResaleDetail({ sale, onBack }: { sale: VenueSale; onBack: () => void }) {
  const [profileUser, setProfileUser] = useState<string | null>(null);
  const seller = getProfile(sale.sellerName || "");
  const buyer = getProfile(sale.buyerName || "");

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold font-display text-foreground">Resale Transaction</h2>
            <Badge variant="outline" className={`text-[11px] px-2 py-0.5 ${statusColors[sale.status]}`}>{sale.status}</Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-0.5">{sale.membershipTitle} · {sale.date} · ID: {sale.id}</p>
        </div>
      </div>

      {/* Seller → Buyer transfer visual */}
      <div className="rounded-xl bg-card border border-border/50 p-6">
        <div className="flex items-center justify-center gap-4 sm:gap-8">
          <div className="flex flex-col items-center gap-2 flex-1 max-w-[200px]">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Seller</p>
            <Avatar
              className="h-20 w-20 sm:h-24 sm:w-24 border-2 border-border cursor-pointer hover:border-secondary transition-colors"
              onClick={() => setProfileUser(sale.sellerName || null)}
            >
              <AvatarFallback className="text-2xl sm:text-3xl font-bold bg-secondary/10 text-secondary">
                {getInitials(sale.sellerName || "")}
              </AvatarFallback>
            </Avatar>
            <div className="text-center">
              <p className="text-sm font-bold text-foreground">{sale.sellerName}</p>
              <p className="text-xs text-muted-foreground">{seller.location}</p>
              {seller.verified && (
                <Badge variant="outline" className="text-[11px] gap-1 mt-1 border-accent/30 text-accent px-1.5 py-0">
                  <ShieldCheck className="h-3 w-3" /> Verified
                </Badge>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center gap-1.5">
            <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center">
              <ArrowRight className="h-5 w-5 text-secondary" />
            </div>
            <p className="text-lg font-extrabold font-display text-foreground">€{sale.amount}</p>
            <p className="text-xs text-muted-foreground">Resale price</p>
          </div>

          <div className="flex flex-col items-center gap-2 flex-1 max-w-[200px]">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Buyer</p>
            <Avatar
              className="h-20 w-20 sm:h-24 sm:w-24 border-2 border-border cursor-pointer hover:border-secondary transition-colors"
              onClick={() => setProfileUser(sale.buyerName || null)}
            >
              <AvatarFallback className="text-2xl sm:text-3xl font-bold bg-primary/10 text-primary">
                {getInitials(sale.buyerName || "")}
              </AvatarFallback>
            </Avatar>
            <div className="text-center">
              <p className="text-sm font-bold text-foreground">{sale.buyerName}</p>
              <p className="text-xs text-muted-foreground">{buyer.location}</p>
              {buyer.verified && (
                <Badge variant="outline" className="text-[11px] gap-1 mt-1 border-accent/30 text-accent px-1.5 py-0">
                  <ShieldCheck className="h-3 w-3" /> Verified
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Fee breakdown */}
      <div className="grid sm:grid-cols-3 gap-3">
        <div className="rounded-xl bg-card border border-border/50 p-4">
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Resale Amount</p>
          <p className="text-xl font-extrabold font-display text-foreground">€{sale.amount}</p>
        </div>
        <div className="rounded-xl bg-card border border-border/50 p-4">
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Venue Royalty</p>
          <p className="text-xl font-extrabold font-display text-secondary">€{sale.venueFee.toFixed(2)}</p>
          <p className="text-xs text-muted-foreground">{((sale.venueFee / sale.amount) * 100).toFixed(1)}% of resale</p>
        </div>
        <div className="rounded-xl bg-card border border-border/50 p-4">
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Platform Fee</p>
          <p className="text-xl font-extrabold font-display text-foreground">€{sale.platformFee.toFixed(2)}</p>
          <p className="text-xs text-muted-foreground">{((sale.platformFee / sale.amount) * 100).toFixed(1)}% of resale</p>
        </div>
      </div>

      {/* Seller payout */}
      <div className="rounded-xl bg-muted/30 border border-border/50 p-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Seller Payout</p>
          <p className="text-sm text-muted-foreground">Amount − Venue royalty − Platform fee</p>
        </div>
        <p className="text-2xl font-extrabold font-display text-foreground">
          €{(sale.amount - sale.venueFee - sale.platformFee).toFixed(2)}
        </p>
      </div>

      <UserProfileDialog name={profileUser} open={!!profileUser} onClose={() => setProfileUser(null)} />
    </div>
  );
}

export default function VenueResales() {
  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState<Date | undefined>(undefined);
  const [dateTo, setDateTo] = useState<Date | undefined>(undefined);
  const [selected, setSelected] = useState<VenueSale | null>(null);

  const resales = venueSales.filter((s) => s.type === "resale");

  const filtered = resales.filter((s) => {
    const matchSearch =
      (s.sellerName || "").toLowerCase().includes(search.toLowerCase()) ||
      (s.buyerName || "").toLowerCase().includes(search.toLowerCase()) ||
      s.membershipTitle.toLowerCase().includes(search.toLowerCase());
    const saleDate = new Date(s.date);
    const matchFrom = !dateFrom || saleDate >= dateFrom;
    const matchTo = !dateTo || saleDate <= dateTo;
    return matchSearch && matchFrom && matchTo;
  });

  const totalResaleVolume = resales.reduce((a, s) => a + s.amount, 0);
  const totalRoyalties = resales.reduce((a, s) => a + s.venueFee, 0);

  const kpis = [
    { label: "Total Resale Volume", value: `€${totalResaleVolume.toLocaleString()}`, icon: Repeat },
    { label: "Venue Royalties", value: `€${totalRoyalties.toFixed(2)}`, icon: DollarSign },
    { label: "Active Resale Listings", value: venueKPIs.activeListings, icon: TrendingUp },
    { label: "Resale Transactions", value: resales.length, icon: ArrowUpRight },
  ];

  if (selected) {
    return (
      <div className="space-y-5 max-w-7xl mx-auto">
        <ResaleDetail sale={selected} onBack={() => setSelected(null)} />
      </div>
    );
  }

  return (
    <div className="space-y-5 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold font-display text-foreground">Resale Market</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Secondary market activity and venue royalties</p>
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
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search seller, buyer or membership..." className="pl-9 h-9 w-72 bg-muted/20 border-border/50 text-sm" />
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className={cn("h-9 text-xs gap-1.5", !dateFrom && "text-muted-foreground")}>
              <CalendarIcon className="h-3.5 w-3.5" />
              {dateFrom ? format(dateFrom, "dd/MM/yyyy") : "From"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar mode="single" selected={dateFrom} onSelect={setDateFrom} initialFocus className={cn("p-3 pointer-events-auto")} />
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className={cn("h-9 text-xs gap-1.5", !dateTo && "text-muted-foreground")}>
              <CalendarIcon className="h-3.5 w-3.5" />
              {dateTo ? format(dateTo, "dd/MM/yyyy") : "To"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar mode="single" selected={dateTo} onSelect={setDateTo} initialFocus className={cn("p-3 pointer-events-auto")} />
          </PopoverContent>
        </Popover>
        {(dateFrom || dateTo) && (
          <Button variant="ghost" size="sm" className="h-9 text-xs gap-1" onClick={() => { setDateFrom(undefined); setDateTo(undefined); }}>
            <X className="h-3.5 w-3.5" /> Clear
          </Button>
        )}
      </div>

      <div className="rounded-xl bg-card border border-border/50 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-[13px] font-semibold">Membership</TableHead>
              <TableHead className="text-[13px] font-semibold">Seller → Buyer</TableHead>
              <TableHead className="text-[13px] font-semibold text-right">Amount</TableHead>
              <TableHead className="text-[13px] font-semibold text-right">Venue Royalty</TableHead>
              <TableHead className="text-[13px] font-semibold">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((s) => (
              <TableRow key={s.id} className="cursor-pointer" onClick={() => setSelected(s)}>
                <TableCell className="text-sm font-medium text-foreground">{s.membershipTitle}</TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {s.sellerName} → {s.buyerName}
                </TableCell>
                <TableCell className="text-right text-sm font-bold text-foreground">€{s.amount}</TableCell>
                <TableCell className="text-right">
                  <span className="inline-flex items-center gap-1 rounded-md bg-secondary/10 px-2 py-0.5 text-sm font-extrabold text-secondary">
                    €{s.venueFee.toFixed(2)}
                  </span>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{s.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}