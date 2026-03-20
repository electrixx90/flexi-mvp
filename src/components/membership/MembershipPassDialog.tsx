import { motion, AnimatePresence } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { X, Shield, Smartphone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { type Membership, categoryIcons } from "@/data/mockData";
import { Dialog, DialogContent } from "@/components/ui/dialog";

import gymImg from "@/assets/category-gym.jpg";
import bjjImg from "@/assets/category-bjj.jpg";
import danceImg from "@/assets/category-dance.jpg";
import wellnessImg from "@/assets/category-wellness.jpg";
import yogaImg from "@/assets/category-yoga.jpg";

const categoryImages: Record<string, string> = {
  gym: gymImg,
  bjj: bjjImg,
  dance: danceImg,
  wellness: wellnessImg,
  yoga: yogaImg,
};

interface Props {
  membership: Membership | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MembershipPassDialog({ membership: m, open, onOpenChange }: Props) {
  if (!m) return null;

  const tokenId = `FLX-${m.id.toUpperCase()}${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
  const qrValue = `flexi://pass/${m.id}/${tokenId}`;
  const isActive = m.status === "active" || m.status === "partially-used";

  const accessLabel = m.remainingEntries !== undefined
    ? `${m.remainingEntries} entries remaining`
    : `${m.remainingDays} days · unlimited check-ins`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm p-0 border-0 bg-transparent shadow-none overflow-hidden [&>button]:hidden">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              className="rounded-3xl overflow-hidden bg-secondary text-secondary-foreground shadow-elevated relative"
            >
              {/* Hero image */}
              <div className="relative h-40 overflow-hidden">
                <img
                  src={categoryImages[m.category] || gymImg}
                  alt={m.venue}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/40 to-transparent" />

                {/* Close */}
                <button
                  onClick={() => onOpenChange(false)}
                  className="absolute top-3 right-3 h-8 w-8 rounded-full bg-secondary/60 backdrop-blur-sm flex items-center justify-center hover:bg-secondary/80 transition-colors"
                >
                  <X className="h-4 w-4 text-secondary-foreground" />
                </button>
              </div>

              {/* Content */}
              <div className="px-6 pb-6 -mt-6 relative z-10">
                {/* Badges */}
                <div className="flex gap-2 mb-4">
                  <Badge className={`text-xs font-bold border-0 ${isActive ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"}`}>
                    {isActive ? "VALID PASS" : m.status.toUpperCase()}
                  </Badge>
                  <Badge className="text-xs font-bold bg-secondary-foreground/15 text-secondary-foreground border-0">
                    DIGITAL PASS
                  </Badge>
                </div>

                {/* Title */}
                <h2 className="text-xl font-extrabold font-display text-secondary-foreground leading-tight">
                  {m.type}
                </h2>
                <p className="text-sm text-secondary-foreground/60 mt-0.5">
                  {m.venue} · {m.location}
                </p>

                {/* Details */}
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-secondary-foreground/50">Access</span>
                    <span className="text-xs font-semibold text-secondary-foreground">
                      {accessLabel}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-secondary-foreground/50">Validity</span>
                    <span className="text-xs font-semibold text-accent">
                      {m.startDate} → {m.endDate}
                    </span>
                  </div>
                </div>

                {/* QR Code */}
                <div className="mt-6 flex flex-col items-center">
                  <div className="bg-primary-foreground rounded-2xl p-4 shadow-card">
                    <QRCodeSVG
                      value={qrValue}
                      size={160}
                      level="M"
                      bgColor="hsl(0, 0%, 100%)"
                      fgColor="hsl(222, 47%, 11%)"
                      imageSettings={{
                        src: "",
                        height: 0,
                        width: 0,
                        excavate: false,
                      }}
                    />
                  </div>

                  <p className="text-xs text-secondary-foreground/40 uppercase tracking-widest font-semibold mt-3 flex items-center gap-1.5">
                    <Smartphone className="h-3 w-3" /> Pass ID (Scan at Entry)
                  </p>

                  <div className="mt-2 w-full rounded-xl bg-secondary-foreground/10 border border-secondary-foreground/10 py-2.5 px-4 text-center">
                    <span className="text-sm font-bold font-display text-secondary-foreground tracking-wide">
                      {tokenId}
                    </span>
                  </div>

                  <p className="text-xs text-secondary-foreground/30 mt-3 flex items-center gap-1">
                    <Shield className="h-3 w-3" /> Protected by Flexi
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
