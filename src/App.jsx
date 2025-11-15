import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import SalesLeadsList from "./pages/SalesLeadsList";
import MasterLayout from "./layouts/MasterLayout";
import ProjectList from "./pages/ProjectsList";
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
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<MasterLayout />}>
              <Route path="/sales/projects" element={<ProjectList />} />
              <Route path="/setup" element={<SetupPage />} />

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
