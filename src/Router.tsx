import { RouterProvider, createBrowserRouter } from "react-router-dom";

import notFoundImg from "./assets/notFound.svg";
import ContextProvider from "./contexts/ContextProvider";
import ErrorPage from "./pages/ErrorPage";

function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <ErrorPage hideLink={true} />,
      lazy: async () => ({
        Component: (await import("./App")).default,
      }),
      children: [
        {
          path: "/admin",
          lazy: async () => ({
            Component: (await import("./pages/admin/AdminLayoutPage")).default,
          }),
          children: [
            {
              index: true,
              lazy: async () => ({
                Component: (await import("./pages/admin/DashboardPage"))
                  .default,
              }),
            },
            {
              path: "profile/:id",
              lazy: async () => ({
                Component: (await import("./pages/common/ProfilePage")).default,
              }),
            },
            {
              path: "profile/settings",
              lazy: async () => ({
                Component: (await import("./pages/common/ProfileUpdatePage"))
                  .default,
              }),
            },
            {
              path: "analytics",
              lazy: async () => ({
                Component: (await import("./pages/admin/AnalyticsPage"))
                  .default,
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
              path: "video-management/edit/:id",
              lazy: async () => ({
                Component: (await import("./pages/admin/VideoEditPage"))
                  .default,
              }),
            },
            {
              path: "video-management/details/:id",
              lazy: async () => ({
                Component: (await import("./pages/admin/VideoDetailsPage"))
                  .default,
              }),
            },
            {
              path: "playlist-management",
              lazy: async () => ({
                Component: (
                  await import("./pages/admin/PlaylistManagementPage")
                ).default,
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
              path: "playlist-management/edit/:id",
              lazy: async () => ({
                Component: (await import("./pages/admin/PlaylistEditPage"))
                  .default,
              }),
            },
            {
              path: "playlist-management/:id",
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
          lazy: async () => ({
            Component: (await import("./pages/user/UserLayoutPage")).default,
          }),
          children: [
            {
              index: true,
              lazy: async () => ({
                Component: (await import("./pages/user/UserLandingPage"))
                  .default,
              }),
            },
            {
              path: "video/:id",
              lazy: async () => ({
                Component: (await import("./pages/user/VideoDetailsPage"))
                  .default,
              }),
            },
            {
              path: "profile/:id",
              lazy: async () => ({
                Component: (await import("./pages/common/ProfilePage")).default,
              }),
            },
            {
              path: "profile/settings",
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
            Component: (await import("./pages/auth/ForgotPasswordPage"))
              .default,
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

  return <RouterProvider router={router} />;
}

export default Router;
