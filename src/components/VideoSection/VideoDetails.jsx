import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../../useContextHook/useContextApi";
import { useTheme } from "../../useContextHook/useTheme";
import { fetchApiForYoutubeData } from "../../utils/fetchApi";
import { formatPublishTime, formatViewCount } from "../../utils/helper";
import { BiSolidDislike, BiSolidLike } from "react-icons/bi";
import { PiShareFat } from "react-icons/pi";
import { MdOutlineContentCut } from "react-icons/md";
import VideoComments from "./VideoComments";
import RelatedVideos from "./RelatedVideos";

const VideoDetails = () => {
  const { categoryId, videoId } = useParams();
  const { setLoading } = useAppContext();
  const { isDarkMode } = useTheme();

  const [selectedVideoDetails, setSelectedVideoDetails] = useState();
  const [channelData, setChannelData] = useState();
  const [commentData, setCommentData] = useState();
  const [showFullDescription, setShowFullDescription] = useState(false);

  const fetchSelectedVideoDetails = async () => {
    setLoading(true);
    try {
      const data = await fetchApiForYoutubeData("videos", {
        part: "snippet,contentDetails,statistics",
        id: videoId,
      });
      setSelectedVideoDetails(data?.items[0]);
    } catch (error) {
      console.error(error, "Error fetching selected video");
    } finally {
      setLoading(false);
    }
  };

  const fetchChannelData = async () => {
    if (selectedVideoDetails?.snippet?.channelId) {
      setLoading(true);
      try {
        const data = await fetchApiForYoutubeData(`channels`, {
          part: "snippet,contentDetails,statistics",
          id: selectedVideoDetails?.snippet?.channelId,
        });
        setChannelData(data?.items[0]);
      } catch (error) {
        console.error(error, "Error fetching channel data");
      } finally {
        setLoading(false);
      }
    }
  };

  const fetchVideoComments = async () => {
    setLoading(true);
    try {
      const data = await fetchApiForYoutubeData(`commentThreads`, {
        part: "snippet",
        videoId: videoId,
        maxResults: 10,
      });
      setCommentData(data?.items);
    } catch (error) {
      console.error(error, "Error fetching channel data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSelectedVideoDetails();
    fetchVideoComments();
  }, [videoId]);

  useEffect(() => {
    fetchChannelData();
  }, [selectedVideoDetails]);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const description = selectedVideoDetails?.snippet?.description;
  const truncatedDescription = description?.slice(0, 240);
  return (
    <div
      className={`flex justify-center flex-row h-full ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div className="w-full flex flex-col p-4 lg:flex-row lg:space-x-4">
        <div className="flex flex-col lg:w-[70%] px-4 py-3 overflow-auto">
          <div className="h-[300px] md:h-[450px] lg:h-[500px] xl:h-[600px] ml-[-16px] lg:ml-0 mr-[-16px] lg:mr-0">
            <iframe
              width="100%"
              height="100%"
              className="rounded-lg"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>

          {selectedVideoDetails && (
            <div className="mt-4 flex flex-col gap-6">
              <h2 className="text-2xl font-bold">
                {selectedVideoDetails?.snippet?.title}
              </h2>
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
                <div className="flex items-center mb-4 lg:mb-0">
                  <img
                    src={channelData?.snippet?.thumbnails?.default?.url}
                    alt={channelData?.snippet?.title}
                    className="w-12 h-12 rounded-full"
                  />

                  <div className="mt-2 ml-2 lg:mt-0">
                    <h3 className="text-lg font-semibold">
                      {channelData?.snippet?.title}
                    </h3>

                    <p
                      className={`font-medium text-sm ${
                        isDarkMode ? "text-gray-200" : "text-gray-700"
                      }`}
                    >
                      {channelData?.statistics?.subscriberCount
                        ? formatViewCount(
                            Number(channelData.statistics.subscriberCount)
                          )
                        : "Subscribers count unavailable"}{" "}
                      subscribers
                    </p>
                  </div>

                  <button
                    className={`${
                      isDarkMode ? "bg-white text-black" : "bg-black text-white"
                    } font-semibold px-6 py-2 mt-2 lg:mt-0 ml-1 lg:ml-6 rounded-full`}
                  >
                    Subscribe
                  </button>
                </div>

                <div className="flex items-center justify-between space-x-4">
                  <button
                    className={`flex items-center space-x-2 rounded-full px-4 py-2 md:px-6 md:py-3 ${
                      isDarkMode ? "bg-gray-800" : "bg-slate-200"
                    }`}
                  >
                    <BiSolidLike className="text-2xl" />
                    <span>
                      {selectedVideoDetails?.statistics?.likeCount
                        ? formatViewCount(
                            Number(selectedVideoDetails.statistics.likeCount)
                          )
                        : "Likes count unavailable"}
                    </span>
                    <div className="h-5 w-[1px] bg-gray-400 mx-2"></div>
                    <BiSolidDislike className="text-2xl" />
                  </button>

                  <button
                    className={`flex items-center space-x-2 rounded-full px-4 py-2 md:px-6 md:py-2 ${
                      isDarkMode ? "bg-gray-800" : "bg-slate-200"
                    }`}
                  >
                    <PiShareFat className="text-xl" />
                    <span className="mb-1">Share</span>
                  </button>

                  <button
                    className={`flex items-center space-x-2 rounded-full px-4 py-2 md:px-6 md:py-2 ${
                      isDarkMode ? "bg-gray-800" : "bg-slate-200"
                    }`}
                  >
                    <MdOutlineContentCut className="text-xl" />
                    <span className="mb-1">Clip</span>
                  </button>

                  <button
                    className={`flex items-center space-x-2 rounded-full px-4 py-2 md:px-6 md:py-2 ${
                      isDarkMode ? "bg-gray-800" : "bg-slate-200"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 0 24 24"
                      width="24"
                      aria-hidden="true"
                      className={`fill-current ${
                        isDarkMode ? "text-white" : "text-black"
                      }`}
                      style={{
                        pointerEvents: "none",
                        display: "inherit",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <path d="M18 4v15.06l-5.42-3.87-.58-.42-.58.42L6 19.06V4h12m1-1H5v18l7-5 7 5V3z"></path>
                    </svg>
                  </button>
                </div>
              </div>

              <div
                className={` ${
                  isDarkMode
                    ? "text-white bg-gray-800"
                    : "text-black bg-slate-200"
                }  rounded-xl p-4`}
              >
                <p>
                  {selectedVideoDetails?.statistics?.viewCount
                    ? formatViewCount(
                        Number(selectedVideoDetails.statistics.viewCount)
                      )
                    : "View count unavailable"}{" "}
                  views .{" "}
                  {formatPublishTime(selectedVideoDetails?.snippet.publishedAt)}
                </p>
                <p>
                  {showFullDescription ? description : truncatedDescription}
                  {description?.length > 240 && (
                    <button
                      className="text-blue-500 ml-2"
                      onClick={toggleDescription}
                    >
                      {showFullDescription ? "Show less" : "...more"}
                    </button>
                  )}
                </p>
              </div>
            </div>
          )}

          <div className="mt-8">
            <p
              className={`${
                isDarkMode ? "text-gray-200" : "text-black"
              } font-semibold text-lg`}
            >
              {selectedVideoDetails?.statistics?.commentCount
                ? formatViewCount(
                    Number(selectedVideoDetails.statistics.commentCount)
                  )
                : "Comment unavailable"}{" "}
              Comments
            </p>
          </div>

          {commentData?.map((comment) => (
            <VideoComments key={comment.id} comment={comment} />
          ))}
        </div>

        <div className="lg:w-[30%] p-4">
          <h3 className="text-xl font-bold mb-4">Related Videos</h3>
          <RelatedVideos />
        </div>
      </div>
    </div>
  );
};

export default VideoDetails;
