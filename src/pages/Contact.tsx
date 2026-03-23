import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, CheckCircle2, MessageSquare, Clock, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { z } from "zod";
import logoRect from "@/assets/logo_rect.png";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  venue: z.string().trim().max(100).optional(),
  message: z.string().trim().min(1, "Message is required").max(1000),
});

type ContactForm = z.infer<typeof contactSchema>;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const highlights = [
  { icon: MessageSquare, title: "No-pressure conversation", desc: "Ask anything about Flexi — we're here to help you evaluate, not to push a sale." },
  { icon: Clock, title: "Quick response", desc: "We typically reply within one business day with useful, specific answers." },
  { icon: ShieldCheck, title: "Guided onboarding", desc: "If you decide to join, we'll help you set up your venue page and get started." },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactForm, string>>>({});
  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    venue: "",
    message: "",
  });

  const handleChange = (field: keyof ContactForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactForm, string>> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof ContactForm;
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
                Message received.
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4 max-w-lg mx-auto">
                Thank you for reaching out. We'll get back to you shortly with a thoughtful reply.
              </p>
              <p className="text-sm text-muted-foreground mb-10">
                In the meantime, feel free to explore how Flexi works.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="hero" size="lg" asChild>
                  <Link to="/">Back to homepage</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/join">Join as a venue</Link>
                </Button>
              </div>
            </motion.div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start max-w-6xl mx-auto">
              {/* Left — Context */}
              <motion.div initial="hidden" animate="visible" className="lg:sticky lg:top-28">
                <motion.h1 custom={0} variants={fadeUp} className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.1] mb-6">
                  Let's talk about{" "}
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    what Flexi can do for you.
                  </span>
                </motion.h1>
                <motion.p custom={1} variants={fadeUp} className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-lg">
                  Whether you're exploring Flexi for the first time or want support setting up your venue — we're here.
                </motion.p>

                <div className="space-y-5">
                  {highlights.map((h, i) => (
                    <motion.div key={h.title} custom={i + 2} variants={fadeUp} initial="hidden" animate="visible" className="flex gap-4">
                      <div className="w-10 h-10 rounded-lg gradient-hero flex items-center justify-center shrink-0 mt-0.5">
                        <h.icon className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-sm mb-0.5">{h.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{h.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div custom={5} variants={fadeUp} initial="hidden" animate="visible" className="mt-10 p-5 rounded-2xl border border-border bg-muted/30">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    <span className="font-semibold text-foreground">Prefer to get started right away?</span>{" "}
                    You can <Link to="/join" className="text-primary font-semibold hover:underline">join as a venue</Link> and begin setting up your page independently.
                  </p>
                </motion.div>
              </motion.div>

              {/* Right — Form */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <Card className="border-border/50 shadow-elevated">
                  <CardContent className="p-8 lg:p-10">
                    <h2 className="font-display text-2xl font-bold mb-2">Talk to our team</h2>
                    <p className="text-sm text-muted-foreground mb-8">Send us a message and we'll be in touch soon.</p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <Label htmlFor="name">Your name *</Label>
                          <Input id="name" placeholder="Full name" value={form.name} onChange={(e) => handleChange("name", e.target.value)} />
                          {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email *</Label>
                          <Input id="email" type="email" placeholder="you@example.com" value={form.email} onChange={(e) => handleChange("email", e.target.value)} />
                          {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="venue">Venue name <span className="text-muted-foreground font-normal">(optional)</span></Label>
                        <Input id="venue" placeholder="e.g. Iron Temple Gym" value={form.venue} onChange={(e) => handleChange("venue", e.target.value)} />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message *</Label>
                        <Textarea id="message" placeholder="Tell us what you'd like to discuss — questions, onboarding support, partnership ideas..." rows={5} value={form.message} onChange={(e) => handleChange("message", e.target.value)} />
                        {errors.message && <p className="text-xs text-destructive">{errors.message}</p>}
                      </div>

                      <Button type="submit" variant="hero" size="lg" className="w-full text-base mt-2">
                        Send message
                      </Button>

                      <p className="text-xs text-center text-muted-foreground">
                        We'll reply within one business day. No spam, no pressure.
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
