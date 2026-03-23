import { useState } from "react";
import logoRect from "@/assets/logo_rect.png";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, CheckCircle2, Building2, Globe, Users, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { z } from "zod";

const joinSchema = z.object({
  venueName: z.string().trim().min(1, "Venue name is required").max(100),
  contactName: z.string().trim().min(1, "Your name is required").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  city: z.string().trim().min(1, "City is required").max(100),
  category: z.string().trim().min(1, "Please select a category").max(50),
  notes: z.string().trim().max(500).optional(),
});

type JoinForm = z.infer<typeof joinSchema>;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const perks = [
  { icon: Building2, title: "Your venue page", desc: "A dedicated public page to showcase your brand, services and memberships." },
  { icon: TrendingUp, title: "New revenue streams", desc: "Earn from every resale transaction through the Flexi system." },
  { icon: Users, title: "Reach new members", desc: "Turn occasional buyers into recurring clients through verified access." },
  { icon: Globe, title: "Digital presence", desc: "Present your venue to a wider audience within the Flexi ecosystem." },
];

const categories = [
  "Gym & Fitness",
  "BJJ & Martial Arts",
  "Dance Studio",
  "Yoga Studio",
  "Wellness & Spa",
  "Community Venue",
  "Other",
];

export default function JoinVenue() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof JoinForm, string>>>({});
  const [form, setForm] = useState<JoinForm>({
    venueName: "",
    contactName: "",
    email: "",
    city: "",
    category: "",
    notes: "",
  });

  const handleChange = (field: keyof JoinForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = joinSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof JoinForm, string>> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof JoinForm;
        if (!fieldErrors[field]) fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
        <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <img src={logoRect} alt="Flexi" className="h-8" />
          </Link>
          <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to homepage
          </Link>
        </div>
      </nav>

      <div className="pt-24 pb-20">
        <div className="container mx-auto px-6 lg:px-12">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto text-center py-20"
            >
              <div className="w-20 h-20 rounded-full bg-accent/15 flex items-center justify-center mx-auto mb-8">
                <CheckCircle2 className="h-10 w-10 text-accent" />
              </div>
              <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">
                Welcome to Flexi.
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4 max-w-lg mx-auto">
                We've received your information. You'll hear from us shortly with next steps to set up your venue page and get started.
              </p>
              <p className="text-sm text-muted-foreground mb-10">
                If you need help in the meantime, reach out to our team anytime.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="hero" size="lg" asChild>
                  <Link to="/">Back to homepage</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/contact">Talk to our team</Link>
                </Button>
              </div>
            </motion.div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start max-w-6xl mx-auto">
              {/* Left — Value prop */}
              <motion.div initial="hidden" animate="visible" className="lg:sticky lg:top-28">
                <motion.h1 custom={0} variants={fadeUp} className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.1] mb-6">
                  Bring your venue{" "}
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    into the Flexi ecosystem.
                  </span>
                </motion.h1>
                <motion.p custom={1} variants={fadeUp} className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-lg">
                  Create your venue page, showcase your services and memberships, and participate in a more structured membership flow — on your terms.
                </motion.p>

                <div className="space-y-5">
                  {perks.map((perk, i) => (
                    <motion.div key={perk.title} custom={i + 2} variants={fadeUp} initial="hidden" animate="visible" className="flex gap-4">
                      <div className="w-10 h-10 rounded-lg gradient-hero flex items-center justify-center shrink-0 mt-0.5">
                        <perk.icon className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-sm mb-0.5">{perk.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{perk.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.p custom={6} variants={fadeUp} initial="hidden" animate="visible" className="mt-10 text-sm text-muted-foreground border-l-2 border-primary/30 pl-4">
                  Start independently, get support when needed. Our team is here if you want help with onboarding, setup or activation.
                </motion.p>
              </motion.div>

              {/* Right — Form */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <Card className="border-border/50 shadow-elevated">
                  <CardContent className="p-8 lg:p-10">
                    <h2 className="font-display text-2xl font-bold mb-2">Join as a venue</h2>
                    <p className="text-sm text-muted-foreground mb-8">Fill in your details and we'll get you set up.</p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="space-y-2">
                        <Label htmlFor="venueName">Venue name *</Label>
                        <Input id="venueName" placeholder="e.g. Iron Temple Gym" value={form.venueName} onChange={(e) => handleChange("venueName", e.target.value)} />
                        {errors.venueName && <p className="text-xs text-destructive">{errors.venueName}</p>}
                      </div>

                      <div className="grid sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <Label htmlFor="contactName">Your name *</Label>
                          <Input id="contactName" placeholder="Full name" value={form.contactName} onChange={(e) => handleChange("contactName", e.target.value)} />
                          {errors.contactName && <p className="text-xs text-destructive">{errors.contactName}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email *</Label>
                          <Input id="email" type="email" placeholder="you@venue.com" value={form.email} onChange={(e) => handleChange("email", e.target.value)} />
                          {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <Label htmlFor="city">City *</Label>
                          <Input id="city" placeholder="e.g. Milano" value={form.city} onChange={(e) => handleChange("city", e.target.value)} />
                          {errors.city && <p className="text-xs text-destructive">{errors.city}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="category">Category *</Label>
                          <select
                            id="category"
                            value={form.category}
                            onChange={(e) => handleChange("category", e.target.value)}
                            className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          >
                            <option value="">Select category</option>
                            {categories.map((cat) => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                          </select>
                          {errors.category && <p className="text-xs text-destructive">{errors.category}</p>}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="notes">Anything else? <span className="text-muted-foreground font-normal">(optional)</span></Label>
                        <Textarea id="notes" placeholder="Tell us about your venue, goals, or questions..." rows={3} value={form.notes} onChange={(e) => handleChange("notes", e.target.value)} />
                      </div>

                      <Button type="submit" variant="hero" size="lg" className="w-full text-base mt-2">
                        Join as a venue
                      </Button>

                      <p className="text-xs text-center text-muted-foreground">
                        By joining, you agree to Flexi's terms of service. No payment required.
                      </p>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/60 py-12">
        <div className="container mx-auto px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <img src={logoRect} alt="Flexi" className="h-6" />
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Flexi. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
