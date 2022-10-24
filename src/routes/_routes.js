import "$Styles/global.scss";

import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import Homepage from "./index";
import ProtectedRoute from "$Lib/ProtectedRoute";
import NoAuthenticateUser from "$Lib/NoAuthenticateUser";

const Dashboard = lazy(() => import("$Routes/dashboard/index"));
const AllTask = lazy(() => import("$Routes/dashboard/allTask"));
const TodayTask = lazy(() => import("$Routes/dashboard/todayTask"));
const UpcoimngTask = lazy(() => import("$Routes/dashboard/upcomingTask"));
const FinishedTask = lazy(() => import("$Routes/dashboard/finishedTask"));

import PageNotFound from "$Components/errorPage/PageNotFound";
import ContentNotFound from "$Components/errorPage/ContentNotFound";
import Spinner from "$Components/PageLoader";

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
          <Route index element={<ContentNotFound />} />
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
          <Route path="*" element={<ContentNotFound />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}
