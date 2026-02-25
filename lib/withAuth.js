"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

/**
 * HOC to protect routes that require authentication
 * Usage: export default withAuth(YourComponent);
 */
export function withAuth(Component, options = {}) {
    return function ProtectedRoute(props) {
        const { user, loading } = useAuth();
        const router = useRouter();
        const { requireActive = false, adminOnly = false } = options;

        useEffect(() => {
            if (!loading) {
                // Not logged in
                if (!user) {
                    router.replace("/login");
                    return;
                }

                // Admin only route
                if (adminOnly && user.role !== "admin") {
                    router.replace("/dashboard");
                    return;
                }

                // Require active partner
                if (requireActive && !user.isPartnerActive) {
                    router.replace("/dashboard?status=pending");
                    return;
                }
            }
        }, [user, loading, router]);

        // Show loading while checking auth
        if (loading) {
            return (
                <div className="min-h-screen flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
                </div>
            );
        }

        // Don't render if not authenticated
        if (!user) {
            return null;
        }

        // Don't render if admin required but user is not admin
        if (adminOnly && user.role !== "admin") {
            return null;
        }

        // Don't render if active required but user is not active
        if (requireActive && !user.isPartnerActive) {
            return null;
        }

        return <Component {...props} />;
    };
}
