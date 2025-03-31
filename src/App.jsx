import React from "react";
import "./main.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import Root from "./components/Home/Root";
import Layout from "./components/Admin/Layout";
import Dashboard from "./pages/Admin/Dashboard";
import Gym from "./pages/Admin/Gym";
import Trainers from "./pages/Admin/Trainers";
import Notifications from "./pages/Admin/Notifications";
import Profile from "./pages/Admin/Profile";
import Settings from "./pages/Admin/Settings";
import Error from "./components/Error/Error";
import Members from "./pages/Admin/Members";
import MemberDetails from "./pages/Admin/MemberDetails";
import HomePage from "./pages/Home/HomePage";

const App = () => {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <HashRouter hashType='slash'>
        <Routes>
          <Route path="/" element={<Root />}>
            <Route index element={<HomePage />} />
            <Route path="admin" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="gym-management" element={<Gym />} />
              <Route path="trainers" element={<Trainers />} />
              <Route path="members">
                <Route index element={<Members />} errorElement={<Error />} />
                <Route path=":memberId" element={<MemberDetails />} errorElement={<Error />} />
              </Route>
              <Route path="notifications" element={<Notifications />} />
              <Route path="admin-profile" element={<Profile />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Route>
        </Routes>
      </HashRouter>
    </QueryClientProvider>
  );
};

export default App;
