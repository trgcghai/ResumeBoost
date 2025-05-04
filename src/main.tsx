import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./App.css";

import RootLayout from "./layouts/RootLayout";
import AuthLayout from "./layouts/AuthLayout";
import AdminLayout from "./layouts/AdminLayout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import DetailCV from "./pages/DetailCV";
import AdminDashboard from "./pages/AdminDashboard";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store.ts";
import { LoginForm } from "./components/auth/LoginForm.tsx";
import { SignUpForm } from "./components/auth/SignUpForm.tsx";
import { ProtectedLayout } from "./layouts/ProtectedLayout.tsx";
import { RedirectIfAuthenticated } from "./components/RedirectIfAuthenticated.tsx";
import { PersistGateWithAuth } from "./components/PersistGateWithAuth.tsx";
import { AdminProtectedLayout } from "./layouts/AdminProtectedLayout.tsx";
import { UnauthorizedPage } from "./pages/UnauthorizedPage.tsx";
import AdminDashboardUser from "./pages/AdminDashboardUser.tsx";
import AdminDashboardCV from "./pages/AdminDashBoardCV.tsx";
import LandingPage from "./pages/LandingPage";
import AboutUs from "./pages/AboutUs";
import IntroduceLayout from "./layouts/IntroduceLayout.tsx";
import NotFound from "./pages/NotFound.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <IntroduceLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/landing" replace />,
      },
      {
        index: true,
        path: "landing",
        element: <LandingPage />,
      },
      {
        path: "about",
        element: <AboutUs />,
      },
    ],
  },
  {
    path: "/app",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/app/home" replace />,
      },
      {
        index: true,
        path: "home",
        element: <Home />,
      },
      {
        element: <ProtectedLayout />,
        children: [
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "details/:id",
            element: <DetailCV />,
          },
        ],
      },
    ],
  },
  {
    element: <RedirectIfAuthenticated />,
    children: [
      {
        path: "/auth",
        element: <AuthLayout />,
        children: [
          {
            path: "login",
            element: <LoginForm />,
          },
          {
            path: "signup",
            element: <SignUpForm />,
          },
        ],
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminProtectedLayout />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="/admin/dashboard" replace />,
          },
          {
            path: "dashboard",
            element: <AdminDashboard />,
          },
          {
            path: "users",
            element: <AdminDashboardUser />,
          },
          {
            path: "cvs",
            element: <AdminDashboardCV />,
          },
        ],
      },
    ],
  },
  {
    path: "unauthorized",
    element: <UnauthorizedPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGateWithAuth persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGateWithAuth>
    </Provider>
  </React.StrictMode>
);
