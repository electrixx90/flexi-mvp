import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import {
    ArrowRight,
    Globe,
    TrendingDown,
    Lock,
    Key,
    RefreshCw,
    UserCheck,
    Coins,
    CheckCircle2,
    X,
    AlertTriangle,
    Check,
    Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import logoRect from "@/assets/logo_rect.png";
import miniHero from "@/assets/mini_hero.png";
import accessImg from "@/assets/access.png";
import breakageImg from "@/assets/breakage_vert.png";

/* ─── animation helpers ─── */
const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" as const },
    }),
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.92 },
    visible: (i: number) => ({
        opacity: 1,
        scale: 1,
        transition: { delay: i * 0.12, duration: 0.5, ease: "easeOut" as const },
    }),
};

function Section({
                     children,
                     className = "",
                     id,
                 }: {
    children: React.ReactNode;
    className?: string;
    id?: string;
}) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });
    return (
        <section ref={ref} id={id} className={className}>
            <motion.div
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            >
                {children}
            </motion.div>
        </section>
    );
}

/* ─── HEADER ─── */
function StickyHeader() {
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 80);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
                scrolled
                    ? "bg-white/95 backdrop-blur-lg shadow-sm border-b border-border/60"
                    : "bg-transparent"
            }`}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-6">
                <Link to="/landing">
                    <img
                        src={logoRect}
                        alt="Flexi"
                        className={`h-8 transition-all duration-300 ${scrolled ? "" : "brightness-0 invert"}`}
                    />
                </Link>
                <div className="flex items-center gap-3">
                    <Button
                        variant={scrolled ? "outline" : "ghost"}
                        size="sm"
                        className={scrolled ? "" : "text-white border-white/30 hover:bg-white/10"}
                        asChild
                    >
                        <Link to="/client">Log in</Link>
                    </Button>
                    <Button size="sm" asChild>
                        <Link to="/join">Join as a Venue</Link>
                    </Button>
                </div>
            </div>
        </header>
    );
}

/* ─── 1. HERO ─── */
function HeroSection() {
    return (
        <section className="relative min-h-[90vh] flex items-center bg-secondary overflow-hidden">
            {/* bg overlay */}
            <div className="absolute inset-0 bg-[url('/img/hero.png')] bg-cover bg-center opacity-50" />


            <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-32">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold leading-[1.08] tracking-tight text-white mb-6"
                        >
                            Transform subscriptions into tradable digital assets.
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.35 }}
                            className="text-lg lg:text-xl text-white/70 leading-relaxed max-w-lg mb-8"
                        >
                            Billions remain trapped in unused memberships every year.
                            <br />
                            Flexi turns physical access into a liquid asset you can{" "}
                            <span className="text-accent font-semibold">exchange securely and automatically</span>.
                        </motion.p>
                    </div>

                    {/* Right visual placeholder */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="hidden lg:block"
                    >
                        <div className="relative">
                            <div
                                className="w-full aspect-[4/3] rounded-2xl bg-secondary/60 border border-white/10 backdrop-blur-sm flex items-center justify-center overflow-hidden shadow-elevated">
                                <img src={miniHero} alt=""/>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

/* ─── 2. BREAKAGE PARADOX ─── */
function BreakageSection() {
    const [tab, setTab] = useState<"members" | "structures">("structures");

    const memberPains = [
        "Paying for access they don't use.",
        "No way to pause, transfer, or recover value.",
        'Locked into rigid "cancel or keep" options.',
        "Guilt, frustration, and churn.",
    ];

    const structurePains = [
        "Empty classes and unused capacity.",
        'Manual "name changes" and bureaucracy.',
        "No upside from second-hand demand.",
        "Lost ancillary revenue (PT, drinks, merch).",
    ];

    const pains = tab === "members" ? memberPains : structurePains;

    return (
        <Section className="py-24 lg:py-32 bg-background">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    <div>
                        <motion.h2 variants={fadeUp} custom={0} className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight mb-4">
                            The <span className="text-primary">Breakage</span> Paradox
                        </motion.h2>
                        <motion.p variants={fadeUp} custom={1} className="text-muted-foreground text-lg leading-relaxed mb-2">
                            The fitness industry is built on a hidden conflict:
                        </motion.p>
                        <motion.p variants={fadeUp} custom={1} className="text-foreground font-semibold text-lg mb-8">
                            gyms profit when members pay…
                            <br />
                            and don't show up.
                        </motion.p>

                        {/* Tabs */}
                        <motion.div variants={fadeUp} custom={2} className="flex gap-4 mb-6">
                            <button
                                onClick={() => setTab("members")}
                                className={`text-sm font-semibold pb-1 border-b-2 transition-colors ${
                                    tab === "members"
                                        ? "border-primary text-foreground"
                                        : "border-transparent text-muted-foreground hover:text-foreground"
                                }`}
                            >
                                For Members
                            </button>
                            <button
                                onClick={() => setTab("structures")}
                                className={`text-sm font-semibold pb-1 border-b-2 transition-colors ${
                                    tab === "structures"
                                        ? "border-primary text-foreground"
                                        : "border-transparent text-muted-foreground hover:text-foreground"
                                }`}
                            >
                                For Structures
                            </button>
                        </motion.div>

                        <motion.ul variants={fadeUp} custom={3} className="space-y-3 mb-10">
                            {pains.map((p) => (
                                <li key={p} className="flex items-start gap-3 text-muted-foreground">
                                    <X className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                                    <span>{p}</span>
                                </li>
                            ))}
                        </motion.ul>

                        {/* Callout */}
                        <motion.div variants={fadeUp} custom={4} className="border-l-4 border-accent pl-5 py-3">
                            <p className="font-display font-bold text-lg">
                                Everyone loses — <span className="text-accent">and the value stays trapped.</span>
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                                The system rewards inactivity, creating friction for members and venues.
                            </p>
                        </motion.div>
                    </div>

                    {/* Right image placeholder */}
                    <motion.div variants={scaleIn} custom={2} className="hidden lg:block">
                        <div
                            className="w-full aspect-[3/4] rounded-2xl bg-muted/60 border border-border/40 flex items-center justify-center overflow-hidden">
                            <img src={breakageImg} alt=""/>
                        </div>
                    </motion.div>
                </div>
            </div>
        </Section>
    );
}

/* ─── 3. OPPORTUNITY IN NUMBERS ─── */
function OpportunitySection() {
    const stats = [
        { icon: Globe, value: "€80.7B", label: "Global Health & Fitness market", pos: "top-left" },
        { icon: TrendingDown, value: "50%", label: "of members quit within 6 months", pos: "bottom-left" },
        { icon: Lock, value: "€10.1B", label: 'estimated value trapped in "wasted" memberships', pos: "top-right" },
        { icon: Key, value: "0", label: "Web3 solutions for real-world access", pos: "bottom-right" },
    ];

    return (
        <Section className="py-24 lg:py-32 bg-background">
            <div className="max-w-7xl mx-auto px-6">
                <motion.h2 variants={fadeUp} custom={0} className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-center mb-16">
                    The Opportunity in Numbers
                </motion.h2>

                {/* Grid: stats around center image */}
                <div className="grid grid-cols-2 lg:grid-cols-7 gap-6 max-w-6xl mx-auto mb-12">
                    {/* Top left stat */}
                    <motion.div variants={scaleIn} custom={1} className="col-span-2 bg-secondary text-white rounded-2xl p-6 flex flex-col justify-end">
                        <Globe className="h-8 w-8 mb-3 text-white/60" />
                        <p className="text-3xl lg:text-4xl font-display font-extrabold">{stats[0].value}</p>
                        <p className="text-sm text-white/60 mt-1">{stats[0].label}</p>
                    </motion.div>

                    {/* Center image - spans 2 rows on large screens */}
                    <motion.div
                        variants={scaleIn}
                        custom={2}
                        className="col-span-3 row-span-2 hidden lg:flex items-center justify-center overflow-hidden"
                    >
                        <img src={accessImg} alt="" className="border border-border/40 rounded-2xl" />
                    </motion.div>

                    {/* Top right stat */}
                    <motion.div variants={scaleIn} custom={3} className="col-span-2 bg-secondary text-white rounded-2xl p-6 flex flex-col justify-end">
                        <Lock className="h-8 w-8 mb-3 text-white/60" />
                        <p className="text-3xl lg:text-4xl font-display font-extrabold">{stats[2].value}</p>
                        <p className="text-sm text-white/60 mt-1">{stats[2].label}</p>
                    </motion.div>

                    {/* Bottom left stat */}
                    <motion.div variants={scaleIn} custom={4} className="col-span-2  bg-secondary text-white rounded-2xl p-6 flex flex-col justify-end">
                        <TrendingDown className="h-8 w-8 mb-3 text-white/60" />
                        <p className="text-3xl lg:text-4xl font-display font-extrabold">{stats[1].value}</p>
                        <p className="text-sm text-white/60 mt-1">{stats[1].label}</p>
                    </motion.div>

                    {/* Bottom right stat */}
                    <motion.div variants={scaleIn} custom={5} className="col-span-2  bg-secondary text-white rounded-2xl p-6 flex flex-col justify-end">
                        <Key className="h-8 w-8 mb-3 text-white/60" />
                        <p className="text-3xl lg:text-4xl font-display font-extrabold">{stats[3].value}</p>
                        <p className="text-sm text-white/60 mt-1">{stats[3].label}</p>
                    </motion.div>
                </div>

                {/* Mobile center image */}
                <motion.div variants={scaleIn} custom={2}
                            className="lg:hidden w-full aspect-video border-border/40 flex items-center justify-center mb-10">
                    <img src={accessImg} alt="" className="rounded-2xl border" />
                </motion.div>

                {/* Bottom callout */}
                <motion.div variants={fadeUp} custom={6} className="max-w-2xl mx-auto border-l-4 border-accent pl-5 py-3">
                    <p className="font-display font-bold text-lg">
                        This is <span className="text-accent">dead capital</span> in the real world — and it's growing.
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                        Unused memberships lock value for members and leave venues with empty capacity.
                    </p>
                </motion.div>
            </div>
        </Section>
    );
}

/* ─── 4. WHY FLEXI WORKS ─── */
function WhyFlexiWorksSection() {
    const points = [
        {
            icon: RefreshCw,
            title: "Transferable Access",
            text: "Life happens. Flexi lets members transfer unused access instantly — without paperwork or front desk hassle.",
        },
        {
            icon: UserCheck,
            title: "Verified Check-In",
            text: "Every transfer results in a clean, identity-verified check-in — so venues know exactly who is inside.",
        },
        {
            icon: Coins,
            title: "Automatic Revenue-Share",
            text: "Every resale automatically rewards the venue via royalties — turning churn into predictable revenue.",
        },
        {
            icon: CheckCircle2,
            title: "Zero Fees (IOTA)",
            text: "Flexi runs on IOTA — 0 transaction fees, making instant resale and royalty splits viable at any ticket size.",
        },
    ];

    return (
        <Section className="py-24 lg:py-32 bg-secondary relative overflow-hidden before:bg-[url('/img/shape_bg.png')] before:absolute before:inset-0 before:bg-black/30 before:brightness-[.25]">
            {/* Subtle line overlay */}
            <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 30h60M30 0v60' stroke='%23fff' stroke-width='0.5' fill='none'/%3E%3C/svg%3E\")" }} />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <motion.h2 variants={fadeUp} custom={0} className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-white text-center mb-4">
                    Why Flexi works
                </motion.h2>
                <motion.p variants={fadeUp} custom={1} className="text-white/60 text-lg text-center max-w-3xl mx-auto mb-16">
                    We turn unused physical access into a liquid, verifiable asset — aligned for members, venues, and the ecosystem.
                </motion.p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {points.map((p, i) => (
                        <motion.div key={p.title} variants={fadeUp} custom={i + 2} className="text-center">
                            <div className="w-14 h-14 mx-auto mb-5 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center">
                                <p.icon className="h-7 w-7 text-white" />
                            </div>
                            <h3 className="font-display font-bold text-white mb-2">{p.title}</h3>
                            <p className="text-sm text-white/90 leading-relaxed">{p.text}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Section>
    );
}

/* ─── 5. HOW FLEXI WORKS ─── */
function HowItWorksSection() {
    const steps = [
        {
            num: 1,
            label: 'FROM "PURCHASED" TO "RELISTED"',
            title: "Relist your unused membership",
            text: "Can’t use it this month? If you bought your membership through Flexi, you can put it back on sale in minutes. Review the membership details, set your price, and publish it to the marketplace.",
            bullets: null,
            note: null,
        },
        {
            num: 2,
            label: "ONE TAP. ONE TRANSFER.",
            title: "Someone buys it",
            text: "Your listing appears in the Flexi marketplace. A buyer taps Buy, and the membership access asset is transferred instantly — no DMs, no paperwork.",
            bullets: null,
            note: null,
        },
        {
            num: 3,
            label: "EVERYONE WINS—INSTANTLY.",
            title: "Smart settlement (automatic split)",
            text: "The moment it sells, the settlement splits the payment automatically:",
            bullets: [
                { pct: "80%", who: "goes back to the original member" },
                { pct: "15%", who: "goes to the venue as a royalty" },
                { pct: "5%", who: "goes to Flexi as a small fee" },
            ],
            note: "Powered by IOTA for feeless settlement—built for real-world micro-transactions.",
        },
        {
            num: 4,
            label: "VERIFIED ENTRY. CLEAN LOGS.",
            title: "Check-in with QR / mobile",
            text: "The buyer enters with a QR/mobile check-in. The venue gets verified identity and a clean access record — no confusion at the door.",
            bullets: null,
            note: null,
        },
    ];

    return (
        <Section id="how-it-works" className="py-24 lg:py-32 bg-background">
            <div className="max-w-5xl mx-auto px-6">
                <motion.h2 variants={fadeUp} custom={0} className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-center mb-16">
                    How Flexi works
                </motion.h2>

                <div className="space-y-16">
                    {steps.map((step, i) => {
                        const isEven = i % 2 === 1;
                        return (
                            <motion.div
                                key={step.num}
                                variants={fadeUp}
                                custom={i + 1}
                                className={`grid lg:grid-cols-2 gap-10 items-start ${isEven ? "lg:direction-rtl" : ""}`}
                            >
                                {/* Image placeholder */}
                                <div className={`${isEven ? "lg:order-2" : ""}`}>
                                    <div className="w-full flex items-center justify-center">
                                        <img src={`/img/how_works_${i+1}.jpg`} alt="" className="border border-border/40 rounded-2xl" />
                                    </div>
                                </div>

                                {/* Text */}
                                <div className={`${isEven ? "lg:order-1" : ""}`}>
                  <span className="inline-block text-xs font-bold tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full mb-4 uppercase">
                    {step.label}
                  </span>
                                    <h3 className="text-2xl font-display font-bold mb-3">
                                        {step.num} — {step.title}
                                    </h3>
                                    <p className="text-muted-foreground leading-relaxed mb-4">{step.text}</p>
                                    {step.bullets && (
                                        <ul className="space-y-2 mb-4">
                                            {step.bullets.map((b) => (
                                                <li key={b.pct} className="flex items-center gap-2 text-sm">
                                                    <span className="w-2 h-2 rounded-full bg-accent shrink-0" />
                                                    <span>
                            <strong>{b.pct}</strong> {b.who}
                          </span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    {step.note && (
                                        <p className="text-xs text-muted-foreground italic">{step.note}</p>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </Section>
    );
}

/* ─── 6. EVERYONE WINS ─── */
function EveryoneWinsSection() {
    return (
        <Section className="py-24 lg:py-32 bg-secondary relative overflow-hidden">
            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                <motion.h2 variants={fadeUp} custom={0} className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-white mb-4">
                    Everyone Wins
                </motion.h2>
                <motion.p variants={fadeUp} custom={1} className="text-white/60 text-lg max-w-2xl mx-auto mb-14">
                    Flexi turns unused memberships into a{" "}
                    <span className="text-accent font-semibold underline decoration-accent/40">win-win loop</span>: members recover value, venues earn on every resale, and the platform stays sustainable — automatically.
                </motion.p>

                {/* Glowing unit economics card */}
                <motion.div variants={scaleIn} custom={2} className="relative inline-block">
                    {/* Glow */}
                    <div className="absolute -inset-3 rounded-3xl bg-[hsl(80_80%_50%/0.15)] blur-2xl" />

                    <div
                        className="relative px-12 py-10">
                        <img src={"/img/unit_economics.png"} alt="" className={"border-2 rounded-2xl border-[hsl(80_80%_50%/0.4)]"} />
                    </div>
                </motion.div>
            </div>
        </Section>
    );
}

/* ─── 7. WHY OTHERS BREAK ─── */
function WhyOthersBreakSection() {
    const rows = [
        {
            category: "Integration",
            problem: "Legacy access systems don't expose APIs. You wait for vendors — or you never ship.",
            problemTags: ["APIs", "Vendors", "Blocked"],
            solutionTitle: "Flexi-Bridge",
            solutionText: "Hardware-level integration that works with what venues already have.",
            proof: "No vendor approvals. No rip-and-replace.",
            solutionTags: ["Bridge", "Plug-in", "Works today"],
        },
        {
            category: "Economics",
            problem: "Fees kill the market. A €10 resale can't survive a €2–€5 checkout cost.",
            problemTags: ["Fees", "Friction", "Dead market"],
            solutionTitle: "Micro-settlement (feeless)",
            solutionText: "Instant, near-free settlement that keeps small tickets profitable.",
            proof: "Makes €10–€15 resales viable at scale.",
            solutionTags: ["Feeless", "Instant", "Scalable"],
        },
        {
            category: "Trust & compliance",
            problem: "Venues need to know who's inside. But storing user data creates liability.",
            problemTags: ["Liability", "Risk", "Data burden"],
            solutionTitle: "Identity & compliance ready",
            solutionText: "Verified access without turning the venue into a data vault.",
            proof: "Safety, insurance, compliance — built in.",
            solutionTags: ["Verified", "Privacy", "Audit-ready"],
        },
    ];

    return (
        <Section className="py-24 lg:py-32 bg-background">
            <div className="max-w-6xl mx-auto px-6">
                <motion.h2 variants={fadeUp} custom={0} className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-center mb-4">
                    Why others <span className="text-primary">break</span> in the real world
                </motion.h2>
                <motion.p variants={fadeUp} custom={1} className="text-muted-foreground text-lg text-center max-w-2xl mx-auto mb-16">
                    We didn't build a payment app. We built the missing rails for access resale.
                </motion.p>

                {/* Header row */}
                <motion.div variants={fadeUp} custom={2} className="grid lg:grid-cols-[1fr_auto_1fr] gap-6 mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-display font-bold text-destructive">What breaks</p>
                            <p className="text-xs text-muted-foreground">Where typical solutions fail</p>
                        </div>
                        <span className="text-xs font-semibold text-destructive/60 bg-destructive/10 px-2 py-1 rounded-full">Reality check</span>
                    </div>
                    <div className="hidden lg:flex items-center justify-center text-xs font-semibold text-muted-foreground tracking-wider">
                        PROBLEM <ArrowRight className="h-4 w-4 mx-2" /> MOAT
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-display font-bold">What we built</p>
                            <p className="text-xs text-muted-foreground">The rails that make it work</p>
                        </div>
                        <span className="text-xs font-semibold text-accent bg-accent/10 px-2 py-1 rounded-full">Built to ship</span>
                    </div>
                </motion.div>

                {/* Rows */}
                <div className="space-y-6">
                    {rows.map((row, i) => (
                        <motion.div key={row.category} variants={fadeUp} custom={i + 3} className="grid lg:grid-cols-[1fr_auto_1fr] gap-6">
                            {/* Problem card */}
                            <div className="rounded-xl border-l-4 border-destructive/30 bg-destructive/[0.03] p-6">
                                <span className="text-xs font-bold text-destructive bg-destructive/10 px-2 py-1 rounded-full">{row.category}</span>
                                <p className="mt-3 text-foreground font-medium leading-relaxed">{row.problem}</p>
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {row.problemTags.map((t) => (
                                        <span key={t} className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{t}</span>
                                    ))}
                                </div>
                            </div>

                            {/* Arrow */}
                            <div className="hidden lg:flex items-center justify-center">
                                <ArrowRight className="h-5 w-5 text-muted-foreground" />
                            </div>

                            {/* Solution card */}
                            <div className="rounded-xl border-l-4 border-accent/40 bg-accent/[0.04] p-6">
                                <p className="text-xs font-semibold text-primary mb-1">What we built</p>
                                <h4 className="font-display font-bold text-lg mb-2">{row.solutionTitle}</h4>
                                <p className="text-muted-foreground text-sm leading-relaxed mb-3">{row.solutionText}</p>
                                <div className="bg-accent/10 rounded-lg p-3 mb-4">
                                    <p className="font-semibold text-sm">Proof</p>
                                    <p className="text-sm text-muted-foreground">{row.proof}</p>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {row.solutionTags.map((t) => (
                                        <span key={t} className="text-xs font-semibold text-secondary bg-secondary/10 px-2 py-0.5 rounded-full">{t}</span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Section>
    );
}

/* ─── 8. WHY OTHERS DIDN'T SOLVE IT ─── */
function ComparisonSection() {
    const pillars = [
        { num: 1, title: "Centralized apps", sub: "create vendor lock-in → venues don't adopt." },
        { num: 2, title: "Manual resale", sub: "(Social groups) is risky and bureaucratic." },
        { num: 3, title: "Legacy crypto", sub: "makes micro-transactions unworkable (fees)." },
    ];

    const features = [
        { name: "Physical access check-in", generic: "no", digital: "no", flexi: "yes" },
        { name: "Automatic venue royalty", generic: "no", digital: "partial", flexi: "yes" },
        { name: "Feeless micro-transactions", generic: "no", digital: "no", flexi: "yes" },
        { name: "Hardware-level integration", generic: "no", digital: "no", flexi: "yes" },
    ];

    const renderStatus = (status: string) => {
        if (status === "yes") return <Check className="h-5 w-5 text-accent mx-auto" />;
        if (status === "partial") return <AlertTriangle className="h-5 w-5 text-yellow-500 mx-auto" />;
        return <X className="h-5 w-5 text-white/30 mx-auto" />;
    };

    return (
        <Section className="py-24 lg:py-32 bg-secondary">
            <div className="max-w-5xl mx-auto px-6">
                <motion.h2 variants={fadeUp} custom={0} className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-white text-center mb-4">
                    Why others didn't solve it
                </motion.h2>
                <motion.p variants={fadeUp} custom={1} className="text-white/50 text-lg text-center max-w-2xl mx-auto mb-12">
                    A short, surgical view of what breaks in existing approaches — and what Flexi fixes end-to-end.
                </motion.p>

                {/* Pillar pills */}
                <motion.div variants={fadeUp} custom={2} className="grid sm:grid-cols-3 gap-4 mb-12">
                    {pillars.map((p) => (
                        <div key={p.num} className="bg-white/5 border border-white/10 rounded-xl p-5">
                            <div className="flex items-center gap-3 mb-1">
                                <span className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white">{p.num}</span>
                                <h4 className="font-display font-bold text-white">{p.title}</h4>
                            </div>
                            <p className="text-sm text-white/40 ml-10">{p.sub}</p>
                        </div>
                    ))}
                </motion.div>

                {/* Comparison table */}
                <motion.div variants={scaleIn} custom={3} className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden">
                    <div className="p-6 border-b border-white/10">
                        <h3 className="font-display font-bold text-white">Feature comparison</h3>
                        <p className="text-sm text-white/40 mt-1">Short matrix — focused only on what matters for real-world access resale.</p>
                        <div className="flex items-center gap-4 mt-3 text-xs text-white/50">
                            <span className="flex items-center gap-1"><Check className="h-3.5 w-3.5 text-accent" /> Yes</span>
                            <span className="flex items-center gap-1"><AlertTriangle className="h-3.5 w-3.5 text-yellow-500" /> Partial</span>
                            <span className="flex items-center gap-1"><X className="h-3.5 w-3.5 text-white/30" /> No</span>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                            <tr className="border-b border-white/10">
                                <th className="text-left text-xs font-semibold text-white/50 uppercase tracking-wider p-4">Feature</th>
                                <th className="text-center text-xs font-semibold text-white/50 uppercase tracking-wider p-4">Generic resale apps</th>
                                <th className="text-center text-xs font-semibold text-white/50 uppercase tracking-wider p-4">Digital-only subscription tools</th>
                                <th className="text-center text-xs font-semibold text-white/50 uppercase tracking-wider p-4">
                                    <span className="text-primary font-bold">FLEXI</span>
                                    <span className="inline-block w-2 h-2 rounded-full bg-primary ml-1" />
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {features.map((f, i) => (
                                <tr key={f.name} className={`border-b border-white/5 ${i % 2 === 0 ? "bg-white/[0.02]" : ""}`}>
                                    <td className="p-4 text-sm font-medium text-white">{f.name}</td>
                                    <td className="p-4">{renderStatus(f.generic)}</td>
                                    <td className="p-4">
                                        <div className="flex flex-col items-center">
                                            {renderStatus(f.digital)}
                                            {f.digital === "partial" && (
                                                <span className="text-[11px] text-white/30 mt-1">depends on partner tooling</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="p-4">{renderStatus(f.flexi)}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="p-4 border-t border-white/10">
                        <p className="text-sm text-white/50">
                            Flexi is the only stack covering <strong className="text-white">resale + settlement + physical check-in</strong>.
                        </p>
                    </div>
                </motion.div>
            </div>
        </Section>
    );
}

/* ─── 9. FOOTER / CTA ─── */
function FooterSection() {
    return (
        <Section className="py-16 lg:py-20 bg-background border-t border-border/60">
            <div className="max-w-5xl mx-auto px-6">
                <div className="grid sm:grid-cols-[auto_1fr] gap-12 items-start mb-10">
                    {/* Left */}
                    <motion.div variants={fadeUp} custom={0}>
                        <img src={logoRect} alt="Flexi" className="h-12 mb-6" />
                        <div className="flex items-center gap-3 text-muted-foreground">
                            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                                <Mail className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-foreground">Email</p>
                                <a href="mailto:info@mchiesa.com" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                    info@mchiesa.com
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right */}
                    <motion.div variants={fadeUp} custom={1}>
                        <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight mb-6">
                            Turn unused access
                            <br />
                            into value.
                        </h2>
                        <Button size="lg" asChild>
                            <Link to="/client/marketplace">
                                Find Access
                            </Link>
                        </Button>
                    </motion.div>
                </div>

                <div className="border-t border-border/60 pt-6">
                    <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Flexi. All rights reserved.</p>
                </div>
            </div>
        </Section>
    );
}

/* ─── MAIN PAGE ─── */
export default function LandingPage5() {
    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden scroll-smooth">
            <StickyHeader />
            <HeroSection />
            <BreakageSection />
            <OpportunitySection />
            <WhyFlexiWorksSection />
            <HowItWorksSection />
            <EveryoneWinsSection />
            <WhyOthersBreakSection />
            <ComparisonSection />
            <FooterSection />
        </div>
    );
}
