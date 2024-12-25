import React, { useState } from "react";
import Atom from "../modules/physics/atom";
import SolarSystem from "../modules/physics/solar-system";

export default function App() {
  const [activeItem, setActiveItem] = useState("Atom");

  const handleItemClick = (itemName: string) => {
    setActiveItem(itemName);
  };

  return (
    <div className="flex w-screen h-screen">
      <div className="sidebar w-1/5 p-5 bg-gray-200">
        {/* Sidebar Content */}
        <ul className="space-y-2 font-medium">
          <li>
            <a
              href="#"
              className={`flex items-center p-4 text-gray-900 rounded-lg hover:bg-gray-100 group text-xl ${
                activeItem === "Atom" ? "bg-gray-100 text-blue-700" : ""
              }`}
              onClick={() => handleItemClick("Atom")}
            >
              <svg
                className={`w-5 h-5 transition duration-75 ${
                  activeItem === "Atom" ? "text-blue-700" : "text-gray-500 group-hover:text-gray-900"
                }`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <circle cx="10" cy="10" r="3" fill="currentColor" />
                <g>
                  <circle
                    cx="10"
                    cy="10"
                    r="8"
                    stroke="currentColor"
                    strokeWidth="1"
                    fill="transparent"
                  />
                  <circle
                    cx="10"
                    cy="10"
                    r="6"
                    stroke="currentColor"
                    strokeWidth="1"
                    fill="transparent"
                  />
                </g>
              </svg>
              <span className="ml-3">Atom</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className={`flex items-center p-4 text-gray-900 rounded-lg hover:bg-gray-100 group text-xl ${
                activeItem === "Solar System" ? "bg-gray-100 text-blue-700" : ""
              }`}
              onClick={() => handleItemClick("Solar System")}
            >
              <svg
                className={`w-5 h-5 transition duration-75 ${
                  activeItem === "Solar System" ? "text-blue-700" : "text-gray-500 group-hover:text-gray-900"
                }`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  fill="currentColor"
                  d="M10 0a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16Zm0-10a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z"
                />
                <path
                  fill="currentColor"
                  d="M10 1a9 9 0 0 0-9 9 9 9 0 0 0 9 9 9 9 0 0 0 9-9 9 9 0 0 0-9-9Zm0 16a7 7 0 1 1 0-14 7 7 0 0 1 0 14Z"
                />
              </svg>
              <span className="ml-3">Solar System</span>
            </a>
          </li>
          {/* Add more sidebar items here if needed */}
        </ul>
      </div>
      <div className="content w-4/5 p-5 bg-gray-100">
        {/* Main Content */}
        {activeItem === "Atom" ? <Atom /> : <SolarSystem />}
      </div>
    </div>
  );
}
