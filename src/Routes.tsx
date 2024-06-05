import { Suspense, lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import App from "./App";
import notFoundImg from "./assets/notFound.svg";
import AuthGuard from "./components/common/guard/AuthGuard";
import { UserRole } from "./constants/enums";
import ContextProvider from "./contexts/ContextProvider";
import ErrorPage from "./pages/ErrorPage";

const AdminLayoutPage = lazy(() => import("./pages/admin/AdminLayoutPage"));
const UserLayoutPage = lazy(() => import("./pages/user/UserLayoutPage"));

const routes = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage hideLink={true} />,
    element: <App />,
    children: [
      {
        path: "/admin",
        element: (
          <AuthGuard allowedRoles={[UserRole.Admin]}>
            <Suspense fallback={<div>Loading...</div>}>
              <AdminLayoutPage />
            </Suspense>
          </AuthGuard>
        ),

        children: [
          {
            index: true,
            lazy: async () => ({
              Component: (await import("./pages/admin/DashboardPage")).default,
            }),
          },
          {
            path: "profile/:userId",
            lazy: async () => ({
              Component: (await import("./pages/common/ProfilePage")).default,
            }),
          },
          {
            path: "profile/settings/:userId",
            lazy: async () => ({
              Component: (await import("./pages/common/ProfileUpdatePage"))
                .default,
            }),
          },
          {
            path: "analytics",
            lazy: async () => ({
              Component: (await import("./pages/admin/AnalyticsPage")).default,
            }),
          },
          {
            path: "video-management",
            lazy: async () => ({
              Component: (await import("./pages/admin/VideoManagementPage"))
                .default,
            }),
          },
          {
            path: "video-management/upload",
            lazy: async () => ({
              Component: (await import("./pages/admin/VideoUploadPage"))
                .default,
            }),
          },
          {
            path: "video-management/edit/:videoId",
            lazy: async () => ({
              Component: (await import("./pages/admin/VideoEditPage")).default,
            }),
          },
          {
            path: "video-management/:videoId",
            lazy: async () => ({
              Component: (await import("./pages/admin/VideoDetailsPage"))
                .default,
            }),
          },
          {
            path: "playlist-management",
            lazy: async () => ({
              Component: (await import("./pages/admin/PlaylistManagementPage"))
                .default,
            }),
          },
          {
            path: "playlist-management/create",
            lazy: async () => ({
              Component: (await import("./pages/admin/PlaylistCreatePage"))
                .default,
            }),
          },
          {
            path: "playlist-management/edit/:playlistId",
            lazy: async () => ({
              Component: (await import("./pages/admin/PlaylistEditPage"))
                .default,
            }),
          },
          {
            path: "playlist-management/:playlistId",
            lazy: async () => ({
              Component: (await import("./pages/admin/PlaylistDetailsPage"))
                .default,
            }),
          },
          {
            path: "user-management",
            lazy: async () => ({
              Component: (await import("./pages/admin/UserManagementPage"))
                .default,
            }),
          },
          {
            path: "payments-subscriptions",
            lazy: async () => ({
              Component: (
                await import("./pages/admin/PaymentsSubscriptionsPage")
              ).default,
            }),
          },
        ],
      },
      {
        path: "/",
        element: (
          <AuthGuard allowedRoles={[UserRole.User, UserRole.Admin]}>
            <Suspense fallback={<div>Loading...</div>}>
              <UserLayoutPage />
            </Suspense>
          </AuthGuard>
        ),

        children: [
          {
            index: true,
            lazy: async () => ({
              Component: (await import("./pages/user/UserLandingPage")).default,
            }),
          },
          {
            path: "video/:videoId",
            lazy: async () => ({
              Component: (await import("./pages/user/VideoDetailsPage"))
                .default,
            }),
          },
          {
            path: "profile/:userId",
            lazy: async () => ({
              Component: (await import("./pages/common/ProfilePage")).default,
            }),
          },
          {
            path: "profile/settings/:userId",
            lazy: async () => ({
              Component: (await import("./pages/common/ProfileUpdatePage"))
                .default,
            }),
          },
        ],
      },
      {
        path: "/signup",
        lazy: async () => ({
          Component: (await import("./pages/auth/SignupPage")).default,
        }),
      },
      {
        path: "/signin",
        lazy: async () => ({
          Component: (await import("./pages/auth/SigninPage")).default,
        }),
      },
      {
        path: "/forgot-password",
        lazy: async () => ({
          Component: (await import("./pages/auth/ForgotPasswordPage")).default,
        }),
      },
      {
        path: "/reset-password",
        lazy: async () => ({
          Component: (await import("./pages/auth/ResetPasswordPage")).default,
        }),
      },
    ],
  },
  {
    path: "*",
    element: (
      <ContextProvider>
        <ErrorPage
          image={notFoundImg}
          title="Sorry! We couldn't find the page you are looking for."
          description="Please, make sure you have typed the correct URL."
        />
      </ContextProvider>
    ),
  },
]);

export default function Routes() {
  return <RouterProvider router={routes} />;
}
