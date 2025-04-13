import React, { lazy, Suspense } from "react";
import "./main.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

import Loading from "./components/Loading/Loading";
import Error from "./components/Error/Error";
import Root from "./components/Home/Root";
import HomePage from "./pages/Home/HomePage";
import Layout from "./components/Admin/Layout";

// import Dashboard from "./pages/Admin/Dashboard";
// import Gym from "./pages/Admin/Gym";
// import Trainers from "./pages/Admin/Trainers";
// import Members from "./pages/Admin/Members";
// import MemberDetails from "./pages/Admin/MemberDetails";
// import Notifications from "./pages/Admin/Notifications";
// import Profile from "./pages/Admin/Profile";
// import Settings from "./pages/Admin/Settings";

const Dashboard = lazy(() => import("./pages/Admin/Dashboard"));
const Gym = lazy(() => import("./pages/Admin/Gym"));
const Trainers = lazy(() => import("./pages/Admin/Trainers"));
const Members = lazy(() => import("./pages/Admin/Members"));
const MemberDetails = lazy(() => import("./pages/Admin/MemberDetails"));
const Notifications = lazy(() => import("./pages/Admin/Notifications"));
const Profile = lazy(() => import("./pages/Admin/Profile"));
const Settings = lazy(() => import("./pages/Admin/Settings"));

const App = () => {
  const client = new QueryClient();
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<HomePage />} />

        {/* <Route path="admin" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="gym-management" element={<Gym />} />
          <Route
            path="trainers"
            element={<Trainers />}
            errorElement={<Error />}
          />
          <Route path="members">
            <Route index element={<Members />} />
            <Route path=":memberId" element={<MemberDetails />} />
          </Route>
          <Route path="notifications" element={<Notifications />} />
          <Route path="admin-profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route> */}

        <Route path="admin" element={<Layout />}>
          <Route
            index
            element={
              <Suspense fallback={<Loading />}>
                <Dashboard />
              </Suspense>
            }
          />
          <Route
            path="gym-management"
            element={
              <Suspense fallback={<Loading />}>
                <Gym />
              </Suspense>
            }
          />
          <Route
            path="trainers"
            element={
              <Suspense fallback={<Loading />}>
                <Trainers />
              </Suspense>
            }
            errorElement={<Error />}
          />
          <Route path="members">
            <Route
              index
              element={
                <Suspense fallback={<Loading />}>
                  <Members />
                </Suspense>
              }
            />
            <Route
              path=":memberId"
              element={
                <Suspense fallback={<Loading />}>
                  <MemberDetails />
                </Suspense>
              }
            />
          </Route>
          <Route
            path="notifications"
            element={
              <Suspense fallback={<Loading />}>
                <Notifications />
              </Suspense>
            }
          />
          <Route
            path="admin-profile"
            element={
              <Suspense fallback={<Loading />}>
                <Profile />
              </Suspense>
            }
          />
          <Route
            path="settings"
            element={
              <Suspense fallback={<Loading />}>
                <Settings />
              </Suspense>
            }
          />
        </Route>
      </Route>
    )
  );

  return (
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
