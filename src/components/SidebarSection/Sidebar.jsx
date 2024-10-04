import React from "react";
import { useAppContext } from "../../useContextHook/useContextApi";
import { useTheme } from "../../useContextHook/useTheme";
import MenuItems from "./MenuItems";
import { categories, menuItems } from "../../utils/Constant";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { mobileMenu, selectedCategory, setSelectedCategory } = useAppContext();
  const { isDarkMode } = useTheme();

  const navigate = useNavigate();

  const handleCategoryClick = (id, name) => {
    setSelectedCategory(id);
    if (name == "Home") {
      navigate("/");
    }
  };

  return (
    <div
      className={`md:block overflow-y-auto h-full py-4 w-[300px] mt-2 absolute md:relative z-10 ${
        mobileMenu ? "block" : "hidden"
      } ${isDarkMode ? "border-gray-700" : "border-gray-200"} ${
        mobileMenu ? "z-10" : "z-auto"
      }`}
    >
      <div className="flex flex-col px-5 mb-20">
        {categories.map((item) => (
          <MenuItems
            key={item.id}
            item={item}
            isSelected={item.id === selectedCategory}
            onclick={() => handleCategoryClick(item.id, item.name)}
          />
        ))}

        <hr
          className={`my-3 ${
            isDarkMode ? "border-gray-600" : "border-gray-300"
          }`}
        />

        {menuItems.map((item) => (
          <MenuItems key={item.name} item={item} isSelected={false} />
        ))}

        <hr
          className={`my-3 ${
            isDarkMode ? "border-gray-600" : "border-gray-300"
          }`}
        />

        <div className="flex items-center text-sm justify-center">
          Made by Arjit Anand
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
