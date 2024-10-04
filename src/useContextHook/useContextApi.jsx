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
      setVideoData(res.items);
      // console.log(res.items);
    } catch (error) {
      console.error(error, "Error fetching YouTube results");
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
