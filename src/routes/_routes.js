import "../styles/global.scss";

import { Routes, Route } from "react-router-dom";
import { lazy } from "react";

import Homepage from "./index";
import ProtectedRoute from "../lib/protectedRoute";
import NoAuthenticateuser from "../lib/NoAuthenticateUser";
const Dashboard = lazy(() => import("../routes/dashboard/index"));

export default function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <NoAuthenticateuser>
              <Homepage />
            </NoAuthenticateuser>
          }
        />
        <Route path="dashboard">
          <Route
            index
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
}
