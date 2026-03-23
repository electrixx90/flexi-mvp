import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Globe, CreditCard, BarChart3, Repeat,
  QrCode, ClipboardList, Settings, ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import logoRect from "@/assets/logo_rect.png";
import logoSymbol from "@/assets/logo_symbol.png";

const navSections = [
  { label: "Overview", items: [{ title: "Dashboard", url: "/venue", icon: LayoutDashboard }] },
  { label: "Content", items: [
    { title: "Public Page", url: "/venue/builder", icon: Globe },
    { title: "Memberships", url: "/venue/memberships", icon: CreditCard },
  ]},
  { label: "Analytics", items: [
    { title: "Sales Overview", url: "/venue/sales", icon: BarChart3 },
    { title: "Resale Market", url: "/venue/resales", icon: Repeat },
  ]},
  { label: "Operations", items: [
    { title: "Access Validation", url: "/venue/access-validation", icon: QrCode },
    { title: "Access Log", url: "/venue/access-log", icon: ClipboardList },
  ]},
  { label: "Settings", items: [{ title: "Venue Settings", url: "/venue/settings", icon: Settings }] },
];

interface VenueSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function VenueSidebar({ collapsed, onToggle }: VenueSidebarProps) {
  const location = useLocation();

  const isActive = (url: string) => {
    if (url === "/venue") return location.pathname === "/venue";
    return location.pathname.startsWith(url);
  };

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 72 : 256 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed left-0 top-0 bottom-0 z-40 flex flex-col border-r border-border bg-card"
    >
      {/* Logo */}
      <div className="flex h-16 items-center px-4 gap-3 border-b border-border">
        {!collapsed && (
            <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="min-w-0">
              <a href="/">
                <img src={logoRect} alt="Flexi" className="h-8 block"/>
              </a>
            </motion.div>
          )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-3 space-y-4 overflow-y-auto">
        {navSections.map((section) => (
          <div key={section.label}>
            {!collapsed && (
              <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-3 mb-1.5">
                {section.label}
              </p>
            )}
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const active = isActive(item.url);
                return (
                  <Link
                    key={item.url}
                    to={item.url}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 relative",
                      active
                        ? "bg-secondary/10 text-secondary"
                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                    )}
                  >
                    {active && (
                      <motion.div
                        layoutId="venue-sidebar-active"
                        className="absolute left-0 top-1 bottom-1 w-[3px] rounded-full bg-secondary"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    <item.icon className={cn("h-[18px] w-[18px] shrink-0", active && "text-secondary")} />
                    {!collapsed && <span className="truncate">{item.title}</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Client switch */}
      {!collapsed && (
        <div className="px-3 pb-2">
          <Link
            to="/client"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          >
            ← Switch to Client
          </Link>
        </div>
      )}

      <button
        onClick={onToggle}
        className="flex items-center justify-center h-11 border-t border-border text-muted-foreground hover:text-foreground transition-colors"
      >
        <ChevronLeft className={cn("h-4 w-4 transition-transform duration-300", collapsed && "rotate-180")} />
      </button>
    </motion.aside>
  );
}
