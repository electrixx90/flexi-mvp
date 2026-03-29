import { Search, ChevronDown, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NotificationsPopover } from "./NotificationsPopover";

interface TopBarProps {
  onMobileMenuToggle: () => void;
}

export function TopBar({ onMobileMenuToggle }: TopBarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border glass px-4 lg:px-6">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMobileMenuToggle}
        >
          <Menu className="h-5 w-5" />
        </Button>
        {/* Search */}
        <div className="hidden sm:flex items-center gap-2 rounded-xl bg-muted/50 px-3.5 py-2 w-64 lg:w-80">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search memberships, venues..."
            className="bg-transparent text-sm outline-none w-full placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <NotificationsPopover />
        <div className="flex items-center gap-2 rounded-xl px-2 py-1.5 hover:bg-muted/50 cursor-pointer transition-colors">
          <div className="h-8 w-8 rounded-full gradient-hero flex items-center justify-center text-xs font-bold text-primary-foreground">
            AK
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-semibold font-display leading-none">Alex K.</p>
            <p className="text-xs text-muted-foreground">Premium</p>
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground hidden md:block" />
        </div>
      </div>
    </header>
  );
}
