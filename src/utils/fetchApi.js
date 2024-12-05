import axios from "axios";

const BASE_URL = "https://www.googleapis.com/youtube/v3";
const API_KEY = import.meta.env.VITE_API_KEY;
const CACHE_DURATION = 60 * 60 * 1000; // Cache duration set to 1 hour

export const fetchApiForYoutubeData = async (endpoints, params) => {
  // Validate inputs
  if (!endpoints || typeof endpoints !== "string") {
    throw new Error("Invalid endpoint provided.");
  }

  const cacheKey = `${endpoints}:${JSON.stringify(params || {})}`;
  const cachedData = localStorage.getItem(cacheKey);
  const parsedData = cachedData ? JSON.parse(cachedData) : null;

  // Check if cached data exists and if it's still valid
  if (parsedData && Date.now() - parsedData.timestamp < CACHE_DURATION) {
    return parsedData.data; // Return cached data if it's still valid
  }

  try {
    const response = await axios.get(`${BASE_URL}/${endpoints}`, {
      params: {
        ...params,
        key: API_KEY,
      },
    });

    // Store the fetched data in local storage with a timestamp
    localStorage.setItem(
      cacheKey,
      JSON.stringify({
        data: response.data,
        timestamp: Date.now(),
      })
    );

    return response.data;
  } catch (error) {
    console.error(error, "Error fetching YouTube data");
    throw new Error("Failed to fetch YouTube data"); // Rethrow with a generic message
  }
};

// import axios from "axios";

// const BASE_URL = "https://www.googleapis.com/youtube/v3";
// const API_KEY = "AIzaSyDo4YS2ITCWmlnHBxfzr1pjSi0e9z21xTI";
// const CACHE_DURATION = 60 * 60 * 1000; // Cache duration set to 1 hour

// export const fetchApiForYoutubeData = async (endpoints, params) => {
//   const cacheKey = `${endpoints}:${JSON.stringify(params)}`; // Create a unique cache key based on the endpoint and params
//   const cachedData = JSON.parse(localStorage.getItem(cacheKey));

//   // Check if cached data exists and if it's still valid
//   if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
//     return cachedData.data; // Return cached data if it's still valid
//   }

//   try {
//     const response = await axios.get(`${BASE_URL}/${endpoints}`, {
//       params: {
//         ...params,
//         key: API_KEY,
//       },
//     });

//     // Store the fetched data in local storage with a timestamp
//     localStorage.setItem(
//       cacheKey,
//       JSON.stringify({
//         data: response.data,
//         timestamp: Date.now(),
//       })
//     );

//     return response.data;
//   } catch (error) {
//     console.error(error, "Error fetching YouTube data");
//   }
// };
