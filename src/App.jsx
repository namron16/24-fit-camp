import React, { lazy, Suspense } from "react";
import "./main.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

import { ErrorBoundary } from "react-error-boundary";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import Loading from "./components/Loading/Loading";
import Loading2 from "./components/Loading/Loading2";
import Error from "./components/Error/Error";
import NotFoundPage from "./pages/NotFound/NotFoundPage";
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
// import Login from "./pages/login/Login";

//admin
const Dashboard = lazy(() => import("./pages/Admin/Dashboard"));
const Gym = lazy(() => import("./pages/Admin/Gym"));
const GymOverview = lazy(() =>
  import("./components/Admin/GymComponent/GymOverview")
);
const GymRewards = lazy(() =>
  import("./components/Admin/GymComponent/GymRewards")
);
const Trainers = lazy(() => import("./pages/Admin/Trainers"));
const TrainerDetails = lazy(() => import("./pages/Admin/TrainerDetails"));
const Members = lazy(() => import("./pages/Admin/Members"));
const MemberDetails = lazy(() => import("./pages/Admin/MemberDetails"));
const Notifications = lazy(() => import("./pages/Admin/Notifications"));
const Profile = lazy(() => import("./pages/Admin/Profile"));
const Settings = lazy(() => import("./pages/Admin/Settings"));
const Login = lazy(() => import("./pages/login/Login"));

//members

import MembersLayout from "./pages/Members/MembersLayout";
const MemberOverview = lazy(() => import("./pages/Members/MemberOverview"));
const MemberProfile = lazy(() => import("./pages/Members/MemberProfile"));
const MemberNotifications = lazy(() =>
  import("./pages/Members/MemberNotifications")
);
const MemberSettings = lazy(() => import("./pages/Members/MemberSettings"));
const MemberGym = lazy(() => import("./pages/Members/MemberGym"));
const MemberRewards = lazy(() => import("./pages/Members/MemberRewards"));
const MemberPoints = lazy(() => import("./pages/Members/MemberPoints"));

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
          <Route path="member">
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
              <QueryErrorResetBoundary>
                {({ reset }) => (
                  <ErrorBoundary
                    onReset={reset}
                    fallbackRender={({ resetErrorBoundary }) => (
                      <Error resetErrorBoundary={resetErrorBoundary} />
                    )}
                  >
                    <Suspense fallback={<Loading />}>
                      <Dashboard />
                    </Suspense>
                  </ErrorBoundary>
                )}
              </QueryErrorResetBoundary>
            }
          />
          <Route
            path="gym-management"
            element={
              <Suspense fallback={<Loading />}>
                <Gym />
              </Suspense>
            }
          >
            <Route
              index
              element={
                <QueryErrorResetBoundary>
                  {({ reset }) => (
                    <ErrorBoundary
                      onReset={reset}
                      fallbackRender={({ resetErrorBoundary }) => (
                        <Error resetErrorBoundary={resetErrorBoundary} />
                      )}
                    >
                      <Suspense fallback={<Loading />}>
                        <GymOverview />
                      </Suspense>
                    </ErrorBoundary>
                  )}
                </QueryErrorResetBoundary>
              }
            />
            <Route
              path="rewards"
              element={
                <QueryErrorResetBoundary>
                  {({ reset }) => (
                    <ErrorBoundary
                      onReset={reset}
                      fallbackRender={({ resetErrorBoundary }) => (
                        <Error resetErrorBoundary={resetErrorBoundary} />
                      )}
                    >
                      <Suspense fallback={<Loading />}>
                        <GymRewards />
                      </Suspense>
                    </ErrorBoundary>
                  )}
                </QueryErrorResetBoundary>
              }
            />
          </Route>
          <Route path="trainers">
            <Route
              index
              element={
                <QueryErrorResetBoundary>
                  {({ reset }) => (
                    <ErrorBoundary
                      onReset={reset}
                      fallbackRender={({ resetErrorBoundary }) => (
                        <Error resetErrorBoundary={resetErrorBoundary} />
                      )}
                    >
                      <Suspense fallback={<Loading />}>
                        <Trainers />
                      </Suspense>
                    </ErrorBoundary>
                  )}
                </QueryErrorResetBoundary>
              }
            />

            <Route
              path=":trainerId"
              element={
                <QueryErrorResetBoundary>
                  {({ reset }) => (
                    <ErrorBoundary
                      onReset={reset}
                      fallbackRender={({ resetErrorBoundary }) => (
                        <Error resetErrorBoundary={resetErrorBoundary} />
                      )}
                    >
                      <Suspense fallback={<Loading />}>
                        <TrainerDetails />
                      </Suspense>
                    </ErrorBoundary>
                  )}
                </QueryErrorResetBoundary>
              }
            />
          </Route>

          <Route path="member">
            <Route
              index
              element={
                <QueryErrorResetBoundary>
                  {({ reset }) => (
                    <ErrorBoundary
                      onReset={reset}
                      fallbackRender={({ resetErrorBoundary }) => (
                        <Error resetErrorBoundary={resetErrorBoundary} />
                      )}
                    >
                      <Suspense fallback={<Loading />}>
                        <Members />
                      </Suspense>
                    </ErrorBoundary>
                  )}
                </QueryErrorResetBoundary>
              }
            />
            <Route
              path=":memberId"
              element={
                <QueryErrorResetBoundary>
                  {({ reset }) => (
                    <ErrorBoundary
                      onReset={reset}
                      fallbackRender={({ resetErrorBoundary }) => (
                        <Error resetErrorBoundary={resetErrorBoundary} />
                      )}
                    >
                      <Suspense fallback={<Loading />}>
                        <MemberDetails />
                      </Suspense>
                    </ErrorBoundary>
                  )}
                </QueryErrorResetBoundary>
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
              <QueryErrorResetBoundary>
                {({ reset }) => (
                  <ErrorBoundary
                    onReset={reset}
                    fallbackRender={({ resetErrorBoundary }) => (
                      <Error resetErrorBoundary={resetErrorBoundary} />
                    )}
                  >
                    <Suspense fallback={<Loading />}>
                      <Settings />
                    </Suspense>
                  </ErrorBoundary>
                )}
              </QueryErrorResetBoundary>
            }
          />
        </Route>
        <Route path="member-account" element={<MembersLayout />}>
          <Route
            index
            element={
              <Suspense fallback={<Loading2 />}>
                <MemberOverview />
              </Suspense>
            }
          />
          <Route
            path="member-profile"
            element={
              <Suspense fallback={<Loading2 />}>
                <MemberProfile />
              </Suspense>
            }
          />
          <Route
            path="member-notifications"
            element={
              <Suspense fallback={<Loading2 />}>
                <MemberNotifications />
              </Suspense>
            }
          />
          <Route
            path="member-settings"
            element={
              <Suspense fallback={<Loading2 />}>
                <MemberSettings />
              </Suspense>
            }
          />
          <Route
            path="rewards"
            element={
              <Suspense fallback={<Loading2 />}>
                <MemberGym />
              </Suspense>
            }
          >
            <Route
              index
              element={
                <Suspense fallback={<Loading2 />}>
                  <MemberRewards />
                </Suspense>
              }
            />
            <Route
              path="points-history"
              element={
                <Suspense fallback={<Loading2 />}>
                  <MemberPoints />
                </Suspense>
              }
            />
          </Route>
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NotFoundPage />} />
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
