import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  CreditCard,
  ShoppingBag,
  Tag,
  Receipt,
  Wallet,
  Settings,
  ChevronLeft,
  MapPin,
} from "lucide-react";
import { cn } from "@/lib/utils";
import logoRect from "@/assets/logo_rect.png";
import logoSymbol from "@/assets/logo_symbol.png";

const navItems = [
  { title: "Dashboard", url: "/client", icon: LayoutDashboard },
  { title: "My Memberships", url: "/client/memberships", icon: CreditCard },
  { title: "Marketplace", url: "/client/marketplace", icon: ShoppingBag },
  { title: "Nearby", url: "/client/nearby", icon: MapPin },
  { title: "Sell Membership", url: "/client/sell", icon: Tag },
  { title: "Transactions", url: "/client/transactions", icon: Receipt },
  { title: "Balance", url: "/client/wallet", icon: Wallet },
  { title: "Settings", url: "/client/settings", icon: Settings },
];

interface AppSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function AppSidebar({ collapsed, onToggle }: AppSidebarProps) {
  const location = useLocation();

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed left-0 top-0 bottom-0 z-40 flex flex-col border-r border-border bg-card"
    >
      {/* Logo */}
      <div className="flex h-16 items-center px-4 gap-2">
        {!collapsed && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <a href="/">
              <img src={logoRect} alt="Flexi" className="h-8"/>
            </a>
          </motion.div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const active = location.pathname === item.url ||
            (item.url !== "/client" && location.pathname.startsWith(item.url));
          return (
            <Link
              key={item.url}
              to={item.url}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 group relative",
                active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              )}
            >
              {active && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-xl bg-primary/10"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <item.icon className={cn("h-5 w-5 shrink-0 relative z-10", active && "text-primary")} />
              {!collapsed && (
                <span className="relative z-10 truncate">{item.title}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Venue switch */}
      {!collapsed && (
        <div className="px-3 pb-2">
          <Link
            to="/venue"
            className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          >
            → Switch to Venue
          </Link>
        </div>
      )}

      {/* Collapse toggle */}
      <button
        onClick={onToggle}
        className="flex items-center justify-center h-12 border-t border-border text-muted-foreground hover:text-foreground transition-colors"
      >
        <ChevronLeft
          className={cn(
            "h-5 w-5 transition-transform duration-300",
            collapsed && "rotate-180"
          )}
        />
      </button>
    </motion.aside>
  );
}
