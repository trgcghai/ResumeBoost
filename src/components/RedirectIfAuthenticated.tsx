import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "@/hooks/redux";

export const RedirectIfAuthenticated = () => {
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.user);
  const location = useLocation();

  // Nếu đang tải, không chuyển hướng đi đâu cả
  if (isLoading) {
    return null; // hoặc hiển thị loading spinner
  }

  // Get the return URL from location state, or default to profile
  const from = location.state?.from || "/profile";

  if (isAuthenticated) {
    // Redirect to the return URL if user is already authenticated
    return <Navigate to={from} replace />;
  }

  // Not authenticated, render the auth pages
  return <Outlet />;
};
