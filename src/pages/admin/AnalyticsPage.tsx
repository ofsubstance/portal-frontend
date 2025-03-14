import { Navigate, Outlet, useLocation } from 'react-router-dom';

function AnalyticsPage() {
  const location = useLocation();

  // If we're at exactly /admin/analytics, redirect to the performance page
  if (location.pathname === '/admin/analytics') {
    return <Navigate to="/admin/analytics/performance" replace />;
  }

  // Render the child routes
  return <Outlet />;
}

export default AnalyticsPage;
