import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Shield,
  Eye,
  TrendingUp,
  Dumbbell,
  Swords,
  Music,
  Sparkles,
  Users,
  ChevronRight,
  Lock,
  BarChart3,
  UserPlus,
  Building2,
  Zap,
  SlidersHorizontal,
  ShieldCheck,
  UserCheck,
  LayoutDashboard,
  ScanLine,
} from "lucide-react";
import heroVisual from "@/assets/hero-visual.png";
import logoRect from "@/assets/logo_rect.png";
import logoSymbol from "@/assets/logo_symbol.png";
import { Link } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ─── NAV ─── */
function LandingNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center">
          <img src={logoRect} alt="Flexi" className="h-8" />
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <a href="#problem" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Why Flexi</a>
          <a href="#benefits" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Benefits</a>
          <a href="#integration" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Integration</a>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" asChild>
            <Link to="/contact">Talk to our team</Link>
          </Button>
          <Button size="sm" className="font-bold" asChild>
            <Link to="/join">Join as a venue</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}

/* ─── HERO (from landing-2) ─── */
function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute top-0 right-0 w-[60%] h-[80%] bg-gradient-to-bl from-primary/[0.04] via-accent/[0.03] to-transparent rounded-bl-[120px]" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/[0.05] rounded-full blur-3xl -translate-x-1/2 translate-y-1/3" />

      <div className="container mx-auto px-6 lg:px-12 py-24 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-2xl">
          <motion.h1 custom={1} variants={fadeUp} className="font-display text-5xl sm:text-6xl lg:text-[4.25rem] font-extrabold leading-[1.08] tracking-tight text-secondary mb-6">
            The rigid membership model{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              belongs to the past.
            </span>
          </motion.h1>

          <motion.p custom={2} variants={fadeUp} className="text-lg lg:text-xl text-muted-foreground leading-relaxed mb-4 max-w-xl">
            The venues of the future don't just sell access.{" "}
            <span className="text-foreground font-medium">They govern the liquidity of their own access rights.</span>
          </motion.p>

          <motion.p custom={3} variants={fadeUp} className="text-base text-muted-foreground leading-relaxed mb-10 max-w-xl">
            Flexi introduces a new way to manage membership value — more flexible for members, more profitable for venues, all within a structured system they can trust.
          </motion.p>

          <motion.div custom={4} variants={fadeUp} className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="lg" className="text-base px-8" asChild>
                <Link to="/join">Join as a venue <ArrowRight className="ml-1 h-5 w-5" /></Link>
              </Button>
              <Button variant="outline" size="lg" className="text-base px-8" asChild>
                <Link to="/contact">Talk to our team</Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">Start independently, get support when needed.</p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative hidden lg:block"
        >
          <div className="relative">
            <img src={heroVisual} alt="Flexi platform — membership value infrastructure" className="w-full rounded-3xl" />
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -left-8 top-1/4 glass rounded-2xl p-4 shadow-elevated border border-border/50"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl gradient-hero flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Recovered value</p>
                  <p className="text-lg font-bold font-display text-foreground">+€34.2K</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              className="absolute -right-4 bottom-1/4 glass rounded-2xl p-4 shadow-elevated border border-border/50"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-accent flex items-center justify-center">
                  <Shield className="h-5 w-5 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Verified access</p>
                  <p className="text-lg font-bold font-display text-foreground">100%</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── PROBLEM (from landing-2) ─── */
function ProblemSection() {
  return (
    <section id="problem" className="py-28 lg:py-36 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.h2 custom={0} variants={fadeUp} className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold leading-tight text-secondary mb-8">
            Every unused membership is{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">blocked value.</span>
          </motion.h2>
          <motion.p custom={1} variants={fadeUp} className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Today, pauses, routine changes, injuries and shifting habits create friction, waste and missed opportunities. The traditional model leaves this value locked in place.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          custom={2} variants={fadeUp}
          className="mt-16 max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-3 gap-4">
            {["Paused members", "Lost revenue", "Idle capacity"].map((label, i) => (
              <div key={label} className="relative rounded-2xl border border-border bg-card p-8 text-center group hover:border-primary/30 transition-colors duration-300">
                <div className="text-4xl lg:text-5xl font-extrabold font-display text-muted-foreground/20 mb-3">
                  {["47%", "€2.1M", "31%"][i]}
                </div>
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">{label}</p>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/[0.02] to-accent/[0.02] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-muted-foreground/60 mt-4">Illustrative industry averages</p>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── THESIS (from landing-2) ─── */
function ThesisSection() {
  const pillars = [
    { icon: Lock, title: "Rules", desc: "A structured system governs how and when access rights can be reallocated." },
    { icon: Eye, title: "Traceability", desc: "Make ownership, transfers and usage fully visible." },
    { icon: TrendingUp, title: "Incentives", desc: "Align venue, member and platform in the same value flow." },
  ];

  return (
    <section className="py-28 lg:py-36">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="max-w-4xl mx-auto"
        >
          <motion.h2 custom={0} variants={fadeUp} className="font-display text-4xl sm:text-5xl font-extrabold leading-tight text-secondary mb-6 text-center">
            The secondary market already exists.{" "}
            <br className="hidden sm:block" />
            <span className="text-muted-foreground">It's just invisible, informal and ungoverned.</span>
          </motion.h2>
          <motion.p custom={1} variants={fadeUp} className="text-lg text-muted-foreground text-center mb-16 max-w-2xl mx-auto leading-relaxed">
            Flexi brings structure, traceability and aligned incentives into a space that's currently unmanaged — or mismanaged entirely.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={stagger}
          className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {pillars.map((p, i) => (
            <motion.div key={p.title} custom={i + 2} variants={fadeUp}
              className="relative rounded-2xl border border-border bg-card p-8 lg:p-10 group hover:shadow-elevated hover:border-primary/20 transition-all duration-300"
            >
              <div className="h-14 w-14 rounded-2xl gradient-hero flex items-center justify-center mb-6">
                <p.icon className="h-7 w-7 text-primary-foreground" />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-3">{p.title}</h3>
              <p className="text-base text-muted-foreground leading-relaxed">{p.desc}</p>
              <div className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── BENEFITS (from /) ─── */
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

function BenefitsSection() {
  return (
    <section id="benefits" className="py-28 lg:py-36 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          custom={0}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight mb-4">
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
  );
}

/* ─── INTEGRATION (from /) ─── */
const integrationPoints = [
  { icon: LayoutDashboard, title: "Control dashboard", text: "Full visibility on resale activity, revenue, and access — in one place." },
  { icon: SlidersHorizontal, title: "Built-in operational logic", text: "Flexi's system handles the complexity — venues plug in and benefit immediately." },
  { icon: ScanLine, title: "Access management & verification", text: "Validated entry for every resale buyer, integrated with your existing flow." },
];

function IntegrationSection() {
  return (
    <section id="integration" className="py-28 lg:py-36">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={0}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight mb-6">
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
  );
}

/* ─── VERTICALS (from landing-2) ─── */
function VerticalsSection() {
  const verticals = [
    { icon: Dumbbell, name: "Boutique Fitness" },
    { icon: Swords, name: "BJJ & Martial Arts" },
    { icon: Music, name: "Dance" },
    { icon: Sparkles, name: "Yoga Studios" },
    { icon: Users, name: "Community Venues" },
  ];

  return (
    <section className="py-28 lg:py-36 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.h2 custom={0} variants={fadeUp} className="font-display text-4xl sm:text-5xl font-extrabold leading-tight text-secondary mb-6">
            Built for spaces where{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">presence matters.</span>
          </motion.h2>
          <motion.p custom={1} variants={fadeUp} className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Flexi works best where frequency, continuity and real relationships are what drives value.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={stagger}
          className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto"
        >
          {verticals.map((v, i) => (
            <motion.div key={v.name} custom={i + 2} variants={fadeUp}
              className="flex items-center gap-3 rounded-2xl border border-border bg-card px-6 py-5 hover:shadow-card hover:border-primary/20 transition-all duration-300 min-w-[200px]"
            >
              <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <v.icon className="h-5 w-5 text-primary" />
              </div>
              <span className="font-display font-bold text-foreground text-base">{v.name}</span>
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
    <section className="py-28 lg:py-40 relative overflow-hidden">
      <div className="absolute inset-0 bg-secondary" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-accent/10" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px]" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h2 custom={0} variants={fadeUp} className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] text-primary-foreground mb-8">
            Flexi is not another marketplace.
            <br />
            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              It's the new operating layer for real‑world memberships.
            </span>
          </motion.h2>

          <motion.p custom={1} variants={fadeUp} className="text-lg lg:text-xl text-primary-foreground/70 leading-relaxed mb-6 max-w-2xl mx-auto">
            Create your venue page, showcase your services and memberships, and launch your presence on Flexi. If you want help with onboarding, setup or activation, our team is here to support you.
          </motion.p>

          <motion.div custom={2} variants={fadeUp} className="flex flex-col items-center gap-5">
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-primary-foreground text-secondary hover:bg-primary-foreground/90 text-base px-8 font-bold shadow-elevated" asChild>
                <Link to="/join">Join as a venue <ArrowRight className="ml-1 h-5 w-5" /></Link>
              </Button>
              <Button variant="outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/90 text-base px-8 bg-transparent" asChild>
                <Link to="/contact">Talk to our team</Link>
              </Button>
            </div>
            <p className="text-sm text-primary-foreground/50">Start independently, get support when needed.</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── PAGE ─── */
export default function LandingPage4() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <LandingNav />
      <div className="pt-16">
        <HeroSection />
        <ProblemSection />
        <ThesisSection />
        <BenefitsSection />
        <IntegrationSection />
        <VerticalsSection />
        <FinalCTASection />
      </div>

      <footer className="bg-secondary py-12 border-t border-border/10">
        <div className="container mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <img src={logoRect} alt="Flexi" className="h-7 brightness-0 invert" />
          <p className="text-sm text-primary-foreground/50">© {new Date().getFullYear()} Flexi. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
