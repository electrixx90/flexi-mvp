import { useState } from "react";
import {
  Globe, Image, Type, MapPin, Phone, Mail, Dumbbell, Star, Eye,
  ChevronRight, Plus, X, GripVertical, Save,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { venueInfo, venueMemberships } from "@/data/venueData";

const builderSections = [
  { id: "hero", label: "Hero Section", icon: Image },
  { id: "about", label: "About", icon: Type },
  { id: "memberships", label: "Memberships", icon: Star },
  { id: "gallery", label: "Gallery", icon: Image },
  { id: "amenities", label: "Amenities", icon: Dumbbell },
  { id: "contact", label: "Contact & Location", icon: MapPin },
];

export default function VenueBuilder() {
  const [activeSection, setActiveSection] = useState("hero");
  const [venue, setVenue] = useState(venueInfo);
  const [newAmenity, setNewAmenity] = useState("");

  const removeAmenity = (a: string) =>
    setVenue((v) => ({ ...v, amenities: v.amenities.filter((x) => x !== a) }));
  const addAmenity = () => {
    if (newAmenity.trim()) {
      setVenue((v) => ({ ...v, amenities: [...v.amenities, newAmenity.trim()] }));
      setNewAmenity("");
    }
  };

  return (
    <div className="space-y-5 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold font-display text-foreground">Public Page Builder</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Configure your venue's showcase page on Flexi</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Eye className="h-4 w-4" /> Preview</Button>
          <Button size="sm"><Save className="h-4 w-4" /> Publish</Button>
        </div>
      </div>

      <Tabs defaultValue="edit" className="space-y-4">
        <TabsList className="bg-muted/40 border border-border/50 p-0.5 rounded-lg h-9">
          <TabsTrigger value="edit" className="text-xs rounded-md h-7">Edit</TabsTrigger>
          <TabsTrigger value="preview" className="text-xs rounded-md h-7">Live Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="edit" className="space-y-4">
          <div className="grid lg:grid-cols-[280px_1fr] gap-5">
            {/* Sections nav */}
            <div className="rounded-xl bg-card border border-border/50 p-3 space-y-1 h-fit">
              <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-3 mb-2">Sections</p>
              {builderSections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveSection(s.id)}
                  className={`w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    activeSection === s.id
                      ? "bg-secondary/10 text-secondary"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  }`}
                >
                  <GripVertical className="h-3.5 w-3.5 text-muted-foreground/40" />
                  <s.icon className="h-4 w-4" />
                  {s.label}
                  <ChevronRight className="h-3.5 w-3.5 ml-auto" />
                </button>
              ))}
            </div>

            {/* Editor content */}
            <div className="space-y-4">
              {activeSection === "hero" && (
                <div className="rounded-xl bg-card border border-border/50 p-5 space-y-4">
                  <h3 className="text-base font-bold font-display text-foreground">Hero Section</h3>
                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-medium text-muted-foreground">Venue Name</Label>
                      <Input value={venue.name} onChange={(e) => setVenue({ ...venue, name: e.target.value })} className="bg-muted/20 border-border/50" />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-medium text-muted-foreground">Short Description</Label>
                      <Input value={venue.shortDescription} onChange={(e) => setVenue({ ...venue, shortDescription: e.target.value })} className="bg-muted/20 border-border/50" />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-medium text-muted-foreground">Category</Label>
                      <Input value={venue.category} onChange={(e) => setVenue({ ...venue, category: e.target.value })} className="bg-muted/20 border-border/50" />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-medium text-muted-foreground">Cover Image</Label>
                      <div className="h-32 rounded-lg bg-muted/30 border-2 border-dashed border-border flex items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors">
                        <div className="text-center">
                          <Image className="h-6 w-6 text-muted-foreground mx-auto mb-1" />
                          <p className="text-xs text-muted-foreground">Click to upload cover image</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === "about" && (
                <div className="rounded-xl bg-card border border-border/50 p-5 space-y-4">
                  <h3 className="text-base font-bold font-display text-foreground">About</h3>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-muted-foreground">Long Description</Label>
                    <Textarea value={venue.longDescription} onChange={(e) => setVenue({ ...venue, longDescription: e.target.value })} rows={5} className="bg-muted/20 border-border/50 text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-muted-foreground">Highlights</Label>
                    <div className="flex flex-wrap gap-1.5">
                      {venue.highlights.map((h) => (
                        <Badge key={h} variant="outline" className="text-xs gap-1 pr-1">
                          {h}
                          <X className="h-3 w-3 cursor-pointer hover:text-destructive" onClick={() => setVenue(v => ({ ...v, highlights: v.highlights.filter(x => x !== h) }))} />
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-muted-foreground">Opening Hours</Label>
                    {venue.openingHours.map((oh, i) => (
                      <div key={i} className="flex gap-2">
                        <Input value={oh.day} className="bg-muted/20 border-border/50 w-32" readOnly />
                        <Input value={oh.hours} className="bg-muted/20 border-border/50" readOnly />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSection === "memberships" && (
                <div className="rounded-xl bg-card border border-border/50 p-5 space-y-4">
                  <h3 className="text-base font-bold font-display text-foreground">Memberships to Showcase</h3>
                  <p className="text-sm text-muted-foreground">Select which memberships appear on your public page.</p>
                  <div className="space-y-2">
                    {venueMemberships.filter(m => m.status === 'active').map((m) => (
                      <div key={m.id} className="flex items-center justify-between rounded-lg border border-border/50 px-4 py-3">
                        <div>
                          <p className="text-sm font-medium text-foreground">{m.title}</p>
                          <p className="text-xs text-muted-foreground">€{m.price} · {m.durationLabel || `${m.totalEntries} entries`}</p>
                        </div>
                        <Switch defaultChecked={m.visibility === 'published'} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSection === "gallery" && (
                <div className="rounded-xl bg-card border border-border/50 p-5 space-y-4">
                  <h3 className="text-base font-bold font-display text-foreground">Gallery</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {venue.gallery.map((_, i) => (
                      <div key={i} className="aspect-video rounded-lg bg-muted/30 border border-border/50 flex items-center justify-center">
                        <Image className="h-5 w-5 text-muted-foreground" />
                      </div>
                    ))}
                    <div className="aspect-video rounded-lg border-2 border-dashed border-border flex items-center justify-center cursor-pointer hover:bg-muted/30 transition-colors">
                      <Plus className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                </div>
              )}

              {activeSection === "amenities" && (
                <div className="rounded-xl bg-card border border-border/50 p-5 space-y-4">
                  <h3 className="text-base font-bold font-display text-foreground">Amenities & Services</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {venue.amenities.map((a) => (
                      <Badge key={a} variant="outline" className="text-xs gap-1 pr-1">
                        {a}
                        <X className="h-3 w-3 cursor-pointer hover:text-destructive" onClick={() => removeAmenity(a)} />
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input value={newAmenity} onChange={(e) => setNewAmenity(e.target.value)} placeholder="Add amenity..." className="bg-muted/20 border-border/50" onKeyDown={(e) => e.key === 'Enter' && addAmenity()} />
                    <Button variant="outline" size="sm" onClick={addAmenity}><Plus className="h-4 w-4" /></Button>
                  </div>
                </div>
              )}

              {activeSection === "contact" && (
                <div className="rounded-xl bg-card border border-border/50 p-5 space-y-4">
                  <h3 className="text-base font-bold font-display text-foreground">Contact & Location</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-medium text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" /> Address</Label>
                      <Input value={venue.address} onChange={(e) => setVenue({ ...venue, address: e.target.value })} className="bg-muted/20 border-border/50" />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-medium text-muted-foreground flex items-center gap-1"><Phone className="h-3 w-3" /> Phone</Label>
                      <Input value={venue.phone} onChange={(e) => setVenue({ ...venue, phone: e.target.value })} className="bg-muted/20 border-border/50" />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-medium text-muted-foreground flex items-center gap-1"><Mail className="h-3 w-3" /> Email</Label>
                      <Input value={venue.email} onChange={(e) => setVenue({ ...venue, email: e.target.value })} className="bg-muted/20 border-border/50" />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-medium text-muted-foreground flex items-center gap-1"><Globe className="h-3 w-3" /> Website</Label>
                      <Input value={venue.website} onChange={(e) => setVenue({ ...venue, website: e.target.value })} className="bg-muted/20 border-border/50" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="preview">
          {/* Live preview */}
          <div className="rounded-xl border border-border/50 overflow-hidden bg-card">
            {/* Hero */}
            <div className="h-48 bg-secondary flex items-end p-6">
              <div>
                <p className="text-3xl font-extrabold font-display text-secondary-foreground">{venue.name}</p>
                <p className="text-sm text-secondary-foreground/70 mt-1">{venue.shortDescription}</p>
                <div className="flex gap-2 mt-2">
                  <Badge className="bg-secondary-foreground/20 text-secondary-foreground text-xs">{venue.category}</Badge>
                  <Badge className="bg-secondary-foreground/20 text-secondary-foreground text-xs">{venue.location}</Badge>
                </div>
              </div>
            </div>
            {/* About */}
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-base font-bold font-display text-foreground mb-2">About</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{venue.longDescription}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {venue.highlights.map((h) => (
                    <Badge key={h} variant="outline" className="text-xs">{h}</Badge>
                  ))}
                </div>
              </div>
              {/* Memberships */}
              <div>
                <h3 className="text-base font-bold font-display text-foreground mb-2">Memberships</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {venueMemberships.filter(m => m.status === 'active').slice(0, 4).map((m) => (
                    <div key={m.id} className="rounded-lg border border-border/50 p-4">
                      <p className="text-sm font-bold text-foreground">{m.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{m.description}</p>
                      <div className="flex items-end gap-2 mt-2">
                        <span className="text-lg font-extrabold font-display text-primary">€{m.discountedPrice || m.price}</span>
                        {m.discountedPrice && <span className="text-xs text-muted-foreground line-through">€{m.price}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Amenities */}
              <div>
                <h3 className="text-base font-bold font-display text-foreground mb-2">Amenities</h3>
                <div className="flex flex-wrap gap-1.5">
                  {venue.amenities.map((a) => (
                    <Badge key={a} variant="secondary" className="text-xs">{a}</Badge>
                  ))}
                </div>
              </div>
              {/* Contact */}
              <div>
                <h3 className="text-base font-bold font-display text-foreground mb-2">Contact</h3>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5" /> {venue.address}</p>
                  <p className="flex items-center gap-2"><Phone className="h-3.5 w-3.5" /> {venue.phone}</p>
                  <p className="flex items-center gap-2"><Mail className="h-3.5 w-3.5" /> {venue.email}</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
