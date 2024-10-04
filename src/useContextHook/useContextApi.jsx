import { createContext, useState, useContext, useEffect } from "react";
import { fetchApiForYoutubeData } from "../utils/fetchApi";

export const Context = createContext();

export const AppContext = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState("0");
  const [loading, setLoading] = useState(false);
  const [videoData, setVideoData] = useState([]);
  const [mobileMenu, setMobileMenu] = useState(false);

  const fetchYoutubeData = async (params) => {
    setLoading(true);
    try {
      const res = await fetchApiForYoutubeData("videos", params);

      if (res && res.items) {
        setVideoData(res.items);
      } else {
        console.error("No items found in the response:", res);
        setVideoData([]); // Clear video data if no items found
      }
    } catch (error) {
      console.error("Error fetching YouTube results:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCategory) {
      if (selectedCategory === "0") {
        fetchYoutubeData({
          part: "snippet,contentDetails,statistics",
          chart: "mostPopular",
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
