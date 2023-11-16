import React from "react";
import { Alert } from "@material-tailwind/react";

const MyAlert = ({ children, type, ...props }) => {
  function Icon() {
    if (type === "warning") {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
          />
        </svg>
      );
    } else if (type === "error") {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
          />
        </svg>
      );
    }
  }
  const warningClasses = "border-orange-500 bg-orange-100 text-orange-500";
  const errorClasses = "border-red-500 bg-red-100 text-red-500";
  const infoClasses = "border-green-500 bg-green-100 text-green-500";
  return (
    <Alert
      {...props}
      className={"my-1 rounded-none border-l-4 font-medium font-raleway ".concat(
        type === "warning"
          ? warningClasses
          : type === "error"
          ? errorClasses
          : type === "info"
          ? infoClasses
          : ""
      )}
      icon={<Icon />}
    >
      {children}
    </Alert>
  );
};

export default MyAlert;
