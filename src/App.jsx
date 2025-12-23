import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "@/middleware/ProtectedRoute";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import Rewards from "@/pages/rewards/Rewards";
import Dashboard from '@/components/layout/Dashboard'



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/dashboard/rewards" replace />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route path="rewards" element={<Rewards />} />
          <Route path="home" element={<div>Home (Coming Soon)</div>} />
          <Route path="discover" element={<div>Discover (Coming Soon)</div>} />
          <Route path="library" element={<div>Library (Coming Soon)</div>} />
          <Route
            path="tech-stack"
            element={<div>Tech Stack (Coming Soon)</div>}
          />
          <Route
            path="subscriptions"
            element={<div>Subscriptions (Coming Soon)</div>}
          />
          <Route path="settings" element={<div>Settings (Coming Soon)</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
