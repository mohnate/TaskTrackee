import "../styles/global.scss";

import { Routes, Route, useNavigate } from "react-router-dom";
import { lazy } from "react";

import Homepage from "./index";
import ProtectedRoute from "../lib/protectedRoute";
import NoAuthenticateUser from "../lib/NoAuthenticateUser";
const Dashboard = lazy(() => import("../routes/dashboard/index"));
const AllTask = lazy(() => import("../routes/dashboard/allTask"));
const TodayTask = lazy(() => import("../routes/dashboard/todayTask"));
const UpcoimngTask = lazy(() => import("../routes/dashboard/upcomingTask"));
const FinishedTask = lazy(() => import("../routes/dashboard/finishedTask"));

export default function App() {
  const navigate = useNavigate();
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <NoAuthenticateUser>
              <Homepage />
            </NoAuthenticateUser>
          }
        />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<div>not found :(</div>} />
          <Route path="alltask" element={<AllTask />} />
          <Route path="todaytask" element={<TodayTask />} />
          <Route path="upcomingtask" element={<UpcoimngTask />} />
          <Route path="finishedtask" element={<FinishedTask />} />
          <Route path="*" element={<div>not found :(</div>} />
        </Route>
      </Routes>
    </>
  );
}
