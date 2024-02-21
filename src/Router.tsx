import { RouterProvider, createBrowserRouter } from "react-router-dom";

import ErrorPage from "./pages/ErrorPage";
import notFoundImg from "./assets/notFound.svg";

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
          path: "/",
          lazy: async () => ({
            Component: (await import("./pages/AdminLandingPage")).default,
          }),
          children: [
            {
              index: true,
              lazy: async () => ({
                Component: (await import("./pages/DashboardPage")).default,
              }),
            },
            {
              path: "analytics",
              lazy: async () => ({
                Component: (await import("./pages/AnalyticsPage")).default,
              }),
            },
            {
              path: "video-management",
              lazy: async () => ({
                Component: (await import("./pages/VideoManagementPage"))
                  .default,
              }),
            },
            {
              path: "playlist-management",
              lazy: async () => ({
                Component: (await import("./pages/PlaylistManagementPage"))
                  .default,
              }),
            },
            {
              path: "user-management",
              lazy: async () => ({
                Component: (await import("./pages/UserManagementPage")).default,
              }),
            },
            {
              path: "payments-subscriptions",
              lazy: async () => ({
                Component: (await import("./pages/PaymentsSubscriptionsPage"))
                  .default,
              }),
            },
          ],
        },
        {
          path: "/signup",
          lazy: async () => ({
            Component: (await import("./pages/SignupPage")).default,
          }),
        },
        {
          path: "/signin",
          lazy: async () => ({
            Component: (await import("./pages/SigninPage")).default,
          }),
        },
        {
          path: "/forgot-password",
          lazy: async () => ({
            Component: (await import("./pages/ForgotPasswordPage")).default,
          }),
        },
        {
          path: "/reset-password",
          lazy: async () => ({
            Component: (await import("./pages/ResetPasswordPage")).default,
          }),
        },
      ],
    },
    {
      path: "*",
      element: (
        <ErrorPage
          image={notFoundImg}
          title="Sorry! We couldn't find the page you are looking for."
          description="Please, make sure you have typed the correct URL."
        />
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
