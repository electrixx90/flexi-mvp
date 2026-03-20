import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2, CreditCard, Loader2, Lock, ShoppingBag, Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type VenueMembership } from "@/data/venueData";
import { useToast } from "@/hooks/use-toast";

type Step = "details" | "processing" | "success";

interface Props {
  membership: VenueMembership | null;
  venueName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function VenuePublicPurchaseDialog({ membership, venueName, open, onOpenChange }: Props) {
  const [step, setStep] = useState<Step>("details");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const { toast } = useToast();

  if (!membership) return null;

  const price = membership.discountedPrice || membership.price;

  const handlePurchase = () => {
    if (!email.trim() || !name.trim()) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }
    setStep("processing");
    setTimeout(() => setStep("success"), 2400);
  };

  const handleDone = () => {
    onOpenChange(false);
    setTimeout(() => {
      setStep("details");
      setEmail("");
      setName("");
    }, 300);
    toast({
      title: "Purchase confirmed! 🎉",
      description: `Your ${membership.title} pass has been sent to ${email}.`,
    });
  };

  const handleClose = (v: boolean) => {
    if (step === "processing") return;
    onOpenChange(v);
    if (!v) setTimeout(() => { setStep("details"); setEmail(""); setName(""); }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md border-border/50 bg-card/95 backdrop-blur-2xl p-0 overflow-hidden">
        <AnimatePresence mode="wait">
          {step === "details" && (
            <motion.div
              key="details"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="p-6 space-y-5"
            >
              <DialogHeader>
                <DialogTitle className="font-display text-lg flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" /> Get Your Pass
                </DialogTitle>
                <p className="text-xs text-muted-foreground">
                  Complete your details to receive your digital membership pass.
                </p>
              </DialogHeader>

              {/* Membership summary */}
              <div className="rounded-xl border border-border/50 gradient-card p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-bold font-display text-foreground">{membership.title}</p>
                    <p className="text-xs text-muted-foreground">{venueName}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {membership.type === "time-based" ? membership.durationLabel : `${membership.totalEntries} entries`}
                  </Badge>
                </div>
                <div className="h-px bg-border/40" />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total</span>
                  <div className="text-right">
                    <span className="text-xl font-extrabold font-display text-foreground">€{price}</span>
                    {membership.discountedPrice && (
                      <span className="text-xs text-muted-foreground line-through ml-2">€{membership.price}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* User details */}
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-muted-foreground">Full Name</Label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Mario Rossi"
                    className="bg-muted/20 border-border/50"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-muted-foreground">Email</Label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="mario@email.com"
                    className="bg-muted/20 border-border/50"
                  />
                </div>
              </div>

              {/* Payment indicator */}
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl gradient-hero flex items-center justify-center shadow-glow-indigo shrink-0">
                  <CreditCard className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Secure Payment</p>
                  <p className="text-xs text-muted-foreground">You'll receive your digital pass instantly after payment.</p>
                </div>
              </div>

              <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                <Lock className="h-3 w-3" /> Secured by Flexi · Verified digital pass
              </p>

              <Button onClick={handlePurchase} variant="hero" size="lg" className="w-full">
                <ShoppingBag className="h-4 w-4" /> Pay €{price}
              </Button>
            </motion.div>
          )}

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
              <p className="text-lg font-bold font-display text-foreground">Processing payment…</p>
              <p className="text-xs text-muted-foreground max-w-[260px]">
                Generating your digital membership pass and securing your access.
              </p>
            </motion.div>
          )}

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
              <p className="text-lg font-bold font-display text-foreground">You're In! 🎉</p>
              <div>
                <p className="text-sm font-semibold text-foreground">{membership.title}</p>
                <p className="text-xs text-muted-foreground">{venueName}</p>
              </div>
              <Badge variant="outline" className="text-xs text-accent border-accent/20 bg-accent/5">
                Digital pass issued
              </Badge>
              <p className="text-xs text-muted-foreground max-w-[280px]">
                Your membership pass has been sent to <strong>{email}</strong>. Show it at the venue to access.
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
