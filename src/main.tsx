import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppProvider } from "./context/AppContext.tsx";
import "./App.css";

// Import layouts
import RootLayout from "./layouts/RootLayout";
import AuthLayout from "./layouts/AuthLayout";
import AdminLayout from "./layouts/AdminLayout";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DetailCV from "./pages/DetailCV";
import AdminDashboard from "./pages/AdminDashboard";
import SkillsTab from "./components/SkillsTab";
import AnalysisTab from "./components/AnalysisTab";
import SuggestionsTab from "./components/SuggestionsTab";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "details/:id",
        element: <DetailCV />,
        children: [
          {
            index: true,
            element: <SkillsTab />,
          },
          {
            path: "skills",
            element: <SkillsTab />,
          },
          {
            path: "analysis",
            element: <AnalysisTab />,
          },
          {
            path: "suggestions",
            element: <SuggestionsTab />,
          },
        ],
      },
      {
        path: "details",
        element: <DetailCV />,
        children: [
          {
            index: true,
            element: <SkillsTab />,
          },
          {
            path: "skills",
            element: <SkillsTab />,
          },
          {
            path: "analysis",
            element: <AnalysisTab />,
          },
          {
            path: "suggestions",
            element: <SuggestionsTab />,
          },
        ],
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "users",
        element: <div>User Management Page</div>,
      },
      {
        path: "cvs",
        element: <div>CV Management Page</div>,
      },
    ],
  },
  // Redirect routes for backward compatibility
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
      {/* <App /> */}
    </AppProvider>
  </React.StrictMode>
);
