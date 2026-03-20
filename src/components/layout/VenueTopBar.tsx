import { Search, Bell, ChevronDown, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTurnstile } from "@/contexts/TurnstileContext";

interface VenueTopBarProps {
  onMobileMenuToggle: () => void;
}

export function VenueTopBar({ onMobileMenuToggle }: VenueTopBarProps) {
  const { turnstileActive } = useTurnstile();

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-card px-4 lg:px-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="lg:hidden h-8 w-8" onClick={onMobileMenuToggle}>
          <Menu className="h-4 w-4" />
        </Button>
        <div className="hidden sm:flex items-center gap-2 rounded-lg bg-muted/40 border border-border/50 px-3 py-1.5 w-64 lg:w-80">
          <Search className="h-3.5 w-3.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search members, passes, transactions..."
            className="bg-transparent text-sm outline-none w-full placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        {turnstileActive ? (
          <Badge variant="outline" className="text-[11px] px-2 py-0.5 border-accent/30 text-accent bg-accent/5 hidden sm:inline-flex gap-1">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent" />
            </span>
            Tornello attivo
          </Badge>
        ) : (
          <Badge variant="outline" className="text-[11px] px-2 py-0.5 border-muted-foreground/30 text-muted-foreground bg-muted/30 hidden sm:inline-flex gap-1">
            <span className="relative flex h-1.5 w-1.5">
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-muted-foreground/50" />
            </span>
            Tornello non attivo
          </Badge>
        )}
        <Badge variant="outline" className="text-[11px] px-2 py-0.5 border-accent/30 text-accent bg-accent/5 hidden sm:inline-flex">
          Business
        </Badge>
        <Button variant="ghost" size="icon" className="relative h-8 w-8">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive" />
        </Button>
        <div className="flex items-center gap-2 rounded-lg px-2 py-1 hover:bg-muted/50 cursor-pointer transition-colors">
          <div className="h-7 w-7 rounded-lg bg-secondary flex items-center justify-center text-[11px] font-bold text-secondary-foreground">
            IT
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-semibold font-display leading-none">Iron Temple</p>
            <p className="text-xs text-muted-foreground">Manager</p>
          </div>
          <ChevronDown className="h-3 w-3 text-muted-foreground hidden md:block" />
        </div>
      </div>
    </header>
  );
}
