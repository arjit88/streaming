import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { formatViewCount, formatPublishTime } from "../utils/helper";
import { fetchApiForYoutubeData } from "../utils/fetchApi";
import { useTheme } from "../useContextHook/useTheme";
import Sidebar from "../components/SidebarSection/Sidebar";

const ChannelDetails = () => {
  const { channelId } = useParams();
  const { isDarkMode } = useTheme();
  const [channelData, setChannelData] = useState(null);
  const [videos, setVideos] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [activeTab, setActiveTab] = useState("home");

  const fetchChannelData = async () => {
    try {
      const data = await fetchApiForYoutubeData("channels", {
        part: "snippet,contentDetails,statistics",
        id: channelId,
      });
      setChannelData(data?.items[0]);
      fetchChannelVideos(
        data?.items[0]?.contentDetails?.relatedPlaylists?.uploads
      );
      fetchPlaylists();
    } catch (error) {
      console.error("Error fetching channel data:", error);
    }
  };

  const fetchChannelVideos = async (playlistId) => {
    if (!playlistId) return;
    try {
      const data = await fetchApiForYoutubeData("playlistItems", {
        part: "snippet",
        playlistId: playlistId,
        maxResults: 10,
      });
      const videoIds = data?.items
        .map((item) => item.snippet.resourceId.videoId)
        .join(",");

      const videoDetails = await fetchApiForYoutubeData("videos", {
        part: "snippet,statistics",
        id: videoIds,
      });

      setVideos(videoDetails?.items);
    } catch (error) {
      console.error("Error fetching channel videos:", error);
    }
  };

  const fetchPlaylists = async () => {
    try {
      const data = await fetchApiForYoutubeData("playlists", {
        part: "snippet",
        channelId: channelId,
        maxResults: 10,
      });
      setPlaylists(data?.items);
    } catch (error) {
      console.error("Error fetching playlists:", error);
    }
  };

  useEffect(() => {
    fetchChannelData();
  }, [channelId]);

  useEffect(() => {
    if (activeTab === "shorts") {
      fetchChannelVideos(
        channelData?.contentDetails?.relatedPlaylists?.uploads
      );
    }
  }, [activeTab, channelData]);

  if (!channelData) {
    return <div className="p-4">Loading...</div>;
  }

  const getFilteredVideos = () => {
    switch (activeTab) {
      case "videos":
        return videos;
      case "shorts":
        return videos.filter((video) => video.snippet.title.includes("Short"));
      case "live":
        return videos.filter(
          (video) => video.snippet.liveBroadcastContent === "live"
        );
      case "playlist":
        return playlists;
      case "community":
        return [];
      default:
        return videos;
    }
  };

  const filteredContent = getFilteredVideos();

  return (
    <div
      className={`flex flex-col ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex">
        <div className="w-1/4">
          <Sidebar />
        </div>

        <div className="flex-1">
          <div
            className="h-48 bg-cover bg-center"
            style={{
              backgroundImage: `url(${channelData?.snippet?.thumbnails?.high?.url})`,
            }}
          />

          <div className="flex items-center p-4">
            <img
              src={channelData?.snippet?.thumbnails?.default?.url}
              alt={channelData?.snippet?.title}
              className="w-24 h-24 rounded-full"
            />
            <div className="ml-4 flex flex-col">
              <h1 className="text-2xl font-bold">
                {channelData?.snippet?.title}
              </h1>
              <p className="text-sm">
                {formatViewCount(
                  Number(channelData?.statistics?.subscriberCount)
                )}{" "}
                subscribers
              </p>
              <p className="text-sm">
                {formatViewCount(Number(channelData?.statistics?.viewCount))}{" "}
                views
              </p>
              <button
                className={`mt-2 px-6 py-2 rounded-full ${
                  isDarkMode ? "bg-gray-300 text-black" : "bg-black text-white"
                }`}
              >
                Subscribe
              </button>
            </div>
          </div>

          {/* Tabs for different sections */}
          <div className="flex space-x-1 mt-2">
            {["Home", "Videos", "Playlist", "Shorts", "Live", "Community"].map(
              (tab) => (
                <button
                  key={tab}
                  className={`flex-1 text-center py-1 border-b-2 ${
                    activeTab === tab.toLowerCase()
                      ? "border-gray-300"
                      : "border-transparent"
                  }`}
                  onClick={() => setActiveTab(tab.toLowerCase())}
                >
                  {tab}
                </button>
              )
            )}
          </div>
          <hr className="my-2 border-gray-300" />

          {/* Displaying Videos or Playlists */}
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredContent.length > 0 ? (
              activeTab === "playlist" ? (
                filteredContent.map((playlist) => (
                  <Link
                    to={`/playlist/${playlist.id}`}
                    key={playlist.id}
                    className={`rounded-lg overflow-hidden shadow-md ${
                      isDarkMode ? "bg-gray-950" : "bg-white"
                    }`}
                  >
                    <img
                      src={playlist.snippet.thumbnails.high.url}
                      alt={playlist.snippet.title}
                      className="w-full"
                    />
                    <div className="p-2">
                      <h3 className="font-semibold line-clamp-2">
                        {playlist.snippet.title}
                      </h3>
                      <p className="text-gray-600">Playlist</p>
                    </div>
                  </Link>
                ))
              ) : (
                filteredContent.map((video) => (
                  <Link
                    to={`/video/${video.snippet.categoryId}/${video.id}`} // Updated Link
                    key={video.id}
                  >
                    <div
                      className={`rounded-lg overflow-hidden shadow-md ${
                        isDarkMode ? "bg-gray-950" : "bg-white"
                      }`}
                    >
                      <img
                        src={video.snippet.thumbnails.high.url}
                        alt={video.snippet.title}
                        className="w-full"
                      />
                      <div className="p-2">
                        <h3 className="font-semibold line-clamp-2">
                          {video.snippet.title}
                        </h3>
                        <p className="text-gray-600">
                          {formatViewCount(Number(video.statistics.viewCount))}{" "}
                          views -{" "}
                          {formatPublishTime(video?.snippet?.publishedAt)}
                        </p>
                        <p className="text-gray-600">
                          {formatViewCount(Number(video.statistics.likeCount))}{" "}
                          likes
                        </p>
                      </div>
                    </div>
                  </Link>
                ))
              )
            ) : (
              <p className="text-center text-gray-500">
                YouTube API v3 doesn't have a dedicated endpoint for this
                section.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelDetails;
