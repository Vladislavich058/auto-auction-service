import React from "react";
import { Outlet } from "react-router-dom";
import ProfileNavBar from "../components/ProfileNavBar";

const UserMenu = ({ type }) => {
  return (
    <div className="px-4 lg:px-20 min-h-[75vh]">
      <ProfileNavBar type={type} />
      <Outlet />
    </div>
  );
};

export default UserMenu;
