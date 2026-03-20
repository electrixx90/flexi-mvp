import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Settings2,
  TrendingUp,
  UserCheck,
  Lock,
  Zap,
  BarChart3,
  Users,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  LayoutDashboard,
  SlidersHorizontal,
  ScanLine,
  Building2,
} from "lucide-react";
import heroDashboard from "@/assets/hero-dashboard-mockup.png";
import logoRect from "@/assets/logo_rect.png";
import { Link } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const objections = [
  {
    icon: Lock,
    title: "I'll lose control",
    text: "Flexi operates within a structured framework designed to protect venue interests. You gain visibility and oversight — without the chaos.",
  },
  {
    icon: Settings2,
    title: "It'll create operational chaos",
    text: "Transfers that already happen informally get digitized into a clean, automated flow managed by the platform.",
  },
  {
    icon: TrendingUp,
    title: "It'll cannibalize my sales",
    text: "Every resale can generate revenue for your venue. Turn lost value into a controlled income stream.",
  },
  {
    icon: UserCheck,
    title: "I can't trust informal transfers",
    text: "Every buyer enters through a verified, traceable process. No more untracked guests or unauthorized access.",
  },
];

const processSteps = [
  { label: "Inactive member", icon: Users },
  { label: "Listing", icon: BarChart3 },
  { label: "Purchase", icon: Zap },
  { label: "Revenue split", icon: TrendingUp },
  { label: "Verified access", icon: ShieldCheck },
];

const benefits = [
  {
    icon: SlidersHorizontal,
    title: "Structured resale system",
    text: "Flexi manages the resale flow with built-in rules and safeguards — venues participate in a system that's already designed to work.",
  },
  {
    icon: TrendingUp,
    title: "Revenue share",
    text: "Earn a percentage on every resale transaction — turn unused memberships into a new income line.",
  },
  {
    icon: ShieldCheck,
    title: "Verified access",
    text: "Every buyer goes through a verified entry process — safer, cleaner, and fully traceable.",
  },
  {
    icon: Users,
    title: "New leads",
    text: "A one-time buyer today can become a recurring member tomorrow. Resale is your acquisition funnel.",
  },
  {
    icon: Building2,
    title: "Your venue's public page",
    text: "Get a dedicated showcase page on Flexi to present your brand, services, memberships, and images — your digital storefront.",
  },
  {
    icon: Zap,
    title: "Operational simplicity",
    text: "Fewer manual exceptions, fewer ambiguous requests, less administrative friction.",
  },
];

const integrationPoints = [
  { icon: LayoutDashboard, title: "Control dashboard", text: "Full visibility on resale activity, revenue, and access — in one place." },
  { icon: SlidersHorizontal, title: "Built-in operational logic", text: "Flexi's system handles the complexity — venues plug in and benefit immediately." },
  { icon: ScanLine, title: "Access management & verification", text: "Validated entry for every resale buyer, integrated with your existing flow." },
];

const customerSteps = [
  { emoji: "🛒", title: "They buy", text: "Find and purchase available memberships instantly." },
  { emoji: "💸", title: "They resell", text: "List unused passes with a few taps." },
  { emoji: "🚪", title: "They enter", text: "Verified access — no friction, no confusion." },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* ─── NAV ─── */}
      <nav className="fixed top-0 inset-x-0 z-50 glass border-b border-border/60">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-6">
          <Link to="/" className="flex items-center">
            <img src={logoRect} alt="Flexi" className="h-8" />
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#how-it-works" className="hover:text-foreground transition-colors">How it works</a>
            <a href="#benefits" className="hover:text-foreground transition-colors">Benefits</a>
            <a href="#integration" className="hover:text-foreground transition-colors">Integration</a>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/client">Log in</Link>
            </Button>
            <Button size="sm" asChild>
              <a href="#cta">Request a demo</a>
            </Button>
          </div>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-32">
        {/* subtle bg pattern */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] rounded-full bg-primary/[0.04] blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-accent/[0.06] blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* copy */}
            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
              <Badge variant="outline" className="mb-6 text-sm px-4 py-1.5 font-semibold border-primary/20 text-primary bg-primary/5">
                Built for venue operators
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-display font-extrabold leading-[1.1] tracking-tight mb-6">
                Resale isn't the problem.
                <br />
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Not governing it is.
                </span>
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-xl mb-10">
                Flexi gives venues a structured system to turn unused memberships into controlled transactions — with verified access, new revenue, and zero operational chaos.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" variant="hero" asChild>
                  <a href="#cta">
                    Bring Flexi to your venue
                    <ArrowRight className="ml-1 h-5 w-5" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="#how-it-works">See how it works</a>
                </Button>
              </div>
            </motion.div>

            {/* dashboard mockup */}
            <motion.div
              initial={{ opacity: 0, y: 40, rotateY: -4 }}
              animate={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-elevated border border-border/40">
                <img
                  src={heroDashboard}
                  alt="Flexi venue control dashboard showing revenue analytics, resale activity and access verification"
                  className="w-full h-auto"
                />
              </div>
              {/* floating stat cards */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="absolute -left-4 bottom-12 bg-card rounded-xl shadow-elevated border border-border/40 p-4 hidden lg:block"
              >
                <p className="text-xs text-muted-foreground font-medium mb-1">Monthly resale revenue</p>
                <p className="text-2xl font-display font-bold text-primary">+€4,280</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="absolute -right-4 top-8 bg-card rounded-xl shadow-elevated border border-border/40 p-4 hidden lg:block"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-accent" />
                  <p className="text-sm font-semibold">142 verified entries</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── OBJECTIONS ─── */}
      <section className="py-24 lg:py-32 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={0}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight mb-4">
              What every venue fears about resale
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These concerns are valid. Flexi was designed around them.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {objections.map((obj, i) => (
              <motion.div
                key={obj.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={fadeUp}
                custom={i}
              >
                <Card className="h-full border-border/50 hover:border-primary/20 transition-colors duration-300 hover:shadow-card bg-card">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                      <obj.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-display font-bold mb-3">"{obj.title}"</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{obj.text}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PARADIGM SHIFT / HOW IT WORKS ─── */}
      <section id="how-it-works" className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={0}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight mb-4">
              With Flexi, you don't fight the secondary market.
              <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                You monetize it.
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              An unused membership doesn't have to mean lost value. It can become a controlled transaction that benefits the member, the venue, and the platform.
            </p>
          </motion.div>

          {/* process flow */}
          <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 max-w-4xl mx-auto">
            {/* connector line */}
            <div className="hidden sm:block absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-accent/20 -translate-y-1/2 -z-0" />

            {processSteps.map((step, i) => (
              <motion.div
                key={step.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="relative z-10 flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-card border-2 border-primary/20 flex items-center justify-center shadow-card mb-3">
                  <step.icon className="h-7 w-7 text-primary" />
                </div>
                <span className="text-sm font-semibold font-display">{step.label}</span>
                {i < processSteps.length - 1 && (
                  <ChevronRight className="h-5 w-5 text-muted-foreground absolute -right-6 top-5 hidden sm:block" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BENEFITS ─── */}
      <section id="benefits" className="py-24 lg:py-32 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={0}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight mb-4">
              More control. Less friction. New revenue.
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={fadeUp}
                custom={i}
              >
                <Card className="h-full border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-card bg-card group">
                  <CardContent className="p-7 flex flex-col h-full">
                    <div className="w-11 h-11 rounded-lg gradient-hero flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                      <b.icon className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <h3 className="text-lg font-display font-bold mb-2">{b.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{b.text}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── INTEGRATION ─── */}
      <section id="integration" className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              custom={0}
            >
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight mb-6">
                We're not asking you to change everything
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-10">
                Flexi is designed to fit into your existing operations — without disrupting access management, daily routines, or your current setup.
              </p>
              <div className="space-y-6">
                {integrationPoints.map((pt, i) => (
                  <motion.div
                    key={pt.title}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    custom={i + 1}
                    className="flex gap-4"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <pt.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold mb-1">{pt.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{pt.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* visual placeholder — gradient card grid */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={1}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl gradient-card border border-border/40 p-8 flex flex-col items-center justify-center text-center h-48">
                  <LayoutDashboard className="h-10 w-10 text-primary mb-3" />
                  <span className="font-display font-bold text-sm">Dashboard</span>
                </div>
                <div className="rounded-2xl gradient-card border border-border/40 p-8 flex flex-col items-center justify-center text-center h-48">
                  <Building2 className="h-10 w-10 text-primary mb-3" />
                  <span className="font-display font-bold text-sm">Venue page</span>
                </div>
                <div className="col-span-2 rounded-2xl gradient-card border border-border/40 p-8 flex items-center justify-center gap-6 h-36">
                  <ScanLine className="h-10 w-10 text-accent" />
                  <div className="text-left">
                    <span className="font-display font-bold">Access & verification</span>
                    <p className="text-sm text-muted-foreground mt-1">Seamless entry for every verified buyer</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── CUSTOMER SIMPLICITY ─── */}
      <section className="py-24 lg:py-32 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={0}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight mb-4">
              For members? It's effortless.
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The member experience stays intuitive and frictionless. The strategic value, however, lives in the control you get as a venue.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {customerSteps.map((s, i) => (
              <motion.div
                key={s.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="text-center"
              >
                <div className="text-5xl mb-4">{s.emoji}</div>
                <h3 className="text-xl font-display font-bold mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section id="cta" className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 gradient-hero opacity-[0.06]" />
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={0}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight mb-6">
              Bring control and new revenue to your venue
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
              Flexi turns unused memberships into a more structured, traceable, and profitable process.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="hero">
                Request a demo
                <ArrowRight className="ml-1 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/client/marketplace">Explore the marketplace</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-border/60 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <img src={logoRect} alt="Flexi" className="h-6" />
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Flexi. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
