import {
  Collapse,
  IconButton,
  Navbar,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const ProfileNavBar = ({ type }) => {
  const [openNav, setOpenNav] = useState(false);
  const location = useLocation();
  const [openItem, setOpenItem] = useState(location.pathname);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const profileNavList =
    type === "admin"
      ? [
          { label: "Личные данные", route: "/profile" },
          { label: "Менеджеры", route: "/profile/managers" },
          { label: "Клиенты", route: "/profile/clients" },
          { label: "Модерация", route: "/profile/lots" },
        ]
      : type === "manager"
      ? [
          { label: "Личные данные", route: "/profile" },
          { label: "Мои лоты", route: "/profile/lots" },
        ]
      : [
          { label: "Личные данные", route: "/profile" },
          { label: "История торгов", route: "/profile/historyAuctions" },
        ];
  return (
    <div className="mt-4">
      <Typography
        as="div"
        className="py-4 text-3xl font-raleway font-medium text-black"
      >
        {type === "admin" ? "Панель администрирования" : "Управление профилем"}
      </Typography>
      <Navbar className="bg-transparent border-none bg-opacity-100 shadow-none z-10 h-max max-w-full rounded-none px-0">
        <div className="flex items-center justify-between">
          <div className="mr-4 hidden lg:block">
            <div className="mt-2 mb-4 flex lg:items-center lg:mb-0 lg:mt-0">
              {profileNavList.map(({ label, route }, key) => {
                const isLastItem = key === profileNavList.length - 1;
                return (
                  <Link
                    to={route}
                    onClick={() => setOpenItem(route)}
                    key={label}
                  >
                    <Typography
                      as="div"
                      className={`py-4 font-raleway font-medium text-gray-600 border-b-2 border-gray-200 ${
                        route === openItem
                          ? "border-gray-600"
                          : "hover:border-gray-300"
                      } ${isLastItem ? "pl-6" : key === 0 ? "pr-6" : "px-6"}`}
                    >
                      {label}
                    </Typography>
                  </Link>
                );
              })}
            </div>
            <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-12"></ul>
          </div>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden text-black"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
        <Collapse open={openNav}>
          <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-12">
            {profileNavList.map(({ label, route }) => (
              <Link to={route} key={label}>
                <Typography
                  as="li"
                  className="px-1 py-4 font-raleway font-medium text-gray-600"
                >
                  {label}
                </Typography>
              </Link>
            ))}
          </ul>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default ProfileNavBar;
