/* eslint-disable import/no-unresolved */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import ButtonInterface from "@components/ButtonInterFace";
import { useAuth } from "../../contexts/useAuth";

import defaultPicture from "../../assets/picture/default-profile-picture.png";

function AppBar({ menu }) {
  const [showMenuMobile, setShowMenuMobile] = useState(false);
  // CONST //
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // RETURN //
  return (
    <nav
      id="navbar"
      className="z-20 fixed top-0 left-0 right-0 border-b-4 border-white h-16 flex flex-row bg-[#2F4555] text-white text-lg font-light"
    >
      <div className="flex flex-row justify-between items-center w-full overflow-none">
        {/* <!-- Navbar Title --> */}
        <div className="flex justify-center items-center gap-4">
          <h1 className="text-2xl ml-4 px-2 font-bold border-2 rounded-md">
            EYE4TAP
          </h1>
          <p>version alpha 1.0</p>
        </div>
        {/* <!-- Navbar Pseudo --> */}
        {user.email === null || user === "user" ? null : (
          <div className="flex h-fit justify-center items-center gap-4">
            <img
              className={
                user.picture !== "no picture"
                  ? "rounded-full border-2 h-14 w-14"
                  : "text-transparent rounded-full border-2 h-14 w-14"
              }
              src={
                user.picture !== "no picture" ? user.picture : defaultPicture
              }
              alt="Anime API"
            />
            <h2 className="text-xl font-extrabold uppercase">{user.pseudo}</h2>
          </div>
        )}
        {/* <!-- Navbar Links --> */}
        <ul id="menu" className="hidden md:flex flex-row mr-10 mt-20">
          {menu?.map((page) => (
            <li key={`li-mobile${page.label}`}>
              <ButtonInterface
                name={page.label}
                method={() => {
                  navigate(page.path);
                  window.location.reload();
                }}
              />
            </li>
          ))}

          {/* Display Logout button */}
          {user.email && (
            <li>
              <ButtonInterface
                name="logout"
                method={() => {
                  logout();
                  navigate("/login");
                }}
              />
            </li>
          )}
        </ul>
        <div className="fixed top-0 right-0">
          <button
            onClick={() => {
              setShowMenuMobile(!showMenuMobile);
            }}
            type="button"
            className={
              !showMenuMobile
                ? "z-10 md:hidden rounded-xl mt-20 gap-8 bg-[#AF28EE] border-4 h-20 w-20 rotate-45 active:bg-[#2F4555]"
                : "z-10 md:hidden rounded-xl mt-6 gap-8 bg-[#2F4555] border-4 h-20 w-20 rotate-45 active:bg-[#AF28EE] "
            }
          >
            <p className="animate-scaleUp">
              {!showMenuMobile ? "Menu" : "Close"}{" "}
            </p>
          </button>
          {showMenuMobile ? (
            <ul
              id="menu-mobile"
              className="z-50 animate-slideMenu -m-10 pt-20 flex flex-col md:hidden gap-10 rounded-xl border-l-4 border-b-4 border-[#AF28EE] bg-[#2F4555]"
            >
              {menu?.map((page) => (
                <li key={`li-mobile${page.label}`}>
                  <ButtonInterface
                    name={page.label}
                    method={() => {
                      navigate(page.path);
                    }}
                  />
                </li>
              ))}

              {/* Display Logout button */}
              {user.email && (
                <li>
                  <ButtonInterface
                    name="logout"
                    method={() => {
                      logout();
                      navigate("/login");
                    }}
                  />
                </li>
              )}
            </ul>
          ) : null}
        </div>
      </div>
    </nav>
  );
}
export default AppBar;

AppBar.propTypes = {
  menu: PropTypes.instanceOf(Array).isRequired,
};
