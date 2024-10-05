import React from "react";
import { formatPublishTime, formatViewCount } from "../../utils/helper";
import { BiSolidDislike, BiSolidLike } from "react-icons/bi";

const VideoComments = ({ comment }) => {
  return (
    <div className="flex flex-col lg:flex-row items-start mb-4 p-4 rounded-lg">
      <img
        src={comment?.snippet?.topLevelComment?.snippet?.authorProfileImageUrl}
        alt={comment?.snippet?.title}
        className="w-12 h-12 rounded-full mb-2 lg:mb-0 lg:mr-4"
      />

      <div className="flex-1">
        <div className="flex gap-2">
          <h3 className="text-sm lg:text-base font-semibold">
            {comment?.snippet?.topLevelComment?.snippet?.authorDisplayName}
          </h3>
          <p className="text-xs lg:text-sm mt-[2px]">
            {formatPublishTime(
              comment?.snippet?.topLevelComment?.snippet?.publishedAt
            )}
          </p>
        </div>

        <p className="text-sm lg:text-base mt-2">
          {comment?.snippet?.topLevelComment?.snippet?.textDisplay}
        </p>
        <div className="flex items-center space-x-4 mt-2">
          <div className="flex items-center space-x-1 mt-1">
            <BiSolidLike />
            <span className="text-xs lg:text-sm">
              {comment?.snippet?.topLevelComment?.snippet?.likeCount
                ? formatViewCount(
                    Number(comment.snippet.topLevelComment.snippet.likeCount)
                  )
                : "0"}
            </span>
          </div>

          <div className="flex items-center space-x-2 mt-1">
            <BiSolidDislike />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoComments;
