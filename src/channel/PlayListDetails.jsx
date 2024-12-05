import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchApiForYoutubeData } from "../utils/fetchApi";
import { formatViewCount, formatPublishTime } from "../utils/helper";
import { useTheme } from "../useContextHook/useTheme";
import Sidebar from "../components/SidebarSection/Sidebar";

const PlaylistDetails = () => {
  const { playlistId } = useParams();
  const { isDarkMode } = useTheme();
  const [playlistData, setPlaylistData] = useState([]);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPlaylistVideos = async () => {
    setLoading(true);
    try {
      const data = await fetchApiForYoutubeData("playlistItems", {
        part: "snippet",
        playlistId: playlistId,
        maxResults: 10,
      });

      const videoIds = data.items
        .map((item) => item.snippet.resourceId.videoId)
        .join(",");
      const videoDetails = await fetchApiForYoutubeData("videos", {
        part: "snippet,statistics",
        id: videoIds,
      });

      const combinedData = data.items.map((item) => {
        const videoDetail = videoDetails.items.find(
          (video) => video.id === item.snippet.resourceId.videoId
        );
        return {
          ...item.snippet,
          statistics: videoDetail?.statistics,
          categoryId: videoDetail?.snippet?.categoryId, // Extract categoryId here
        };
      });

      setPlaylistData(combinedData);
    } catch (error) {
      console.error("Error fetching playlist videos:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedVideos = async (videoId) => {
    try {
      const data = await fetchApiForYoutubeData("search", {
        part: "snippet",
        relatedToVideoId: videoId,
        type: "video",
        maxResults: 5,
      });
      setRelatedVideos(data.items);
    } catch (error) {
      console.error("Error fetching related videos:", error);
    }
  };

  useEffect(() => {
    fetchPlaylistVideos();
  }, [playlistId]);

  useEffect(() => {
    if (playlistData.length > 0) {
      fetchRelatedVideos(playlistData[0].resourceId.videoId);
    }
  }, [playlistData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className={`p-4 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex">
        <div className="w-1/4">
          <Sidebar />
        </div>
        <div className="flex-1 p-4">
          <h1 className="text-2xl font-bold mb-4">Playlist Videos</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {playlistData.map((video) => (
              <Link
                to={`/video/${video.categoryId}/${video.resourceId.videoId}`}
                key={video.resourceId.videoId}
              >
                <div
                  className={`rounded-lg overflow-hidden shadow-md ${
                    isDarkMode ? "bg-gray-950" : "bg-white"
                  }`}
                >
                  <img
                    src={video.thumbnails.high.url}
                    alt={video.title}
                    className="w-full"
                  />
                  <div className="p-2">
                    <h3 className="font-semibold line-clamp-2">
                      {video.title}
                    </h3>
                    <p className="text-gray-600">
                      {video.statistics
                        ? formatViewCount(Number(video.statistics.viewCount))
                        : "Views not available"}{" "}
                      views - {formatPublishTime(video.publishedAt)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {relatedVideos.length > 0 && (
            <div className="mt-6">
              <h2 className="text-xl font-bold">Related Videos</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {relatedVideos.map((video) => (
                  <Link
                    to={`/video/${playlistData[0]?.categoryId}/${video.id.videoId}`} // Use the categoryId from the first video in the playlist
                    key={video.id.videoId}
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
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaylistDetails;
