import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ResumeProvider } from "./context/ResumeContext";
import { applyTheme } from "./pages/settings/Preferences";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardLayout from "./pages/DashboardLayout";
import Resumes from "./pages/Resumes";
import Builder from "./pages/Builder";
import Profile from "./pages/settings/Profile";
import Preferences from "./pages/settings/Preferences";
import Authentication from "./pages/settings/Authentication";
import ApiKeys from "./pages/settings/ApiKeys";
import AI from "./pages/settings/AI";
import DangerZone from "./pages/settings/DangerZone";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" style={{ width: "3rem", height: "3rem" }} />
      </div>
    );
  }
  return user ? children : <Navigate to="/auth/login" replace />;
}

function GuestRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" style={{ width: "3rem", height: "3rem" }} />
      </div>
    );
  }
  return user ? <Navigate to="/dashboard" replace /> : children;
}

export default function App() {
  // Restore saved theme before first paint
  useEffect(() => {
    try {
      const stored = localStorage.getItem('rr-preferences');
      const savedTheme = stored ? (JSON.parse(stored).theme || 'system') : 'system';
      applyTheme(savedTheme);
    } catch (_) { /* ignore */ }
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <ResumeProvider>
          <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />

            {/* Auth routes — redirect to dashboard if already signed in */}
            <Route
              path="/auth/login"
              element={
                <GuestRoute>
                  <Login />
                </GuestRoute>
              }
            />
            <Route
              path="/auth/register"
              element={
                <GuestRoute>
                  <Register />
                </GuestRoute>
              }
            />

            {/* Protected routes */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Resumes />} />
              <Route path="settings/profile" element={<Profile />} />
              <Route path="settings/preferences" element={<Preferences />} />
              <Route path="settings/authentication" element={<Authentication />} />
              <Route path="settings/api-keys" element={<ApiKeys />} />
              <Route path="settings/ai" element={<AI />} />
              <Route path="settings/danger-zone" element={<DangerZone />} />
            </Route>
            <Route path="/builder/:resumeId" element={<Builder />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ResumeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
