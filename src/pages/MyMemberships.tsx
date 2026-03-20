import { motion } from "framer-motion";
import { memberships } from "@/data/mockData";
import { MembershipCard } from "@/components/membership/MembershipCard";
import { CreditCard } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

export default function MyMemberships() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 max-w-7xl mx-auto">
      <motion.div variants={item}>
        <h1 className="text-2xl font-extrabold font-display text-foreground">My Memberships</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage and track all your active access passes.</p>
      </motion.div>

      <motion.div variants={item} className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {memberships.map((m) => (
          <MembershipCard key={m.id} membership={m} />
        ))}
      </motion.div>

      {memberships.length === 0 && (
        <motion.div variants={item} className="flex flex-col items-center justify-center py-20 text-center">
          <div className="h-16 w-16 rounded-2xl bg-muted/50 flex items-center justify-center mb-4">
            <CreditCard className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="font-bold font-display text-foreground text-lg">No Memberships Yet</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-xs">Head to the marketplace to find discounted access passes for gyms, studios, and wellness venues.</p>
        </motion.div>
      )}
    </motion.div>
  );
}
