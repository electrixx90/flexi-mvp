import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { memberships, categoryIcons } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Check, ChevronRight, Eye, Tag, Zap } from "lucide-react";

const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

const steps = ["Select", "Review Value", "Set Price", "Preview", "Publish"];

export default function SellMembership() {
  const [searchParams] = useSearchParams();
  const preselectedId = searchParams.get("id");
  const [selectedId, setSelectedId] = useState<string | null>(preselectedId || null);
  const [step, setStep] = useState(preselectedId ? 2 : 0);
  const [price, setPrice] = useState(0);

  const eligible = memberships.filter((m) => m.resellEligible);
  const selected = memberships.find((m) => m.id === selectedId);

  const maxPrice = selected ? Math.round(selected.residualValue * 0.95) : 0;
  const platformFee = price * 0.05;
  const venueRoyalty = price * 0.15;
  const payout = price - platformFee - venueRoyalty;

  // Initialize price when membership selected
  if (selected && price === 0) {
    const suggestedPrice = Math.round(selected.residualValue * 0.85);
    if (suggestedPrice > 0) setPrice(suggestedPrice);
  }

  return (
    <motion.div initial="hidden" animate="show" variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } }} className="space-y-6 max-w-5xl mx-auto">
      <motion.div variants={item}>
        <h1 className="text-2xl font-extrabold font-display text-foreground">Sell Membership</h1>
        <p className="text-sm text-muted-foreground mt-1">Recover value from unused time or entries.</p>
      </motion.div>

      {/* Stepper */}
      <motion.div variants={item} className="flex items-center gap-2 overflow-x-auto pb-2">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => { if (i <= step) setStep(i); }}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold font-display transition-all ${
                i === step ? 'gradient-hero text-primary-foreground shadow-glow-indigo' :
                i < step ? 'bg-accent/15 text-accent' :
                'bg-muted/50 text-muted-foreground'
              }`}
            >
              {i < step ? <Check className="h-3.5 w-3.5" /> : <span className="h-4 w-4 flex items-center justify-center">{i + 1}</span>}
              <span className="hidden sm:inline">{s}</span>
            </button>
            {i < steps.length - 1 && <ChevronRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />}
          </div>
        ))}
      </motion.div>

      {/* Step 0: Select */}
      {step === 0 && (
        <motion.div variants={item} className="grid sm:grid-cols-2 gap-4">
          {eligible.map((m) => (
            <button
              key={m.id}
              onClick={() => { setSelectedId(m.id); setStep(1); }}
              className={`text-left rounded-2xl bg-card p-5 shadow-card hover:shadow-elevated transition-all border-2 ${selectedId === m.id ? 'border-primary' : 'border-transparent'}`}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xl">{categoryIcons[m.category]}</span>
                <div>
                  <p className="font-bold font-display text-sm text-foreground">{m.venue}</p>
                  <p className="text-xs text-muted-foreground">{m.type}</p>
                </div>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-xs text-muted-foreground">{m.remainingEntries ? `${m.remainingEntries} entries left` : `${m.remainingDays}d left`}</span>
                <span className="text-sm font-bold text-accent">€{m.residualValue}</span>
              </div>
            </button>
          ))}
        </motion.div>
      )}

      {/* Step 1: Review Value */}
      {step === 1 && selected && (
        <motion.div variants={item} className="space-y-4">
          <div className="rounded-2xl bg-card shadow-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">{categoryIcons[selected.category]}</span>
              <div>
                <p className="font-bold font-display text-foreground">{selected.venue}</p>
                <p className="text-xs text-muted-foreground">{selected.type}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-xl bg-muted/30 p-4 text-center">
                <p className="text-xs text-muted-foreground mb-1">Original</p>
                <p className="text-lg font-extrabold font-display text-foreground">€{selected.originalPrice}</p>
              </div>
              <div className="rounded-xl bg-destructive/5 p-4 text-center">
                <p className="text-xs text-muted-foreground mb-1">Used Value</p>
                <p className="text-lg font-extrabold font-display text-destructive">€{selected.originalPrice - selected.residualValue}</p>
              </div>
              <div className="rounded-xl bg-accent/10 p-4 text-center">
                <p className="text-xs text-muted-foreground mb-1">Remaining</p>
                <p className="text-lg font-extrabold font-display text-accent">€{selected.residualValue}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">Maximum suggested resale price: <span className="font-bold text-foreground">€{maxPrice}</span></p>
          </div>
          <Button variant="hero" size="lg" onClick={() => setStep(2)}>Continue to Pricing <ChevronRight className="h-4 w-4" /></Button>
        </motion.div>
      )}

      {/* Step 2: Set Price */}
      {step === 2 && selected && (
        <motion.div variants={item} className="space-y-4">
          <div className="rounded-2xl bg-card shadow-card p-6">
            <h3 className="font-bold font-display text-foreground mb-4">Set Your Price</h3>
            {/* Price slider */}
            <div className="space-y-4">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>€0</span>
                <span>Max: €{maxPrice}</span>
              </div>
              <input
                type="range"
                min={0}
                max={maxPrice}
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer accent-primary"
                style={{
                  background: `linear-gradient(90deg, hsl(215 16% 80%) 0%, hsl(172 66% 50%) ${(price / maxPrice) * 100}%, hsl(var(--border)) ${(price / maxPrice) * 100}%, hsl(var(--border)) 100%)`
                }}
              />
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Your listing price</p>
                <p className="text-4xl font-extrabold font-display text-primary">€{price}</p>
              </div>
            </div>

            {/* Breakdown */}
            <div className="mt-6 space-y-2 bg-muted/30 rounded-xl p-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Listing Price</span>
                <span className="font-medium text-foreground">€{price}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Platform Fee (5%)</span>
                <span className="text-destructive/70">-€{platformFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Venue Royalty (15%)</span>
                <span className="text-destructive/70">-€{venueRoyalty.toFixed(2)}</span>
              </div>
              <hr className="border-border" />
              <div className="flex justify-between text-sm font-bold">
                <span className="text-foreground">Your Payout</span>
                <span className="text-accent text-lg font-display">€{payout.toFixed(2)}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="lg" onClick={() => setStep(1)}>Back</Button>
            <Button variant="hero" size="lg" onClick={() => setStep(3)}>Preview Listing <Eye className="h-4 w-4" /></Button>
          </div>
        </motion.div>
      )}

      {/* Step 3: Preview */}
      {step === 3 && selected && (
        <motion.div variants={item} className="space-y-4">
          <h3 className="font-bold font-display text-foreground text-lg">Listing Preview</h3>
          <p className="text-sm text-muted-foreground">This is how buyers will see your listing.</p>

          {/* Preview Card */}
          <div className="rounded-2xl overflow-hidden shadow-elevated bg-card max-w-md mx-auto">
            <div className={`h-24 bg-gradient-to-br ${selected.imageGradient} relative`}>
              <div className="absolute top-3 right-3">
                <motion.div
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="bg-accent text-accent-foreground text-xs font-extrabold px-3 py-1.5 rounded-full shadow-glow-mint"
                >
                  Save €{selected.originalPrice - price}
                </motion.div>
              </div>
              <div className="absolute bottom-3 left-4">
                <span className="text-3xl">{categoryIcons[selected.category]}</span>
              </div>
            </div>
            <div className="p-5">
              <p className="font-extrabold font-display text-foreground text-lg">{selected.venue}</p>
              <p className="text-sm text-muted-foreground">{selected.type} · {selected.location}</p>

              <div className="mt-4 flex items-end gap-2">
                <span className="text-2xl font-extrabold font-display text-primary">€{price}</span>
                <span className="text-sm text-muted-foreground line-through">€{selected.originalPrice}</span>
              </div>

              <div className="mt-3 flex gap-2 flex-wrap">
                <span className="text-xs bg-accent/10 text-accent px-2.5 py-1 rounded-full font-medium">{selected.remainingEntries ? `${selected.remainingEntries} entries` : `${selected.remainingDays} days left`}</span>
                <span className="text-xs bg-muted/50 text-muted-foreground px-2.5 py-1 rounded-full">📍 {selected.location}</span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <motion.div
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  className="rounded-xl bg-accent/10 p-3 text-center"
                >
                  <p className="text-xs text-muted-foreground">Buyer Saves</p>
                  <p className="text-lg font-extrabold font-display text-accent">€{selected.originalPrice - price}</p>
                </motion.div>
                <motion.div
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  className="rounded-xl bg-primary/10 p-3 text-center"
                >
                  <p className="text-xs text-muted-foreground">Your Payout</p>
                  <p className="text-lg font-extrabold font-display text-primary">€{payout.toFixed(0)}</p>
                </motion.div>
              </div>
            </div>
          </div>

          <div className="flex gap-3 justify-center">
            <Button variant="outline" size="lg" onClick={() => setStep(2)}>Adjust Price</Button>
            <Button variant="hero" size="lg" onClick={() => setStep(4)}>
              <Zap className="h-4 w-4" /> Publish Listing
            </Button>
          </div>
        </motion.div>
      )}

      {/* Step 4: Published */}
      {step === 4 && selected && (
        <motion.div
          variants={item}
          className="flex flex-col items-center text-center py-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="h-20 w-20 rounded-full gradient-hero flex items-center justify-center mb-6"
          >
            <Check className="h-10 w-10 text-primary-foreground" />
          </motion.div>
          <h2 className="text-2xl font-extrabold font-display text-foreground">Listing Published! 🎉</h2>
          <p className="text-sm text-muted-foreground mt-2 max-w-sm">
            Your {selected.venue} membership is now live on the marketplace. We'll notify you when a buyer is interested.
          </p>
          <div className="mt-6 rounded-xl bg-accent/10 px-6 py-3">
            <p className="text-xs text-muted-foreground">Expected Payout</p>
            <p className="text-2xl font-extrabold font-display text-accent">€{payout.toFixed(2)}</p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
