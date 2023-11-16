import {
  Button,
  Collapse,
  IconButton,
  Navbar,
  Typography
} from "@material-tailwind/react";

import { useAuth } from "hooks/useAuth";
import ElectricIcon from "images/electric.png";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";

export function NavBar() {
  const [openNav, setOpenNav] = useState(false);
  const router = useNavigate();
  const { authUser } = useAuth();

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        className="p-1 font-raleway font-medium hover:text-gray-600 hover:text-opacity-50"
      >
        <a href="#" className="flex items-center">
          Сегодняшние торги
        </a>
      </Typography>
      <Typography
        as="li"
        className="p-1 font-raleway font-medium hover:text-gray-600 hover:text-opacity-50"
      >
        <a href="#" className="flex items-center">
          Календарь торгов
        </a>
      </Typography>
    </ul>
  );

  return (
    <Navbar className="sticky bg-[#ff8a00] border-none bg-opacity-100 top-0 z-30 h-max max-w-full rounded-none px-2 py-2 lg:px-5 lg:py-4">
      <div className="flex items-center justify-between">
        <Typography
          as="a"
          href="/"
          className="mr-4 flex cursor-pointer uppercase py-1.5 text-2xl font-gruppo font-semibold"
        >
          <img src={ElectricIcon} alt="electric icon" className="mr-1" />
          <span>Ecarbargain</span>
        </Typography>
        <div className="flex items-center gap-4">
          <div className="mr-4 hidden lg:block">{navList}</div>
          {authUser ? (
            <ProfileMenu />
          ) : (
            <div className="flex items-center gap-x-1">
              <Link to="/login">
                <Button
                  variant="text"
                  size="sm"
                  className="font-raleway font-semibold text-white hidden lg:inline-block"
                >
                  Войти
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  variant="filled"
                  size="sm"
                  className="font-raleway font-semibold hidden lg:inline-block"
                >
                  Регистрация
                </Button>
              </Link>
            </div>
          )}
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
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
      </div>
      <Collapse open={openNav}>
        {navList}
        <div className="flex items-center gap-x-1">
          <Link to="/login" className="w-full">
            <Button fullWidth variant="text" size="sm">
              Войти
            </Button>
          </Link>
          <Link to="/register" className="w-full">
            <Button fullWidth variant="gradient" size="sm">
              Регистрация
            </Button>
          </Link>
        </div>
      </Collapse>
    </Navbar>
  );
}
