import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "@/hooks/redux";

export const AdminProtectedLayout = () => {
  const { user, isAuthenticated, isLoading } = useAppSelector(
    (state) => state.user
  );
  const location = useLocation();

  // If loading, show nothing or a spinner
  if (isLoading) {
    return null; // or show a loading spinner
  }

  // If user is not authenticated, redirect to login
  if (!isAuthenticated || !user) {
    return (
      <Navigate to="/auth/login" state={{ from: location.pathname }} replace />
    );
  }

  // If user is authenticated but not admin, redirect to unauthorized page
  if (user.role != "admin") {
    return <Navigate to="/unauthorized" replace />;
  }

  // User is authenticated and is an admin
  return <Outlet />;
};
