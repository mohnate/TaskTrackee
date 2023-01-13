import "$Styles/global.scss";

import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import Homepage from "./index";
import ProtectedRoute from "$Lib/ProtectedRoute";
import NoAuthenticateUser from "$Lib/NoAuthenticateUser";

const AllTask = lazy(() => import("$Routes/dashboard/allTask"));
const TodayTask = lazy(() => import("$Routes/dashboard/todayTask"));
const UpcoimngTask = lazy(() => import("$Routes/dashboard/upcomingTask"));
const FinishedTask = lazy(() => import("$Routes/dashboard/finishedTask"));
const Account = lazy(() => import("$Routes/account/index"));
const ForgetPass = lazy(() => import("$Routes/account/forgetPass"));

import Dashboard from "$Routes/dashboard/index";
import PageNotFound from "$Components/errorPage/PageNotFound";
import ContentNotFound from "$Components/errorPage/ContentNotFound";
import Spinner from "$Components/PageLoader";

export default function App() {
  const fallbackFill = <Spinner pos="fill" sz="large" pad="50px 0 0 0" />;
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <NoAuthenticateUser>
              <Suspense fallback={<Spinner pos="full" sz="large" />}>
                <Homepage />
              </Suspense>
            </NoAuthenticateUser>
          }
        />
        <Route path="/account">
          <Route
            index
            element={
              <ProtectedRoute>
                <Suspense fallback={<Spinner pos="full" sz="large" />}>
                  <Account />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="forget-password"
            element={
              <ProtectedRoute forgetPass>
                <Suspense fallback={<Spinner pos="full" sz="large" />}>
                  <ForgetPass />
                </Suspense>
              </ProtectedRoute>
            }
          />
        </Route>
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
              <Suspense fallback={fallbackFill}>
                <AllTask />
              </Suspense>
            }
          />
          <Route
            path="todaytask"
            element={
              <Suspense fallback={fallbackFill}>
                <TodayTask />
              </Suspense>
            }
          />
          <Route
            path="upcomingtask"
            element={
              <Suspense fallback={fallbackFill}>
                <UpcoimngTask />
              </Suspense>
            }
          />
          <Route
            path="finishedtask"
            element={
              <Suspense fallback={fallbackFill}>
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
