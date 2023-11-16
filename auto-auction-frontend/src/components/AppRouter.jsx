import { useAuth } from "hooks/useAuth";
import Home from "pages/Home";
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import {
  adminRoutes,
  clientRoutes,
  managerRoutes,
  publicRoutes,
} from "router/routes";

const AppRouter = () => {
  const { authUser } = useAuth();
  return (
    <Routes>
      {authUser && authUser.role === "ROLE_ADMIN"
        ? adminRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element}>
              {route.nestedElement &&
                route.nestedElement.map((nestedRoute, index) => (
                  <Route
                    key={index}
                    path={nestedRoute.path}
                    element={nestedRoute.element}
                  />
                ))}
            </Route>
          ))
        : authUser && authUser.role === "ROLE_MANAGER"
        ? managerRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element}>
              {route.nestedElement &&
                route.nestedElement.map((nestedRoute, index) => (
                  <Route
                    key={index}
                    path={nestedRoute.path}
                    element={nestedRoute.element}
                  />
                ))}
            </Route>
          ))
        : authUser && authUser.role === "ROLE_USER"
        ? clientRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element}>
              {route.nestedElement &&
                route.nestedElement.map((nestedRoute, index) => (
                  <Route
                    key={index}
                    path={nestedRoute.path}
                    element={nestedRoute.element}
                  />
                ))}
            </Route>
          ))
        : publicRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRouter;
