"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useLazyGetCurrentUserQuery } from "@/store/api/authApi";

// Enum for user roles
export enum UserRole {
  USER = "user",
  ADMIN = "admin",
  TEACHER = "teacher",
  SUPER_ADMIN = "super_admin",
}

// Define props interface with role-based access
interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[]; // Roles allowed to access this route
  fallback?: React.ReactNode; // Optional custom loading component
  redirectPath?: string; // Optional custom redirect path
  unauthorizedRedirectPath?: string; // Optional redirect for unauthorized access
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles = [UserRole.USER], // Default to standard user if no roles specified
  fallback,
  redirectPath = "/login", // Default login redirect
  unauthorizedRedirectPath = "/unauthorized", // Redirect for insufficient permissions
}) => {
  const router = useRouter();

  // Use lazy query to fetch current user
  const [getCurrentUser, { isLoading: isQueryLoading, error: queryError }] =
    useLazyGetCurrentUserQuery();

  // Get auth state from Redux
  const {
    isAuthenticated,
    isLoading: isStateLoading,
    user,
    error: stateError,
  } = useSelector((state: RootState) => state.auth);

  // Combined loading state
  const isLoadingComplete = !isQueryLoading && !isStateLoading;

  // Check if user has required role
  const hasRequiredRole = user?.role
    ? allowedRoles.includes(user.role as UserRole)
    : false;

  // Trigger user fetch on mount if not authenticated
  useEffect(() => {
    if (!user) {
      getCurrentUser();
    }
  }, [user, getCurrentUser]);

  // Handle authentication and routing
  useEffect(() => {
    // Handle failed auth - redirect to login
    if (isLoadingComplete && !isAuthenticated) {
      router.push(redirectPath);
      return;
    }

    // Handle role-based access
    if (isLoadingComplete && isAuthenticated && !hasRequiredRole) {
      router.push(unauthorizedRedirectPath);
      return;
    }

    // Handle errors
    if (queryError || stateError) {
      console.error("Auth error:", queryError || stateError);
      router.push(redirectPath);
    }
  }, [
    isLoadingComplete,
    isAuthenticated,
    hasRequiredRole,
    router,
    redirectPath,
    unauthorizedRedirectPath,
    queryError,
    stateError,
  ]);

  // Show custom fallback or default loading spinner
  if (!isLoadingComplete) {
    if (fallback) {
      return <>{fallback}</>;
    }
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Show nothing while redirecting
  if (!isAuthenticated || !hasRequiredRole) {
    return null;
  }

  // All good - render children
  return <>{children}</>;
};

export default ProtectedRoute;
