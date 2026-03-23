import { useState } from "react";
import venueHeroImg from "@/assets/venue-hero-gym.jpg";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MapPin, Phone, Mail, Globe, Clock, ChevronRight,
  Dumbbell, Star, Zap, ShieldCheck, ArrowRight, Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { venueInfo, venueMemberships, type VenueMembership } from "@/data/venueData";
import { VenuePublicPurchaseDialog } from "@/components/venue/VenuePublicPurchaseDialog";
import logoRect from "@/assets/logo_rect.png";
import logoSymbol from "@/assets/logo_symbol.png";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const categoryEmoji: Record<string, string> = {
  gym: "🏋️", yoga: "🧘", dance: "💃", bjj: "🥋", wellness: "🧖",
};

export default function VenuePublicPage() {
  const { slug } = useParams();
  const venue = venueInfo; // In production, fetch by slug
  const activeMemberships = venueMemberships.filter((m) => m.status === "active" && m.visibility === "published");

  const [purchaseMembership, setPurchaseMembership] = useState<VenueMembership | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* ── Sticky Nav ── */}
      <nav className="sticky top-0 z-50 glass border-b border-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={logoRect} alt="Flexi" className="h-8"/>
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <a href="#memberships">Plans</a>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a href="#about">About</a>
            </Button>
            <Button size="sm" asChild>
              <a href="#memberships">Join Now <ArrowRight className="h-3.5 w-3.5" /></a>
            </Button>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={venueHeroImg} alt={venue.name} className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-secondary/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/60 via-secondary/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-28 lg:pt-28 lg:pb-36">
          <motion.div
            initial="hidden"
            animate="visible"
            className="max-w-2xl space-y-5"
          >
            <motion.div variants={fadeUp} custom={0} className="flex items-center gap-2">
              <Badge className="bg-primary-foreground/20 text-primary-foreground border-primary-foreground/20 text-xs font-bold backdrop-blur-sm">
                {categoryEmoji[venue.category] || "🏢"} {venue.category.charAt(0).toUpperCase() + venue.category.slice(1)}
              </Badge>
              <Badge className="bg-primary-foreground/20 text-primary-foreground border-primary-foreground/20 text-xs backdrop-blur-sm">
                <MapPin className="h-3 w-3 mr-1" /> {venue.location}
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display text-primary-foreground leading-[1.1] tracking-tight"
            >
              {venue.name}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-lg sm:text-xl text-primary-foreground/80 leading-relaxed max-w-lg"
            >
              {venue.shortDescription}
            </motion.p>

            <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-3 pt-2">
              <Button size="lg" className="bg-primary-foreground text-secondary hover:bg-primary-foreground/90 shadow-elevated font-bold" asChild>
                <a href="#memberships">
                  <Sparkles className="h-4 w-4" /> Browse Memberships
                </a>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/90" asChild>
                <a href="#about">Learn More</a>
              </Button>
            </motion.div>

            {/* Quick stats */}
            <motion.div variants={fadeUp} custom={4} className="flex gap-6 pt-4">
              {venue.highlights.map((h) => (
                <div key={h} className="flex items-center gap-1.5 text-primary-foreground/70">
                  <Star className="h-3.5 w-3.5 text-accent" />
                  <span className="text-sm font-medium">{h}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Memberships ── */}
      <section id="memberships" className="max-w-6xl mx-auto px-4 sm:px-6 -mt-12 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="space-y-6"
        >
          <motion.div variants={fadeUp} custom={0} className="text-center">
            <Badge variant="outline" className="text-sm font-bold text-primary border-primary/30 bg-primary/10 mb-3 px-3 py-1">
              <Zap className="h-3 w-3 mr-1" /> Digital Memberships
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-foreground">
              Choose Your Plan
            </h2>
            <p className="text-muted-foreground mt-2 max-w-md mx-auto">
              Secure your membership as a digital pass. Transferable, verifiable, always with you.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
            {activeMemberships.map((m, i) => (
              <motion.div
                key={m.id}
                variants={fadeUp}
                custom={i + 1}
                className="group relative rounded-2xl border border-border/50 bg-card p-5 flex flex-col hover:shadow-elevated hover:border-primary/20 transition-all duration-300"
              >
                {m.discountedPrice && (
                  <div className="absolute -top-2.5 right-4">
                    <Badge className="bg-accent text-accent-foreground text-xs font-bold shadow-glow-mint">
                      Save €{m.price - m.discountedPrice}
                    </Badge>
                  </div>
                )}

                <div className="mb-4">
                  <p className="text-base font-bold font-display text-foreground">{m.title}</p>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{m.description}</p>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="outline" className="text-xs">
                    {m.type === "time-based" ? `⏱ ${m.durationLabel}` : `🎫 ${m.totalEntries} entries`}
                  </Badge>
                  {m.resaleEligible && (
                    <Badge variant="outline" className="text-xs text-accent border-accent/20">
                      Resalable
                    </Badge>
                  )}
                </div>

                <div className="mt-auto pt-4 border-t border-border/30 space-y-4">
                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-extrabold font-display text-foreground">
                      €{m.discountedPrice || m.price}
                    </span>
                    {m.discountedPrice && (
                      <span className="text-sm text-muted-foreground line-through mb-0.5">€{m.price}</span>
                    )}
                  </div>

                  <Button
                    variant="hero"
                    className="w-full"
                    onClick={() => setPurchaseMembership(m)}
                  >
                    Get This Plan <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── About ── */}
      <section id="about" className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid lg:grid-cols-2 gap-12 items-start"
        >
          <motion.div variants={fadeUp} custom={0} className="space-y-6">
            <div>
              <Badge variant="outline" className="text-xs font-bold text-primary border-primary/20 bg-primary/5 mb-3">About Us</Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-foreground">
                More Than a {venue.category.charAt(0).toUpperCase() + venue.category.slice(1)}
              </h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">{venue.longDescription}</p>

            <div className="space-y-3">
              <h3 className="text-sm font-bold font-display text-foreground uppercase tracking-wide">Opening Hours</h3>
              {venue.openingHours.map((oh) => (
                <div key={oh.day} className="flex items-center justify-between rounded-lg bg-muted/30 px-4 py-2.5">
                  <span className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5 text-muted-foreground" /> {oh.day}
                  </span>
                  <span className="text-sm text-muted-foreground font-medium">{oh.hours}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Amenities */}
          <motion.div variants={fadeUp} custom={1} className="space-y-6">
            <div>
              <Badge variant="outline" className="text-xs font-bold text-primary border-primary/20 bg-primary/5 mb-3">
                <Dumbbell className="h-3 w-3 mr-1" /> Facilities
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-foreground">
                Everything You Need
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {venue.amenities.map((a) => (
                <div
                  key={a}
                  className="flex items-center gap-3 rounded-xl border border-border/50 bg-card p-4 hover:shadow-card transition-shadow"
                >
                  <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Dumbbell className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{a}</span>
                </div>
              ))}
            </div>

            {/* Trust badges */}
            <div className="rounded-2xl gradient-card border border-border/50 p-5 space-y-3">
              <h3 className="text-sm font-bold font-display text-foreground flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-accent" /> Flexi Verified Venue
              </h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-xs">✓ Digital Passes</Badge>
                <Badge variant="outline" className="text-xs">✓ Verified Identity</Badge>
                <Badge variant="outline" className="text-xs">✓ Resale Enabled</Badge>
                <Badge variant="outline" className="text-xs">✓ Instant Access</Badge>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Gallery ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="space-y-6"
        >
          <motion.div variants={fadeUp} custom={0}>
            <Badge variant="outline" className="text-xs font-bold text-primary border-primary/20 bg-primary/5 mb-3">Gallery</Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-foreground">Take a Look Inside</h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {venue.gallery.map((_, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i + 1}
                className="aspect-[4/3] rounded-2xl bg-secondary/10 border border-border/50 flex items-center justify-center overflow-hidden hover:shadow-elevated transition-shadow"
              >
                <div className="text-center space-y-2">
                  <div className="h-10 w-10 rounded-xl gradient-hero mx-auto flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <p className="text-xs text-muted-foreground font-medium">Photo {i + 1}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Contact ── */}
      <section className="border-t border-border/50 bg-card">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { icon: MapPin, label: "Address", value: venue.address },
              { icon: Phone, label: "Phone", value: venue.phone },
              { icon: Mail, label: "Email", value: venue.email },
              { icon: Globe, label: "Website", value: venue.website },
            ].map((c, i) => (
              <motion.div
                key={c.label}
                variants={fadeUp}
                custom={i}
                className="flex items-start gap-3"
              >
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <c.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">{c.label}</p>
                  <p className="text-sm font-medium text-foreground mt-0.5">{c.value}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Footer CTA ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-95" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 text-center space-y-5">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-primary-foreground">
            Ready to Start?
          </h2>
          <p className="text-primary-foreground/70 max-w-md mx-auto">
            Join {venue.name} today. Get your digital membership pass and start training.
          </p>
          <Button size="lg" className="bg-primary-foreground text-secondary hover:bg-primary-foreground/90 shadow-elevated font-bold" asChild>
            <a href="#memberships">
              <Sparkles className="h-4 w-4" /> Get Your Pass
            </a>
          </Button>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border/50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md flex items-center justify-center">
              <img src={logoSymbol} alt="Flexi" className="h-8"/>
            </div>
            <span className="text-sm font-display font-bold text-muted-foreground">Powered by Flexi</span>
          </div>
          <p className="text-xs text-muted-foreground">© 2026 Flexi. All rights reserved.</p>
        </div>
      </footer>

      {/* Purchase Dialog */}
      <VenuePublicPurchaseDialog
        membership={purchaseMembership}
        venueName={venue.name}
        open={!!purchaseMembership}
        onOpenChange={(open) => !open && setPurchaseMembership(null)}
      />
    </div>
  );
}
