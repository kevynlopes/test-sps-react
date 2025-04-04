import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Users from "./pages/Users";
import UserForm from "./pages/UserForm";
import SignIn from "./pages/SignIn";

const isAuthenticated = () => !!localStorage.getItem("token");

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: !isAuthenticated() ? <SignIn /> : <Navigate to="/users" />,
  },
  {
    path: "/users",
    element: isAuthenticated() ? <Users /> : <Navigate to="/login" />,
  },
  {
    path: "/users/new",
    element: isAuthenticated() ? <UserForm /> : <Navigate to="/login" />,
  },
  {
    path: "/users/:email/edit",
    element: isAuthenticated() ? <UserForm /> : <Navigate to="/login" />,
  },
]);

export default router;
