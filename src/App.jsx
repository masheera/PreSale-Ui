import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import MasterLayout from "./layouts/MasterLayout";
import ProjectList from "./pages/ProjectsList"
import SetupPage from "./pages/Setup";
import Login from "./pages/Login";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<MasterLayout />}>
              <Route path="/sales/projects" element={<ProjectList />} />
              <Route path="/setup" element={<SetupPage />} />
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
