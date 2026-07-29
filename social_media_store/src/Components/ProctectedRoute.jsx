import { useAuth } from "../Features/AuthForm";

export default function ProtectedRoute({ children }) {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (!user?.isAdmin) {
        return (
            <div className="admin">
                <h2>Access Denied</h2>
                <p>You don't have permission to view this page.</p>
            </div>
            );

    }
    return children;
}