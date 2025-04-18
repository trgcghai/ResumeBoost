import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "@/hooks/redux";

export const ProtectedLayout = () => {
  const { user, isAuthenticated, isLoading } = useAppSelector(
    (state) => state.user
  );
  const location = useLocation();

  // Nếu đang tải, không chuyển hướng đi đâu cả
  if (isLoading) {
    return null; // hoặc hiển thị loading spinner
  }

  // If user is not authenticated, redirect to login
  if (!isAuthenticated || !user) {
    // Save the current location they were trying to go to
    return (
      <Navigate to="/auth/login" state={{ from: location.pathname }} replace />
    );
  }

  // If user is authenticated, render the children routes
  return <Outlet />;
};
