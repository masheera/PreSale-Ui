import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import SalesLeadsList from "./pages/SalesLeadsList";
import MasterLayout from "./layouts/MasterLayout";
import ProjectsList from "./pages/Setup/ProjectsList";
import SetupPage from "./pages/Setup/SetupPage";
import LeadSetupPage from "./pages/LeadSetup/LeadSetupPage";
import Auth from "./features/auth/Auth";
import Dashboard from "./pages/Dashboard/Dashboard";

import LeadsList from "./pages/PreSalesCRM/Leads/LeadsList";
import LeadForm from "./pages/PreSalesCRM/Leads/LeadForm";
import LeadDetails from "./pages/PreSalesCRM/Leads/LeadDetails";

import InventoryList from "./pages/Inventory/InventoryList";
import InventoryCreate from "./pages/Inventory/InventoryCreate";
import ChannelPartnerPage from "./pages/ChannelPartner/ChannelPartnerPage";
import SaleAddLead from "./pages/SaleAddLead";
import { Toaster } from "react-hot-toast";
import SetupPage from "./pages/Setup";
import Login from "./pages/Login";
import LeadStaticPage from "./pages/LeadStaticPage";
import InventoryCreate from "./pages/InventoryCreate";
import InventoryList from "./pages/InventoryList";
import ChannelPartnerRegistration from "./pages/ChannelPartnerRegistration";
import InventoryPlanning from "./pages/InventoryPlanning";
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" />
        
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<Auth />} />

          {/* Protected Routes with MasterLayout */}
          <Route element={<ProtectedRoute />}>
            <Route element={<MasterLayout />}>
              {/* Dashboard */}
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />

              {/* Projects */}
              <Route path="/sales/projects" element={<ProjectsList />} />

              {/* Master Setup */}
              <Route path="/setup" element={<SetupPage />} />

              {/* Lead Setup */}
              <Route path="/lead-setup" element={<LeadSetupPage />} />

              {/* Leads - Standardized under /leads */}
              <Route path="/leads" element={<LeadsList />} />
              <Route path="/leads/new" element={<LeadForm />} />
              <Route path="/leads/:id" element={<LeadDetails />} />
              <Route path="/leads/:id/edit" element={<LeadForm />} />

              <Route path="/sales/inventory" element={<InventoryList />} />
              <Route path="/sales/inventory/new" element={<InventoryCreate />} />

              <Route path="/channel-partner-setup" element={<ChannelPartnerPage />} />
              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
              {/* SalePerson View */}
              <Route path="/sales/leads" element={<SalesLeadsList />} />
              <Route path="/Sale-Add-Lead" element={<SaleAddLead />} />
              <Route path="/Lead-static-Lead" element={<LeadStaticPage />} />
              <Route path="/inventory-planning"element={<InventoryPlanning />} />

              {/* Admin View */}
              <Route path="/inventory/new" element={<InventoryCreate />} />
              <Route path="/inventory/list" element={<InventoryList />} />

              {/* Channel Register */}
              <Route
                path="/Channel/Add"
                element={<ChannelPartnerRegistration />}
              />

              <Route
                path="*"
                element={<Navigate to="/sales/projects" replace />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}