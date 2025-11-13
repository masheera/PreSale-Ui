import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import MasterLayout from "./layouts/MasterLayout";
import ProjectsList from "./pages/Setup/ProjectsList";
import Setup from "./pages/Setup/Setup";
import Auth from "./features/auth/Auth";
import Dashboard from "./pages/Dashboard/Dashboard";

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
              
              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
