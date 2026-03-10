import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { Browse } from "./pages/Browse";
import { PostOpportunity } from "./pages/PostOpportunity";
import { OpportunityDetail } from "./pages/OpportunityDetail";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { AdminDashboard } from "./pages/AdminDashboard";
import { Layout } from "./components/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "browse", Component: Browse },
      { path: "post", Component: PostOpportunity },
      { path: "opportunity/:id", Component: OpportunityDetail },
      { path: "admin", Component: AdminDashboard },
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/signup",
    Component: Signup,
  },
]);