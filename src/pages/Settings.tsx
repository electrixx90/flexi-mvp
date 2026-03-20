import { motion } from "framer-motion";
import {
  User,
  Bell,
  Shield,
  Mail,
  Phone,
  MapPin,
  Camera,
  Lock,
  Fingerprint,
  Eye,
  EyeOff,
  Save,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const item = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } };

const notifications = [
  { id: "marketplace", label: "Marketplace alerts", desc: "New listings matching your interests", default: true },
  { id: "sales", label: "Sale notifications", desc: "When your listing is purchased", default: true },
  { id: "payouts", label: "Payout updates", desc: "Settlement confirmations & withdrawals", default: true },
  { id: "expiry", label: "Expiry reminders", desc: "Memberships expiring soon", default: true },
  { id: "promo", label: "Promotions & tips", desc: "Deals, product updates, and tips", default: false },
  { id: "newsletter", label: "Weekly digest", desc: "Summary of your wallet & marketplace activity", default: false },
];

const securityItems = [
  { label: "Two-Factor Authentication", desc: "Add an extra layer of security to your account", badge: "Recommended", enabled: false },
  { label: "Login Notifications", desc: "Get alerted when someone logs into your account", badge: null, enabled: true },
  { label: "Biometric Login", desc: "Use fingerprint or face recognition on supported devices", badge: null, enabled: false },
];

export default function Settings() {
  const [notifState, setNotifState] = useState<Record<string, boolean>>(
    Object.fromEntries(notifications.map((n) => [n.id, n.default]))
  );

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } }}
      className="space-y-6 max-w-4xl mx-auto"
    >
      {/* Header */}
      <motion.div variants={item}>
        <h1 className="text-2xl font-extrabold font-display text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your profile, preferences, and security.</p>
      </motion.div>

      {/* Tabs */}
      <motion.div variants={item}>
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="bg-muted/40 border border-border/50 p-1 rounded-xl">
            <TabsTrigger value="profile" className="rounded-lg gap-1.5 data-[state=active]:shadow-sm">
              <User className="h-4 w-4" /> Profile
            </TabsTrigger>
            <TabsTrigger value="notifications" className="rounded-lg gap-1.5 data-[state=active]:shadow-sm">
              <Bell className="h-4 w-4" /> Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="rounded-lg gap-1.5 data-[state=active]:shadow-sm">
              <Shield className="h-4 w-4" /> Security
            </TabsTrigger>
          </TabsList>

          {/* ── Profile Tab ── */}
          <TabsContent value="profile" className="space-y-6">
            {/* Avatar */}
            <div className="rounded-2xl bg-card/80 backdrop-blur-xl shadow-card border border-border/50 p-6">
              <h3 className="font-bold font-display text-foreground text-sm mb-5">Profile Photo</h3>
              <div className="flex items-center gap-5">
                <div className="relative group">
                  <div className="h-20 w-20 rounded-2xl gradient-hero flex items-center justify-center text-primary-foreground text-2xl font-extrabold font-display shadow-glow-indigo">
                    AL
                  </div>
                  <button className="absolute inset-0 rounded-2xl bg-secondary/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Camera className="h-5 w-5 text-primary-foreground" />
                  </button>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Alex Lehmann</p>
                  <p className="text-xs text-muted-foreground">Member since Jan 2025</p>
                  <Button variant="ghost" size="sm" className="mt-1 text-xs h-7 px-2">
                    Change photo
                  </Button>
                </div>
              </div>
            </div>

            {/* Personal info */}
            <div className="rounded-2xl bg-card/80 backdrop-blur-xl shadow-card border border-border/50 p-6 space-y-5">
              <h3 className="font-bold font-display text-foreground text-sm">Personal Information</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-xs text-muted-foreground">First Name</Label>
                  <Input id="firstName" defaultValue="Alex" className="bg-muted/20 border-border/50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-xs text-muted-foreground">Last Name</Label>
                  <Input id="lastName" defaultValue="Lehmann" className="bg-muted/20 border-border/50" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5" /> Email
                </Label>
                <Input id="email" type="email" defaultValue="alex@example.com" className="bg-muted/20 border-border/50" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5" /> Phone
                  </Label>
                  <Input id="phone" defaultValue="+49 170 1234567" className="bg-muted/20 border-border/50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" /> City
                  </Label>
                  <Input id="city" defaultValue="Berlin, DE" className="bg-muted/20 border-border/50" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio" className="text-xs text-muted-foreground">Bio</Label>
                <Input id="bio" defaultValue="Fitness enthusiast, BJJ white belt, marketplace explorer." className="bg-muted/20 border-border/50" />
              </div>
              <div className="flex justify-end pt-2">
                <Button variant="default" size="sm">
                  <Save className="h-4 w-4" /> Save Changes
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* ── Notifications Tab ── */}
          <TabsContent value="notifications" className="space-y-6">
            <div className="rounded-2xl bg-card/80 backdrop-blur-xl shadow-card border border-border/50 p-6">
              <h3 className="font-bold font-display text-foreground text-sm mb-1">Notification Preferences</h3>
              <p className="text-xs text-muted-foreground mb-5">Choose which updates you'd like to receive.</p>
              <div className="space-y-1">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className="flex items-center justify-between rounded-xl px-4 py-3.5 hover:bg-muted/10 transition-colors"
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground">{n.label}</p>
                      <p className="text-xs text-muted-foreground">{n.desc}</p>
                    </div>
                    <Switch
                      checked={notifState[n.id]}
                      onCheckedChange={(v) => setNotifState((prev) => ({ ...prev, [n.id]: v }))}
                    />
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* ── Security Tab ── */}
          <TabsContent value="security" className="space-y-6">
            {/* Password */}
            <div className="rounded-2xl bg-card/80 backdrop-blur-xl shadow-card border border-border/50 p-6 space-y-5">
              <h3 className="font-bold font-display text-foreground text-sm flex items-center gap-2">
                <Lock className="h-4 w-4 text-primary" /> Change Password
              </h3>
              <div className="space-y-4 max-w-md">
                <div className="space-y-2">
                  <Label htmlFor="currentPw" className="text-xs text-muted-foreground">Current Password</Label>
                  <Input id="currentPw" type="password" placeholder="••••••••" className="bg-muted/20 border-border/50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPw" className="text-xs text-muted-foreground">New Password</Label>
                  <Input id="newPw" type="password" placeholder="••••••••" className="bg-muted/20 border-border/50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPw" className="text-xs text-muted-foreground">Confirm New Password</Label>
                  <Input id="confirmPw" type="password" placeholder="••••••••" className="bg-muted/20 border-border/50" />
                </div>
                <Button variant="default" size="sm">
                  <Lock className="h-4 w-4" /> Update Password
                </Button>
              </div>
            </div>

            {/* Security toggles */}
            <div className="rounded-2xl bg-card/80 backdrop-blur-xl shadow-card border border-border/50 p-6">
              <h3 className="font-bold font-display text-foreground text-sm flex items-center gap-2 mb-5">
                <Fingerprint className="h-4 w-4 text-accent" /> Security Options
              </h3>
              <div className="space-y-1">
                {securityItems.map((s) => (
                  <div
                    key={s.label}
                    className="flex items-center justify-between rounded-xl px-4 py-3.5 hover:bg-muted/10 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="text-sm font-medium text-foreground flex items-center gap-2">
                          {s.label}
                          {s.badge && (
                            <Badge variant="outline" className="text-xs text-accent border-accent/20 bg-accent/5">
                              {s.badge}
                            </Badge>
                          )}
                        </p>
                        <p className="text-xs text-muted-foreground">{s.desc}</p>
                      </div>
                    </div>
                    <Switch defaultChecked={s.enabled} />
                  </div>
                ))}
              </div>
            </div>

            {/* Active sessions */}
            <div className="rounded-2xl bg-card/80 backdrop-blur-xl shadow-card border border-border/50 p-6">
              <h3 className="font-bold font-display text-foreground text-sm flex items-center gap-2 mb-5">
                <Eye className="h-4 w-4 text-primary" /> Active Sessions
              </h3>
              <div className="space-y-3">
                {[
                  { device: "Chrome on macOS", location: "Berlin, DE", current: true },
                  { device: "Safari on iPhone", location: "Berlin, DE", current: false },
                ].map((sess) => (
                  <div
                    key={sess.device}
                    className="flex items-center justify-between rounded-xl border border-border/50 bg-muted/15 px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground flex items-center gap-2">
                        {sess.device}
                        {sess.current && (
                          <Badge className="bg-accent/15 text-accent border-accent/20 text-xs">Current</Badge>
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground">{sess.location}</p>
                    </div>
                    {!sess.current && (
                      <Button variant="ghost" size="sm" className="text-xs text-destructive hover:text-destructive">
                        Revoke
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
}
