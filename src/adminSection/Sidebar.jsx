import { useState } from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import { IoMdPeople } from "react-icons/io";
import { CiLocationArrow1 } from "react-icons/ci";
import { GoPackage } from "react-icons/go";
import { AiOutlineSetting } from "react-icons/ai";
import { IoIosLogOut } from "react-icons/io";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

import logoImg from "../assets/logo.png"; 

const Sidebar = () => {
  const [isPackageOpen, setIsPackageOpen] = useState(false);

  function togglePackage(e) {
    e.preventDefault();
    setIsPackageOpen(!isPackageOpen);
  }

  // Helper function to handle active state cleaner in external classes
//   function getLinkClass(isActive){
//     return isActive ? "sidebar-link sidebar-link-active" : "sidebar-link";
//   }

//   function getSubLinkClass(isActive){
//     return isActive ? "sidebar-sublink sidebar-sublink-active" : "sidebar-sublink";
//   }

  const getLinkClass = ({ isActive }) =>
    `${isActive ? "sidebar-link sidebar-link-active" : "sidebar-link"}`;

  const getSubLinkClass = ({ isActive }) =>
    `${isActive ? "sidebar-sublink sidebar-sublink-active" : "sidebar-sublink"}`;

  return (
    <aside className="sidebar-container">
      <div className="flex flex-col gap-6">
        <div className="sidebar-logo-box">
          <img src={logoImg} alt="App Logo" className="sidebar-logo-img" />
          <h2 className="sidebar-logo-title">Logi Track</h2>
        </div>

        {/* Navigation Menu */}
        <ul className="sidebar-menu">
          <li>
            <NavLink to="/users" className={getLinkClass}>
              <IoMdPeople className="text-lg" />
              <span>User List</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/drivers" className={getLinkClass}>
              <CiLocationArrow1 className="text-lg" />
              <span>Manage Driver</span>
            </NavLink>
          </li>

          <li className="flex flex-col">
            {/* The entire row is now a button that handles the toggle */}
            <button
                type="button"
                onClick={togglePackage}
                className="sidebar-link sidebar-link-package"
            >
                <div className="flex gap-3">
                    <GoPackage className="text-lg" />
                    <span>Package</span>
                </div>
                <span>
                {isPackageOpen ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
                </span>
            </button>

            {/* Submenu List Items */}
            {isPackageOpen && (
                <ul className="sidebar-submenu">
                <li>
                    <NavLink to="/package/create" className={getSubLinkClass}>
                    Create
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/package/list" className={getSubLinkClass}>
                    List
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/package/manage" className={getSubLinkClass}>
                    Manage
                    </NavLink>
                </li>
                </ul>
            )}
        </li>
          <li>
            <NavLink to="/settings" className={getLinkClass}>
              <AiOutlineSetting className="text-lg" />
              <span>Settings</span>
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Bottom Section: Logout */}
      <div className="sidebar-footer">
        <NavLink to="/logout" className="sidebar-logout-link">
          <IoIosLogOut className="text-lg" />
          <span>Logout</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;