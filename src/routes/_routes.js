import "../styles/global.scss";

import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import Homepage from "./index";
import ProtectedRoute from "../lib/ProtectedRoute";
import NoAuthenticateUser from "../lib/NoAuthenticateUser";

const Dashboard = lazy(() => import("../routes/dashboard/index"));
const AllTask = lazy(() => import("../routes/dashboard/allTask"));
const TodayTask = lazy(() => import("../routes/dashboard/todayTask"));
const UpcoimngTask = lazy(() => import("../routes/dashboard/upcomingTask"));
const FinishedTask = lazy(() => import("../routes/dashboard/finishedTask"));
import Spinner from "../components/PageLoader";

export default function App() {
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
          <Route
            path="alltask"
            element={
              <Suspense fallback={<Spinner pos="fill" sz="large" />}>
                <AllTask />
              </Suspense>
            }
          />
          <Route
            path="todaytask"
            element={
              <Suspense fallback={<Spinner pos="fill" sz="large" />}>
                <TodayTask />
              </Suspense>
            }
          />
          <Route
            path="upcomingtask"
            element={
              <Suspense fallback={<Spinner pos="fill" sz="large" />}>
                <UpcoimngTask />
              </Suspense>
            }
          />
          <Route
            path="finishedtask"
            element={
              <Suspense fallback={<Spinner pos="fill" sz="large" />}>
                <FinishedTask />
              </Suspense>
            }
          />
          <Route path="*" element={<div>not found :(</div>} />
        </Route>
      </Routes>
    </>
  );
}
