import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider, AuthContext } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Subscriptions from "./pages/Subscriptions";
import SubscriptionDetail from "./pages/SubscriptionDetail";
import AddSubscription from "./pages/AddSubscription";
import EditSubscription from "./pages/EditSubscription";

function AppContent() {
  const { user } = useContext(AuthContext);

  return (
    <>
      {user && <Navbar />}

      <Routes>
        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Navigate to="/login" />} />


        {/* Subscriptions */}
        <Route
          path="/subscriptions"
          element={
            <ProtectedRoute>
              <Subscriptions />
            </ProtectedRoute>
          }
        />

        <Route
          path="/subscriptions/add"
          element={
            <ProtectedRoute>
              <AddSubscription />
            </ProtectedRoute>
          }
        />

        {/* 🔍 View + Edit + Delete + Cancel */}
        <Route
          path="/subscriptions/:id"
          element={
            <ProtectedRoute>
              <SubscriptionDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/subscriptions/:id/edit"
          element={
            <ProtectedRoute>
              <EditSubscription />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}
