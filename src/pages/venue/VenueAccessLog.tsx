import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { accessEvents } from "@/data/venueData";

const resultColors: Record<string, string> = {
  valid: "text-accent border-accent/30 bg-accent/5",
  expired: "text-destructive border-destructive/30 bg-destructive/5",
  "already-used": "text-amber-600 border-amber-300 bg-amber-50",
  blocked: "text-destructive border-destructive/30 bg-destructive/5",
  rejected: "text-destructive border-destructive/30 bg-destructive/5",
};

const methodLabels: Record<string, string> = {
  "qr-scan": "QR Scan",
  manual: "Manual",
  nfc: "NFC",
};

export default function VenueAccessLog() {
  const [search, setSearch] = useState("");
  const [resultFilter, setResultFilter] = useState("all");
  const [methodFilter, setMethodFilter] = useState("all");

  const filtered = accessEvents.filter((e) => {
    const matchSearch =
      e.memberName.toLowerCase().includes(search.toLowerCase()) ||
      e.passTitle.toLowerCase().includes(search.toLowerCase()) ||
      e.passId.toLowerCase().includes(search.toLowerCase());
    const matchResult = resultFilter === "all" || e.result === resultFilter;
    const matchMethod = methodFilter === "all" || e.method === methodFilter;
    return matchSearch && matchResult && matchMethod;
  });

  return (
    <div className="space-y-5 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold font-display text-foreground">Access Log</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Complete history of check-in events</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search member, pass..." className="pl-9 h-9 w-64 bg-muted/20 border-border/50 text-sm" />
        </div>
        <Tabs value={resultFilter} onValueChange={setResultFilter}>
          <TabsList className="bg-muted/40 border border-border/50 p-0.5 h-9">
            <TabsTrigger value="all" className="text-xs h-7 rounded-md px-3">All</TabsTrigger>
            <TabsTrigger value="valid" className="text-xs h-7 rounded-md px-3">Valid</TabsTrigger>
            <TabsTrigger value="expired" className="text-xs h-7 rounded-md px-3">Expired</TabsTrigger>
            <TabsTrigger value="rejected" className="text-xs h-7 rounded-md px-3">Rejected</TabsTrigger>
          </TabsList>
        </Tabs>
        <Select value={methodFilter} onValueChange={setMethodFilter}>
          <SelectTrigger className="h-9 w-36 bg-muted/20 border-border/50 text-xs">
            <Filter className="h-3 w-3 mr-1" />
            <SelectValue placeholder="Method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Methods</SelectItem>
            <SelectItem value="qr-scan">QR Scan</SelectItem>
            <SelectItem value="manual">Manual</SelectItem>
            <SelectItem value="nfc">NFC</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-xl bg-card border border-border/50 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-[13px] font-semibold">Time</TableHead>
              <TableHead className="text-[13px] font-semibold">Member</TableHead>
              <TableHead className="text-[13px] font-semibold">Pass</TableHead>
              <TableHead className="text-[13px] font-semibold">Pass ID</TableHead>
              <TableHead className="text-[13px] font-semibold">Method</TableHead>
              <TableHead className="text-[13px] font-semibold">Remaining</TableHead>
              <TableHead className="text-[13px] font-semibold">Result</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((e) => (
              <TableRow key={e.id}>
                <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                  {new Date(e.timestamp).toLocaleDateString('it-IT', { day: '2-digit', month: 'short' })}{" "}
                  {new Date(e.timestamp).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}
                </TableCell>
                <TableCell className="text-sm font-medium text-foreground">{e.memberName}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{e.passTitle}</TableCell>
                <TableCell className="text-xs font-mono text-muted-foreground">{e.passId}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-[11px] px-2 py-0.5">{methodLabels[e.method]}</Badge>
                </TableCell>
                <TableCell className="text-sm text-foreground">
                  {e.remainingEntries !== undefined ? `${e.remainingEntries} entries` :
                   e.remainingDays !== undefined ? `${e.remainingDays} days` : "—"}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={`text-[11px] px-2 py-0.5 ${resultColors[e.result]}`}>
                    {e.result}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <p className="text-xs text-muted-foreground text-center">{filtered.length} events shown</p>
    </div>
  );
}