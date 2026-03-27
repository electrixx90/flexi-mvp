import { useState } from "react";
import { Plus, Search, MoreHorizontal, Pencil, Trash2, Eye, EyeOff, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { venueMemberships, type VenueMembership } from "@/data/venueData";
import { toast } from "sonner";

const statusColors: Record<string, string> = {
  active: "text-accent border-accent/30 bg-accent/5",
  draft: "text-muted-foreground border-border",
  inactive: "text-destructive border-destructive/30 bg-destructive/5",
};

export default function VenueMemberships() {
  const [memberships, setMemberships] = useState<VenueMembership[]>([...venueMemberships]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editingMembership, setEditingMembership] = useState<VenueMembership | null>(null);
  const [membershipType, setMembershipType] = useState("time-based");
  const [createDialogContainer, setCreateDialogContainer] = useState<HTMLDivElement | null>(null);
  const [editDialogContainer, setEditDialogContainer] = useState<HTMLDivElement | null>(null);

  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newCategory, setNewCategory] = useState("gym");
  const [newDuration, setNewDuration] = useState("");
  const [newEntries, setNewEntries] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newDiscountedPrice, setNewDiscountedPrice] = useState("");

  const resetForm = () => {
    setNewTitle(""); setNewDesc(""); setNewCategory("gym"); setMembershipType("time-based");
    setNewDuration(""); setNewEntries(""); setNewPrice(""); setNewDiscountedPrice("");
  };

  const handleCreate = () => {
    if (!newTitle.trim() || !newPrice.trim()) { toast.error("Title and price are required"); return; }
    const m: VenueMembership = {
      id: `vm-${Date.now()}`, title: newTitle.trim(), description: newDesc.trim(), category: newCategory,
      type: membershipType as 'time-based' | 'entries',
      durationDays: membershipType === 'time-based' ? Number(newDuration) || 30 : undefined,
      durationLabel: membershipType === 'time-based' ? `${Number(newDuration) || 30} days` : undefined,
      totalEntries: membershipType === 'entries' ? Number(newEntries) || 10 : undefined,
      price: Number(newPrice), discountedPrice: newDiscountedPrice ? Number(newDiscountedPrice) : undefined,
      status: 'draft', resaleEligible: false, visibility: 'hidden',
      soldCount: 0, activeCustomers: 0, totalRevenue: 0, resaleCount: 0, createdAt: new Date().toISOString(),
    };
    setMemberships(prev => [m, ...prev]);
    setCreateOpen(false); resetForm();
    toast.success("Membership created");
  };

  const handleEdit = () => {
    if (!editingMembership) return;
    setMemberships(prev => prev.map(m => m.id === editingMembership.id ? { ...editingMembership } : m));
    setEditOpen(false); setEditingMembership(null);
    toast.success("Membership updated");
  };

  const handleDuplicate = (m: VenueMembership) => {
    const dup: VenueMembership = { ...m, id: `vm-${Date.now()}`, title: `${m.title} (copy)`, status: 'draft', visibility: 'hidden', soldCount: 0, activeCustomers: 0, totalRevenue: 0, resaleCount: 0 };
    setMemberships(prev => [dup, ...prev]);
    toast.success(`Duplicated "${m.title}"`);
  };

  const handleToggleVisibility = (m: VenueMembership) => {
    const newVis = m.visibility === 'published' ? 'hidden' : 'published';
    setMemberships(prev => prev.map(x => x.id === m.id ? { ...x, visibility: newVis } : x));
    toast.success(newVis === 'published' ? `"${m.title}" is now published` : `"${m.title}" is now hidden`);
  };

  const handleDelete = (m: VenueMembership) => {
    setMemberships(prev => prev.filter(x => x.id !== m.id));
    toast.success(`Deleted "${m.title}"`);
  };

  const openEdit = (m: VenueMembership) => {
    setEditingMembership({ ...m });
    setEditOpen(true);
  };

  const filtered = memberships.filter((m) => {
    const matchSearch = m.title.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || m.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-5 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold font-display text-foreground">Membership Management</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Configure and manage your passes</p>
        </div>
        <Dialog open={createOpen} onOpenChange={(open) => { setCreateOpen(open); if (!open) setMembershipType("time-based"); }}>
          <DialogTrigger asChild>
            <Button size="sm"><Plus className="h-4 w-4" /> New Membership</Button>
          </DialogTrigger>
          <DialogContent ref={setCreateDialogContainer} className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-display">Create Membership</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-muted-foreground">Title</Label>
                <Input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="e.g. Monthly Unlimited" className="bg-muted/20 border-border/50" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-muted-foreground">Description</Label>
                <Textarea value={newDesc} onChange={e => setNewDesc(e.target.value)} placeholder="Short description of this pass..." rows={3} className="bg-muted/20 border-border/50 text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-muted-foreground">Type</Label>
                  <Select value={membershipType} onValueChange={setMembershipType}>
                    <SelectTrigger className="bg-muted/20 border-border/50"><SelectValue /></SelectTrigger>
                    <SelectContent portalContainer={createDialogContainer}>
                      <SelectItem value="time-based">Time-based</SelectItem>
                      <SelectItem value="entries">Entry-based</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-muted-foreground">Category</Label>
                  <Select value={newCategory} onValueChange={setNewCategory}>
                    <SelectTrigger className="bg-muted/20 border-border/50"><SelectValue /></SelectTrigger>
                    <SelectContent portalContainer={createDialogContainer}>
                      <SelectItem value="gym">Gym</SelectItem>
                      <SelectItem value="bjj">BJJ</SelectItem>
                      <SelectItem value="dance">Dance</SelectItem>
                      <SelectItem value="wellness">Wellness</SelectItem>
                      <SelectItem value="yoga">Yoga</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {membershipType === "time-based" ? (
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-muted-foreground">Duration (days)</Label>
                  <Input value={newDuration} onChange={e => setNewDuration(e.target.value)} type="number" placeholder="30" className="bg-muted/20 border-border/50" />
                </div>
              ) : (
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-muted-foreground">Number of entries</Label>
                  <Input value={newEntries} onChange={e => setNewEntries(e.target.value)} type="number" placeholder="10" className="bg-muted/20 border-border/50" />
                </div>
              )}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-muted-foreground">Price (€)</Label>
                  <Input value={newPrice} onChange={e => setNewPrice(e.target.value)} type="number" placeholder="89" className="bg-muted/20 border-border/50" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-muted-foreground">Discounted Price (€)</Label>
                  <Input value={newDiscountedPrice} onChange={e => setNewDiscountedPrice(e.target.value)} type="number" placeholder="Optional" className="bg-muted/20 border-border/50" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" size="sm" onClick={() => { setCreateOpen(false); resetForm(); }}>Cancel</Button>
              <Button size="sm" onClick={handleCreate}>Create</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search memberships..." className="pl-9 h-9 w-64 bg-muted/20 border-border/50 text-sm" />
        </div>
        <Tabs value={statusFilter} onValueChange={setStatusFilter}>
          <TabsList className="bg-muted/40 border border-border/50 p-0.5 h-9">
            <TabsTrigger value="all" className="text-xs h-7 rounded-md px-3">All</TabsTrigger>
            <TabsTrigger value="active" className="text-xs h-7 rounded-md px-3">Active</TabsTrigger>
            <TabsTrigger value="draft" className="text-xs h-7 rounded-md px-3">Draft</TabsTrigger>
            <TabsTrigger value="inactive" className="text-xs h-7 rounded-md px-3">Inactive</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Table */}
      <div className="rounded-xl bg-card border border-border/50 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-[13px] font-semibold">Title</TableHead>
              <TableHead className="text-[13px] font-semibold">Type</TableHead>
              <TableHead className="text-[13px] font-semibold">Price</TableHead>
              <TableHead className="text-[13px] font-semibold">Status</TableHead>
              <TableHead className="text-[13px] font-semibold">Visibility</TableHead>
              <TableHead className="text-[13px] font-semibold text-right">Sold</TableHead>
              <TableHead className="text-[13px] font-semibold w-10"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((m) => (
              <TableRow key={m.id}>
                <TableCell>
                  <p className="text-sm font-medium text-foreground">{m.title}</p>
                  <p className="text-xs text-muted-foreground">{m.description}</p>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {m.type === 'time-based' ? m.durationLabel : `${m.totalEntries} entries`}
                </TableCell>
                <TableCell>
                  <span className="text-sm font-bold text-foreground">€{m.discountedPrice || m.price}</span>
                  {m.discountedPrice && <span className="text-xs text-muted-foreground line-through ml-1">€{m.price}</span>}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={`text-[11px] px-2 py-0.5 ${statusColors[m.status]}`}>
                    {m.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {m.visibility === 'published' ? (
                    <Eye className="h-4 w-4 text-accent" />
                  ) : (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  )}
                </TableCell>
                <TableCell className="text-right text-sm font-bold text-foreground">{m.soldCount}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-44">
                      <DropdownMenuItem className="text-sm gap-2" onClick={() => openEdit(m)}>
                        <Pencil className="h-3.5 w-3.5" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-sm gap-2" onClick={() => handleDuplicate(m)}>
                        <Copy className="h-3.5 w-3.5" /> Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-sm gap-2" onClick={() => handleToggleVisibility(m)}>
                        {m.visibility === 'published' ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                        {m.visibility === 'published' ? 'Hide' : 'Publish'}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-sm gap-2 text-destructive focus:text-destructive" onClick={() => handleDelete(m)}>
                        <Trash2 className="h-3.5 w-3.5" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onOpenChange={(open) => { setEditOpen(open); if (!open) setEditingMembership(null); }}>
        <DialogContent ref={setEditDialogContainer} className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display">Edit Membership</DialogTitle>
          </DialogHeader>
          {editingMembership && (
            <div className="space-y-4 py-2">
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-muted-foreground">Title</Label>
                <Input value={editingMembership.title} onChange={e => setEditingMembership({ ...editingMembership, title: e.target.value })} className="bg-muted/20 border-border/50" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-muted-foreground">Description</Label>
                <Textarea value={editingMembership.description} onChange={e => setEditingMembership({ ...editingMembership, description: e.target.value })} rows={3} className="bg-muted/20 border-border/50 text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-muted-foreground">Type</Label>
                  <Select value={editingMembership.type} onValueChange={v => setEditingMembership({ ...editingMembership, type: v as 'time-based' | 'entries' })}>
                    <SelectTrigger className="bg-muted/20 border-border/50"><SelectValue /></SelectTrigger>
                    <SelectContent portalContainer={editDialogContainer}>
                      <SelectItem value="time-based">Time-based</SelectItem>
                      <SelectItem value="entries">Entry-based</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-muted-foreground">Status</Label>
                  <Select value={editingMembership.status} onValueChange={v => setEditingMembership({ ...editingMembership, status: v as 'active' | 'draft' | 'inactive' })}>
                    <SelectTrigger className="bg-muted/20 border-border/50"><SelectValue /></SelectTrigger>
                    <SelectContent portalContainer={editDialogContainer}>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {editingMembership.type === "time-based" ? (
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-muted-foreground">Duration (days)</Label>
                  <Input value={editingMembership.durationDays ?? ""} onChange={e => setEditingMembership({ ...editingMembership, durationDays: Number(e.target.value), durationLabel: `${e.target.value} days` })} type="number" className="bg-muted/20 border-border/50" />
                </div>
              ) : (
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-muted-foreground">Number of entries</Label>
                  <Input value={editingMembership.totalEntries ?? ""} onChange={e => setEditingMembership({ ...editingMembership, totalEntries: Number(e.target.value) })} type="number" className="bg-muted/20 border-border/50" />
                </div>
              )}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-muted-foreground">Price (€)</Label>
                  <Input value={editingMembership.price} onChange={e => setEditingMembership({ ...editingMembership, price: Number(e.target.value) })} type="number" className="bg-muted/20 border-border/50" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-muted-foreground">Discounted Price (€)</Label>
                  <Input value={editingMembership.discountedPrice ?? ""} onChange={e => setEditingMembership({ ...editingMembership, discountedPrice: e.target.value ? Number(e.target.value) : undefined })} type="number" placeholder="Optional" className="bg-muted/20 border-border/50" />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setEditOpen(false)}>Cancel</Button>
            <Button size="sm" onClick={handleEdit}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
