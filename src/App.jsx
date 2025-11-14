import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import MasterLayout from "./layouts/MasterLayout";
import ProjectsList from "./pages/Setup/ProjectsList";
import Setup from "./pages/Setup/Setup";
import LeadSetup from "./pages/LeadSetup/LeadSetup";
import Auth from "./features/auth/Auth";
import Dashboard from "./pages/Dashboard/Dashboard";
import LeadsList from "./pages/PreSalesCRM/Leads/LeadsList";
import LeadForm from "./pages/PreSalesCRM/Leads/LeadForm";
import LeadDetails from "./pages/PreSalesCRM/Leads/LeadDetails";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
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
              
              {/* Setup */}
              <Route path="/setup" element={<Setup />} />
              
              {/* Lead Setup */}
              <Route path="/lead-setup" element={<LeadSetup />} />
              
              {/* Leads - PreSales CRM */}
              <Route path="/leads" element={<LeadsList />} />
              <Route path="/leads/new" element={<LeadForm />} />
              <Route path="/leads/:id" element={<LeadDetails />} />
              <Route path="/leads/:id/edit" element={<LeadForm />} />
              
              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}