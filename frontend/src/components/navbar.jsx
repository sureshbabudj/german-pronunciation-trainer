import React from "react";
import { Navbar } from "konsta/react";
import { Link, useLocation } from "react-router-dom";
import IconButton from "./icon";
import Logo from "./logo";

export default function AppBar() {
  const { pathname } = useLocation();
  console.log({ pathname });

  const leftIcon =
    pathname === "/" ? null : (
      <Link to="/">
        <IconButton shape="roundedRectangle">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.3284 11.0001V13.0001L7.50011 13.0001L10.7426 16.2426L9.32842 17.6568L3.67157 12L9.32842 6.34314L10.7426 7.75735L7.49988 11.0001L20.3284 11.0001Z"
              fill="currentColor"
            />
          </svg>
        </IconButton>
      </Link>
    );

  return (
    <Navbar
      title={<Logo className="h-auto w-24" />}
      subtitle="Right!"
      className="top-0 sticky"
      medium={"Medium"}
      large={"Large"}
      transparent={true}
      left={leftIcon}
    />
  );
}
