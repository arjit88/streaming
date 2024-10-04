import React, { useState } from "react";
import { useAppContext } from "../../useContextHook/useContextApi";
import { useTheme } from "../../useContextHook/useTheme";
import Loader from "../../utils/Loader";
import { CgClose } from "react-icons/cg";
import { SlMenu } from "react-icons/sl";
import { Link, useNavigate } from "react-router-dom";
import { IoMdMic, IoMdMicOff } from "react-icons/io";
import { MdVideoCall } from "react-icons/md";
import { FaBell } from "react-icons/fa";
import { FiMoon, FiSearch, FiSun } from "react-icons/fi";
import { IoPersonCircle } from "react-icons/io5";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { loading, mobileMenu, setMobileMenu } = useAppContext();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleSearchQuerry = () => {
    if (searchQuery?.length > 0) {
      navigate(`search/${searchQuery}`);
    }
  };

  const handleClearSearchQuerry = () => {
    setSearchQuery("");
  };

  const mobileToggleMenu = () => {
    setMobileMenu(!mobileMenu);
  };

  return (
    <div
      className={`sticky top-0 z-10 flex flex-row items-center justify-between h-20 shadow-lg px-4 md:px-5 ${
        isDarkMode ? "bg-gray-900" : "bg-white"
      } text-${isDarkMode ? "white" : "bg-gray-700"}`}
    >
      {loading && <Loader />}

      <div className="flex h-5 items-center">
        <div
          className={`flex mr-2 md:hidden md:mr-6 cursor-pointer items-center justify-center h-9 w-9 rounded-full hover:bg-${
            isDarkMode ? "gray-700" : "gray-300"
          }`}
          onClick={mobileToggleMenu}
        >
          {mobileMenu ? (
            <CgClose className="text-lg" />
          ) : (
            <SlMenu className="text-lg" />
          )}
        </div>

        <Link to={"/"} className="flex items-center h-6">
          <div className="hidden md:block h-8">
            <svg
              id="yt-logo-updated_yt10"
              viewBox="0 0 90 20"
              preserveAspectRatio="xMidYMid meet"
              xmlns="http://www.w3.org/2000/svg"
              className="h-full object-contain"
            >
              <g>
                <path
                  d="M27.9727 3.12324C27.6435 1.89323 26.6768 0.926623 25.4468 0.597366C23.2197 2.24288e-07 14.285 0 14.285 0C14.285 0 5.35042 2.24288e-07 3.12323 0.597366C1.89323 0.926623 0.926623 1.89323 0.597366 3.12324C2.24288e-07 5.35042 0 10 0 10C0 10 2.24288e-07 14.6496 0.597366 16.8768C0.926623 18.1068 1.89323 19.0734 3.12323 19.4026C5.35042 20 14.285 20 14.285 20C14.285 20 23.2197 20 25.4468 19.4026C26.6768 19.0734 27.6435 18.1068 27.9727 16.8768C28.5701 14.6496 28.5701 10 28.5701 10C28.5701 10 28.5677 5.35042 27.9727 3.12324Z"
                  fill="#FF0000"
                />
                <path
                  d="M11.4253 14.2854L18.8477 10.0004L11.4253 5.71533V14.2854Z"
                  fill="white"
                />
              </g>
              <text
                x="30"
                y="15"
                fill={isDarkMode ? "white" : "black"}
                fontSize="14"
                fontWeight="bold"
              >
                YouTube
              </text>
            </svg>
          </div>

          <div className="md:hidden h-8">
            <svg
              id="yt-logo-updated_yt10"
              viewBox="0 0 90 20"
              preserveAspectRatio="xMidYMid meet"
              xmlns="http://www.w3.org/2000/svg"
              className="h-full object-contain"
            >
              <g>
                <path
                  d="M27.9727 3.12324C27.6435 1.89323 26.6768 0.926623 25.4468 0.597366C23.2197 2.24288e-07 14.285 0 14.285 0C14.285 0 5.35042 2.24288e-07 3.12323 0.597366C1.89323 0.926623 0.926623 1.89323 0.597366 3.12324C2.24288e-07 5.35042 0 10 0 10C0 10 2.24288e-07 14.6496 0.597366 16.8768C0.926623 18.1068 1.89323 19.0734 3.12323 19.4026C5.35042 20 14.285 20 14.285 20C14.285 20 23.2197 20 25.4468 19.4026C26.6768 19.0734 27.6435 18.1068 27.9727 16.8768C28.5701 14.6496 28.5701 10 28.5701 10C28.5701 10 28.5677 5.35042 27.9727 3.12324Z"
                  fill="#FF0000"
                />
                <path
                  d="M11.4253 14.2854L18.8477 10.0004L11.4253 5.71533V14.2854Z"
                  fill="white"
                />
              </g>
              <text
                x="30"
                y="15"
                fill={isDarkMode ? "white" : "black"}
                fontSize="14"
                fontWeight="bold"
              >
                YouTube
              </text>
            </svg>
          </div>
        </Link>
      </div>

      <div className="flex items-center group relative">
        <div
          className={`flex h-10 md:ml-10 md:pl-5 border border-[#303030] rounded-l-3xl group-focus-within:border-blue-500 md:group-focus-within:ml-5 md:group-focus-within:pl-0 ${
            isDarkMode ? "border-gray-700" : "border-gray-300"
          }`}
        >
          <div className="w-10 items-center justify-center hidden group-focus-within:md:flex">
            <FiSearch className="text-xl" />
          </div>
          <input
            type="text"
            placeholder="Search here..."
            className={`pl-5 pr-5 text-sm bg-transparent outline-none md:pl-0 w-32 sm:w-44 md:w-64 lg:w-[500px] ${
              isDarkMode ? "text-white" : "text-black"
            }`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === "Enter") handleSearchQuerry();
            }}
          />
          {searchQuery && (
            <button
              className="absolute right-32 top-1/2 transform -translate-y-1/2"
              onClick={handleClearSearchQuerry}
            >
              <CgClose className="text-xl" />
            </button>
          )}
        </div>

        <button
          className={`flex items-center justify-center w-[40px] md:w-[60px] h-10 rounded-r-3xl border border-l-0 ${
            isDarkMode ? "border-gray-700" : "border-gray-300"
          } bg-${isDarkMode ? "gray-700" : "gray-100"}`}
          onClick={handleSearchQuerry}
        >
          <FiSearch className="text-xl" />
        </button>

        <button
          className={`flex items-center justify-center w-[40px] md:w-[60px] h-8 md:h-10 rounded-full hover:bg-${
            isDarkMode ? "gray-700" : "gray-300"
          }`}
        >
          {/* <IoMdMicOff className="text-xl" /> */}
          <IoMdMic className="text-xl" />
        </button>
      </div>

      <div className="flex items-center space-x-2 md:space-x-4">
        <button
          className={`hidden md:flex items-center justify-center h-10 w-10 rounded-full hover:bg-${
            isDarkMode ? "gray-700" : "gray-300"
          }`}
        >
          <MdVideoCall className="text-3xl" />
        </button>

        <button
          className={`hidden md:flex items-center justify-center h-10 w-10 rounded-full hover:bg-${
            isDarkMode ? "gray-700" : "gray-300"
          }`}
        >
          <FaBell className="text-xl" />
        </button>

        <div className="flex space-x-0 md:space-x-2">
          <button
            className={`hidden md:flex items-center justify-center h-10 w-10 rounded-full hover:bg-${
              isDarkMode ? "gray-700" : "gray-300"
            }`}
          >
            <IoPersonCircle className="text-2xl" />
          </button>

          <button
            className={`flex items-center justify-center h-10 w-10 rounded-full hover:bg-${
              isDarkMode ? "gray-700" : "gray-300"
            }`}
            onClick={toggleTheme}
          >
            {isDarkMode ? (
              <FiSun className="text-xl text-yellow-300" />
            ) : (
              <FiMoon className="text-xl text-gray-800" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
