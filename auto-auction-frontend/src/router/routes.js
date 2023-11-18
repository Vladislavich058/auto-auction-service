import Home from "pages/Home";
import Login from "pages/Login";
import LotForm from "pages/LotForm";
import LotIdPage from "pages/LotIdPage";
import Lots from "pages/Lots";
import Register from "pages/Register";
import UserMenu from "pages/UserMenu";
import Users from "pages/Users";
import React from "react";

export const publicRoutes = [
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register type="register" /> },
  { path: "/lots/:id", element: <LotIdPage /> },
  { path: "/lots", element: <Lots /> },
];

export const adminRoutes = [
  {
    path: "/profile",
    element: <UserMenu type="admin" />,
    nestedElement: [
      { path: "", element: <Register type="info" /> },
      { path: "managers", element: <Users type="managers" /> },
      { path: "clients", element: <Users type="clients" /> },
      { path: "lots", element: <Lots type="admin" /> },
      { path: "lots/:id", element: <LotIdPage type="admin" /> },
    ],
  },
  { path: "/lots/:id", element: <LotIdPage type="admin" /> },
  { path: "/lots", element: <Lots type="admin" /> },
];

export const clientRoutes = [
  {
    path: "/profile",
    element: <UserMenu type="manager" />,
    nestedElement: [
      { path: "", element: <Register type="info" /> },
      { path: "lots", element: <Lots type="client" /> },
      { path: "lots/:id", element: <LotIdPage type="client" /> },
    ],
  },
  { path: "/lots/:id", element: <LotIdPage type="" /> },
  { path: "/lots", element: <Lots type="client" /> },
];

export const managerRoutes = [
  {
    path: "/profile",
    element: <UserMenu type="manager" />,
    nestedElement: [
      { path: "", element: <Register type="info" /> },
      { path: "lots", element: <Lots type="manager" /> },
      { path: "addLot", element: <LotForm /> },
      { path: "lots/:id", element: <LotIdPage type="manager" /> },
    ],
  },
  { path: "/lots/:id", element: <LotIdPage type="manager" /> },
  { path: "/lots", element: <Lots type="manager" /> },
];
