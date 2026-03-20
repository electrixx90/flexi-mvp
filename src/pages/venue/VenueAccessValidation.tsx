import { useState, useCallback } from "react";
import {
  QrCode, CheckCircle2, XCircle, AlertTriangle, Clock,
  User, CreditCard, Calendar, Hash, Shield, ScanLine,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { accessEvents, type AccessEvent } from "@/data/venueData";

const resultConfig: Record<string, { color: string; icon: typeof CheckCircle2; label: string }> = {
  valid: { color: "text-accent", icon: CheckCircle2, label: "Valid — Access Granted" },
  expired: { color: "text-destructive", icon: XCircle, label: "Expired — Access Denied" },
  "already-used": { color: "text-amber-600", icon: AlertTriangle, label: "Already Used — Denied" },
  blocked: { color: "text-destructive", icon: XCircle, label: "Blocked — Contact Support" },
  rejected: { color: "text-destructive", icon: XCircle, label: "Rejected — Invalid Pass" },
};

export default function VenueAccessValidation() {
  const [code, setCode] = useState("");
  const [validatedEvent, setValidatedEvent] = useState<AccessEvent | null>(null);
  const [scanning, setScanning] = useState(false);

  const handleValidate = useCallback(() => {
    const trimmed = code.trim().toUpperCase();
    const found = accessEvents.find(
      (e) => e.passId === trimmed || e.passId.includes(trimmed)
    );
    setValidatedEvent(found || null);
    if (!found && trimmed) {
      setValidatedEvent({
        id: "not-found", memberName: "Unknown", passTitle: "Not Found", passId: trimmed,
        timestamp: new Date().toISOString(), method: "manual", result: "rejected", expiresAt: "",
      });
    }
  }, [code]);

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      const randomEvent = accessEvents[Math.floor(Math.random() * accessEvents.length)];
      setCode(randomEvent.passId);
      setValidatedEvent(randomEvent);
      setScanning(false);
    }, 1500);
  };

  const handleConfirm = () => {
    setValidatedEvent(null);
    setCode("");
  };

  const rc = validatedEvent ? resultConfig[validatedEvent.result] : null;
  const ResultIcon = rc?.icon || CheckCircle2;

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="text-center">
        <h1 className="text-2xl font-extrabold font-display text-foreground">Access Validation</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Scan or enter a pass code to validate access</p>
      </div>

      {/* Scan area */}
      <div className="rounded-2xl bg-card border border-border/50 p-6 space-y-5">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter pass code (e.g. NFT-1A2B)"
              className="pl-10 h-12 text-base bg-muted/20 border-border/50"
              onKeyDown={(e) => e.key === "Enter" && handleValidate()}
            />
          </div>
          <Button onClick={handleValidate} size="lg" className="h-12 px-6">
            <Shield className="h-4 w-4" /> Validate
          </Button>
          <Button onClick={handleScan} variant="outline" size="lg" className="h-12 px-6" disabled={scanning}>
            <ScanLine className={`h-4 w-4 ${scanning ? "animate-pulse" : ""}`} />
            {scanning ? "Scanning..." : "Scan QR"}
          </Button>
        </div>
      </div>

      {/* Result card */}
      {validatedEvent && (
        <div className="rounded-2xl bg-card border border-border/50 overflow-hidden">
          {/* Status banner */}
          <div className={`px-6 py-4 flex items-center gap-3 ${
            validatedEvent.result === "valid" ? "bg-accent/10" : "bg-destructive/10"
          }`}>
            <ResultIcon className={`h-6 w-6 ${rc?.color}`} />
            <span className={`text-base font-bold font-display ${rc?.color}`}>
              {rc?.label}
            </span>
          </div>

          {/* Details */}
          <div className="p-6 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <User className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Member</p>
                  <p className="text-sm font-semibold text-foreground">{validatedEvent.memberName}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CreditCard className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Pass</p>
                  <p className="text-sm font-semibold text-foreground">{validatedEvent.passTitle}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Hash className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Pass ID</p>
                  <p className="text-sm font-mono text-foreground">{validatedEvent.passId}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Expires</p>
                  <p className="text-sm text-foreground">{validatedEvent.expiresAt || "N/A"}</p>
                </div>
              </div>
              {validatedEvent.remainingEntries !== undefined && (
                <div className="flex items-start gap-3">
                  <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Remaining Entries</p>
                    <p className="text-sm font-bold text-foreground">{validatedEvent.remainingEntries}</p>
                  </div>
                </div>
              )}
              {validatedEvent.remainingDays !== undefined && (
                <div className="flex items-start gap-3">
                  <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Remaining Days</p>
                    <p className="text-sm font-bold text-foreground">{validatedEvent.remainingDays}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              {validatedEvent.result === "valid" ? (
                <Button onClick={handleConfirm} size="lg" className="flex-1 h-12">
                  <CheckCircle2 className="h-4 w-4" /> Confirm Access
                </Button>
              ) : (
                <Button onClick={handleConfirm} variant="outline" size="lg" className="flex-1 h-12">
                  Dismiss
                </Button>
              )}
              {validatedEvent.result !== "valid" && (
                <Button variant="destructive" size="lg" className="h-12">
                  <XCircle className="h-4 w-4" /> Flag
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Empty state */}
      {!validatedEvent && (
        <div className="rounded-2xl border-2 border-dashed border-border bg-muted/10 p-12 text-center">
          <QrCode className="h-12 w-12 text-muted-foreground/40 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground font-medium">Scan a QR code or enter a pass ID to validate access</p>
          <p className="text-xs text-muted-foreground/60 mt-1">Try: NFT-1A2B, NFT-3C4D, NFT-9I0J</p>
        </div>
      )}
    </div>
  );
}