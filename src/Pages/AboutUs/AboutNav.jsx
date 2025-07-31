import React from "react";
import { Link, useLocation } from "react-router";

const AboutNav = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const links = [
    { name: "story", to: "/aboutUs" },
    { name: "mission", to: "/aboutUs/mission" },
    { name: "success", to: "/aboutUs/success" },
    { name: "team & others", to: "/aboutUs/team" }, 
  ];

  return (
    <div>
      <ul className="flex gap-4 my-12 text-xl font-semibold">
        {links.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              className={`px-4 py-1 rounded-md transition-colors duration-200 ${
                currentPath === link.to
                  ? "text-secondary font-bold "
                  : "text-gray-400 hover:text-secondary"
              }`}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AboutNav;
