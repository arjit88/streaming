import { createContext, useState } from "react";
import { useContext } from "react";
import { fetchApiForYoutubeData } from "../utils/fetchApi";
import { useEffect } from "react";

export const Context = createContext();

export const AppContext = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState("0");
  const [loading, setLoading] = useState(false);
  const [videoData, SetVideoData] = useState([]);
  const [mobileMenu, setMobileMenu] = useState(false);

  const fetchYoutubeData = async (params) => {
    setLoading(true);
    try {
      const res = fetchApiForYoutubeData("videos", params);
      SetVideoData(res.items);
    } catch (error) {
      console.error(error, "Error fetching youtube results");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCategory) {
      if (selectedCategory === "Home") {
        fetchYoutubeData({
          part: "snippet,contentDetails,statistics",
          regionCode: "IN",
          maxResults: 10,
        });
      } else {
        fetchYoutubeData({
          part: "snippet,contentDetails,statistics",
          chart: "mostPopular",
          regionCode: "IN",
          maxResults: 10,
          videoCategoryId: selectedCategory,
        });
      }
    }
  }, [selectedCategory]);

  return (
    <Context.Provider
      value={{
        selectedCategory,
        setSelectedCategory,
        mobileMenu,
        setMobileMenu,
        videoData,
        loading,
        setLoading,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useAppContext = () => {
  return useContext(Context);
};
