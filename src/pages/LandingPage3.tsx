import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, Shield, BarChart3, Users, Settings2, CheckCircle2,
  CreditCard, RefreshCw, ScanLine, FileText, TrendingUp, Zap,
  UserPlus, Lock, Activity, PieChart, LayoutDashboard, ChevronRight,
  Layers, Target, Gauge,
} from "lucide-react";
import { Link } from "react-router-dom";
import logoRect from "@/assets/logo_rect.png";

const fade = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

/* ──────────────────────────────────────────
   INLINE PLATFORM MOCKUP (SVG-free, pure JSX)
   ────────────────────────────────────────── */
function PlatformMockup() {
  const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", active: true },
    { icon: CreditCard, label: "Memberships" },
    { icon: RefreshCw, label: "Resale" },
    { icon: ScanLine, label: "Access" },
    { icon: FileText, label: "Policy" },
    { icon: BarChart3, label: "Analytics" },
    { icon: Settings2, label: "Settings" },
  ];

  return (
    <div className="rounded-2xl border border-border bg-card shadow-elevated overflow-hidden">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-muted/40">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-red-400" />
          <span className="h-3 w-3 rounded-full bg-yellow-400" />
          <span className="h-3 w-3 rounded-full bg-green-400" />
        </div>
        <span className="text-xs text-muted-foreground ml-2 font-medium">Flexi — Venue Control Panel</span>
      </div>

      <div className="flex min-h-[420px] lg:min-h-[480px]">
        {/* Sidebar */}
        <div className="hidden sm:flex flex-col w-48 lg:w-52 border-r border-border bg-muted/20 py-3 px-2 gap-0.5 shrink-0">
          <div className="px-3 mb-4">
            <span className="font-display text-base font-extrabold text-foreground">flexi<span className="text-primary">.</span></span>
          </div>
          {sidebarItems.map((item) => (
            <div key={item.label}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                item.active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="flex-1 p-4 lg:p-6 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-display text-lg font-bold text-foreground">Dashboard</h3>
              <p className="text-xs text-muted-foreground">Iron Temple Gym — March 2026</p>
            </div>
            <div className="flex gap-2">
              {["Memberships", "Resale", "Access", "Policy"].map((tab, idx) => (
                <span key={tab}
                  className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${
                    idx === 0
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >{tab}</span>
              ))}
            </div>
          </div>

          {/* KPI row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
            {[
              { label: "Active memberships", value: "284", change: "+12%", icon: CreditCard },
              { label: "Resale completed", value: "47", change: "+23%", icon: RefreshCw },
              { label: "Royalty revenue", value: "€3,420", change: "+18%", icon: TrendingUp },
              { label: "Verified access", value: "1,203", change: "+8%", icon: Shield },
            ].map((kpi) => (
              <div key={kpi.label} className="rounded-xl border border-border bg-background p-3">
                <div className="flex items-center justify-between mb-2">
                  <kpi.icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs font-semibold text-accent">{kpi.change}</span>
                </div>
                <p className="font-display text-xl font-bold text-foreground">{kpi.value}</p>
                <p className="text-xs text-muted-foreground">{kpi.label}</p>
              </div>
            ))}
          </div>

          {/* Chart + Table */}
          <div className="grid lg:grid-cols-5 gap-4">
            {/* Mini chart area */}
            <div className="lg:col-span-3 rounded-xl border border-border bg-background p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-foreground">Revenue overview</p>
                <span className="text-xs text-muted-foreground">Last 6 months</span>
              </div>
              {/* Fake chart bars */}
              <div className="flex items-end gap-2 h-28">
                {[40, 55, 48, 72, 65, 88].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full rounded-t-md gradient-hero"
                      style={{ height: `${h}%` }}
                    />
                    <span className="text-[10px] text-muted-foreground">
                      {["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"][i]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent resales */}
            <div className="lg:col-span-2 rounded-xl border border-border bg-background p-4">
              <p className="text-sm font-semibold text-foreground mb-3">Recent resales</p>
              <div className="space-y-2.5">
                {[
                  { from: "M. Rossi", to: "L. Bianchi", pass: "3-Mo Unlimited", amount: "€280" },
                  { from: "A. Conti", to: "F. Galli", pass: "8-Class Pack", amount: "€110" },
                  { from: "S. Leone", to: "P. Ricci", pass: "Monthly", amount: "€55" },
                ].map((r, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <RefreshCw className="h-3 w-3 text-primary" />
                      </div>
                      <div>
                        <span className="font-medium text-foreground">{r.from}</span>
                        <span className="text-muted-foreground"> → </span>
                        <span className="font-medium text-foreground">{r.to}</span>
                      </div>
                    </div>
                    <span className="font-semibold text-foreground">{r.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── HERO ─── */
function HeroSection() {
  return (
    <section className="pt-28 pb-20 lg:pt-36 lg:pb-28">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div initial="hidden" animate="visible" variants={stagger} className="text-center max-w-4xl mx-auto mb-14">
          <motion.p custom={0} variants={fade} className="text-sm font-semibold tracking-[0.2em] uppercase text-primary mb-5">
            The venue operating system
          </motion.p>
          <motion.h1 custom={1} variants={fade}
            className="font-display text-4xl sm:text-5xl lg:text-[3.75rem] font-extrabold leading-[1.12] tracking-tight text-secondary mb-6"
          >
            The operating system for managing{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              memberships, resale & access
            </span>{" "}
            intelligently.
          </motion.h1>
          <motion.p custom={2} variants={fade} className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-10">
            Flexi gives venues the tools to set rules, monitor transfers, verify access and generate new revenue from memberships already sold.
          </motion.p>
          <motion.div custom={3} variants={fade} className="flex flex-wrap justify-center gap-4">
            <Button variant="hero" size="lg" className="text-base px-8">
              Request a demo <ArrowRight className="ml-1 h-5 w-5" />
            </Button>
            <Link to="/client">
              <Button variant="outline" size="lg" className="text-base px-8">
                Explore the platform
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
          className="max-w-6xl mx-auto"
        >
          <PlatformMockup />
        </motion.div>
      </div>
    </section>
  );
}

/* ─── FRAGMENTED TOOLS ─── */
function FragmentedSection() {
  const blocks = [
    { icon: CreditCard, title: "Memberships", desc: "Configure and monitor every type of pass." },
    { icon: RefreshCw, title: "Transfers", desc: "Manage resale flows with full visibility." },
    { icon: ScanLine, title: "Access", desc: "Verify who enters and under which entitlement." },
    { icon: FileText, title: "Policy", desc: "Define the operational rules of the system." },
    { icon: BarChart3, title: "Metrics", desc: "Read real data, volumes and opportunities." },
  ];

  return (
    <section className="py-24 lg:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="text-center mb-14">
          <motion.h2 custom={0} variants={fade} className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-secondary mb-4">
            Everything you manage today,{" "}
            <span className="text-muted-foreground">fragmented.</span>
          </motion.h2>
          <motion.p custom={1} variants={fade} className="text-lg text-muted-foreground max-w-2xl mx-auto">
            One unified layer for everything that currently slips through the cracks.
          </motion.p>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
          className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-6xl mx-auto"
        >
          {blocks.map((b, i) => (
            <motion.div key={b.title} custom={i + 2} variants={fade}
              className="rounded-2xl border border-border bg-card p-6 text-center group hover:shadow-card hover:border-primary/20 transition-all duration-300"
            >
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/15 transition-colors">
                <b.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-2">{b.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── CORE FUNCTIONALITY ─── */
function CoreFeaturesSection() {
  const features = [
    { icon: Settings2, title: "Configure passes & rules", desc: "Not every membership needs to work the same way." },
    { icon: RefreshCw, title: "Enable controlled resale", desc: "Resale can exist without creating chaos." },
    { icon: Shield, title: "Verify who enters", desc: "Access is managed with more order and more trust." },
    { icon: Activity, title: "Monitor sales & movements", desc: "Every transaction is readable inside the platform." },
    { icon: UserPlus, title: "Turn buyers into leads", desc: "A one-time entry can become a new business relationship." },
  ];

  return (
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="text-center mb-14">
          <motion.h2 custom={0} variants={fade} className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-secondary mb-4">
            Built for people who{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">actually run venues.</span>
          </motion.h2>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {features.map((f, i) => (
            <motion.div key={f.title} custom={i + 1} variants={fade}
              className={`rounded-2xl border border-border bg-card p-7 group hover:shadow-elevated hover:border-primary/20 transition-all duration-300 relative overflow-hidden ${
                i === 4 ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div className="h-12 w-12 rounded-xl gradient-hero flex items-center justify-center mb-5">
                <f.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-2">{f.title}</h3>
              <p className="text-base text-muted-foreground leading-relaxed">{f.desc}</p>
              <div className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── WORKFLOW ─── */
function WorkflowSection() {
  const steps = [
    { num: "01", title: "Venue sets the policy", icon: FileText },
    { num: "02", title: "Member lists an eligible pass", icon: CreditCard },
    { num: "03", title: "Another user purchases", icon: Users },
    { num: "04", title: "System records & distributes", icon: PieChart },
    { num: "05", title: "Access is validated", icon: CheckCircle2 },
  ];

  return (
    <section className="py-24 lg:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/[0.03] via-transparent to-accent/[0.03]" />
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="text-center mb-16">
          <motion.h2 custom={0} variants={fade} className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-secondary mb-4">
            How Flexi works in practice
          </motion.h2>
          <motion.p custom={1} variants={fade} className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Designed to be clear for both members and venues — but the competitive advantage is in the operational control.
          </motion.p>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
          className="flex flex-col md:flex-row items-stretch gap-4 max-w-6xl mx-auto"
        >
          {steps.map((s, i) => (
            <motion.div key={s.num} custom={i + 2} variants={fade} className="flex-1 relative">
              <div className="rounded-2xl border border-border bg-card p-6 h-full flex flex-col items-center text-center hover:shadow-card transition-shadow">
                <span className="font-display text-3xl font-extrabold text-primary/20 mb-3">{s.num}</span>
                <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <s.icon className="h-5 w-5 text-primary" />
                </div>
                <p className="font-display text-base font-bold text-foreground">{s.title}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                  <ChevronRight className="h-5 w-5 text-primary/30" />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── INSIGHTS ─── */
function InsightsSection() {
  const metrics = [
    { label: "Resales completed", value: "1,247", icon: RefreshCw },
    { label: "Revenue generated", value: "€89.4K", icon: TrendingUp },
    { label: "Verified entries", value: "4,832", icon: Shield },
    { label: "Buyer → member rate", value: "34%", icon: UserPlus },
    { label: "Idle passes recovered", value: "612", icon: Zap },
  ];

  return (
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="text-center mb-14">
          <motion.h2 custom={0} variants={fade} className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-secondary mb-4">
            Not just transactions.{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Operational visibility.</span>
          </motion.h2>
          <motion.p custom={1} variants={fade} className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Flexi doesn't just add a flow. It adds insight, control and decision-making power.
          </motion.p>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto"
        >
          {metrics.map((m, i) => (
            <motion.div key={m.label} custom={i + 2} variants={fade}
              className="rounded-2xl border border-border bg-card p-6 text-center group hover:shadow-card hover:border-primary/20 transition-all"
            >
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/15 transition-colors">
                <m.icon className="h-5 w-5 text-primary" />
              </div>
              <p className="font-display text-2xl lg:text-3xl font-extrabold text-foreground mb-1">{m.value}</p>
              <p className="text-xs text-muted-foreground font-medium">{m.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── REAL BUSINESS ─── */
function RealBusinessSection() {
  const cards = [
    { icon: Layers, title: "Flexible rules", desc: "Apply different policies to different pass types, categories and conditions." },
    { icon: Target, title: "Real-world context", desc: "Not every venue, pass or use case is the same. Flexi adapts to actual operations." },
    { icon: Gauge, title: "Continuous control", desc: "Monitor, adjust and govern the system as your business evolves." },
  ];

  return (
    <section className="py-24 lg:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="text-center mb-6">
          <motion.h2 custom={0} variants={fade} className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-secondary mb-4">
            Built for real venues, not ideal worlds.
          </motion.h2>
          <motion.p custom={1} variants={fade} className="text-lg text-muted-foreground max-w-2xl mx-auto mb-14">
            Not all categories, passes or scenarios are the same. Flexi lets you apply rules, limits and control exactly where they're needed.
          </motion.p>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
          className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {cards.map((c, i) => (
            <motion.div key={c.title} custom={i + 2} variants={fade}
              className="rounded-2xl border border-border bg-card p-8 group hover:shadow-elevated hover:border-primary/20 transition-all duration-300"
            >
              <div className="h-14 w-14 rounded-2xl gradient-hero flex items-center justify-center mb-6">
                <c.icon className="h-7 w-7 text-primary-foreground" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-3">{c.title}</h3>
              <p className="text-base text-muted-foreground leading-relaxed">{c.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── FINAL CTA ─── */
function FinalCTASection() {
  return (
    <section className="py-28 lg:py-36 relative overflow-hidden">
      <div className="absolute inset-0 bg-secondary" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-accent/10" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px]" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.h2 custom={0} variants={fade}
            className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.12] text-primary-foreground mb-6"
          >
            Bring a new level of control{" "}
            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              to your venue.
            </span>
          </motion.h2>
          <motion.p custom={1} variants={fade} className="text-lg text-primary-foreground/70 leading-relaxed mb-10 max-w-2xl mx-auto">
            Better manage the value of memberships already sold — without adding operational complexity.
          </motion.p>
          <motion.div custom={2} variants={fade} className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-primary-foreground text-secondary hover:bg-primary-foreground/90 text-base px-8 font-bold shadow-elevated">
              Talk to the team <ArrowRight className="ml-1 h-5 w-5" />
            </Button>
            <Link to="/client">
              <Button variant="outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-base px-8">
                See the product
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── NAV ─── */
function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between h-16">
        <Link to="/landing-3" className="flex items-center">
          <img src={logoRect} alt="Flexi" className="h-8" />
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <span className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Product</span>
          <span className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer">For venues</span>
          <span className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer">How it works</span>
        </div>
        <Button size="sm" className="font-bold">Request a demo</Button>
      </div>
    </nav>
  );
}

/* ─── PAGE ─── */
export default function LandingPage3() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <HeroSection />
      <FragmentedSection />
      <CoreFeaturesSection />
      <WorkflowSection />
      <InsightsSection />
      <RealBusinessSection />
      <FinalCTASection />

      <footer className="bg-secondary py-10 border-t border-border/10">
        <div className="container mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <img src={logoRect} alt="Flexi" className="h-7 brightness-0 invert" />
          <p className="text-sm text-primary-foreground/50">© {new Date().getFullYear()} Flexi. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
