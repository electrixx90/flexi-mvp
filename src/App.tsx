import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "@/components/layout/AppLayout";
import { VenueLayout } from "@/components/layout/VenueLayout";
import Dashboard from "./pages/Dashboard";
import MyMemberships from "./pages/MyMemberships";
import MembershipDetail from "./pages/MembershipDetail";
import SellMembership from "./pages/SellMembership";
import Marketplace from "./pages/Marketplace";
import Transactions from "./pages/Transactions";
import Wallet from "./pages/Wallet";
import NearbyMap from "./pages/NearbyMap";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import VenueDashboard from "./pages/venue/VenueDashboard";
import VenueBuilder from "./pages/venue/VenueBuilder";
import VenueMemberships from "./pages/venue/VenueMemberships";
import VenueSalesOverview from "./pages/venue/VenueSalesOverview";
import VenueResales from "./pages/venue/VenueResales";
import VenueAccessValidation from "./pages/venue/VenueAccessValidation";
import VenueAccessLog from "./pages/venue/VenueAccessLog";
import VenueSettings from "./pages/venue/VenueSettings";
import VenuePublicPage from "./pages/VenuePublicPage";
import LandingPage from "./pages/LandingPage";
import LandingPage2 from "./pages/LandingPage2";
import LandingPage3 from "./pages/LandingPage3";
import LandingPage4 from "./pages/LandingPage4";
import JoinVenue from "./pages/JoinVenue";
import Contact from "./pages/Contact";
import LandingPage5 from "@/pages/LandingPage5.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Landing page */}
          <Route path="/" element={<LandingPage4/>} />
          <Route path="/join" element={<JoinVenue />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/landing" element={<LandingPage5 />} />

          {/* Client area */}
          <Route element={<AppLayout />}>
            <Route path="/client" element={<Dashboard />} />
            <Route path="/client/memberships" element={<MyMemberships />} />
            <Route path="/client/memberships/:id" element={<MembershipDetail />} />
            <Route path="/client/sell" element={<SellMembership />} />
            <Route path="/client/marketplace" element={<Marketplace />} />
            <Route path="/client/nearby" element={<NearbyMap />} />
            <Route path="/client/transactions" element={<Transactions />} />
            <Route path="/client/wallet" element={<Wallet />} />
            <Route path="/client/settings" element={<Settings />} />
          </Route>

          {/* Venue area */}
          <Route element={<VenueLayout />}>
            <Route path="/venue" element={<VenueDashboard />} />
            <Route path="/venue/builder" element={<VenueBuilder />} />
            <Route path="/venue/memberships" element={<VenueMemberships />} />
            <Route path="/venue/sales" element={<VenueSalesOverview />} />
            <Route path="/venue/resales" element={<VenueResales />} />
            <Route path="/venue/access-validation" element={<VenueAccessValidation />} />
            <Route path="/venue/access-log" element={<VenueAccessLog />} />
            <Route path="/venue/settings" element={<VenueSettings />} />
          </Route>

          {/* Public venue page */}
          <Route path="/venues/:slug" element={<VenuePublicPage />} />

          {/* Redirects */}
          <Route path="/home" element={<Navigate to="/client" replace />} />
          <Route path="/memberships" element={<Navigate to="/client/memberships" replace />} />
          <Route path="/marketplace" element={<Navigate to="/client/marketplace" replace />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
