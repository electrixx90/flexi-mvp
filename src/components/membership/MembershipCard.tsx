import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { type Membership, categoryIcons } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Tag, Send, Eye, QrCode } from "lucide-react";
import { MembershipPassDialog } from "./MembershipPassDialog";

interface Props {
  membership: Membership;
}

export function MembershipCard({ membership: m }: Props) {
  const [passOpen, setPassOpen] = useState(false);

  const usagePercent = m.totalEntries
    ? ((m.totalEntries - (m.remainingEntries || 0)) / m.totalEntries) * 100
    : ((m.totalDays - m.remainingDays) / m.totalDays) * 100;

  const statusColors: Record<string, string> = {
    active: "bg-accent/15 text-accent",
    "partially-used": "bg-amber-100 text-amber-700",
    listed: "bg-primary/10 text-primary",
    sold: "bg-muted text-muted-foreground",
    expired: "bg-destructive/10 text-destructive",
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -4, scale: 1.01 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className="rounded-2xl bg-card shadow-card overflow-hidden group"
      >
        <div className={`h-2 bg-gradient-to-r ${m.imageGradient}`} />

        <div className="p-5">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">{categoryIcons[m.category] || '🎯'}</span>
              <div>
                <p className="font-bold font-display text-[15px] text-foreground leading-tight">{m.venue}</p>
                <p className="text-[13px] text-muted-foreground">{m.type}</p>
              </div>
            </div>
            <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${statusColors[m.status]}`}>
              {m.status.replace('-', ' ')}
            </span>
          </div>

          <p className="text-[13px] text-muted-foreground mb-3">📍 {m.location}</p>

          <div className="rounded-xl bg-muted/30 p-3 mb-3">
            <div className="flex justify-between items-center mb-2">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Residual Value</p>
                <p className="text-xl font-extrabold font-display text-accent">€{m.residualValue}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Original</p>
                <p className="text-[15px] font-bold text-foreground/60">€{m.originalPrice}</p>
              </div>
            </div>
            <div className="h-1.5 rounded-full bg-border overflow-hidden">
              <div
                className="h-full rounded-full gradient-value transition-all duration-500"
                style={{ width: `${100 - usagePercent}%` }}
              />
            </div>
            <div className="flex justify-between mt-1.5">
              <span className="text-xs text-muted-foreground">
                {m.remainingEntries !== undefined ? `${m.remainingEntries}/${m.totalEntries} entries left` : `${m.remainingDays}d remaining`}
              </span>
              <span className="text-xs font-medium text-accent">{Math.round(100 - usagePercent)}% left</span>
            </div>
          </div>

          <div className="flex gap-3 text-[13px] text-muted-foreground mb-4">
            <span>Start: {m.startDate}</span>
            <span>End: {m.endDate}</span>
          </div>

          <div className="flex gap-2">
            <Button size="sm" variant="ghost" className="flex-1 text-[13px]" asChild>
              <Link to={`/client/memberships/${m.id}`}>
                <Eye className="h-4 w-4" /> Details
              </Link>
            </Button>
            {m.resellEligible && (
              <Button size="sm" variant="mint" className="flex-1 text-[13px]" asChild>
                <Link to={`/client/sell?id=${m.id}`}>
                  <Tag className="h-4 w-4" /> Sell
                </Link>
              </Button>
            )}
            <Button size="sm" variant="outline" className="text-[13px]" onClick={() => setPassOpen(true)}>
              <QrCode className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>

      <MembershipPassDialog
        membership={m}
        open={passOpen}
        onOpenChange={setPassOpen}
      />
    </>
  );
}
