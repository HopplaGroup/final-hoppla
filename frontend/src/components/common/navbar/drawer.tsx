import Link from "next/link";
import React, { useState } from "react";
type NavigationDrawerProps = {
  isOpen: boolean;
  toggleDrawer: () => void;
};
export const DRAWER_LINKS = [
  { href: "/profile", label: "Profile" },
  { href: "/send-driver-verification", label: "Become a driver" },
  { href: "/search/current-rides", label: "Current Rides" },
];
const NavigationDrawer = ({ isOpen, toggleDrawer }: NavigationDrawerProps) => {
  return (
    <div>
      <div
        id="drawer-navigation"
        className={`fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } bg-white w-64`}
        tabIndex={-1}
        aria-labelledby="drawer-navigation-label"
      >
        <h5
          id="drawer-navigation-label"
          className="text-base font-semibold text-gray-500 uppercase"
        >
          Menu
        </h5>
        <button
          type="button"
          onClick={toggleDrawer}
          aria-controls="drawer-navigation"
          className="text-gray-400 bg-transparent hover:bg-gray-200 rounded-lg text-sm w-8 h-8 absolute top-2.5 right-2.5 inline-flex items-center justify-center"
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close menu</span>
        </button>
        <div className="py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <li>
              {DRAWER_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={toggleDrawer}
                  className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
                >
                  <svg
                    className="w-5 h-5 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 21"
                  >
                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                  </svg>
                  <span className="ms-3">{label}</span>
                </Link>
              ))}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default NavigationDrawer;
