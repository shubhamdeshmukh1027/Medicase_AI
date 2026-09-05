import { Routes, Route, Navigate } from "react-router-dom"

import Layout from "./components/Layout"

import Dashboard from "./pages/Dashboard"
import Patients from "./pages/Patients"
import NewPatient from "./pages/NewPatient"
import CaseTaking from "./pages/CaseTaking"
import AISummary from "./pages/AISummary"
import Reports from "./pages/Reports"
import FollowUps from "./pages/FollowUps"
import Settings from "./pages/Settings"
import Login from "./pages/Login"

function ProtectedRoute({ children }) {
  const isLoggedIn =
    localStorage.getItem("medicase_logged_in") === "true"

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />
  }

  return children
}

function App() {
  return (
    <Routes>

      {/* Login */}

      <Route
        path="/login"
        element={<Login />}
      />

      {/* Protected Application */}

      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >

        <Route
          path="/"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/patients"
          element={<Patients />}
        />

        <Route
          path="/new-patient"
          element={<NewPatient />}
        />

        <Route
          path="/case-taking"
          element={<CaseTaking />}
        />

        <Route
          path="/follow-ups"
          element={<FollowUps />}
        />

        <Route
          path="/reports"
          element={<Reports />}
        />

        <Route
          path="/ai-summary"
          element={<AISummary />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />

      </Route>

      {/* Unknown URL */}

      <Route
        path="*"
        element={
          <Navigate
            to="/dashboard"
            replace
          />
        }
      />

    </Routes>
  )
}

export default App