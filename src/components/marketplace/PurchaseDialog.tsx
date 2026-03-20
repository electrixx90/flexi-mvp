import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  Loader2,
  Lock,
  ShoppingBag,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { type MarketplaceListing, walletData } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

type Step = "review" | "processing" | "success";

interface Props {
  listing: MarketplaceListing | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  walletBalance: number;
  onPurchaseComplete: (listing: MarketplaceListing, walletUsed: number) => void;
}

export function PurchaseDialog({
  listing,
  open,
  onOpenChange,
  walletBalance,
  onPurchaseComplete,
}: Props) {
  const [step, setStep] = useState<Step>("review");
  const [useWallet, setUseWallet] = useState(true);
  const { toast } = useToast();

  if (!listing) return null;

  const walletCredit = useWallet ? Math.min(walletBalance, listing.resalePrice) : 0;
  const cardCharge = listing.resalePrice - walletCredit;

  const handleConfirm = () => {
    setStep("processing");
    setTimeout(() => setStep("success"), 2200);
  };

  const handleDone = () => {
    onPurchaseComplete(listing, walletCredit);
    onOpenChange(false);
    setTimeout(() => setStep("review"), 300);
    toast({
      title: "Purchase confirmed",
      description: `${listing.venue} — ${listing.type} is now yours.`,
    });
  };

  const handleClose = (v: boolean) => {
    if (step === "processing") return;
    onOpenChange(v);
    if (!v) setTimeout(() => setStep("review"), 300);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md border-border/50 bg-card/95 backdrop-blur-2xl p-0 overflow-hidden">
        <AnimatePresence mode="wait">
          {/* ── Step 1: Review ── */}
          {step === "review" && (
            <motion.div
              key="review"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="p-6 space-y-5"
            >
              <DialogHeader>
                <DialogTitle className="font-display text-lg flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-primary" /> Confirm Purchase
                </DialogTitle>
                <p className="text-xs text-muted-foreground">
                  Review the details before completing your purchase.
                </p>
              </DialogHeader>

              {/* Listing summary */}
              <div className="rounded-xl border border-border/50 bg-muted/10 p-4 space-y-3">
                <div>
                  <p className="text-sm font-bold font-display text-foreground">
                    {listing.venue}
                  </p>
                  <p className="text-xs text-muted-foreground">{listing.type} · {listing.location}</p>
                </div>
                <div className="h-px bg-border/40" />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Price</span>
                  <span className="text-lg font-extrabold font-display text-foreground">
                    €{listing.resalePrice.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Original</span>
                  <span className="text-sm text-muted-foreground line-through">
                    €{listing.originalPrice.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">You save</span>
                  <span className="text-sm font-bold text-accent">
                    €{listing.savings.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Wallet toggle */}
              <div className="rounded-xl border border-border/50 bg-muted/10 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-lg gradient-hero flex items-center justify-center shadow-glow-indigo shrink-0">
                      <Wallet className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Use Flexi Credit</p>
                      <p className="text-xs text-muted-foreground">
                        Available: €{walletBalance.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <Switch checked={useWallet} onCheckedChange={setUseWallet} />
                </div>

                {useWallet && walletCredit > 0 && (
                  <div className="space-y-2 pt-1">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Flexi credit</span>
                      <span className="font-bold text-accent">−€{walletCredit.toFixed(2)}</span>
                    </div>
                    {cardCharge > 0 && (
                      <div className="flex justify-between items-center text-sm">
                       <span className="text-muted-foreground">Card payment</span>
                        <span className="font-medium text-foreground">€{cardCharge.toFixed(2)}</span>
                      </div>
                    )}
                    {cardCharge === 0 && (
                      <Badge className="bg-accent/15 text-accent border-accent/20 text-xs">
                        Fully covered by Flexi credit
                      </Badge>
                    )}
                  </div>
                )}

                {!useWallet && (
                  <div className="flex justify-between items-center text-sm pt-1">
                    <span className="text-muted-foreground">Card payment</span>
                    <span className="font-medium text-foreground">
                      €{listing.resalePrice.toFixed(2)}
                    </span>
                  </div>
                )}
              </div>

              {/* Total */}
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 flex items-center justify-between">
                <span className="text-sm font-semibold text-foreground">Total due</span>
                <div className="text-right">
                  <span className="text-2xl font-extrabold font-display text-foreground">
                    €{listing.resalePrice.toFixed(2)}
                  </span>
                  {useWallet && walletCredit > 0 && (
                    <p className="text-xs text-muted-foreground">
                      {cardCharge > 0
                        ? `€${walletCredit.toFixed(2)} credit + €${cardCharge.toFixed(2)} card`
                        : "Paid with Flexi Credit"}
                    </p>
                  )}
                </div>
              </div>

              <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                <Lock className="h-3 w-3" /> Protected purchase by Flexi · Secure transfer
              </p>

              <Button onClick={handleConfirm} variant="hero" size="lg" className="w-full">
                <ShoppingBag className="h-4 w-4" /> Confirm & Pay
              </Button>
            </motion.div>
          )}

          {/* ── Step 2: Processing ── */}
          {step === "processing" && (
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
              <p className="text-lg font-bold font-display text-foreground">Processing purchase…</p>
              <p className="text-xs text-muted-foreground max-w-[260px]">
                Verifying membership availability and securing your access pass.
              </p>
            </motion.div>
          )}

          {/* ── Step 3: Success ── */}
          {step === "success" && (
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
              <p className="text-lg font-bold font-display text-foreground">Purchase Complete!</p>
              <div>
                <p className="text-sm font-semibold text-foreground">{listing.venue}</p>
                <p className="text-xs text-muted-foreground">{listing.type}</p>
              </div>
              <Badge variant="outline" className="text-xs text-accent border-accent/20 bg-accent/5">
                Verified purchase
              </Badge>
              <p className="text-xs text-muted-foreground max-w-[280px]">
                Your membership access pass has been transferred to your account. Check <strong>My Memberships</strong> to view it.
              </p>
              <Button onClick={handleDone} size="lg" className="mt-2">
                Done
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
