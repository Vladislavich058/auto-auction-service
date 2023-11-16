import { useAuth } from "hooks/useAuth";
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { adminRoutes, clientRoutes, managerRoutes, publicRoutes } from "router/routes";
import UserMenu from "../pages/UserMenu";

const AppRouter = () => {
  const { authUser } = useAuth();
  return (
    <Routes>
      {authUser && authUser.role === "ROLE_ADMIN" ? (
        <Route path="/profile" element={<UserMenu type="admin" />}>
          {adminRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Route>
      ) : authUser && authUser.role === "ROLE_MANAGER" ? (
        <Route path="/profile" element={<UserMenu type="manager" />}>
          {managerRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Route>
      ) : authUser && authUser.role === "ROLE_USER" ? (
        <Route path="/profile" element={<UserMenu type="client" />}>
          {clientRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Route>
      ) : (
        ""
      )}
      {publicRoutes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRouter;
