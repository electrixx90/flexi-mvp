import { useMemo, useState } from "react";
import {
  Bell,
  CheckCircle2,
  ChevronRight,
  Clock3,
  CreditCard,
  Repeat,
  Router,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type VenueNotificationTone = "success" | "info" | "warning";

type VenueNotificationItem = {
  id: string;
  title: string;
  description: string;
  time: string;
  category: string;
  tone: VenueNotificationTone;
  unread: boolean;
};

const initialNotifications: VenueNotificationItem[] = [
  {
    id: "resale-completed",
    title: "Membership resale completed",
    description:
      "Premium Unlimited Monthly was successfully resold from Anna Neri to Marco Rossi. €6.80 royalty has been added to your venue balance.",
    time: "4 min ago",
    category: "Resales",
    tone: "success",
    unread: true,
  },
  {
    id: "checkin-review",
    title: "3 check-ins need review",
    description:
      "Manual validations are waiting in Access Validation. Review them before the evening rush to avoid delays at entry.",
    time: "12 min ago",
    category: "Access",
    tone: "warning",
    unread: true,
  },
  {
    id: "new-sale",
    title: "New direct sale confirmed",
    description:
      "A customer purchased Iron Temple 10-Entry Pass from your public venue page. The transaction has been recorded in Sales Overview.",
    time: "Today, 10:24",
    category: "Sales",
    tone: "info",
    unread: true,
  },
  {
    id: "royalty-sync",
    title: "Royalty transfer synced",
    description:
      "Today's resale royalties have been synced to your business wallet and are ready for reconciliation.",
    time: "Yesterday",
    category: "Wallet",
    tone: "info",
    unread: false,
  },
];

const toneStyles: Record<VenueNotificationTone, { icon: typeof CheckCircle2; accent: string; badge: string }> = {
  success: {
    icon: Repeat,
    accent: "text-accent",
    badge: "border-accent/20 bg-accent/10 text-accent",
  },
  info: {
    icon: CreditCard,
    accent: "text-primary",
    badge: "border-primary/20 bg-primary/10 text-primary",
  },
  warning: {
    icon: ShieldCheck,
    accent: "text-amber-600",
    badge: "border-amber-500/20 bg-amber-500/10 text-amber-700",
  },
};

export function VenueNotificationsPopover() {
  const [notifications, setNotifications] = useState(initialNotifications);

  const unreadCount = useMemo(
    () => notifications.reduce((total, notification) => total + (notification.unread ? 1 : 0), 0),
    [notifications],
  );

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        unread: false,
      })),
    );
  };

  const markAsRead = (id: string) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id ? { ...notification, unread: false } : notification,
      ),
    );
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-8 w-8" aria-label="Open venue notifications">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <>
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive" />
              <span className="sr-only">{unreadCount} unread venue notifications</span>
            </>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        sideOffset={10}
        className="w-[calc(100vw-2rem)] max-w-sm rounded-2xl border-border/60 bg-card/95 p-0 shadow-elevated backdrop-blur-2xl"
      >
        <div className="border-b border-border/60 px-4 py-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold font-display text-foreground">Venue notifications</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Track resales, check-ins, wallet updates, and operational alerts.
              </p>
            </div>
            <Badge
              variant="outline"
              className={cn(
                "min-w-[92px] shrink-0 whitespace-nowrap px-3 py-1 text-center text-[11px] leading-none",
                unreadCount > 0
                  ? "border-accent/20 bg-accent/10 text-accent"
                  : "border-border/60 bg-muted/30 text-muted-foreground",
              )}
            >
              {unreadCount > 0 ? `${unreadCount} new` : "All caught up"}
            </Badge>
          </div>

          <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-border/50 bg-muted/20 px-3 py-2.5">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground">Operations pulse</p>
                <p className="text-[11px] text-muted-foreground">Critical venue activity at a glance</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2.5 text-[11px]"
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
            >
              Mark all read
            </Button>
          </div>
        </div>

        <div className="max-h-[420px] overflow-y-auto p-2">
          {notifications.map((notification) => {
            const tone = toneStyles[notification.tone];
            const Icon = tone.icon;

            return (
              <button
                key={notification.id}
                type="button"
                onClick={() => markAsRead(notification.id)}
                className={cn(
                  "flex w-full items-start gap-3 rounded-xl border border-transparent px-3 py-3 text-left transition-colors hover:border-border/60 hover:bg-muted/20",
                  notification.unread && "border-border/50 bg-muted/15",
                )}
              >
                <div className="relative mt-0.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted/40">
                    <Icon className={cn("h-4 w-4", tone.accent)} />
                  </div>
                  {notification.unread && (
                    <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-card bg-accent" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{notification.title}</p>
                      <p className="mt-1 text-xs leading-5 text-muted-foreground">{notification.description}</p>
                    </div>
                    <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    <Badge variant="outline" className={cn("px-2 py-0 text-[10px] font-semibold", tone.badge)}>
                      {notification.category}
                    </Badge>
                    <span className="text-[11px] text-muted-foreground">{notification.time}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between border-t border-border/60 px-4 py-3">
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
            <Router className="h-3.5 w-3.5" />
            Resales, access control, and royalties in one feed
          </div>
          <Button variant="ghost" size="sm" className="h-8 px-2.5 text-xs">
            <Clock3 className="h-3.5 w-3.5" />
            Alert settings
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
