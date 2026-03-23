import { Save, Building2, Mail, Phone, MapPin, Globe, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { venueInfo } from "@/data/venueData";

export default function VenueSettings() {
  return (
    <div className="space-y-5 max-w-4xl mx-auto">
      <div>
        <h1 className="text-xl font-extrabold font-display text-foreground">Venue Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your venue configuration</p>
      </div>

      <Tabs defaultValue="general" className="space-y-5">
        <TabsList className="bg-muted/40 border border-border/50 p-0.5 rounded-lg h-9">
          <TabsTrigger value="general" className="text-xs rounded-md h-7 gap-1"><Building2 className="h-3.5 w-3.5" /> General</TabsTrigger>
          <TabsTrigger value="billing" className="text-xs rounded-md h-7 gap-1"><Globe className="h-3.5 w-3.5" /> Billing</TabsTrigger>
          <TabsTrigger value="notifications" className="text-xs rounded-md h-7 gap-1"><Mail className="h-3.5 w-3.5" /> Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <div className="rounded-xl bg-card border border-border/50 p-5 space-y-4">
            <h3 className="text-sm font-bold font-display text-foreground">Venue Information</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Venue Name</Label>
                <Input defaultValue={venueInfo.name} className="bg-muted/20 border-border/50" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Category</Label>
                <Input defaultValue={venueInfo.category} className="bg-muted/20 border-border/50" />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground flex items-center gap-1"><Mail className="h-3 w-3" /> Email</Label>
                <Input defaultValue={venueInfo.email} className="bg-muted/20 border-border/50" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground flex items-center gap-1"><Phone className="h-3 w-3" /> Phone</Label>
                <Input defaultValue={venueInfo.phone} className="bg-muted/20 border-border/50" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" /> Address</Label>
              <Input defaultValue={venueInfo.address} className="bg-muted/20 border-border/50" />
            </div>
            <div className="flex justify-end">
              <Button size="sm"><Save className="h-4 w-4" /> Save</Button>
            </div>
          </div>

          {/*<div className="rounded-xl bg-card border border-border/50 p-5 space-y-4">
            <h3 className="text-sm font-bold font-display text-foreground">Resale Settings</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-lg border border-border/50 px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-foreground">Allow resale on marketplace</p>
                  <p className="text-[10px] text-muted-foreground">Members can list passes on the Flexi secondary market</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border/50 px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-foreground">Venue royalty rate</p>
                  <p className="text-[10px] text-muted-foreground">Percentage earned on each resale transaction</p>
                </div>
                <Input defaultValue="5" className="w-16 h-8 text-center bg-muted/20 border-border/50 text-sm" />
              </div>
            </div>
          </div>*/}
        </TabsContent>

        <TabsContent value="billing" className="space-y-4">
          <div className="rounded-xl bg-card border border-border/50 p-5 space-y-4">
            <h3 className="text-sm font-bold font-display text-foreground">Billing Information</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Company Name</Label>
                <Input defaultValue="Iron Temple SRL" className="bg-muted/20 border-border/50" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">VAT Number</Label>
                <Input defaultValue="IT12345678901" className="bg-muted/20 border-border/50" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">IBAN</Label>
              <Input defaultValue="IT60X054281110100000012345" className="bg-muted/20 border-border/50" />
            </div>
            <div className="flex justify-end">
              <Button size="sm"><Save className="h-4 w-4" /> Save</Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <div className="rounded-xl bg-card border border-border/50 p-5 space-y-3">
            <h3 className="text-sm font-bold font-display text-foreground">Notification Preferences</h3>
            {[
              { label: "New sale", desc: "When a membership is purchased" },
              { label: "Resale activity", desc: "When a pass is resold on the marketplace" },
              { label: "Daily summary", desc: "Daily digest of check-ins and sales" },
              { label: "Access alerts", desc: "Blocked or flagged access attempts" },
            ].map((n) => (
              <div key={n.label} className="flex items-center justify-between rounded-lg px-4 py-3 hover:bg-muted/10">
                <div>
                  <p className="text-sm font-medium text-foreground">{n.label}</p>
                  <p className="text-[10px] text-muted-foreground">{n.desc}</p>
                </div>
                <Switch defaultChecked />
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
