import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext"; // Path check kar lena
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import AdminDashboard from "./pages/AdminDashboard";
import UserPortal from "./pages/UserPortal";

// A small wrapper to handle Protected Routes more cleanly

function AppRoutes() {
  const auth = useAuth();
  const role = localStorage.getItem("role");

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Admin Protected Portal */}
      <Route 
        path="/admin-portal" 
        element={
            <AdminDashboard />
        } 
      />

      {/* User Protected Portal */}
      <Route 
        path="/user-portal" 
        element={
            <UserPortal />
        } 
      />

      {/* Dynamic Home Redirect */}
      <Route 
        path="/" 
        element={
          role === "admin" ? <Navigate to="/admin-portal" /> : 
          role === "user" ? <Navigate to="/user-portal" /> : 
          <Navigate to="/login" />
        } 
      />

      {/* Fallback for 404 - Redirect to Login */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default function App() {
  return (
    // Essential: AuthProvider MUST wrap the Router to fix the useAuth error
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}