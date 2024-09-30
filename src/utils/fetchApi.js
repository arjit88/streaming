import axios from "axios";

const BASE_URL = "https://www.googleapis.com/youtube/v3";
const API_KEY = "AIzaSyDo4YS2ITCWmlnHBxfzr1pjSi0e9z21xTI";

export const fetchApiForYoutubeData = async (endpoints, params) => {
  try {
    const response = await axios.get(`${BASE_URL}/${endpoints}`, {
      params: {
        ...params,
        key: API_KEY,
      },
    });
    console.log("response", response.data);
    return response.data;
  } catch (error) {
    console.error(error, "Error fetching Youtube data");
  }
};
