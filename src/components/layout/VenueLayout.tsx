import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { VenueSidebar } from "./VenueSidebar";
import { VenueTopBar } from "./VenueTopBar";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { TurnstileProvider } from "@/contexts/TurnstileContext";

export function VenueLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const sidebarWidth = isDesktop ? (collapsed ? 72 : 256) : 0;

  return (
    <TurnstileProvider>
      <div className="min-h-screen bg-background">
        {isDesktop && (
          <VenueSidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
        )}

        <AnimatePresence>
          {mobileOpen && !isDesktop && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm"
                onClick={() => setMobileOpen(false)}
              />
              <motion.div
                initial={{ x: -280 }}
                animate={{ x: 0 }}
                exit={{ x: -280 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed left-0 top-0 bottom-0 z-50"
              >
                <VenueSidebar collapsed={false} onToggle={() => setMobileOpen(false)} />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="absolute top-4 -right-11 h-9 w-9 rounded-full bg-card shadow-elevated flex items-center justify-center"
                >
                  <X className="h-4 w-4" />
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <div
          className="flex flex-col min-h-screen transition-[margin] duration-300 ease-out"
          style={{ marginLeft: sidebarWidth }}
        >
          <VenueTopBar onMobileMenuToggle={() => setMobileOpen(true)} />
          <main className="flex-1 p-4 lg:p-6 xl:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </TurnstileProvider>
  );
}
