import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { Browse } from "./pages/Browse";
import { PostOpportunity } from "./pages/PostOpportunity";
import { OpportunityDetail } from "./pages/OpportunityDetail";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { AdminDashboard } from "./pages/AdminDashboard";
import { Layout } from "./components/Layout";
import { ErrorPage } from "./pages/ErrorPage";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    errorElement: <ErrorPage />,
    children: [
      { index: true, Component: Home },
      { path: "browse", Component: Browse },
      { path: "post", Component: PostOpportunity },
      { path: "opportunity/:id", Component: OpportunityDetail },
      { path: "admin", Component: AdminDashboard },
      { path: "*", Component: NotFound },
    ],
  },
  {
    path: "/login",
    Component: Login,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    Component: Signup,
    errorElement: <ErrorPage />,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);